# Functional Parity Smoke Checklist

Purpose: Verify no unintended behavior drift before merge and before release.

## When To Run

- Pre-merge: required on all PRs touching `src/App.tsx`, `server.ts`, `firestore.rules`, checkout flows, auth flows, or payment logic.
- Pre-release: required on release candidate for every sprint.

## Smoke Checks

- [ ] Auth: sign in and sign out work.
- [ ] Auth: session restore works after refresh.
- [ ] Catalog: idea list loads and renders.
- [ ] Search/filter: query and category filters work.
- [ ] Shortlist/favorites: updates persist and restore.
- [ ] Checked steps: updates persist and restore.
- [ ] Billing: checkout session is created only for authenticated user.
- [ ] Billing: success/cancel return routes behave correctly.
- [ ] Entitlement: paid state reflection is unchanged for user-visible behavior.
- [ ] Admin: authorized user can create/edit/delete/sync.
- [ ] Errors: user-visible error messaging and retry paths remain intact.

## Security Non-Regression Checks

- [ ] Unauthenticated checkout call returns `401`.
- [ ] Caller-controlled origin does not alter return URLs.
- [ ] Unauthorized admin mutation attempts are denied.
- [ ] No sensitive key is exposed in frontend runtime.

## Verification Record Template

- Date:
- Build/Commit:
- Environment:
- Tester:
- Result: Pass / Fail
- Notes:
