import admin from 'firebase-admin';
import { GoogleGenAI } from '@google/genai';

const getHeader = (event, headerName) => {
  const headers = event.headers || {};
  return headers[headerName] || headers[headerName.toLowerCase()] || headers[headerName.toUpperCase()] || null;
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

const validateIdeaTitle = value => {
  if (typeof value !== 'string') return null;
  const sanitized = value.trim();
  return sanitized.length >= 3 && sanitized.length <= 120 ? sanitized : null;
};

const stripCodeFence = text => String(text || '').replace(/```json\s*|\s*```/g, '').trim();

const parseJsonSafely = text => {
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
};

const parseStringArray = value => {
  if (!Array.isArray(value)) return [];
  return value.filter(item => typeof item === 'string' && item.trim().length > 0);
};

const rateLimitBuckets = new Map();
const abuseBuckets = new Map();

const getClientIp = event => {
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
    component: 'netlify_generate_brand_names',
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

let gemini = null;
const getGemini = () => {
  if (!gemini) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) throw new Error('GEMINI_API_KEY is missing.');
    gemini = new GoogleGenAI({ apiKey: key });
  }
  return gemini;
};

export const handler = async event => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  const bodySize = Buffer.byteLength(event.body || '', 'utf8');
  if (bodySize > 8 * 1024) {
    return {
      statusCode: 413,
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ error: 'brand names payload is too large.' }),
    };
  }

  try {
    let decodedToken;
    try {
      decodedToken = await verifyAuthToken(event);
    } catch (error) {
      if (error?.message === 'UNAUTHORIZED') {
        recordAbuseSignal({
          scope: 'auth',
          key: `ip:${getClientIp(event)}`,
          reason: 'missing_or_invalid_auth',
        });
      }
      throw error;
    }

    const userId = decodedToken?.uid || 'unknown';
    const clientIp = getClientIp(event);

    const userRateLimit = isAllowedByRateLimit({
      key: `generation:user:${userId}`,
      windowMs: 60_000,
      maxRequests: 12,
    });
    if (!userRateLimit.allowed) {
      recordAbuseSignal({
        scope: 'rate_limit',
        key: `user:${userId}`,
        reason: 'brand_names_user_limit_exceeded',
      });
      return {
        statusCode: 429,
        headers: {
          'content-type': 'application/json',
          'retry-after': String(userRateLimit.retryAfterSeconds),
        },
        body: JSON.stringify({ error: 'Too many generation requests. Please try again shortly.' }),
      };
    }

    const ipRateLimit = isAllowedByRateLimit({
      key: `generation:ip:${clientIp}`,
      windowMs: 60_000,
      maxRequests: 20,
    });
    if (!ipRateLimit.allowed) {
      recordAbuseSignal({
        scope: 'rate_limit',
        key: `ip:${clientIp}`,
        reason: 'brand_names_ip_limit_exceeded',
      });
      return {
        statusCode: 429,
        headers: {
          'content-type': 'application/json',
          'retry-after': String(ipRateLimit.retryAfterSeconds),
        },
        body: JSON.stringify({ error: 'Too many generation requests. Please try again shortly.' }),
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

    const ideaTitle = validateIdeaTitle(parsedBody?.ideaTitle);
    if (!ideaTitle) {
      recordAbuseSignal({
        scope: 'input_validation',
        key: `user:${userId}`,
        reason: 'invalid_idea_title_payload',
      });
      return {
        statusCode: 400,
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ error: 'ideaTitle must be a string between 3 and 120 characters.' }),
      };
    }

    const prompt = `Generate 10 professional, catchy, and high-end business names for a "${ideaTitle}" business. The names should sound established and trustworthy. Return ONLY a JSON array of strings.`;

    const response = await getGemini().models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: { responseMimeType: 'application/json' },
    });

    const parsed = parseJsonSafely(stripCodeFence(response.text));
    const names = parseStringArray(parsed);
    if (names.length === 0) {
      return {
        statusCode: 502,
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ error: 'AI returned an invalid brand name payload.' }),
      };
    }

    return {
      statusCode: 200,
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ names }),
    };
  } catch (error) {
    if (error?.message === 'UNAUTHORIZED') {
      return {
        statusCode: 401,
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ error: 'Missing or invalid authorization token.' }),
      };
    }

    if (error?.message === 'GEMINI_API_KEY is missing.') {
      return {
        statusCode: 500,
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ error: 'GEMINI_API_KEY is missing.' }),
      };
    }

    return {
      statusCode: 500,
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ error: error?.message || 'Failed to generate brand names.' }),
    };
  }
};
