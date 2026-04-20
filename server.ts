import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import Stripe from "stripe";
import dotenv from "dotenv";
import admin from "firebase-admin";
import fs from "fs";
import cors from "cors";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

  app.use(cors());

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

  // Stripe Webhook Endpoint (MUST be before express.json middleware)
  app.post("/api/stripe-webhook", express.raw({ type: "application/json" }), async (req, res) => {
    const stripeClient = getStripe();
    const sig = req.headers["stripe-signature"];
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!webhookSecret) {
      console.error("[Webhook] STRIPE_WEBHOOK_SECRET is missing.");
      return res.status(400).send("Webhook secret missing.");
    }

    let event;

    try {
      event = stripeClient.webhooks.constructEvent(req.body, sig!, webhookSecret);
    } catch (err: any) {
      console.error(`[Webhook] Signature verification failed: ${err.message}`);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the event
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = session.metadata?.userId;
      const userEmail = session.customer_email || session.customer_details?.email || null;

      console.log(`[Webhook] Payment successful for ${userEmail} (${userId})`);

      if (userId) {
        try {
          const db = admin.firestore();
          // Detailed fields as per audit suggestion
          await db.collection("users").doc(userId).set({
            email: userEmail,
            isPaid: true,
            role: "pro",
            stripeCustomerEmail: userEmail,
            stripeCheckoutSessionId: session.id,
            plan: "full_access",
            subscriptionStatus: "active",
            paidAt: admin.firestore.FieldValue.serverTimestamp(),
            updatedAt: admin.firestore.FieldValue.serverTimestamp()
          }, { merge: true });
          
          console.log(`[Webhook] User ${userId} successfully upgraded to PRO with audit-standard records.`);
        } catch (dbErr) {
          console.error("[Webhook] Firestore update error:", dbErr);
        }
      } else {
        console.error("[Webhook] CRITICAL: Missing userId in Stripe metadata");
      }
    }

    res.json({ received: true });
  });

  app.use(express.json());

  // API Routes
  app.post("/api/create-checkout-session", async (req, res) => {
    try {
      const { userId, userEmail, origin: bodyOrigin } = req.body;
      
      if (!userId || !userEmail) {
        return res.status(400).json({ error: "User ID and Email are required" });
      }

      console.log(`[Stripe] Creating checkout session for ${userEmail} (${userId})`);

      const stripeClient = getStripe();
      const origin = bodyOrigin || req.headers.origin || `http://${req.headers.host}`;
      
      const session = await stripeClient.checkout.sessions.create({
        mode: "payment",
        payment_method_types: ["card"],
        customer_email: userEmail,
        metadata: {
          userId: String(userId),
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
        success_url: `${origin}/?payment=success`,
        cancel_url: `${origin}/?payment=cancel`,
      });

      res.json({ id: session.id, url: session.url });
    } catch (error: any) {
      console.error("Stripe Error:", error);
      res.status(500).json({ error: error.message });
    }
  });

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
