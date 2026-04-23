import admin from 'firebase-admin';
import { getFirestore } from 'firebase-admin/firestore';

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

const getDb = () => {
  const app = admin.apps[0];
  const databaseId = process.env.VITE_FIRESTORE_DATABASE_ID;
  return databaseId ? getFirestore(app, databaseId) : getFirestore(app);
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

export const handler = async event => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
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
    if (!userId) {
      return {
        statusCode: 401,
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ error: 'Authenticated user is required.' }),
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
