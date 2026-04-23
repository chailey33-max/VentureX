import express, { type NextFunction, type Request, type Response } from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import Stripe from "stripe";
import dotenv from "dotenv";
import admin from "firebase-admin";
import fs from "fs";
import cors from "cors";
import { GoogleGenAI, Type } from "@google/genai";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

type AuthenticatedRequest = Request & {
  auth?: admin.auth.DecodedIdToken;
};

type RateLimitBucket = {
  count: number;
  resetAt: number;
};

type RateLimitOptions = {
  windowMs: number;
  maxRequests: number;
  keyBuilder: (req: AuthenticatedRequest) => string | null;
  label: string;
};

type CheckoutPayload = {
  userId?: string;
  userEmail?: string;
  origin?: string;
};

type VerifyEntitlementPayload = Record<string, never>;

function createFixedWindowRateLimiter(options: RateLimitOptions) {
  const buckets = new Map<string, RateLimitBucket>();

  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const key = options.keyBuilder(req);
    if (!key) {
      next();
      return;
    }

    const now = Date.now();
    const existing = buckets.get(key);

    if (!existing || existing.resetAt <= now) {
      buckets.set(key, { count: 1, resetAt: now + options.windowMs });
      next();
      return;
    }

    if (existing.count >= options.maxRequests) {
      const retryAfterSeconds = Math.max(1, Math.ceil((existing.resetAt - now) / 1000));
      recordAbuseSignal({
        scope: "rate_limit",
        key,
        reason: `too_many_${options.label}_requests`,
        metadata: { label: options.label, retryAfterSeconds },
      });
      res.setHeader("Retry-After", String(retryAfterSeconds));
      res.status(429).json({ error: `Too many ${options.label} requests. Please try again shortly.` });
      return;
    }

    existing.count += 1;

    if (buckets.size > 10000) {
      for (const [bucketKey, bucket] of buckets) {
        if (bucket.resetAt <= now) {
          buckets.delete(bucketKey);
        }
      }
    }

    next();
  };
}

function stripCodeFence(text: string): string {
  return text.replace(/```json\s*|\s*```/g, "").trim();
}

function parseJsonSafely(text: string): unknown {
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

function parseStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter((item): item is string => typeof item === "string" && item.trim().length > 0);
}

function validateExistingTitles(value: unknown): string[] | null {
  if (!Array.isArray(value)) {
    return null;
  }

  const sanitized = value
    .filter((item): item is string => typeof item === "string")
    .map((item) => item.trim())
    .filter((item) => item.length > 0)
    .slice(0, 200);

  if (sanitized.length === 0) {
    return null;
  }

  return sanitized;
}

function validateIdeaTitle(value: unknown): string | null {
  if (typeof value !== "string") {
    return null;
  }

  const sanitized = value.trim();
  if (sanitized.length < 3 || sanitized.length > 120) {
    return null;
  }

  return sanitized;
}

function normalizeOrigin(value: string): string | null {
  try {
    return new URL(value).origin;
  } catch {
    return null;
  }
}

function parseAllowedOrigins(value: string | undefined): string[] {
  if (!value) {
    return [];
  }

  return value
    .split(",")
    .map((origin) => origin.trim())
    .filter((origin) => origin.length > 0)
    .map((origin) => normalizeOrigin(origin))
    .filter((origin): origin is string => Boolean(origin));
}

