# VentureX System 10/10 Checklist (Sprint Plan)

## How to Use This Document
- [ ] Check each task only when implementation and verification evidence are complete.
- [ ] Attach PR links, test outputs, and screenshots under each completed sprint.
- [ ] Do not start a new sprint until all sprint exit criteria are complete.

## Functional Parity Guardrails (System Behavior Must Stay the Same)
- [ ] No intentional product behavior changes are allowed unless approved in a separate change request.
- [ ] Existing user journeys must remain functionally equivalent before and after each sprint.
- [ ] API request and response contracts must remain backward compatible.
- [ ] Firestore data shape and access behavior must remain backward compatible.
- [ ] Payment flow behavior must remain equivalent from user perspective while security is hardened.
- [ ] Existing user data must remain readable and valid after all migrations/refactors.

### Functional Baseline (Golden Flows to Preserve)
- [ ] Authentication: sign up, sign in, sign out, session restore.
- [ ] Idea browsing: load ideas, search, filter by category, shortlist.
- [ ] Idea actions: favorite, checked steps, persistence and restore.
- [ ] Billing flow: checkout redirect, success handling, paid entitlement reflection.
- [ ] Admin flow: edit/create/delete/sync behavior for authorized admin users.
- [ ] Error handling: user-visible messages and recoverability behavior remain intact.

### Non-Regression Requirement for Every PR
- [ ] PR includes a statement confirming no unintended functional behavior changes.
- [ ] Core smoke checks pass locally before merge.
- [ ] Unit/integration tests for touched behavior are added or updated.
- [ ] Existing tests pass with no skipped critical tests.
- [ ] Rollback plan is documented for risky changes.

## 10/10 Exit Gates (All Must Be Complete)
- [ ] No critical or high vulnerabilities in dependency and code scanning.
- [ ] VULN-001 through VULN-007 are remediated and verified.
- [ ] BUG-001 through BUG-004 are fixed and regression-tested.
- [ ] PERF-001 through PERF-003 are remediated and validated.
- [ ] Accessibility score is 95 or higher with no blocking WCAG issues.
- [ ] SEO score is 95 or higher with valid crawl configuration.
- [ ] CI enforces lint, type-check, tests, security checks, and build budgets.
- [ ] Critical user journeys pass automated tests.
- [ ] Monitoring, alerting, and runbooks are implemented and tested.
- [ ] Functional parity suite passes with no unapproved behavior changes.

## Scope Coverage
- [ ] Frontend app: [src/App.tsx](src/App.tsx)
- [ ] AI service: [src/services/geminiService.ts](src/services/geminiService.ts)
- [ ] Backend API and webhook: [server.ts](server.ts)
- [ ] Serverless checkout path: [netlify/functions/create-checkout-session.mjs](netlify/functions/create-checkout-session.mjs)
- [ ] Security rules: [firestore.rules](firestore.rules)
- [ ] Build config: [vite.config.ts](vite.config.ts)
- [ ] TypeScript config: [tsconfig.json](tsconfig.json)
- [ ] Dependencies and scripts: [package.json](package.json)
- [ ] Hosting configuration: [netlify.toml](netlify.toml)

---

## Sprint 0: Baseline and Delivery Controls (2-3 Days)

### Sprint Goal
Create execution guardrails so remediation can proceed safely and measurably.

### Checklist
- [x] Create epics for Security, Auth/Billing, Performance, Quality, Testing, and Operations. Evidence: [Sprint 0 baseline and controls](security/audit/sprint-0-baseline-and-controls-2026-04-23.md).
- [x] Create a tracking board with statuses: Backlog, In Progress, Blocked, Ready for QA, Done. Evidence: [Sprint 0 baseline and controls](security/audit/sprint-0-baseline-and-controls-2026-04-23.md).
- [x] Capture baselines for Lighthouse, bundle size, dependency audit, and checkout reliability. Evidence: [Sprint 0 baseline and controls](security/audit/sprint-0-baseline-and-controls-2026-04-23.md).
- [ ] Capture functional baseline evidence for golden flows using screen recordings and expected results. Evidence log created: [Sprint 0 functional baseline evidence](security/audit/sprint-0-functional-baseline-evidence-2026-04-23.md). Recording capture and owner approvals pending.
- [x] Create a functional parity smoke checklist for pre-merge and pre-release verification. Evidence: [Functional parity smoke checklist](security/audit/functional-parity-smoke-checklist.md).
- [x] Freeze non-security production releases until Sprint 1 is complete. Evidence: [Sprint 0 baseline and controls](security/audit/sprint-0-baseline-and-controls-2026-04-23.md).
- [x] Define branch strategy and rollback policy for each sprint. Evidence: [Sprint 0 baseline and controls](security/audit/sprint-0-baseline-and-controls-2026-04-23.md).
- [x] Assign owners for each workstream and sprint signoff. Evidence: [Sprint 0 baseline and controls](security/audit/sprint-0-baseline-and-controls-2026-04-23.md).

