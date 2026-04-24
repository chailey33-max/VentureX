import { handler as checkoutHandler } from '../netlify/functions/create-checkout-session.mjs';
import { forwardNetlifyHandler } from './_shared.js';

export default async function handler(req, res) {
  return forwardNetlifyHandler(req, res, checkoutHandler);
}