function validateCheckoutPayload(value: unknown): { ok: true; payload: CheckoutPayload } | { ok: false; error: string } {
  if (value === null || value === undefined) {
    return { ok: true, payload: {} };
  }

  if (typeof value !== "object" || Array.isArray(value)) {
    return { ok: false, error: "Checkout payload must be a JSON object." };
  }

  const payload = value as Record<string, unknown>;
  const allowedKeys = new Set(["userId", "userEmail", "origin"]);

  for (const key of Object.keys(payload)) {
    if (!allowedKeys.has(key)) {
      return { ok: false, error: `Unexpected checkout payload field: ${key}.` };
    }
  }

  if (payload.userId !== undefined && (typeof payload.userId !== "string" || payload.userId.length > 256)) {
    return { ok: false, error: "userId must be a string up to 256 characters." };
  }

  if (
    payload.userEmail !== undefined &&
    (typeof payload.userEmail !== "string" || payload.userEmail.length > 320)
  ) {
    return { ok: false, error: "userEmail must be a string up to 320 characters." };
  }

  if (payload.origin !== undefined && (typeof payload.origin !== "string" || payload.origin.length > 2048)) {
    return { ok: false, error: "origin must be a string up to 2048 characters." };
  }

  return {
    ok: true,
    payload: {
      userId: typeof payload.userId === "string" ? payload.userId : undefined,
      userEmail: typeof payload.userEmail === "string" ? payload.userEmail : undefined,
      origin: typeof payload.origin === "string" ? payload.origin : undefined,
    },
  };
}

function createBodySizeLimiter(limitBytes: number, label: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    const contentLengthHeader = req.headers["content-length"];
    if (typeof contentLengthHeader === "string") {
      const contentLength = Number(contentLengthHeader);
      if (Number.isFinite(contentLength) && contentLength > limitBytes) {
        recordAbuseSignal({
          scope: "payload",
          key: `ip:${req.ip || "unknown"}`,
          reason: `${label}_payload_too_large`,
          metadata: { contentLength, limitBytes },
        });
        res.status(413).json({ error: `${label} payload is too large.` });
        return;
      }
    }

    const serializedBody = JSON.stringify(req.body ?? {});
    if (Buffer.byteLength(serializedBody, "utf8") > limitBytes) {
      recordAbuseSignal({
        scope: "payload",
        key: `ip:${req.ip || "unknown"}`,
        reason: `${label}_payload_too_large`,
        metadata: { serializedLength: Buffer.byteLength(serializedBody, "utf8"), limitBytes },
      });
      res.status(413).json({ error: `${label} payload is too large.` });
      return;
    }

    next();
  };
}

function validateVerifyEntitlementPayload(
  value: unknown
): { ok: true; payload: VerifyEntitlementPayload } | { ok: false; error: string } {
  if (value === null || value === undefined) {
    return { ok: true, payload: {} };
  }

  if (typeof value !== "object" || Array.isArray(value)) {
    return { ok: false, error: "Verify entitlement payload must be a JSON object." };
  }

  if (Object.keys(value as Record<string, unknown>).length > 0) {
    return { ok: false, error: "Verify entitlement payload must be empty." };
  }

  return { ok: true, payload: {} };
}

const ENTITLEMENT_PRODUCT_KEY = process.env.ENTITLEMENT_PRODUCT_KEY || "full_access_lifetime";
const EXPECTED_CHECKOUT_AMOUNT_CENTS = Number(process.env.EXPECTED_CHECKOUT_AMOUNT_CENTS || "4900");
const EXPECTED_CHECKOUT_CURRENCY = (process.env.EXPECTED_CHECKOUT_CURRENCY || "usd").toLowerCase();
const EXPECTED_CHECKOUT_MODE = process.env.EXPECTED_CHECKOUT_MODE || "payment";
const EXPECTED_PAYMENT_STATUS = process.env.EXPECTED_PAYMENT_STATUS || "paid";
const EXPECTED_STRIPE_PRICE_IDS = new Set(
  (process.env.EXPECTED_STRIPE_PRICE_IDS || "")
    .split(",")
    .map((item) => item.trim())
    .filter((item) => item.length > 0)
);

function logWebhookDecision(
  level: "info" | "warn" | "error",
  payload: Record<string, unknown>
) {
  const entry = {
    ts: new Date().toISOString(),
    component: "stripe_webhook",
    ...payload,
  };

  if (level === "error") {
    console.error(JSON.stringify(entry));
    return;
  }

  if (level === "warn") {
    console.warn(JSON.stringify(entry));
    return;
  }

  console.log(JSON.stringify(entry));
}

type AbuseSignal = {
  scope: string;
  key: string;
  reason: string;
  metadata?: Record<string, unknown>;
};

