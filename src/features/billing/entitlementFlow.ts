export type EntitlementState = 'paymentPending' | 'paymentVerified' | 'paymentFailed' | null;

/**
 * Derives the new entitlement state when the isPaid flag changes.
 * Called from the effect that watches the Firestore-backed isPaid value.
 */
export function entitlementStateOnPaidChange(
  isPaid: boolean,
  current: EntitlementState
): EntitlementState {
  if (isPaid) return 'paymentVerified';
  if (current === 'paymentVerified') return null;
  return current;
}

/**
 * Derives the entitlement state after the verify-entitlement endpoint responds.
 */
export function entitlementStateAfterVerify(verified: boolean, isPaid: boolean): EntitlementState {
  if (verified && isPaid) return 'paymentVerified';
  return 'paymentPending';
}

/**
 * Derives the entitlement state for a Stripe redirect result.
 * 'success'  → begins polling (paymentPending)
 * 'cancel'   → payment abandoned (paymentFailed)
 * anything else → no state change (null means ignore)
 */
export function entitlementStateForRedirect(paymentParam: string | null): EntitlementState | null {
  if (paymentParam === 'cancel') return 'paymentFailed';
  if (paymentParam === 'success') return 'paymentPending';
  return null;
}
