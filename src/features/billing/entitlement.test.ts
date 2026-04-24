import { describe, expect, it } from 'vitest';
import { hasPaidEntitlement } from './entitlement';

describe('hasPaidEntitlement', () => {
  it('returns true for paid users', () => {
    expect(hasPaidEntitlement({ isPaid: true, role: 'user' })).toBe(true);
  });

  it('returns true for pro role users', () => {
    expect(hasPaidEntitlement({ isPaid: false, role: 'pro' })).toBe(true);
  });

  it('returns false for free users', () => {
    expect(hasPaidEntitlement({ isPaid: false, role: 'user' })).toBe(false);
  });
});
