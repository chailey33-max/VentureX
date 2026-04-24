# Webhook Outage and Replay Response Runbook

## Signals That Indicate a Problem

- Stripe Dashboard shows webhook delivery failures (red status).
- Users report paying but not receiving access.
- Server logs show no `stripe_webhook` component entries after a payment.
- Abuse monitor logs show repeated `signature_verification_failed` events from Stripe IPs.

## Diagnostic Steps

1. **Check Stripe Dashboard → Developers → Webhooks → endpoint**.
   - Look at delivery attempts and HTTP response codes.
   - A `400` response means our endpoint rejected the event (signature, validation, or config issue).
   - A `5xx` response means our server crashed processing the event.
   - No attempts means Stripe cannot reach the endpoint (network/deployment issue).

2. **Check server logs** for `stripe_webhook` component entries:

   ```
   {"component":"stripe_webhook","decision":"signature_invalid",...}
   {"component":"stripe_webhook","decision":"rejected","reasons":[...]}
   {"component":"stripe_webhook","decision":"processing_error",...}
   ```

3. **Check Firestore** `stripeWebhookEvents` collection for the event ID. Status values:
   - `processing` (stuck) → server crashed mid-processing; safe to retry.
   - `rejected` → validation failed; check `reasons` field.
   - `processed` → event was handled; user should have `isPaid: true`.

## Webhook Signature Failure

Cause: `STRIPE_WEBHOOK_SECRET` mismatch (key rotated but not updated, or wrong endpoint).

1. Verify `STRIPE_WEBHOOK_SECRET` in Netlify matches the Stripe Dashboard endpoint secret.
2. If mismatched, update env var and redeploy.
3. Use Stripe Dashboard to resend the failed event after the fix.

## Replay a Missed Event

Stripe retries failed webhooks automatically for up to 3 days.

To manually replay:

1. Stripe Dashboard → Developers → Webhooks → endpoint → Event delivery.
2. Find the failed event and click **Resend**.
3. Our idempotency store (`stripeWebhookEvents` collection) uses `create()` which throws if the event ID already exists, so replaying a successfully-processed event is safe — it returns `200` with `duplicate: true`.

## Manual Entitlement Grant (Emergency)

If the webhook cannot be replayed and the user paid but has no access:

1. Verify payment in Stripe Dashboard → Payments (confirm `paid` status and correct amount).
2. Note the Stripe Session ID and user's Firebase UID.
3. In Firebase Console → Firestore → `users` collection → user document:
   - Set `isPaid: true`
   - Set `role: "pro"`
   - Set `plan: "full_access"`
   - Set `subscriptionStatus: "active"`
   - Set `stripeCheckoutSessionId: "<session_id>"`
4. Document the manual grant in the incident log with: date, Stripe session ID, Firebase UID, approver.

## Recovery Verification

- [ ] User can access paid content.
- [ ] Firestore `users` document has `isPaid: true`.
- [ ] `stripeWebhookEvents` document has `status: "processed"` for the event.
- [ ] No further delivery failures in Stripe Dashboard.
