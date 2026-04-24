export function hasPaidEntitlement(profile: {
  isPaid?: boolean;
  role?: string | null | undefined;
}): boolean {
  return profile.isPaid === true || profile.role === 'pro';
}
