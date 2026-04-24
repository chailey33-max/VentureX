const LEGACY_ADMIN_EMAILS = new Set(['chailey33@gmail.com', 'abdullah.asif2966@gmail.com']);

export const isLegacyAdminEmail = (email: string | null | undefined): boolean => {
  return LEGACY_ADMIN_EMAILS.has((email ?? '').toLowerCase());
};

export const hasAdminRoleClaim = (claims: Record<string, unknown>): boolean => {
  return claims.admin === true || claims.role === 'admin';
};
