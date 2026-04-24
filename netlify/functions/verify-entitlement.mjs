import admin from 'firebase-admin';
import { getFirestore } from 'firebase-admin/firestore';

const getHeader = (event, headerName) => {
  const headers = event.headers || {};
  return (
    headers[headerName] ||
    headers[headerName.toLowerCase()] ||
    headers[headerName.toUpperCase()] ||
    null
  );
};

const initializeFirebaseAdmin = () => {
  if (admin.apps.length > 0) return;

  const projectId = process.env.FIREBASE_PROJECT_ID || process.env.VITE_FIREBASE_PROJECT_ID;

  const serviceAccountJson =
    process.env.FIREBASE_SERVICE_ACCOUNT_JSON || process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON;

  if (serviceAccountJson) {
    const serviceAccount = JSON.parse(serviceAccountJson);
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      projectId: projectId || serviceAccount.project_id || undefined,
    });
    return;
  }

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

const getDb = () => {
  const app = admin.apps[0];
  const databaseId = process.env.VITE_FIRESTORE_DATABASE_ID;
  return databaseId ? getFirestore(app, databaseId) : getFirestore(app);
};

const verifyAuthToken = async (event) => {
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

const validateVerifyEntitlementPayload = (payload) => {
  if (payload === null || payload === undefined) return { ok: true };
  if (typeof payload !== 'object' || Array.isArray(payload)) {
    return { ok: false, error: 'Verify entitlement payload must be a JSON object.' };
  }
  if (Object.keys(payload).length > 0) {
    return { ok: false, error: 'Verify entitlement payload must be empty.' };
  }
  return { ok: true };
};

const rateLimitBuckets = new Map();
const abuseBuckets = new Map();

const getClientIp = (event) => {
  const forwarded = getHeader(event, 'x-forwarded-for');
  return typeof forwarded === 'string' ? forwarded.split(',')[0].trim() || 'unknown' : 'unknown';
};

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
  return { allowed: true, retryAfterSeconds: 0 };
};

const recordAbuseSignal = ({ scope, key, reason, metadata = {} }) => {
  const now = Date.now();
  const bucketKey = `${scope}:${key}:${reason}`;
  const existing = abuseBuckets.get(bucketKey);
  const next = existing
    ? { count: existing.count + 1, firstSeen: existing.firstSeen, lastSeen: now }
    : { count: 1, firstSeen: now, lastSeen: now };
  abuseBuckets.set(bucketKey, next);
  const shouldAlert = next.count === 5 || next.count === 10 || next.count % 25 === 0;
  const payload = {
    ts: new Date().toISOString(),
    component: 'netlify_verify_entitlement',
    level: shouldAlert ? 'alert' : 'info',
    scope,
    key,
    reason,
    count: next.count,
    windowMs: now - next.firstSeen,
    metadata,
  };
  if (shouldAlert) {
    console.warn(JSON.stringify(payload));
  } else {
    console.log(JSON.stringify(payload));
  }
};

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    let parsedBody = {};
    try {
      parsedBody = JSON.parse(event.body || '{}');
    } catch {
      recordAbuseSignal({
        scope: 'input_validation',
        key: `ip:${getClientIp(event)}`,
        reason: 'invalid_json_payload',
      });
      return {
        statusCode: 400,
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ error: 'Invalid JSON payload.' }),
      };
    }

    const payloadValidation = validateVerifyEntitlementPayload(parsedBody);
    if (!payloadValidation.ok) {
      recordAbuseSignal({
        scope: 'input_validation',
        key: `ip:${getClientIp(event)}`,
        reason: 'invalid_verify_entitlement_payload',
      });
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
        recordAbuseSignal({
          scope: 'auth',
          key: `ip:${getClientIp(event)}`,
          reason: 'missing_or_invalid_auth',
        });
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
    const clientIp = getClientIp(event);
    if (!userId) {
      return {
        statusCode: 401,
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ error: 'Authenticated user is required.' }),
      };
    }

    const userRateLimit = isAllowedByRateLimit({
      key: `verify:user:${userId}`,
      windowMs: 60_000,
      maxRequests: 24,
    });
    if (!userRateLimit.allowed) {
      recordAbuseSignal({
        scope: 'rate_limit',
        key: `user:${userId}`,
        reason: 'verify_entitlement_user_limit_exceeded',
      });
      return {
        statusCode: 429,
        headers: {
          'content-type': 'application/json',
          'retry-after': String(userRateLimit.retryAfterSeconds),
        },
        body: JSON.stringify({ error: 'Too many verify requests. Please try again shortly.' }),
      };
    }

    const ipRateLimit = isAllowedByRateLimit({
      key: `verify:ip:${clientIp}`,
      windowMs: 60_000,
      maxRequests: 48,
    });
    if (!ipRateLimit.allowed) {
      recordAbuseSignal({
        scope: 'rate_limit',
        key: `ip:${clientIp}`,
        reason: 'verify_entitlement_ip_limit_exceeded',
      });
      return {
        statusCode: 429,
        headers: {
          'content-type': 'application/json',
          'retry-after': String(ipRateLimit.retryAfterSeconds),
        },
        body: JSON.stringify({ error: 'Too many verify requests. Please try again shortly.' }),
      };
    }

    const db = getDb();
    const snapshot = await db.collection('users').doc(userId).get();
    const data = snapshot.exists ? snapshot.data() : null;
    const isPaid = data?.isPaid === true || data?.role === 'pro';

    return {
      statusCode: 200,
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        status: isPaid ? 'paymentVerified' : 'paymentPending',
        isPaid,
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ error: error?.message || 'Failed to verify entitlement.' }),
    };
  }
};
