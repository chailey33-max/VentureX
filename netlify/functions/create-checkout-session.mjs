import Stripe from 'stripe';

const getOrigin = event => {
  const protocol = event.headers['x-forwarded-proto'] || 'https';
  const host = event.headers.host;
  if (host) return `${protocol}://${host}`;
  return 'https://example.com';
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
    const secret = process.env.STRIPE_SECRET_KEY;
    if (!secret) {
      return {
        statusCode: 500,
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ error: 'STRIPE_SECRET_KEY is missing.' }),
      };
    }

    const { userId, userEmail, origin: bodyOrigin } = JSON.parse(event.body || '{}');
    if (!userId || !userEmail) {
      return {
        statusCode: 400,
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ error: 'User ID and Email are required' }),
      };
    }

    const origin = bodyOrigin || getOrigin(event);
    const stripe = new Stripe(secret);
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      customer_email: userEmail,
      metadata: {
        userId: String(userId),
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
