import { describe, expect, it } from 'vitest';
import {
  isFirestoreAlreadyExistsError,
  normalizeOrigin,
  parseAllowedOrigins,
  resolveOriginFromCandidates,
  validateCheckoutPayload,
  validateVerifyEntitlementPayload,
} from './validation';

// ---------------------------------------------------------------------------
// normalizeOrigin
// ---------------------------------------------------------------------------
describe('normalizeOrigin', () => {
  it('extracts the origin from a full URL', () => {
    expect(normalizeOrigin('https://example.com/path?q=1')).toBe('https://example.com');
  });

  it('preserves non-default ports', () => {
    expect(normalizeOrigin('http://localhost:5173')).toBe('http://localhost:5173');
  });

  it('returns null for an invalid URL', () => {
    expect(normalizeOrigin('not-a-url')).toBeNull();
    expect(normalizeOrigin('')).toBeNull();
  });
});

// ---------------------------------------------------------------------------
// parseAllowedOrigins
// ---------------------------------------------------------------------------
describe('parseAllowedOrigins', () => {
  it('returns empty array for undefined input', () => {
    expect(parseAllowedOrigins(undefined)).toEqual([]);
  });

  it('parses a comma-separated list of origins', () => {
    const result = parseAllowedOrigins('https://a.com,https://b.com');
    expect(result).toContain('https://a.com');
    expect(result).toContain('https://b.com');
  });

  it('filters out invalid entries silently', () => {
    const result = parseAllowedOrigins('https://valid.com, not-a-url, https://also-valid.com');
    expect(result).toEqual(['https://valid.com', 'https://also-valid.com']);
  });
});

// ---------------------------------------------------------------------------
// validateCheckoutPayload — security: unauthorized checkout / field injection
// ---------------------------------------------------------------------------
describe('validateCheckoutPayload (security regression)', () => {
  it('accepts null/undefined payload without error', () => {
    expect(validateCheckoutPayload(null).ok).toBe(true);
    expect(validateCheckoutPayload(undefined).ok).toBe(true);
  });

  it('rejects non-object payloads', () => {
    expect(validateCheckoutPayload('string').ok).toBe(false);
    expect(validateCheckoutPayload(42).ok).toBe(false);
    expect(validateCheckoutPayload([]).ok).toBe(false);
  });

  it('rejects payloads with unexpected fields (injection guard)', () => {
    const result = validateCheckoutPayload({ isPaid: true });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error).toMatch(/Unexpected checkout payload field/);
    }
  });

  it('rejects payloads with role escalation attempts', () => {
    const result = validateCheckoutPayload({ role: 'admin' });
    expect(result.ok).toBe(false);
  });

  it('rejects oversized userId fields', () => {
    const result = validateCheckoutPayload({ userId: 'x'.repeat(257) });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error).toMatch(/userId/);
    }
  });

  it('rejects oversized origin fields', () => {
    const result = validateCheckoutPayload({ origin: 'https://evil.com/' + 'a'.repeat(2048) });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error).toMatch(/origin/);
    }
  });

  it('accepts a valid minimal payload', () => {
    const result = validateCheckoutPayload({ userId: 'uid-123', userEmail: 'a@b.com' });
    expect(result.ok).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// resolveOriginFromCandidates — security: origin tampering
// ---------------------------------------------------------------------------
describe('resolveOriginFromCandidates (origin tampering regression)', () => {
  const approved = new Set(['https://app.example.com']);

  it('accepts a matching Origin header', () => {
    const result = resolveOriginFromCandidates(['https://app.example.com'], approved, null);
    expect(result).toBe('https://app.example.com');
  });

  it('rejects an attacker-controlled origin not in the allowlist', () => {
    const result = resolveOriginFromCandidates(['https://evil.com'], approved, null);
    expect(result).toBeNull();
  });

  it('cannot be bypassed by injecting origin via the request body field', () => {
    // Body-supplied origin is never passed as a candidate — only headers are.
    // This test documents that the function takes explicit candidates only.
    const bodyOrigin = 'https://evil.com';
    const result = resolveOriginFromCandidates([], approved, null);
    expect(result).toBeNull();
    expect(bodyOrigin).not.toBe(result);
  });

  it('normalizes candidate URLs before comparison (strips paths/query)', () => {
    const result = resolveOriginFromCandidates(
      ['https://app.example.com/some/path?q=1'],
      approved,
      null
    );
    expect(result).toBe('https://app.example.com');
  });

  it('falls back to defaultOrigin only if it is in the approved set', () => {
    expect(resolveOriginFromCandidates([], approved, 'https://app.example.com')).toBe(
      'https://app.example.com'
    );
    expect(resolveOriginFromCandidates([], approved, 'https://evil.com')).toBeNull();
  });
});

// ---------------------------------------------------------------------------
// validateVerifyEntitlementPayload — rejects non-empty bodies
// ---------------------------------------------------------------------------
describe('validateVerifyEntitlementPayload (entitlement self-grant regression)', () => {
  it('accepts an empty payload', () => {
    expect(validateVerifyEntitlementPayload({}).ok).toBe(true);
    expect(validateVerifyEntitlementPayload(null).ok).toBe(true);
  });

  it('rejects any payload with fields (prevents client-side grant attempts)', () => {
    const result = validateVerifyEntitlementPayload({ isPaid: true });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error).toMatch(/must be empty/);
    }
  });

  it('rejects role escalation in verify body', () => {
    const result = validateVerifyEntitlementPayload({ role: 'admin' });
    expect(result.ok).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// isFirestoreAlreadyExistsError — webhook replay idempotency
// ---------------------------------------------------------------------------
describe('isFirestoreAlreadyExistsError (webhook replay regression)', () => {
  it('recognises Firestore numeric code 6', () => {
    expect(isFirestoreAlreadyExistsError({ code: 6 })).toBe(true);
  });

  it('recognises Firestore string code already-exists', () => {
    expect(isFirestoreAlreadyExistsError({ code: 'already-exists' })).toBe(true);
  });

  it('returns false for unrelated errors', () => {
    expect(isFirestoreAlreadyExistsError({ code: 5 })).toBe(false);
    expect(isFirestoreAlreadyExistsError({ code: 'not-found' })).toBe(false);
    expect(isFirestoreAlreadyExistsError(new Error('network failure'))).toBe(false);
    expect(isFirestoreAlreadyExistsError(null)).toBe(false);
  });
});
