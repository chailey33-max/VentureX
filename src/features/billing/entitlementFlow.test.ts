import { describe, expect, it } from 'vitest';
import {
  entitlementStateAfterVerify,
  entitlementStateForRedirect,
  entitlementStateOnPaidChange,
  type EntitlementState,
} from './entitlementFlow';

describe('entitlementStateOnPaidChange', () => {
  it('sets paymentVerified when isPaid becomes true', () => {
    const states: EntitlementState[] = [null, 'paymentPending', 'paymentFailed', 'paymentVerified'];
    for (const state of states) {
      expect(entitlementStateOnPaidChange(true, state)).toBe('paymentVerified');
    }
  });

  it('clears paymentVerified to null when isPaid becomes false', () => {
    expect(entitlementStateOnPaidChange(false, 'paymentVerified')).toBeNull();
  });

  it('preserves other states when isPaid is false', () => {
    expect(entitlementStateOnPaidChange(false, 'paymentPending')).toBe('paymentPending');
    expect(entitlementStateOnPaidChange(false, 'paymentFailed')).toBe('paymentFailed');
    expect(entitlementStateOnPaidChange(false, null)).toBeNull();
  });
});

describe('entitlementStateAfterVerify', () => {
  it('returns paymentVerified when endpoint confirms payment', () => {
    expect(entitlementStateAfterVerify(true, true)).toBe('paymentVerified');
  });

  it('returns paymentPending when endpoint says not yet verified', () => {
    expect(entitlementStateAfterVerify(false, false)).toBe('paymentPending');
  });

  it('returns paymentPending when verified flag is true but isPaid is false (partial state)', () => {
    expect(entitlementStateAfterVerify(true, false)).toBe('paymentPending');
  });

  it('returns paymentPending when isPaid is true but verified flag is false', () => {
    expect(entitlementStateAfterVerify(false, true)).toBe('paymentPending');
  });
});

describe('entitlementStateForRedirect', () => {
  it('returns paymentFailed on cancel redirect', () => {
    expect(entitlementStateForRedirect('cancel')).toBe('paymentFailed');
  });

  it('returns paymentPending on success redirect (polling begins)', () => {
    expect(entitlementStateForRedirect('success')).toBe('paymentPending');
  });

  it('returns null for unrecognised or missing param', () => {
    expect(entitlementStateForRedirect(null)).toBeNull();
    expect(entitlementStateForRedirect('')).toBeNull();
    expect(entitlementStateForRedirect('unknown')).toBeNull();
  });
});

describe('full billing flow sequences', () => {
  it('happy path: redirect → polling → verified', () => {
    const afterRedirect = entitlementStateForRedirect('success');
    expect(afterRedirect).toBe('paymentPending');

    const afterVerify = entitlementStateAfterVerify(true, true);
    expect(afterVerify).toBe('paymentVerified');

    const afterPaidChange = entitlementStateOnPaidChange(true, afterVerify);
    expect(afterPaidChange).toBe('paymentVerified');
  });

  it('cancellation path: redirect cancel → paymentFailed', () => {
    const state = entitlementStateForRedirect('cancel');
    expect(state).toBe('paymentFailed');
  });

  it('webhook delay path: verify returns pending, later isPaid becomes true', () => {
    const afterVerify = entitlementStateAfterVerify(false, false);
    expect(afterVerify).toBe('paymentPending');

    const afterWebhook = entitlementStateOnPaidChange(true, afterVerify);
    expect(afterWebhook).toBe('paymentVerified');
  });
});
