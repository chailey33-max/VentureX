# Rollback and Kill-Switch Runbook

## Decision Criteria for Rollback

Initiate a rollback when any of the following occur in production:

- Critical security vulnerability is confirmed exploited.
- Checkout-to-entitlement flow failure rate exceeds 5% over 15 minutes.
- Authentication is broken for more than 5% of users.
- A data integrity issue is discovered (e.g., entitlements incorrectly granted or revoked).

## Netlify Rollback (Frontend + Serverless Functions)

Netlify keeps a full deploy history.

1. Log in to Netlify → Sites → VentureX → **Deploys**.
2. Find the last known-good deploy.
3. Click the deploy → **Publish deploy**.
4. Verify the site is live within ~30 seconds.
5. Confirm golden flows work (auth, checkout, idea browsing).

## Server Rollback (Express Backend)

If running on a VPS or Cloud Run:

1. Identify the last known-good Git commit: `git log --oneline`.
2. Check out that commit on the server or deploy the tagged image.
3. Restart the server process.
4. Verify `/api/billing/verify-entitlement` returns `200`.

## Database Rollback (Firestore)

Firestore does not have built-in point-in-time restore on the Spark plan.

- **Entitlement rollback**: If `isPaid` was incorrectly set for a batch of users, use the Firebase Console or Admin SDK to reset affected documents. Always verify against the Stripe Dashboard before reverting.
- **Structural changes**: If a field was renamed or deleted, restore from a Firestore export if available, or reconstruct from Stripe webhook event logs in the `stripeWebhookEvents` collection.

## Kill Switches

### Disable AI Generation

Set `GEMINI_API_KEY` to an empty string in Netlify environment variables and redeploy.
Effect: All `/api/ai/*` requests return `500`. The frontend gracefully degrades (idea generation button becomes non-functional).

### Disable Checkout

Remove `STRIPE_SECRET_KEY` from Netlify environment variables and redeploy.
Effect: All `/api/create-checkout-session` requests return `500`. Users cannot initiate new payments. Existing entitlements are unaffected.

### Disable Webhook Processing

Set `STRIPE_WEBHOOK_SECRET` to an empty string.
Effect: All webhook deliveries return `400` (config missing). Stripe will retry for up to 3 days. Manually replay after the fix.

### Read-Only Mode (Admin)

Remove admin role claims from the affected Firebase user via Admin SDK:

```js
admin.auth().setCustomUserClaims(uid, { admin: false });
```

Effect: Admin edit/create/delete/sync operations are blocked. Public browsing is unaffected.

## Branch Protection Configuration (GitHub)

To enforce required CI checks on `main`:

1. GitHub → Repository → Settings → Branches → Add branch ruleset for `main`.
2. Enable **Require status checks to pass before merging**.
3. Add required checks:
   - `quality-gates` (from `code-quality.yml`)
   - `bundle-budget` (from `bundle-budget.yml`)
   - `firestore-rules` (from `firestore-rules.yml`)
   - `gitleaks` (from `secret-scan.yml`)
   - `audit` (from `dependency-audit.yml`)
4. Enable **Require branches to be up to date before merging**.
5. Enable **Do not allow bypassing the above settings**.

## Post-Rollback Verification

- [ ] Homepage loads without errors.
- [ ] Sign-in and sign-out complete successfully.
- [ ] Idea browsing and search work.
- [ ] Checkout CTA is visible (if Stripe is enabled).
- [ ] Paid users still see their entitlement.
- [ ] Server logs show no new error-level events.
