# Checkout Incident Runbook

## Incident Types

| Symptom                                     | Likely Cause                                       |
| ------------------------------------------- | -------------------------------------------------- |
| Checkout button shows spinner indefinitely  | `/api/create-checkout-session` not responding      |
| "Request origin is not approved" error      | Request origin not in `FRONTEND_ORIGINS` allowlist |
| "Authenticated user with email is required" | Firebase token missing email claim                 |
| Stripe redirect loop                        | `success_url` / `cancel_url` misconfigured         |
| Payment accepted but no entitlement         | Webhook not delivered (see webhook runbook)        |

## Diagnostic Steps

1. **Check server logs** for `checkout` component entries:

   ```
   {"component":"checkout","event":"session_creating",...}
   {"component":"checkout","event":"session_created",...}
   {"component":"checkout","event":"session_creation_failed","reason":"...",...}
   ```

2. **Check browser console** for network errors on `POST /api/create-checkout-session`.

3. **Check Stripe Dashboard → Payments** to confirm whether the session was created.

4. **Check rate limit logs** — abuse monitor entries with `label: "checkout"` indicate the user hit the rate limit.

## Checkout Endpoint Not Responding

1. Check Netlify function logs (if using serverless path) or server process logs.
2. Verify `STRIPE_SECRET_KEY` is set and valid.
3. Verify `FRONTEND_ORIGINS` includes the production domain.
4. Check for unhandled exceptions in `checkout` log entries.

## Origin Allowlist Issue

The checkout endpoint resolves the approved origin from `Origin` and `Referer` headers against `FRONTEND_ORIGINS`.

1. Confirm `FRONTEND_ORIGINS` env var in Netlify includes the production URL (e.g., `https://venturex.netlify.app`).
2. Format: comma-separated list — `https://venturex.netlify.app,https://custom-domain.com`.
3. Redeploy after updating the env var.

## Stripe Redirect Not Working

1. Confirm `success_url` and `cancel_url` in the Stripe session match the production domain.
2. These are derived from the resolved checkout origin — fix the `FRONTEND_ORIGINS` env var.
3. Check Stripe Dashboard → Checkout Sessions to see the configured URLs.

## Rate Limit Triggered

Default limits: 6 requests/minute per user, 12/minute per IP.

If a legitimate user is rate-limited:

1. Confirm the session was not already created (check Stripe Dashboard).
2. Wait for the rate limit window to reset (1 minute).
3. If abuse is suspected, check `abuse_monitor` log entries with `scope: "checkout"`.

## Post-Incident Verification

- [ ] Test checkout end-to-end in staging.
- [ ] Confirm `checkout.session_created` log appears.
- [ ] Confirm Stripe Dashboard shows the session.
- [ ] Confirm webhook delivers and user receives access.
