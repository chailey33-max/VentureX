function toNetlifyEvent(req) {
  const body = typeof req.body === 'string' ? req.body : req.body ? JSON.stringify(req.body) : '';

  return {
    httpMethod: req.method || 'GET',
    headers: req.headers || {},
    body,
  };
}

function sendNetlifyResult(res, result) {
  const statusCode = typeof result?.statusCode === 'number' ? result.statusCode : 500;
  const headers = result?.headers || {};

  for (const [key, value] of Object.entries(headers)) {
    if (value !== undefined && value !== null) {
      res.setHeader(key, String(value));
    }
  }

  if (!res.getHeader('content-type')) {
    res.setHeader('content-type', 'application/json');
  }

  res.statusCode = statusCode;
  res.end(result?.body ?? '');
}

async function forwardNetlifyHandler(req, res, handler) {
  try {
    const result = await handler(toNetlifyEvent(req));
    sendNetlifyResult(res, result);
  } catch (error) {
    console.error('Vercel API route failed:', error);
    res.statusCode = 500;
    res.setHeader('content-type', 'application/json');
    res.end(JSON.stringify({ error: 'Internal server error.' }));
  }
}

export { forwardNetlifyHandler };
