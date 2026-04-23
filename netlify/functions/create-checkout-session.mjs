import admin from 'firebase-admin';
import Stripe from 'stripe';

const normalizeOrigin = value => {
  try {
    return new URL(value).origin;
  } catch {
    return null;
  }
};

const parseAllowedOrigins = value => {
  if (!value) return [];
  return value
    .split(',')
    .map(origin => origin.trim())
    .filter(origin => origin.length > 0)
    .map(origin => normalizeOrigin(origin))
    .filter(origin => Boolean(origin));
};

const getHeader = (event, headerName) => {
  const headers = event.headers || {};
  return headers[headerName] || headers[headerName.toLowerCase()] || headers[headerName.toUpperCase()] || null;
};

const defaultFrontendOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:8888',
];

const approvedFrontendOrigins = Array.from(
  new Set([...defaultFrontendOrigins, ...parseAllowedOrigins(process.env.FRONTEND_ORIGINS)])
);
const entitlementProductKey = process.env.ENTITLEMENT_PRODUCT_KEY || 'full_access_lifetime';
const approvedFrontendOriginSet = new Set(approvedFrontendOrigins);
const configuredDefaultOrigin = normalizeOrigin(process.env.FRONTEND_DEFAULT_ORIGIN || '');
const checkoutDefaultOrigin =
  configuredDefaultOrigin && approvedFrontendOriginSet.has(configuredDefaultOrigin)
    ? configuredDefaultOrigin
    : approvedFrontendOrigins[0] || null;

const resolveApprovedCheckoutOrigin = event => {
  const candidates = [getHeader(event, 'origin'), getHeader(event, 'referer')].filter(Boolean);

  for (const candidate of candidates) {
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

const initializeFirebaseAdmin = () => {
  if (admin.apps.length > 0) return;

  const projectId = process.env.FIREBASE_PROJECT_ID || process.env.VITE_FIREBASE_PROJECT_ID;

  if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    admin.initializeApp({
      credential: admin.credential.applicationDefault(),
      projectId: projectId || undefined,
    });
    return;
  }

  if (projectId) {
    admin.initializeApp({ projectId });
    return;
  }

  throw new Error('Firebase Admin is not configured.');
};

const verifyAuthToken = async event => {
  const authHeader = getHeader(event, 'authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new Error('UNAUTHORIZED');
  }

  const token = authHeader.slice('Bearer '.length).trim();
  if (!token) {
    throw new Error('UNAUTHORIZED');
  }

  initializeFirebaseAdmin();
  return admin.auth().verifyIdToken(token);
};

const validateCheckoutPayload = payload => {
  if (payload === null || payload === undefined) {
    return { ok: true };
  }

  if (typeof payload !== 'object' || Array.isArray(payload)) {
    return { ok: false, error: 'Checkout payload must be a JSON object.' };
  }

  const allowedKeys = new Set(['userId', 'userEmail', 'origin']);
  for (const key of Object.keys(payload)) {
    if (!allowedKeys.has(key)) {
      return { ok: false, error: `Unexpected checkout payload field: ${key}.` };
    }
  }

  if (payload.userId !== undefined && (typeof payload.userId !== 'string' || payload.userId.length > 256)) {
    return { ok: false, error: 'userId must be a string up to 256 characters.' };
  }

  if (
    payload.userEmail !== undefined &&
    (typeof payload.userEmail !== 'string' || payload.userEmail.length > 320)
  ) {
    return { ok: false, error: 'userEmail must be a string up to 320 characters.' };
  }

  if (payload.origin !== undefined && (typeof payload.origin !== 'string' || payload.origin.length > 2048)) {
    return { ok: false, error: 'origin must be a string up to 2048 characters.' };
  }

  return { ok: true };
};

const rateLimitBuckets = new Map();

const isAllowedByRateLimit = ({ key, windowMs, maxRequests }) => {
  const now = Date.now();
  const existing = rateLimitBuckets.get(key);

  if (!existing || existing.resetAt <= now) {
    rateLimitBuckets.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, retryAfterSeconds: 0 };
  }

  if (existing.count >= maxRequests) {
    const retryAfterSeconds = Math.max(1, Math.ceil((existing.resetAt - now) / 1000));
    return { allowed: false, retryAfterSeconds };
  }

  existing.count += 1;

  if (rateLimitBuckets.size > 10000) {
    for (const [bucketKey, bucket] of rateLimitBuckets) {
      if (bucket.resetAt <= now) {
        rateLimitBuckets.delete(bucketKey);
      }
    }
  }

  return { allowed: true, retryAfterSeconds: 0 };
};

