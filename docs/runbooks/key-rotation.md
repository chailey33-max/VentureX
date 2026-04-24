# Key Rotation Runbook

## Scope

Covers rotation of: Stripe secret key, Stripe webhook secret, Gemini API key, Firebase service account, and Netlify environment variables.

## Rotation Schedule

- Stripe keys: rotate immediately on suspected compromise; otherwise quarterly.
- Gemini API key: rotate immediately on suspected compromise; otherwise quarterly.
- Firebase service account: rotate annually or on team member departure.

## Pre-Rotation Checks

- [ ] Confirm no active checkout sessions in flight (check Stripe dashboard).
- [ ] Confirm monitoring is active and alert routing works.
- [ ] Ensure rollback plan is ready (previous key stored in password manager for 24h grace period).

## Stripe Secret Key (`STRIPE_SECRET_KEY`)

1. Log in to Stripe Dashboard → Developers → API keys.
2. Click **Create restricted key** (or roll the existing secret key).
3. Update the new value in:
   - Netlify: Site settings → Environment variables → `STRIPE_SECRET_KEY`
   - Local `.env` file (never commit this)
4. Redeploy the Netlify function and server.
5. Verify a test checkout session creates successfully.
6. Revoke the old key in Stripe Dashboard after 15 minutes.

## Stripe Webhook Secret (`STRIPE_WEBHOOK_SECRET`)

1. Stripe Dashboard → Developers → Webhooks → select endpoint.
2. Click **Roll secret**.
3. Update `STRIPE_WEBHOOK_SECRET` in Netlify environment variables.
4. Redeploy.
5. Send a test event from Stripe Dashboard and confirm `200 OK` response.
6. Check server logs for `stripe_webhook` component entries with `decision: processed`.

## Gemini API Key (`GEMINI_API_KEY`)

1. Google AI Studio → API keys → Regenerate key.
2. Update `GEMINI_API_KEY` in Netlify environment variables and local `.env`.
3. Redeploy.
4. Test idea generation endpoint: `POST /api/ai/generate-ideas`.
5. Revoke old key in Google AI Studio.

## Firebase Service Account (`GOOGLE_APPLICATION_CREDENTIALS`)

1. Firebase Console → Project Settings → Service accounts → Generate new private key.
2. Store the JSON file securely (password manager / secret store, never in the repo).
3. Update the environment variable path or base64 value in Netlify.
4. Redeploy and verify Firebase Admin initializes: check logs for `[Firebase] Admin initialized`.
5. Delete the old service account key from Firebase Console.

## Post-Rotation Verification

- [ ] Checkout flow completes end-to-end.
- [ ] Webhook test event processes successfully.
- [ ] AI generation returns results.
- [ ] Auth token verification succeeds (check `auth.token_verified` log entries).
- [ ] Entitlement verification returns correct status.

## Emergency Rollback

If rotation breaks production:

1. Restore the previous key value from the password manager.
2. Update Netlify environment variables with old value.
3. Redeploy.
4. File an incident report describing what went wrong.