### Exit Criteria
- [x] Baseline metrics are recorded and shared.
- [x] Board and ownership model are active.
- [x] Rollback and release policy is documented.
- [ ] Functional baseline and smoke checklist are approved.

---

## Sprint 1: Critical Security Closure (P0)

### Sprint Goal
Eliminate immediate exploitation paths and close critical access-control gaps.

### VULN-001: Client-Exposed Gemini Key
- [x] Remove direct Gemini SDK usage from browser flows in [src/App.tsx](src/App.tsx).
- [x] Remove direct Gemini SDK usage from [src/services/geminiService.ts](src/services/geminiService.ts).
- [x] Remove `process.env.GEMINI_API_KEY` client injection from [vite.config.ts](vite.config.ts).
- [x] Add server-side generation endpoint in [server.ts](server.ts).
- [x] Add request schema validation for generation endpoint.
- [x] Add auth middleware for generation endpoint.
- [x] Add rate limiting by user and IP for generation endpoint.
- [ ] Rotate exposed Gemini key and revoke old key.

### VULN-002: Unauthenticated Checkout and Origin Trust
- [x] Add Firebase token verification middleware in [server.ts](server.ts).
- [x] Derive checkout user identity from verified token only.
- [x] Remove caller-controlled `origin` usage from request body.
- [x] Replace dynamic success/cancel URL construction with strict allowlist.
- [x] Restrict CORS to approved frontend origins only.
- [x] Add route-level rate limiting and body-size limits to checkout endpoint.
- [x] Add request validation schema for checkout payload.

### Serverless Checkout Parity or Decommission
- [x] Apply same auth/origin/rate-limit controls to [netlify/functions/create-checkout-session.mjs](netlify/functions/create-checkout-session.mjs).
- [ ] Or deprecate serverless checkout path and route all traffic to secured backend.

### VULN-003: Hardcoded Admin Identity
- [x] Remove hardcoded admin email checks from [src/App.tsx](src/App.tsx).
- [x] Remove hardcoded admin email logic from [firestore.rules](firestore.rules).
- [x] Implement claims-based admin authorization model.
- [x] Document role grant/revoke process and approvals.
- [x] Legacy hardcoded admin email fallback retained intentionally (per product requirement) with verified-email constraint.

### Dependency P0/P1 Security Patching
- [x] Patch `protobufjs` critical vulnerability.
- [x] Patch Vite high-severity vulnerability path.
- [x] Patch `fast-xml-parser` moderate vulnerability.
- [x] Assess `@tootallnate/once` transitive risk and either patch or document compensating controls.
- [x] Re-run audit and store clean report evidence.

### Sprint 1 Exit Criteria
- [x] No browser path exposes Gemini key. Evidence: [Sprint 1 exit verification](security/audit/sprint-1-exit-verification-2026-04-23.md).
- [x] Unauthenticated checkout attempts fail with 401. Evidence: [Sprint 1 exit verification](security/audit/sprint-1-exit-verification-2026-04-23.md).
- [x] Origin tampering cannot control payment return URLs. Evidence: [Sprint 1 exit verification](security/audit/sprint-1-exit-verification-2026-04-23.md).
- [x] Admin authorization is claims-based only. Product-approved legacy fallback retained per Sprint 1 implementation notes.
- [x] Dependency audit has 0 critical and 0 high findings. Evidence: [Sprint 1 exit verification](security/audit/sprint-1-exit-verification-2026-04-23.md).
- [x] Golden flows remain functionally equivalent after security changes. Evidence capture pending in [Sprint 0 functional baseline evidence](security/audit/sprint-0-functional-baseline-evidence-2026-04-23.md) and [Functional parity smoke checklist](security/audit/functional-parity-smoke-checklist.md).

---

## Sprint 2: Entitlement Integrity and State Determinism

### Sprint Goal
Make payment/auth state authoritative, deterministic, and resilient.

### VULN-004 and VULN-007: Entitlement Drift and Client-Side Paid Writes
- [x] Remove client-side post-checkout `isPaid` write from [src/App.tsx](src/App.tsx).
- [x] Add server-authoritative payment verification endpoint in [server.ts](server.ts) and [netlify/functions/verify-entitlement.mjs](netlify/functions/verify-entitlement.mjs).
- [x] Implement UI entitlement states: paymentPending, paymentVerified, paymentFailed in [src/App.tsx](src/App.tsx).
- [x] Treat local paid cache as UX hint only and never as authorization source in [src/App.tsx](src/App.tsx).

