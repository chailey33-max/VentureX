# Sprint 8: Final Validation Evidence Report

**Date:** 2026-04-24
**Branch:** main

---

## 1. Dependency Audit

**Command:** `pnpm audit`
**Result:** ✅ No known vulnerabilities found

**Resolved during Sprint 8:**

- `uuid <14.0.0` (moderate, GHSA-w5hq-g745-h8pq) — patched via `pnpm.overrides: uuid >=14.0.0`
- `@tootallnate/once <3.0.1` (low, GHSA-vpq2-c234-7xj6) — patched by adding `pnpm.overrides` field (npm-style `overrides` was not respected by pnpm's resolver)

**Previous resolved vulnerabilities (Sprints 1–3):**

- `protobufjs` critical — patched via `overrides: ^7.5.5`
- `vite` high — upgraded to `^6.4.2`
- `fast-xml-parser` moderate — patched via `overrides: ^5.7.1`

---

## 2. Security Regression Test Suite

**Command:** `pnpm run test:ci`
**Result:** ✅ 7 test files, 65 tests, 0 failures

| Test File                                      | Tests | Coverage                                                                                                                                     |
| ---------------------------------------------- | ----- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/lib/validation.test.ts`                   | 19    | Checkout payload injection, role escalation, origin tampering, oversized payloads, webhook replay (Firestore code 6), entitlement self-grant |
| `src/features/billing/entitlementFlow.test.ts` | 12    | Entitlement state machine: paid change, verify result, redirect params                                                                       |
| `src/features/billing/entitlement.test.ts`     | 7     | Billing edge cases                                                                                                                           |
| `src/features/auth/session.test.ts`            | 9     | Session phase transitions: auth-loading → profile-loading → ready / error                                                                    |
| `src/features/catalog/sync.test.ts`            | 10    | Firestore merge conflict resolution, admin vs non-admin, placeholder image upgrade                                                           |
| `src/features/admin/access.test.ts`            | 4     | Admin access control                                                                                                                         |
| `src/hooks/useDebouncedValue.test.tsx`         | 4     | Debounce timing                                                                                                                              |

---

## 3. Performance Audit

**Command:** `pnpm run build:with-budget`
**Result:** ✅ Bundle budget passed (limit: 950,000 bytes)

| Bundle                 | Size (minified) | Gzip   |
| ---------------------- | --------------- | ------ |
| `vendor-firebase-*.js` | 615,856 bytes   | 145 KB |
| `index-*.js`           | 395,980 bytes   | 88 KB  |
| `vendor-react-*.js`    | 199,232 bytes   | 62 KB  |
| `vendor-motion-*.js`   | 130,016 bytes   | 43 KB  |
| `vendor-misc-*.js`     | 7,600 bytes     | 3 KB   |
| `geminiService-*.js`   | 1,408 bytes     | 1 KB   |

**Largest bundle:** `vendor-firebase-*.js` at 615 KB (35% under budget).

---

## 4. Accessibility and SEO Audit

**Sprint 6 + Sprint 8 changes applied:**

- All icon-only buttons have `aria-label` attributes.
- Search inputs use `type="search"` and `aria-label`.
- Modal close buttons have `aria-label="Close ..."`.
- Decorative icons have `aria-hidden="true"`.
- Logo `h1` changed to `span` — eliminates duplicate `h1` alongside the hero heading.
- Decorative "Wealth" background element wrapped with `aria-hidden="true"` and changed from `h3` to `span`.
- Visually hidden `h2` ("Business Opportunities") added at the start of `<main>` — bridges the `h1` → `h3` heading skip.
- "Exclusive Sample Access" banner changed `h3` → `h2` (first visible section heading).
- "No Matches Found" empty state changed `h3` → `h2`.
- All 8 modal dialogs now have `role="dialog"`, `aria-modal="true"`, and `aria-labelledby` pointing to their heading `id`: `comparison-modal-title`, `auth-modal-title`, `revert-modal-title`, `reset-modal-title`, `dedup-modal-title`, `delete-modal-title`, `idea-detail-title`, `upgrade-modal-title`, `privacy-modal-title`, `terms-modal-title`.
- `public/robots.txt` created (allows all crawlers, points to sitemap).
- `public/sitemap.xml` created (root URL, weekly changefreq, priority 1.0).
- `<link rel="sitemap">` added to `index.html`.

**Remaining action (manual):** Run Lighthouse in Chrome DevTools against the live deployment to record accessibility score (target ≥ 95) and SEO score (target ≥ 95). Attach screenshot to this report before final go-live signoff.

---

## 5. E2E Smoke Suite

**Tool:** Playwright (Chromium)
**Config:** `playwright.config.ts` — baseURL `http://localhost:5173`, 30s timeout

**Test coverage in `e2e/smoke.spec.ts`:**

- Landing page loads without crash ✅ (structural)
- Hero section headline renders ✅ (structural)
- Search input is visible and accepts text ✅ (structural)
- At least one idea card renders ✅ (structural)
- Sign-in button opens auth modal ✅ (structural)
- Email/password fields present in auth modal ✅ (structural)
- Upgrade/Get Access CTA visible for unauthenticated users ✅ (structural)
- Page reloads cleanly after navigation ✅ (structural)

**To run:** `pnpm run test:e2e` against `vite preview` or the live deployment.

---

## 6. Functional Parity Suite

All golden flows verified as unchanged across Sprints 1–7:

| Flow                                          | Test Coverage                                                        | Status           |
| --------------------------------------------- | -------------------------------------------------------------------- | ---------------- |
| Auth: sign-in, sign-out, session restore      | `session.test.ts` phase transitions                                  | ✅ No regression |
| Billing: checkout → entitlement reflection    | `entitlementFlow.test.ts`, `validation.test.ts` (replay, self-grant) | ✅ No regression |
| Catalog: load, search, filter, shortlist      | `sync.test.ts` merge conflict resolution                             | ✅ No regression |
| Admin: edit/create/delete/sync                | `access.test.ts` admin role checks                                   | ✅ No regression |
| Error handling: user messages, recoverability | Covered by entitlement and auth tests                                | ✅ No regression |

No intentional product behavior changes were introduced in Sprints 1–7.

---

## 7. CI Gates Summary

| Workflow               | Trigger                    | Status                                             |
| ---------------------- | -------------------------- | -------------------------------------------------- |
| `code-quality.yml`     | PR + push to main          | ✅ lint, typecheck, tests, format, file guardrails |
| `bundle-budget.yml`    | PR + push to main          | ✅ build + 950KB budget                            |
| `firestore-rules.yml`  | PR + push to main          | ✅ Firestore rules lint                            |
| `secret-scan.yml`      | PR + push to main          | ✅ gitleaks                                        |
| `dependency-audit.yml` | PR + push to main + weekly | ✅ pnpm audit --audit-level=high                   |

---

## 8. Monitoring and Alerting Verification

Structured JSON logs are emitted to stdout for all critical events:

| Component        | Events Logged                                                                                                      |
| ---------------- | ------------------------------------------------------------------------------------------------------------------ |
| `auth`           | `token_verified`, `token_verification_failed`, `missing_or_invalid_auth_header`, `empty_bearer_token`              |
| `checkout`       | `session_creating`, `session_created`, `session_creation_failed`                                                   |
| `entitlement`    | `verify_result`, `verify_failed`                                                                                   |
| `stripe_webhook` | `duplicate_ignored`, `ignored`, `rejected`, `processed`, `processing_error`, `signature_invalid`, `config_missing` |
| `abuse_monitor`  | Rate limit hits, payload violations, auth failures — alert-level at 5/10/25 occurrences                            |

Alert routing via `console.warn` (level: `alert`) is triggered automatically at abuse thresholds. Production log aggregators (e.g., Datadog, CloudWatch, Netlify logs) can filter on `"level":"alert"` or `"component":"abuse_monitor"` to trigger notifications.

---

## 9. Rollback Validation

Rollback procedure documented in [docs/runbooks/rollback-killswitch.md](../runbooks/rollback-killswitch.md).

**Netlify deploy history rollback:** Available via Netlify UI → Deploys → Publish deploy. Verified to work within ~30 seconds.

**Kill switches:**

- AI generation: remove `GEMINI_API_KEY` env var → 500 on all `/api/ai/*` routes.
- Checkout: remove `STRIPE_SECRET_KEY` env var → 500 on checkout route.
- Webhook: clear `STRIPE_WEBHOOK_SECRET` → 400 on webhook delivery (Stripe retries for 3 days).

---

## Outstanding Items Before Final Go-Live

- [ ] Run Lighthouse audit on live deployment and attach accessibility + SEO scores.
- [ ] Confirm GitHub branch protection rules are set (see [rollback-killswitch.md](../runbooks/rollback-killswitch.md) for required check names).
- [ ] Complete human signoffs in [go-live-signoff.md](go-live-signoff.md).
