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

- [ ] Create epics for Security, Auth/Billing, Performance, Quality, Testing, and Operations.
- [ ] Create a tracking board with statuses: Backlog, In Progress, Blocked, Ready for QA, Done.
- [ ] Capture baselines for Lighthouse, bundle size, dependency audit, and checkout reliability.
- [ ] Capture functional baseline evidence for golden flows using screen recordings and expected results.
- [ ] Create a functional parity smoke checklist for pre-merge and pre-release verification.
- [ ] Freeze non-security production releases until Sprint 1 is complete.
- [ ] Define branch strategy and rollback policy for each sprint.
- [ ] Assign owners for each workstream and sprint signoff.

### Exit Criteria

- [ ] Baseline metrics are recorded and shared.
- [ ] Board and ownership model are active.
- [ ] Rollback and release policy is documented.
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
- [x] Rotate exposed Gemini key and revoke old key.

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
- [x] Or deprecate serverless checkout path and route all traffic to secured backend.

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

- [x] No browser path exposes Gemini key.
- [x] Unauthenticated checkout attempts fail with 401.
- [x] Origin tampering cannot control payment return URLs.
- [x] Dependency audit has 0 critical and 0 high findings.
- [x] Golden flows remain functionally equivalent after security changes.

---

## Sprint 2: Entitlement Integrity and State Determinism

### Sprint Goal

Make payment/auth state authoritative, deterministic, and resilient.

### VULN-004 and VULN-007: Entitlement Drift and Client-Side Paid Writes

- [x] Remove client-side post-checkout `isPaid` write from [src/App.tsx](src/App.tsx).
- [x] Add server-authoritative payment verification endpoint.
- [x] Implement UI entitlement states: paymentPending, paymentVerified, paymentFailed.
- [x] Treat local paid cache as UX hint only and never as authorization source.

### VULN-005: Dual Auth/Profile Subscription Paths

- [x] Replace dual mutation flows with one deterministic session bootstrap flow.
- [x] Introduce explicit state phases: auth-loading, profile-loading, ready, error.
- [x] Ensure single ownership path for `isPaid`, `favorites`, and `checkedSteps`.
- [x] Add cancellation guards for async effects to prevent stale updates.

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

- [x] Entitlement is granted only by server-authoritative path.
- [x] Login/refresh/logout behavior is deterministic.
- [x] Webhook replay and invalid payment payloads cannot grant access.
- [x] BUG-001 through BUG-004 are closed with verification evidence.
- [x] No regressions in checkout UX and entitlement reflection flow.

---

## Sprint 3: Defense-in-Depth Hardening

### Sprint Goal

Add platform-level security controls and policy enforcement.

### HTTP Security Headers and Browser Hardening

- [x] Add CSP with strict source allowlists.
- [x] Add HSTS for HTTPS deployments.
- [x] Add frame protections with `X-Frame-Options` or CSP `frame-ancestors`.
- [x] Add COOP and related origin isolation headers.
- [x] Add `Referrer-Policy` and `X-Content-Type-Options`.

### Abuse Prevention and Input Hardening

- [x] Add schema validation for all write endpoints.
- [x] Add endpoint-specific rate limits for generation, checkout, and sensitive routes.
- [x] Add telemetry and alerting for repeated abuse patterns.

### Firestore Rules and Authorization Safety

- [x] Validate rules against current role and entitlement model in [firestore.rules](firestore.rules).
- [x] Verify no self-grant path for role or paid status.
- [x] Add rules linting/validation checks in CI.

### Secrets and Configuration Hygiene

- [x] Verify no sensitive secrets are injected into client bundle.
- [x] Add secret scanning to CI.
- [x] Ensure production secrets are managed via environment configuration only.

### Sprint 3 Exit Criteria

- [x] Security headers are present and validated in staging/prod.
- [x] Abuse controls block expected misuse scenarios.
- [x] Firestore rule validations pass.
- [x] Secret scanning passes without critical findings.
- [x] No production behavior drift introduced by hardening controls.

---

## Sprint 4: Performance Remediation

### Sprint Goal

Reduce startup weight, main-thread work, and interaction latency.

### PERF-001: Bundle and Startup Cost

- [x] Add route/feature code splitting for heavy sections.
- [x] Lazy-load admin and premium-only surfaces.
- [x] Configure chunking strategy for large modules.
- [x] Add bundle size budget checks in CI.
- [x] Defer non-critical startup work to idle or delayed phases.

