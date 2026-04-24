import { handler as generateBrandNamesHandler } from '../../netlify/functions/generate-brand-names.mjs';
import { forwardNetlifyHandler } from '../_shared.js';

export default async function handler(req, res) {
  return forwardNetlifyHandler(req, res, generateBrandNamesHandler);
}
