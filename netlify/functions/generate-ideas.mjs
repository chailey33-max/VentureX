import admin from 'firebase-admin';
import { GoogleGenAI, Type } from '@google/genai';

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

const validateExistingTitles = value => {
  if (!Array.isArray(value)) return null;
  const sanitized = value
    .filter(item => typeof item === 'string')
    .map(item => item.trim())
    .filter(item => item.length > 0)
    .slice(0, 200);
  return sanitized.length > 0 ? sanitized : null;
};

const stripCodeFence = text => String(text || '').replace(/```json\s*|\s*```/g, '').trim();

const parseJsonSafely = text => {
  try {
    return JSON.parse(text);
  } catch {
    return null;
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
  if (bodySize > 32 * 1024) {
    return {
      statusCode: 413,
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ error: 'generation payload is too large.' }),
    };
  }

  try {
    await verifyAuthToken(event);

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

    const existingTitles = validateExistingTitles(parsedBody?.existingTitles);
    if (!existingTitles) {
      return {
        statusCode: 400,
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ error: 'existingTitles must be a non-empty array of strings.' }),
      };
    }

    const prompt = `You are an expert business consultant specializing in "simple" but highly profitable local service businesses.

TASK: Generate 5 unique business ideas that are different from these existing ones: ${existingTitles.join(', ')}.

GUARDRAILS:
- Each business MUST have a startup cost under $5000.
- Focus on simple, high-demand service or maintenance businesses (e.g., cleaning, repair, specialty labor).
- Do NOT suggest digital-only businesses (SaaS, apps, etc.). These must be physical, local services.
- Provide realistic startup cost ranges based on current market rates for equipment and licensing.
- Include 4 specific, actionable customer acquisition strategies for each.
- Ensure the "potentialIncome" is a realistic annual range for a solo operator or small team.

OUTPUT FORMAT: Return a JSON array of objects following the specified schema.`;

    const response = await getGemini().models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING, description: 'A unique UUID or short string ID' },
              title: { type: Type.STRING, description: 'Catchy but professional business name' },
              category: {
                type: Type.STRING,
                description:
                  'One of: Service, Maintenance, Automotive, Landscaping, Specialty, Seasonal, Cleaning',
              },
              description: {
                type: Type.STRING,
                description: 'A 2-3 sentence compelling description of the opportunity',
              },
              startupCost: {
                type: Type.OBJECT,
                properties: {
                  min: { type: Type.NUMBER },
                  max: { type: Type.NUMBER },
                },
                required: ['min', 'max'],
              },
              potentialIncome: {
                type: Type.STRING,
                description: "e.g., '$40,000 - $85,000/year'",
              },
              customerAcquisition: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: '4 specific strategies',
              },
            },
            required: [
              'id',
              'title',
              'category',
              'description',
              'startupCost',
              'potentialIncome',
              'customerAcquisition',
            ],
          },
        },
      },
    });

    const parsed = parseJsonSafely(stripCodeFence(response.text));
    if (!Array.isArray(parsed)) {
      return {
        statusCode: 502,
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ error: 'AI returned an invalid ideas payload.' }),
      };
    }

    return {
      statusCode: 200,
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ ideas: parsed }),
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
      body: JSON.stringify({ error: error?.message || 'Failed to generate ideas.' }),
    };
  }
};