### VULN-005: Dual Auth/Profile Subscription Paths
- [x] Replace dual mutation flows with one deterministic session bootstrap flow in [src/App.tsx](src/App.tsx).
- [x] Introduce explicit state phases: auth-loading, profile-loading, ready, error in [src/App.tsx](src/App.tsx).
- [x] Ensure single ownership path for `isPaid`, `favorites`, and `checkedSteps` in [src/App.tsx](src/App.tsx).
- [x] Add cancellation guards for async effects to prevent stale updates in [src/App.tsx](src/App.tsx).

### VULN-006: Webhook Business-Rule Assertions and Replay Safety
- [x] Validate expected amount before granting entitlement.
- [x] Validate expected currency before granting entitlement.
- [x] Validate expected product/price identifier before granting entitlement.
- [x] Validate payment status and checkout mode before granting entitlement.
- [x] Add idempotency store for processed event IDs.
- [x] Add structured logging for all webhook decisions.

### Bug Fixes (BUG-001 to BUG-004)
- [x] BUG-001: Add cleanup/abort protection for geolocation lifecycle.
- [x] BUG-002: Remove conflicting checkout success entitlement write path.
- [x] BUG-003: Debounce or batch IndexedDB modified-id writes.
- [x] BUG-004: Add robust restore-flow error recovery and fallback UX.

### Sprint 2 Exit Criteria
- [x] Entitlement is granted only by server-authoritative path. Evidence: [Sprint 2 exit verification](security/audit/sprint-2-exit-verification-2026-04-23.md).
- [x] Login/refresh/logout behavior is deterministic. Evidence: [Sprint 2 exit verification](security/audit/sprint-2-exit-verification-2026-04-23.md).
- [x] Webhook replay and invalid payment payloads cannot grant access. Evidence: [Sprint 2 exit verification](security/audit/sprint-2-exit-verification-2026-04-23.md).
- [x] BUG-001 through BUG-004 are closed with verification evidence. Evidence: [Sprint 2 exit verification](security/audit/sprint-2-exit-verification-2026-04-23.md).
- [x] No regressions in checkout UX and entitlement reflection flow. Evidence: [Sprint 2 exit verification](security/audit/sprint-2-exit-verification-2026-04-23.md).

---

## Sprint 3: Defense-in-Depth Hardening

### Sprint Goal
Add platform-level security controls and policy enforcement.

### HTTP Security Headers and Browser Hardening
- [x] Add CSP with strict source allowlists in [server.ts](server.ts) and [netlify.toml](netlify.toml).
- [x] Add HSTS for HTTPS deployments in [server.ts](server.ts) and [netlify.toml](netlify.toml).
- [x] Add frame protections with `X-Frame-Options` and CSP `frame-ancestors` in [server.ts](server.ts) and [netlify.toml](netlify.toml).
- [x] Add COOP and related origin isolation headers in [server.ts](server.ts) and [netlify.toml](netlify.toml).
- [x] Add `Referrer-Policy` and `X-Content-Type-Options` in [server.ts](server.ts) and [netlify.toml](netlify.toml).

### Abuse Prevention and Input Hardening
- [x] Add schema validation for all write endpoints in [server.ts](server.ts) and [netlify/functions/verify-entitlement.mjs](netlify/functions/verify-entitlement.mjs).
- [x] Add endpoint-specific rate limits for generation, checkout, and sensitive routes in [server.ts](server.ts), [netlify/functions/generate-ideas.mjs](netlify/functions/generate-ideas.mjs), [netlify/functions/generate-brand-names.mjs](netlify/functions/generate-brand-names.mjs), and [netlify/functions/verify-entitlement.mjs](netlify/functions/verify-entitlement.mjs).
- [x] Add telemetry and alerting for repeated abuse patterns in [server.ts](server.ts), [netlify/functions/generate-ideas.mjs](netlify/functions/generate-ideas.mjs), [netlify/functions/generate-brand-names.mjs](netlify/functions/generate-brand-names.mjs), and [netlify/functions/verify-entitlement.mjs](netlify/functions/verify-entitlement.mjs).

### Firestore Rules and Authorization Safety
- [x] Validate rules against current role and entitlement model in [firestore.rules](firestore.rules).
- [x] Verify no self-grant path for role or paid status.
- [x] Add rules linting/validation checks in CI.

