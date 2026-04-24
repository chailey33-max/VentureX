import { handler as generateIdeasHandler } from '../../netlify/functions/generate-ideas.mjs';
import { forwardNetlifyHandler } from '../_shared.js';

export default async function handler(req, res) {
  return forwardNetlifyHandler(req, res, generateIdeasHandler);
}