const abuseSignalBuckets = new Map<string, { count: number; firstSeen: number; lastSeen: number }>();

function recordAbuseSignal(signal: AbuseSignal) {
  const now = Date.now();
  const bucketKey = `${signal.scope}:${signal.key}:${signal.reason}`;
  const existing = abuseSignalBuckets.get(bucketKey);
  const next = existing
    ? { count: existing.count + 1, firstSeen: existing.firstSeen, lastSeen: now }
    : { count: 1, firstSeen: now, lastSeen: now };
  abuseSignalBuckets.set(bucketKey, next);

  if (abuseSignalBuckets.size > 20000) {
    for (const [key, value] of abuseSignalBuckets) {
      if (now - value.lastSeen > 60 * 60 * 1000) {
        abuseSignalBuckets.delete(key);
      }
    }
  }

  const shouldAlert = next.count === 5 || next.count === 10 || next.count % 25 === 0;
  const payload = {
    ts: new Date().toISOString(),
    component: "abuse_monitor",
    level: shouldAlert ? "alert" : "info",
    scope: signal.scope,
    key: signal.key,
    reason: signal.reason,
    count: next.count,
    windowMs: now - next.firstSeen,
    ...(signal.metadata ? { metadata: signal.metadata } : {}),
  };
  if (shouldAlert) {
    console.warn(JSON.stringify(payload));
  } else {
    console.log(JSON.stringify(payload));
  }
}