export const handler = async event => {
  const bodySize = Buffer.byteLength(event.body || '', 'utf8');
  if (bodySize > 2 * 1024) {
    return {
      statusCode: 413,
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ error: 'checkout payload is too large.' }),
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const secret = process.env.STRIPE_SECRET_KEY;
    if (!secret) {
      return {
        statusCode: 500,
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ error: 'STRIPE_SECRET_KEY is missing.' }),
      };
    }

    let parsedBody = {};
    try {
      parsedBody = JSON.parse(event.body || '{}');
    } catch {
      return {
        statusCode: 400,
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ error: 'Invalid JSON payload.' }),
      };
    }

    const payloadValidation = validateCheckoutPayload(parsedBody);
    if (!payloadValidation.ok) {
      return {
        statusCode: 400,
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ error: payloadValidation.error }),
      };
    }

    let decodedToken;
    try {
      decodedToken = await verifyAuthToken(event);
    } catch (error) {
      if (error.message === 'UNAUTHORIZED') {
        return {
          statusCode: 401,
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ error: 'Missing or invalid authorization token.' }),
        };
      }

      return {
        statusCode: 503,
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ error: 'Authentication service unavailable.' }),
      };
    }

    const userId = decodedToken.uid;
    const userEmail = decodedToken.email;
    if (!userId || !userEmail) {
      return {
        statusCode: 401,
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ error: 'Authenticated user with email is required.' }),
      };
    }

    const userRateLimit = isAllowedByRateLimit({
      key: `checkout:user:${userId}`,
      windowMs: 60_000,
      maxRequests: 6,
    });
    if (!userRateLimit.allowed) {
      return {
        statusCode: 429,
        headers: {
          'content-type': 'application/json',
          'retry-after': String(userRateLimit.retryAfterSeconds),
        },
        body: JSON.stringify({ error: 'Too many checkout requests. Please try again shortly.' }),
      };
    }

    const forwardedFor = getHeader(event, 'x-forwarded-for');
    const clientIp = typeof forwardedFor === 'string' ? forwardedFor.split(',')[0].trim() : 'unknown';
    const ipRateLimit = isAllowedByRateLimit({
      key: `checkout:ip:${clientIp || 'unknown'}`,
      windowMs: 60_000,
      maxRequests: 12,
    });
    if (!ipRateLimit.allowed) {
      return {
        statusCode: 429,
        headers: {
          'content-type': 'application/json',
          'retry-after': String(ipRateLimit.retryAfterSeconds),
        },
        body: JSON.stringify({ error: 'Too many checkout requests. Please try again shortly.' }),
      };
    }

    const origin = resolveApprovedCheckoutOrigin(event);
    if (!origin) {
      return {
        statusCode: 400,
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ error: 'Request origin is not approved for checkout.' }),
      };
    }

    const stripe = new Stripe(secret);
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      customer_email: userEmail,
      metadata: {
        userId: String(userId),
        productKey: entitlementProductKey,
      },
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Business Ventures - Full Access',
              description: 'Unlimited access to all business blueprints, AI naming, and execution plans.',
            },
            unit_amount: 4900,
          },
          quantity: 1,
        },
      ],
      success_url: `${origin}/?payment=success`,
      cancel_url: `${origin}/?payment=cancel`,
    });

    return {
      statusCode: 200,
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ id: session.id, url: session.url }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ error: error?.message || 'Failed to create checkout session' }),
    };
  }
};
