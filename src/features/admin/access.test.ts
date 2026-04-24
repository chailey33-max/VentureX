import { describe, expect, it } from 'vitest';
import { hasAdminRoleClaim, isLegacyAdminEmail } from './access';

describe('admin access helpers', () => {
  it('matches approved legacy admin emails case-insensitively', () => {
    expect(isLegacyAdminEmail('Chailey33@gmail.com')).toBe(true);
    expect(isLegacyAdminEmail('abdullah.asif2966@gmail.com')).toBe(true);
    expect(isLegacyAdminEmail('someone@else.com')).toBe(false);
  });

  it('authorizes admin role claims', () => {
    expect(hasAdminRoleClaim({ admin: true })).toBe(true);
    expect(hasAdminRoleClaim({ role: 'admin' })).toBe(true);
    expect(hasAdminRoleClaim({ role: 'pro' })).toBe(false);
  });
});