async function startServer() {
  // Initialize Firebase Admin for audit compliance
  try {
    if (admin.apps.length === 0) {
      if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
        // Option A: Use the Service Account JSON found at the path
        admin.initializeApp({
          credential: admin.credential.applicationDefault(),
          projectId: process.env.FIREBASE_PROJECT_ID || process.env.VITE_FIREBASE_PROJECT_ID
        });
        console.log("[Firebase] Admin initialized via GOOGLE_APPLICATION_CREDENTIALS path.");
      } else {
        // Option B: Fallback to Project ID (standard for Cloud Run)
        const projectId = process.env.FIREBASE_PROJECT_ID || process.env.VITE_FIREBASE_PROJECT_ID;
        if (projectId) {
          admin.initializeApp({ projectId });
          console.log(`[Firebase] Admin initialized for project: ${projectId}`);
        } else {
          // Attempt to read from config file if no env vars exist
          const configPath = path.join(process.cwd(), "firebase-applet-config.json");
          if (fs.existsSync(configPath)) {
            const config = JSON.parse(fs.readFileSync(configPath, "utf8"));
            admin.initializeApp({ projectId: config.projectId });
            console.log(`[Firebase] Admin initialized via config file: ${config.projectId}`);
          }
        }
      }
    }
  } catch (err) {
    console.error("[Firebase] Audit Alert: Admin initialization failed.", err);
  }

  const app = express();
  const PORT = 3000;

  const defaultFrontendOrigins = [
    "http://localhost:3000",
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:8888",
  ];
  const approvedFrontendOrigins = Array.from(
    new Set([...defaultFrontendOrigins, ...parseAllowedOrigins(process.env.FRONTEND_ORIGINS)])
  );
  const approvedFrontendOriginSet = new Set(approvedFrontendOrigins);
  const cspConnectOrigins = Array.from(
    new Set([
      ...approvedFrontendOrigins,
      "https://api.stripe.com",
      "https://js.stripe.com",
      "https://firestore.googleapis.com",
      "https://firebase.googleapis.com",
      "https://securetoken.googleapis.com",
      "https://identitytoolkit.googleapis.com",
      "https://www.googleapis.com",
      "https://nominatim.openstreetmap.org",
    ])
  );
  const configuredDefaultOrigin = normalizeOrigin(process.env.FRONTEND_DEFAULT_ORIGIN || "");
  const checkoutDefaultOrigin =
    configuredDefaultOrigin && approvedFrontendOriginSet.has(configuredDefaultOrigin)
      ? configuredDefaultOrigin
      : approvedFrontendOrigins[0] || null;

  app.set("trust proxy", 1);

  app.use(
    cors({
      origin: (origin, callback) => {
        if (!origin) {
          callback(null, true);
          return;
        }

        const normalizedOrigin = normalizeOrigin(origin);
        if (normalizedOrigin && approvedFrontendOriginSet.has(normalizedOrigin)) {
          callback(null, true);
          return;
        }

        callback(new Error("Origin not allowed by CORS."));
      },
      methods: ["GET", "POST", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization", "Stripe-Signature"],
      credentials: true,
    })
  );

  app.use((req, res, next) => {
    const csp = [
      "default-src 'self'",
      "base-uri 'self'",
      "object-src 'none'",
      "frame-ancestors 'none'",
      "form-action 'self' https://checkout.stripe.com",
      "img-src 'self' data: https:",
      "font-src 'self' data:",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "script-src 'self' 'unsafe-inline' https://js.stripe.com",
      `connect-src 'self' ${cspConnectOrigins.join(" ")}`,
      "frame-src 'self' https://js.stripe.com https://hooks.stripe.com https://checkout.stripe.com",
      "worker-src 'self' blob:",
      "upgrade-insecure-requests",
    ].join("; ");

    res.setHeader("Content-Security-Policy", csp);
    res.setHeader("X-Frame-Options", "DENY");
    res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
    res.setHeader("Cross-Origin-Resource-Policy", "same-site");
    res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("Permissions-Policy", "geolocation=(self), camera=(), microphone=()");

    const forwardedProto = req.headers["x-forwarded-proto"];
    const isHttps = req.secure || (typeof forwardedProto === "string" && forwardedProto.includes("https"));
    if (isHttps) {
      res.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");
    }

    next();
  });

  // Initialize Stripe lazily
  let stripe: Stripe | null = null;
  const getStripe = () => {
    if (!stripe) {
      const key = process.env.STRIPE_SECRET_KEY;
      if (!key) {
        throw new Error("STRIPE_SECRET_KEY is required on the server.");
      }
      stripe = new Stripe(key);
    }
    return stripe;
  };

  let gemini: GoogleGenAI | null = null;
  const getGemini = () => {
    if (!gemini) {
      const key = process.env.GEMINI_API_KEY;
      if (!key) {
        throw new Error("GEMINI_API_KEY is required on the server.");
      }
      gemini = new GoogleGenAI({ apiKey: key });
    }
    return gemini;
  };

  const requireAuth = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    const bearerPrefix = "Bearer ";

    if (!authHeader || !authHeader.startsWith(bearerPrefix)) {
      recordAbuseSignal({
        scope: "auth",
        key: `ip:${req.ip || "unknown"}`,
        reason: "missing_or_invalid_auth_header",
      });
      res.status(401).json({ error: "Missing or invalid authorization token." });
      return;
    }

    const token = authHeader.slice(bearerPrefix.length).trim();
    if (!token) {
      recordAbuseSignal({
        scope: "auth",
        key: `ip:${req.ip || "unknown"}`,
        reason: "empty_bearer_token",
      });
      res.status(401).json({ error: "Missing or invalid authorization token." });
      return;
    }

    if (admin.apps.length === 0) {
      res.status(503).json({ error: "Authentication service unavailable." });
      return;
    }

    try {
      req.auth = await admin.auth().verifyIdToken(token);
      next();
    } catch (error) {
      console.error("[Auth] Failed to verify Firebase ID token.", error);
      recordAbuseSignal({
        scope: "auth",
        key: `ip:${req.ip || "unknown"}`,
        reason: "token_verification_failed",
      });
      res.status(401).json({ error: "Unauthorized request." });
    }
  };

  const generationUserLimiter = createFixedWindowRateLimiter({
    windowMs: 60_000,
    maxRequests: 12,
    keyBuilder: (req) => req.auth?.uid || null,
    label: "generation",
  });

  const generationIpLimiter = createFixedWindowRateLimiter({
    windowMs: 60_000,
    maxRequests: 20,
    keyBuilder: (req) => req.ip || null,
    label: "generation",
  });

  const checkoutUserLimiter = createFixedWindowRateLimiter({
    windowMs: 60_000,
    maxRequests: 6,
    keyBuilder: (req) => req.auth?.uid || null,
    label: "checkout",
  });

  const checkoutIpLimiter = createFixedWindowRateLimiter({
    windowMs: 60_000,
    maxRequests: 12,
    keyBuilder: (req) => req.ip || null,
    label: "checkout",
  });

  const checkoutBodySizeLimiter = createBodySizeLimiter(2 * 1024, "checkout");
  const verifyBodySizeLimiter = createBodySizeLimiter(1024, "verify-entitlement");
  const webhookBodySizeLimiter = createBodySizeLimiter(100 * 1024, "stripe-webhook");

  const verifyUserLimiter = createFixedWindowRateLimiter({
    windowMs: 60_000,
    maxRequests: 24,
    keyBuilder: (req) => req.auth?.uid || null,
    label: "verify-entitlement",
  });

  const verifyIpLimiter = createFixedWindowRateLimiter({
    windowMs: 60_000,
    maxRequests: 48,
    keyBuilder: (req) => req.ip || null,
    label: "verify-entitlement",
  });

  const webhookIpLimiter = createFixedWindowRateLimiter({
    windowMs: 60_000,
    maxRequests: 120,
    keyBuilder: (req) => req.ip || null,
    label: "stripe-webhook",
  });

  const resolveApprovedCheckoutOrigin = (req: Request): string | null => {
    const candidateHeaders: string[] = [];

    if (typeof req.headers.origin === "string") {
      candidateHeaders.push(req.headers.origin);
    }
    if (typeof req.headers.referer === "string") {
      candidateHeaders.push(req.headers.referer);
    }

    for (const candidate of candidateHeaders) {
      const normalizedOrigin = normalizeOrigin(candidate);
      if (normalizedOrigin && approvedFrontendOriginSet.has(normalizedOrigin)) {
        return normalizedOrigin;
      }
    }

    if (checkoutDefaultOrigin && approvedFrontendOriginSet.has(checkoutDefaultOrigin)) {
      return checkoutDefaultOrigin;
    }

    return null;
  };

  // Stripe Webhook Endpoint (MUST be before express.json middleware)
  app.post(
    "/api/stripe-webhook",
    express.raw({ type: "application/json" }),
    webhookBodySizeLimiter,
    webhookIpLimiter,
    async (req, res) => {
    const stripeClient = getStripe();
    const sig = req.headers["stripe-signature"];
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    let eventRef: FirebaseFirestore.DocumentReference | null = null;

    if (!webhookSecret) {
      logWebhookDecision("error", { decision: "config_missing", reason: "STRIPE_WEBHOOK_SECRET missing" });
      return res.status(400).send("Webhook secret missing.");
    }

    let event;

    try {
      event = stripeClient.webhooks.constructEvent(req.body, sig!, webhookSecret);
    } catch (err: any) {
      recordAbuseSignal({
        scope: "webhook",
        key: `ip:${req.ip || "unknown"}`,
        reason: "signature_verification_failed",
      });
      logWebhookDecision("warn", {
        decision: "signature_invalid",
        reason: err.message,
      });
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    try {
      const db = admin.firestore();
      eventRef = db.collection("stripeWebhookEvents").doc(event.id);

      try {
        await eventRef.create({
          eventId: event.id,
          eventType: event.type,
          status: "processing",
          createdAt: admin.firestore.FieldValue.serverTimestamp(),
        });
      } catch (err: any) {
        if (err?.code === 6 || err?.code === "already-exists") {
          logWebhookDecision("info", {
            decision: "duplicate_ignored",
            eventId: event.id,
            eventType: event.type,
          });
          return res.json({ received: true, duplicate: true });
        }
        throw err;
      }

      if (event.type !== "checkout.session.completed") {
        await eventRef.set(
          {
            status: "ignored",
            reason: `unsupported_event:${event.type}`,
            decidedAt: admin.firestore.FieldValue.serverTimestamp(),
          },
          { merge: true }
        );
        logWebhookDecision("info", {
          decision: "ignored",
          eventId: event.id,
          eventType: event.type,
        });
        return res.json({ received: true });
      }

      const session = event.data.object as Stripe.Checkout.Session;
      const userId = session.metadata?.userId;
      const userEmail = session.customer_email || session.customer_details?.email || null;
      const sessionAmount = session.amount_total;
      const sessionCurrency = (session.currency || "").toLowerCase();
      const sessionMode = session.mode;
      const paymentStatus = session.payment_status;
      const productKey = session.metadata?.productKey;

      let hasExpectedPriceId = EXPECTED_STRIPE_PRICE_IDS.size === 0;
      if (EXPECTED_STRIPE_PRICE_IDS.size > 0) {
        const lineItems = await stripeClient.checkout.sessions.listLineItems(session.id, { limit: 25 });
        hasExpectedPriceId = lineItems.data.some((item) => {
          const priceRef = item.price;
          const priceId = typeof priceRef === "string" ? priceRef : priceRef?.id;
          return Boolean(priceId && EXPECTED_STRIPE_PRICE_IDS.has(priceId));
        });
      }

      const validationErrors: string[] = [];
      if (!userId) validationErrors.push("missing_userId");
      if (!userEmail) validationErrors.push("missing_userEmail");
      if (sessionAmount !== EXPECTED_CHECKOUT_AMOUNT_CENTS) validationErrors.push("amount_mismatch");
      if (sessionCurrency !== EXPECTED_CHECKOUT_CURRENCY) validationErrors.push("currency_mismatch");
      if (sessionMode !== EXPECTED_CHECKOUT_MODE) validationErrors.push("mode_mismatch");
      if (paymentStatus !== EXPECTED_PAYMENT_STATUS) validationErrors.push("payment_status_mismatch");
      if (productKey !== ENTITLEMENT_PRODUCT_KEY) validationErrors.push("product_key_mismatch");
      if (!hasExpectedPriceId) validationErrors.push("price_id_mismatch");

      if (validationErrors.length > 0) {
        recordAbuseSignal({
          scope: "webhook",
          key: `user:${userId || "unknown"}`,
          reason: "checkout_session_validation_failed",
          metadata: { reasons: validationErrors },
        });
        await eventRef.set(
          {
            status: "rejected",
            reasons: validationErrors,
            sessionId: session.id,
            userId: userId || null,
            userEmail: userEmail || null,
            amountTotal: sessionAmount ?? null,
            currency: sessionCurrency || null,
            mode: sessionMode || null,
            paymentStatus: paymentStatus || null,
            productKey: productKey || null,
            decidedAt: admin.firestore.FieldValue.serverTimestamp(),
          },
          { merge: true }
        );
        logWebhookDecision("warn", {
          decision: "rejected",
          eventId: event.id,
          sessionId: session.id,
          userId: userId || null,
          reasons: validationErrors,
        });
        return res.json({ received: true });
      }

      await db.collection("users").doc(userId!).set(
        {
          email: userEmail,
          isPaid: true,
          role: "pro",
          stripeCustomerEmail: userEmail,
          stripeCheckoutSessionId: session.id,
          stripeProductKey: ENTITLEMENT_PRODUCT_KEY,
          plan: "full_access",
          subscriptionStatus: "active",
          paidAt: admin.firestore.FieldValue.serverTimestamp(),
          updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        },
        { merge: true }
      );

      await eventRef.set(
        {
          status: "processed",
          sessionId: session.id,
          userId: userId,
          userEmail: userEmail,
          amountTotal: sessionAmount,
          currency: sessionCurrency,
          mode: sessionMode,
          paymentStatus: paymentStatus,
          productKey: productKey || null,
          decidedAt: admin.firestore.FieldValue.serverTimestamp(),
        },
        { merge: true }
      );

      logWebhookDecision("info", {
        decision: "processed",
        eventId: event.id,
        sessionId: session.id,
        userId,
      });
      return res.json({ received: true });
    } catch (err: any) {
      if (eventRef) {
        await eventRef.delete().catch(() => undefined);
      }
      logWebhookDecision("error", {
        decision: "processing_error",
        eventId: event?.id || null,
        reason: err?.message || "unknown",
      });
      return res.status(500).json({ error: "Webhook processing failed." });
    }
  }
  );

  app.use(express.json({ limit: "32kb" }));

  app.post(
    "/api/ai/generate-ideas",
    requireAuth,
    generationUserLimiter,
    generationIpLimiter,
    async (req: AuthenticatedRequest, res: Response) => {
      const existingTitles = validateExistingTitles(req.body?.existingTitles);
      if (!existingTitles) {
        recordAbuseSignal({
          scope: "input_validation",
          key: req.auth?.uid ? `user:${req.auth.uid}` : `ip:${req.ip || "unknown"}`,
          reason: "invalid_existing_titles_payload",
        });
        res.status(400).json({ error: "existingTitles must be a non-empty array of strings." });
        return;
      }

      const prompt = `You are an expert business consultant specializing in "simple" but highly profitable local service businesses.

TASK: Generate 5 unique business ideas that are different from these existing ones: ${existingTitles.join(", ")}.

GUARDRAILS:
- Each business MUST have a startup cost under $5000.
- Focus on simple, high-demand service or maintenance businesses (e.g., cleaning, repair, specialty labor).
- Do NOT suggest digital-only businesses (SaaS, apps, etc.). These must be physical, local services.
- Provide realistic startup cost ranges based on current market rates for equipment and licensing.
- Include 4 specific, actionable customer acquisition strategies for each.
- Ensure the "potentialIncome" is a realistic annual range for a solo operator or small team.

OUTPUT FORMAT: Return a JSON array of objects following the specified schema.`;

      try {
        const response = await getGemini().models.generateContent({
          model: "gemini-3-flash-preview",
          contents: [{ role: "user", parts: [{ text: prompt }] }],
          config: {
            responseMimeType: "application/json",
            responseSchema: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING, description: "A unique UUID or short string ID" },
                  title: { type: Type.STRING, description: "Catchy but professional business name" },
                  category: {
                    type: Type.STRING,
                    description:
                      "One of: Service, Maintenance, Automotive, Landscaping, Specialty, Seasonal, Cleaning",
                  },
                  description: {
                    type: Type.STRING,
                    description: "A 2-3 sentence compelling description of the opportunity",
                  },
                  startupCost: {
                    type: Type.OBJECT,
                    properties: {
                      min: { type: Type.NUMBER },
                      max: { type: Type.NUMBER },
                    },
                    required: ["min", "max"],
                  },
                  potentialIncome: {
                    type: Type.STRING,
                    description: "e.g., '$40,000 - $85,000/year'",
                  },
                  customerAcquisition: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: "4 specific strategies",
                  },
                },
                required: [
                  "id",
                  "title",
                  "category",
                  "description",
                  "startupCost",
                  "potentialIncome",
                  "customerAcquisition",
                ],
              },
            },
          },
        });

        const parsed = parseJsonSafely(stripCodeFence(response.text));
        if (!Array.isArray(parsed)) {
          res.status(502).json({ error: "AI returned an invalid ideas payload." });
          return;
        }

        res.json({ ideas: parsed });
      } catch (error) {
        console.error("[AI] Failed to generate ideas.", error);
        res.status(500).json({ error: "Failed to generate ideas." });
      }
    }
  );

  app.post(
    "/api/ai/generate-brand-names",
    requireAuth,
    generationUserLimiter,
    generationIpLimiter,
    async (req: AuthenticatedRequest, res: Response) => {
      const title = validateIdeaTitle(req.body?.ideaTitle);
      if (!title) {
        recordAbuseSignal({
          scope: "input_validation",
          key: req.auth?.uid ? `user:${req.auth.uid}` : `ip:${req.ip || "unknown"}`,
          reason: "invalid_idea_title_payload",
        });
        res.status(400).json({ error: "ideaTitle must be a string between 3 and 120 characters." });
        return;
      }

      const prompt = `Generate 10 professional, catchy, and high-end business names for a "${title}" business. The names should sound established and trustworthy. Return ONLY a JSON array of strings.`;

      try {
        const response = await getGemini().models.generateContent({
          model: "gemini-3-flash-preview",
          contents: prompt,
          config: { responseMimeType: "application/json" },
        });

        const parsed = parseJsonSafely(stripCodeFence(response.text));
        const names = parseStringArray(parsed);
        if (names.length === 0) {
          res.status(502).json({ error: "AI returned an invalid brand name payload." });
          return;
        }

        res.json({ names });
      } catch (error) {
        console.error("[AI] Failed to generate brand names.", error);
        res.status(500).json({ error: "Failed to generate brand names." });
      }
    }
  );

  // API Routes
  app.post(
    "/api/create-checkout-session",
    requireAuth,
    checkoutUserLimiter,
    checkoutIpLimiter,
    checkoutBodySizeLimiter,
    async (req: AuthenticatedRequest, res: Response) => {
    try {
      const payloadValidation = validateCheckoutPayload(req.body);
      if ("error" in payloadValidation) {
        recordAbuseSignal({
          scope: "input_validation",
          key: req.auth?.uid ? `user:${req.auth.uid}` : `ip:${req.ip || "unknown"}`,
          reason: "invalid_checkout_payload",
          metadata: { error: payloadValidation.error },
        });
        return res.status(400).json({ error: payloadValidation.error });
      }

      const userId = req.auth?.uid;
      const userEmail = req.auth?.email;

      if (!userId || !userEmail) {
        return res.status(401).json({ error: "Authenticated user with email is required." });
      }

      const checkoutOrigin = resolveApprovedCheckoutOrigin(req);
      if (!checkoutOrigin) {
        return res.status(400).json({ error: "Request origin is not approved for checkout." });
      }

      console.log(`[Stripe] Creating checkout session for ${userEmail} (${userId})`);

      const stripeClient = getStripe();

      const session = await stripeClient.checkout.sessions.create({
        mode: "payment",
        payment_method_types: ["card"],
        customer_email: userEmail,
        metadata: {
          userId: String(userId),
          productKey: ENTITLEMENT_PRODUCT_KEY,
        },
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: "Business Ventures - Full Access",
                description: "Unlimited access to all business blueprints, AI naming, and execution plans.",
              },
              unit_amount: 4900,
            },
            quantity: 1,
          },
        ],
        success_url: `${checkoutOrigin}/?payment=success`,
        cancel_url: `${checkoutOrigin}/?payment=cancel`,
      });

      res.json({ id: session.id, url: session.url });
    } catch (error: any) {
      console.error("Stripe Error:", error);
      res.status(500).json({ error: error.message });
    }
    }
  );

  app.post(
    "/api/billing/verify-entitlement",
    requireAuth,
    verifyUserLimiter,
    verifyIpLimiter,
    verifyBodySizeLimiter,
    async (req: AuthenticatedRequest, res: Response) => {
      try {
        const payloadValidation = validateVerifyEntitlementPayload(req.body);
        if ("error" in payloadValidation) {
          recordAbuseSignal({
            scope: "input_validation",
            key: req.auth?.uid ? `user:${req.auth.uid}` : `ip:${req.ip || "unknown"}`,
            reason: "invalid_verify_entitlement_payload",
            metadata: { error: payloadValidation.error },
          });
          return res.status(400).json({ error: payloadValidation.error });
        }

        const userId = req.auth?.uid;
        if (!userId) {
          return res.status(401).json({ error: "Authenticated user is required." });
        }

        if (admin.apps.length === 0) {
          return res.status(503).json({ error: "Authentication service unavailable." });
        }

        const snapshot = await admin.firestore().collection("users").doc(userId).get();
        const data = snapshot.exists ? snapshot.data() : null;
        const isPaid = data?.isPaid === true || data?.role === "pro";

        return res.json({
          status: isPaid ? "paymentVerified" : "paymentPending",
          isPaid,
        });
      } catch (error: any) {
        console.error("[Billing] Failed to verify entitlement.", error);
        return res.status(500).json({ error: "Failed to verify entitlement." });
      }
    }
  );

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