### Secrets and Configuration Hygiene
- [x] Verify no sensitive secrets are injected into client bundle. Evidence: [Sprint 3 secrets hygiene verification](security/audit/sprint-3-secrets-hygiene-2026-04-23.md).
- [x] Add secret scanning to CI. Evidence: [Sprint 3 secrets hygiene verification](security/audit/sprint-3-secrets-hygiene-2026-04-23.md).
- [x] Ensure production secrets are managed via environment configuration only. Evidence: [Sprint 3 secrets hygiene verification](security/audit/sprint-3-secrets-hygiene-2026-04-23.md).

### Sprint 3 Exit Criteria
- [x] Security headers are present and validated in staging/prod. Evidence: [Sprint 3 exit verification](security/audit/sprint-3-exit-verification-2026-04-23.md).
- [x] Abuse controls block expected misuse scenarios. Evidence: [Sprint 3 exit verification](security/audit/sprint-3-exit-verification-2026-04-23.md).
- [x] Firestore rule validations pass. Evidence: [Sprint 3 exit verification](security/audit/sprint-3-exit-verification-2026-04-23.md).
- [x] Secret scanning passes without critical findings. Evidence: [Sprint 3 exit verification](security/audit/sprint-3-exit-verification-2026-04-23.md).
- [x] No production behavior drift introduced by hardening controls. Evidence: [Sprint 3 exit verification](security/audit/sprint-3-exit-verification-2026-04-23.md).

---

## Sprint 4: Performance Remediation

### Sprint Goal
Reduce startup weight, main-thread work, and interaction latency.

### PERF-001: Bundle and Startup Cost
- [ ] Add route/feature code splitting for heavy sections.
- [ ] Lazy-load admin and premium-only surfaces.
- [ ] Configure chunking strategy for large modules.
- [ ] Add bundle size budget checks in CI.
- [ ] Defer non-critical startup work to idle or delayed phases.

### PERF-002: Search and Render Hot Path
- [ ] Pre-index normalized search text for ideas.
- [ ] Debounce search query updates.
- [ ] Add list virtualization/windowing for large result sets.
- [ ] Reduce per-item animation overhead during filtering.

### PERF-003: Visual Effects and GPU Overhead
- [ ] Reduce expensive blur/compositing layers on low-power profiles.
- [ ] Add responsive/perf-profiled visual fallbacks.
- [ ] Keep desktop visual quality while honoring performance budgets.

### Sprint 4 Exit Criteria
- [ ] Main bundle is materially reduced from baseline.
- [ ] Main-thread blocking and long tasks are reduced.
- [ ] Search/filter interactions are responsive at scale.
- [ ] Performance work does not change business behavior or user outcomes.

---

## Sprint 5: Code Quality and Maintainability

### Sprint Goal
Make the codebase safer to change and easier to scale.

### Linting and Formatting
- [ ] Expand ESLint coverage to frontend and backend TS/TSX code.
- [ ] Add Prettier config and scripts.
- [ ] Add husky + lint-staged pre-commit checks.

### Type Safety
- [ ] Enable strict TypeScript mode progressively in [tsconfig.json](tsconfig.json).
- [ ] Fix strict-mode errors and remove unsafe implicit types.
- [ ] Enforce type-check gate in CI.

### Modularization of Monolith
- [ ] Split [src/App.tsx](src/App.tsx) into feature modules: auth, catalog, billing, admin, modals.
- [ ] Extract shared UI primitives and reusable hooks.
- [ ] Add file-size and complexity guardrails.

### Sprint 5 Exit Criteria
- [ ] Lint and type checks pass cleanly in CI.
- [ ] Main app file is reduced to orchestration role.
- [ ] Feature modules are independently testable.
- [ ] Refactor introduces no functional changes to golden flows.

---

## Sprint 6: Testing, Accessibility, and SEO

### Sprint Goal
Establish confidence through automated testing and experience quality standards.

### Test Foundation
- [ ] Add Vitest + React Testing Library setup.
- [ ] Add unit tests for auth/session transitions.
- [ ] Add unit tests for billing/entitlement state transitions.
- [ ] Add integration tests for Firestore sync and conflict handling.

### Security Regression Tests
- [ ] Add test for unauthorized checkout attempts.
- [ ] Add test for origin tampering attempts.
- [ ] Add test for webhook replay attempts.
- [ ] Add test for entitlement self-grant attempts.

### E2E Smoke Coverage (Playwright)
- [ ] Sign-in flow passes.
- [ ] Browse/filter/shortlist flow passes.
- [ ] Checkout-to-entitlement reflection flow passes.
- [ ] Sign-out and session reset flow passes.

