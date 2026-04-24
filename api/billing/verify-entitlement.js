import { handler as verifyEntitlementHandler } from '../../netlify/functions/verify-entitlement.mjs';
import { forwardNetlifyHandler } from '../_shared.js';

export default async function handler(req, res) {
  return forwardNetlifyHandler(req, res, verifyEntitlementHandler);
}
