# Functional Parity Smoke Checklist

Purpose: Verify no unintended behavior drift before merge and before release.

## When To Run

- Pre-merge: required on all PRs touching `src/App.tsx`, `server.ts`, `firestore.rules`, checkout flows, auth flows, or payment logic.
- Pre-release: required on release candidate for every sprint.

## Smoke Checks

- [x] Auth: sign in and sign out work.
- [x] Auth: session restore works after refresh.
- [x] Catalog: idea list loads and renders.
- [x] Search/filter: query and category filters work.
- [x] Shortlist/favorites: updates persist and restore.
- [x] Checked steps: updates persist and restore.
- [x] Billing: checkout session is created only for authenticated user.
- [x] Billing: success/cancel return routes behave correctly.
- [x] Entitlement: paid state reflection is unchanged for user-visible behavior.
- [x] Admin: authorized user can create/edit/delete/sync.
- [x] Errors: user-visible error messaging and retry paths remain intact.

## Security Non-Regression Checks

- [x] Unauthenticated checkout call returns `401`.
- [x] Caller-controlled origin does not alter return URLs.
- [x] Unauthorized admin mutation attempts are denied.
- [x] No sensitive key is exposed in frontend runtime.

## Verification Record Template

- Date: 2026-04-23
- Build/Commit: Local Sprint 5 branch + CI checks green
- Environment: Local + Netlify preview + GitHub Actions
- Tester: Engineering
- Result: Pass
- Notes: Verified no intended behavior drift after Sprint 5 refactor and tooling changes.
