/**
 * Pure validation and origin-resolution helpers shared between the
 * Express server and unit tests. No Node.js or browser-specific APIs.
 */

export type CheckoutPayload = {
  userId?: string;
  userEmail?: string;
  origin?: string;
};

export function normalizeOrigin(value: string): string | null {
  try {
    return new URL(value).origin;
  } catch {
    return null;
  }
}

export function parseAllowedOrigins(value: string | undefined): string[] {
  if (!value) return [];
  return value
    .split(',')
    .map((o) => o.trim())
    .filter((o) => o.length > 0)
    .map((o) => normalizeOrigin(o))
    .filter((o): o is string => Boolean(o));
}

export function validateCheckoutPayload(
  value: unknown
): { ok: true; payload: CheckoutPayload } | { ok: false; error: string } {
  if (value === null || value === undefined) {
    return { ok: true, payload: {} };
  }

  if (typeof value !== 'object' || Array.isArray(value)) {
    return { ok: false, error: 'Checkout payload must be a JSON object.' };
  }

  const payload = value as Record<string, unknown>;
  const allowedKeys = new Set(['userId', 'userEmail', 'origin']);

  for (const key of Object.keys(payload)) {
    if (!allowedKeys.has(key)) {
      return { ok: false, error: `Unexpected checkout payload field: ${key}.` };
    }
  }

  if (
    payload.userId !== undefined &&
    (typeof payload.userId !== 'string' || payload.userId.length > 256)
  ) {
    return { ok: false, error: 'userId must be a string up to 256 characters.' };
  }

  if (
    payload.userEmail !== undefined &&
    (typeof payload.userEmail !== 'string' || payload.userEmail.length > 320)
  ) {
    return { ok: false, error: 'userEmail must be a string up to 320 characters.' };
  }

  if (
    payload.origin !== undefined &&
    (typeof payload.origin !== 'string' || payload.origin.length > 2048)
  ) {
    return { ok: false, error: 'origin must be a string up to 2048 characters.' };
  }

  return {
    ok: true,
    payload: {
      userId: typeof payload.userId === 'string' ? payload.userId : undefined,
      userEmail: typeof payload.userEmail === 'string' ? payload.userEmail : undefined,
      origin: typeof payload.origin === 'string' ? payload.origin : undefined,
    },
  };
}

export function validateVerifyEntitlementPayload(
  value: unknown
): { ok: true; payload: Record<string, never> } | { ok: false; error: string } {
  if (value === null || value === undefined) {
    return { ok: true, payload: {} };
  }

  if (typeof value !== 'object' || Array.isArray(value)) {
    return { ok: false, error: 'Verify entitlement payload must be a JSON object.' };
  }

  if (Object.keys(value as Record<string, unknown>).length > 0) {
    return { ok: false, error: 'Verify entitlement payload must be empty.' };
  }

  return { ok: true, payload: {} };
}

/**
 * Resolves an approved origin from candidate header values.
 * Returns null if none of the candidates are in the approved set.
 * This is the pure logic behind resolveApprovedCheckoutOrigin in server.ts.
 */
export function resolveOriginFromCandidates(
  candidates: string[],
  approvedSet: Set<string>,
  defaultOrigin: string | null
): string | null {
  for (const candidate of candidates) {
    const normalized = normalizeOrigin(candidate);
    if (normalized && approvedSet.has(normalized)) {
      return normalized;
    }
  }
  if (defaultOrigin && approvedSet.has(defaultOrigin)) {
    return defaultOrigin;
  }
  return null;
}

/**
 * Returns true when a Firestore error indicates the document already exists,
 * which is the idempotency guard for webhook replay protection.
 */
export function isFirestoreAlreadyExistsError(err: unknown): boolean {
  if (!err || typeof err !== 'object') return false;
  const e = err as Record<string, unknown>;
  return e['code'] === 6 || e['code'] === 'already-exists';
}