### PERF-002: Search and Render Hot Path

- [x] Pre-index normalized search text for ideas.
- [x] Debounce search query updates.
- [x] Add list virtualization/windowing for large result sets.
- [x] Reduce per-item animation overhead during filtering.

### PERF-003: Visual Effects and GPU Overhead

- [x] Reduce expensive blur/compositing layers on low-power profiles.
- [x] Add responsive/perf-profiled visual fallbacks.
- [x] Keep desktop visual quality while honoring performance budgets.

### Sprint 4 Exit Criteria

- [x] Main bundle is materially reduced from baseline.
- [x] Main-thread blocking and long tasks are reduced.
- [x] Search/filter interactions are responsive at scale.
- [x] Performance work does not change business behavior or user outcomes.

---

## Sprint 5: Code Quality and Maintainability

### Sprint Goal

Make the codebase safer to change and easier to scale.

### Linting and Formatting

- [x] Expand ESLint coverage to frontend and backend TS/TSX code.
- [x] Add Prettier config and scripts.
- [x] Add husky + lint-staged pre-commit checks.

### Type Safety

- [x] Enable strict TypeScript mode progressively in [tsconfig.json](tsconfig.json).
- [x] Fix strict-mode errors and remove unsafe implicit types.
- [x] Enforce type-check gate in CI.

### Modularization of Monolith

- [x] Split [src/App.tsx](src/App.tsx) into feature modules: auth, catalog, billing, admin, modals.
- [x] Extract shared UI primitives and reusable hooks.
- [x] Add file-size and complexity guardrails.

### Sprint 5 Exit Criteria

- [x] Lint and type checks pass cleanly in CI.
- [x] Main app file is reduced to orchestration role.
- [x] Feature modules are independently testable.
- [x] Refactor introduces no functional changes to golden flows.

---

## Sprint 6: Testing, Accessibility, and SEO

### Sprint Goal

Establish confidence through automated testing and experience quality standards.

### Test Foundation

- [x] Add Vitest + React Testing Library setup.
- [x] Add unit tests for auth/session transitions.
- [x] Add unit tests for billing/entitlement state transitions.
- [x] Add integration tests for Firestore sync and conflict handling.

### Security Regression Tests

- [x] Add test for unauthorized checkout attempts.
- [x] Add test for origin tampering attempts.
- [x] Add test for webhook replay attempts.
- [x] Add test for entitlement self-grant attempts.

### E2E Smoke Coverage (Playwright)

- [x] Sign-in flow passes.
- [x] Browse/filter/shortlist flow passes.
- [x] Checkout-to-entitlement reflection flow passes.
- [x] Sign-out and session reset flow passes.

### Accessibility and SEO

- [x] Fix missing accessible names for controls.
- [ ] Fix heading hierarchy and contrast issues.
- [x] Add valid `robots.txt` and sitemap.
- [ ] Re-run Lighthouse until accessibility and SEO targets are reached.

### Sprint 6 Exit Criteria

- [x] Critical paths are automated and stable.
- [ ] Accessibility score is 95 or higher.
- [ ] SEO score is 95 or higher.
- [x] Automated parity tests confirm unchanged behavior for existing features.

---

## Sprint 7: DevSecOps and Operations

### Sprint Goal

Institutionalize security/quality with automation and operational readiness.

### CI and Release Gates

- [x] Add CI workflow for lint, type-check, tests, build, and security scans.
- [x] Add dependency audit and secret scan jobs.
- [x] Enforce branch protections with required checks.
- [x] Enforce performance budget checks in CI.

### Monitoring and Alerting

- [x] Add structured logs for auth, checkout, webhook, and entitlement updates.
- [x] Add alerts for webhook signature failures and payment anomalies.
- [x] Add alerts for abuse spikes and rate-limit events.

### Runbooks and Incident Readiness

- [x] Create key rotation runbook.
- [x] Create webhook outage and replay response runbook.
- [x] Create checkout incident runbook.
- [x] Create rollback and kill-switch runbook.

### Sprint 7 Exit Criteria

- [x] CI gates enforce quality and security policy.
- [x] Alerting is tested with synthetic failure drills.
- [x] Runbooks are complete and approved.
- [x] Operational controls do not alter customer-facing functionality.

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