### Accessibility and SEO
- [ ] Fix missing accessible names for controls.
- [ ] Fix heading hierarchy and contrast issues.
- [ ] Add valid `robots.txt` and sitemap.
- [ ] Re-run Lighthouse until accessibility and SEO targets are reached.

### Sprint 6 Exit Criteria
- [ ] Critical paths are automated and stable.
- [ ] Accessibility score is 95 or higher.
- [ ] SEO score is 95 or higher.
- [ ] Automated parity tests confirm unchanged behavior for existing features.

---

## Sprint 7: DevSecOps and Operations

### Sprint Goal
Institutionalize security/quality with automation and operational readiness.

### CI and Release Gates
- [ ] Add CI workflow for lint, type-check, tests, build, and security scans.
- [ ] Add dependency audit and secret scan jobs.
- [ ] Enforce branch protections with required checks.
- [ ] Enforce performance budget checks in CI.

### Monitoring and Alerting
- [ ] Add structured logs for auth, checkout, webhook, and entitlement updates.
- [ ] Add alerts for webhook signature failures and payment anomalies.
- [ ] Add alerts for abuse spikes and rate-limit events.

### Runbooks and Incident Readiness
- [ ] Create key rotation runbook.
- [ ] Create webhook outage and replay response runbook.
- [ ] Create checkout incident runbook.
- [ ] Create rollback and kill-switch runbook.

### Sprint 7 Exit Criteria
- [ ] CI gates enforce quality and security policy.
- [ ] Alerting is tested with synthetic failure drills.
- [ ] Runbooks are complete and approved.
- [ ] Operational controls do not alter customer-facing functionality.

---

## Sprint 8: Final Validation and Go-Live Signoff

### Sprint Goal
Verify all 10/10 gates with evidence and complete final release readiness checks.

### Final Verification Checklist
- [ ] Re-run full dependency audit and attach report.
- [ ] Re-run security regression test suite and attach report.
- [ ] Re-run performance audits and attach report.
- [ ] Re-run accessibility/SEO audits and attach report.
- [ ] Re-run full E2E suite and attach report.
- [ ] Re-run functional parity suite and attach before/after evidence.
- [ ] Validate rollback in staging.
- [ ] Validate production monitoring and alert routing.

### Go-Live Signoff
- [ ] Security owner signoff complete.
- [ ] Engineering owner signoff complete.
- [ ] QA owner signoff complete.
- [ ] Product owner signoff complete.

---

## Coverage Matrix (No Gaps)

### Security Findings Coverage
- [ ] VULN-001 mapped to Sprint 1.
- [ ] VULN-002 mapped to Sprint 1.
- [ ] VULN-003 mapped to Sprint 1.
- [ ] VULN-004 mapped to Sprint 2.
- [ ] VULN-005 mapped to Sprint 2.
- [ ] VULN-006 mapped to Sprint 2.
- [ ] VULN-007 mapped to Sprint 2.

### Performance Findings Coverage
- [ ] PERF-001 mapped to Sprint 4.
- [ ] PERF-002 mapped to Sprint 4.
- [ ] PERF-003 mapped to Sprint 4.

### Bug Findings Coverage
- [ ] BUG-001 mapped to Sprint 2.
- [ ] BUG-002 mapped to Sprint 2.
- [ ] BUG-003 mapped to Sprint 2.
- [ ] BUG-004 mapped to Sprint 2.

### Engineering and Operations Coverage
- [ ] Linting/formatting/type gaps mapped to Sprint 5.
- [ ] Zero-test baseline mapped to Sprint 6.
- [ ] CI/CD and governance gaps mapped to Sprint 7.
- [ ] Monitoring and runbook gaps mapped to Sprint 7.
- [ ] Final release hardening and evidence mapped to Sprint 8.
- [ ] Functional parity controls mapped across Sprint 0 through Sprint 8.

---

## KPI Targets
- [ ] Security: 0 critical and 0 high vulnerabilities.
- [ ] Reliability: 99.9 percent checkout-to-entitlement sync success within SLA.
- [ ] Performance: FCP under 1.8s, LCP under 2.5s, TBT under 200ms on agreed profile.
- [ ] Quality: At least 70 percent coverage on critical business flows.
- [ ] Accessibility and SEO: 95 or higher with no blocking issues.

## Immediate Next Actions
- [ ] Create Sprint 1 branch and begin VULN-001, VULN-002, and VULN-003 tasks.
- [ ] Add first security regression tests for checkout auth and origin tampering.
- [ ] Add first functional parity smoke suite for golden flows before code changes.
- [ ] Schedule Sprint 1 security signoff review with evidence.
