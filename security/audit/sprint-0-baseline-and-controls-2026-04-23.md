# Sprint 0 Baseline and Delivery Controls

Date: 2026-04-23
Scope: VentureX Sprint 0 guardrails and baselines
Owner: Engineering

## 1) Epics and Workstreams

- Security
- Auth/Billing
- Performance
- Quality
- Testing
- Operations

## 2) Tracking Board (Active)

Board statuses:
- Backlog
- In Progress
- Blocked
- Ready for QA
- Done

Workstream board:

| Epic | Current Status | Owner | Sprint 0 Deliverable |
| --- | --- | --- | --- |
| Security | In Progress | Security Owner | Baselines, release freeze policy, rollback policy |
| Auth/Billing | In Progress | Engineering Owner | Checkout reliability baseline and parity smoke checks |
| Performance | Ready for QA | Frontend Owner | Bundle and Lighthouse baselines captured |
| Quality | Backlog | Engineering Owner | Pre-merge parity checklist in place |
| Testing | Backlog | QA Owner | Golden-flow baseline evidence checklist |
| Operations | In Progress | DevOps Owner | Branching model + release freeze + rollback policy |

## 3) Baseline Metrics (Recorded and Shared)

### Lighthouse Baseline
Source: `VentureX_Code_Audit_Report.txt` (local run on 2026-04-20T15:10:40.083Z)
- FCP: 3.5s (target < 1.8s)
- LCP: 6.5s (target < 2.5s)
- TBT: 2380ms (target < 200ms)
- CLS: 0.002 (target < 0.1)
- Accessibility: 77
- SEO: 91

### Bundle Baseline
Source: `npm run build` on 2026-04-23
- JS bundle: `dist/assets/index-DpgtAPuJ.js` = 1196.86 kB minified, 302.71 kB gzip
- CSS bundle: `dist/assets/index-EteppLIC.css` = 60.44 kB minified, 9.76 kB gzip
- Build warning present: chunk exceeds 500 kB

### Dependency Audit Baseline
Source: `npm audit --json` on 2026-04-23
- Total vulnerabilities: 8
- Critical: 0
- High: 0
- Moderate: 8
- Primary affected area: `firebase-admin` transitive path (`uuid`, `google-gax`, `@google-cloud/storage`)

### Checkout Reliability Baseline
Current state baseline:
- No automated checkout reliability SLA metric currently instrumented in CI/monitoring.
- Reliability is measured via functional golden-flow verification until Sprint 7 monitoring controls are implemented.
- Baseline conclusion: reliability telemetry is **not yet instrumented** (tracked as an explicit operations gap).

## 4) Functional Baseline Evidence (Golden Flows)

Evidence index: `security/audit/sprint-0-functional-baseline-evidence-2026-04-23.md`

Golden flows covered:
- Authentication lifecycle
- Idea browse/search/filter/shortlist
- Idea state persistence and restore
- Checkout redirect/success/entitlement reflection
- Admin CRUD/sync behavior
- Error visibility and recovery behavior

## 5) Functional Parity Smoke Checklist

Checklist location:
`security/audit/functional-parity-smoke-checklist.md`

Required execution points:
- Pre-merge (for all PRs touching app/API/rules)
- Pre-release (before production deployment)

## 6) Release Freeze Policy

Policy:
- Non-security production releases are frozen until Sprint 1 exit criteria are complete.
- Allowed exceptions:
  - P0/P1 security fixes
  - Break-fix required to restore service availability
- Exception approvals required from:
  - Security Owner
  - Engineering Owner

## 7) Branch Strategy and Rollback Policy

### Branch Strategy
- `main`: protected production branch
- `release/sprint-N`: sprint stabilization branch for QA and release
- `feature/<epic>-<ticket>`: feature/fix implementation branches
- PRs required for all merges to `release/*` and `main`
- No direct pushes to `main`

### Rollback Policy (Per Sprint)
- Sprint deploys must be reversible through one of:
  - Rollback to previous tagged release
  - Feature flag disable/kill switch for risky surfaces
  - Environment-level disablement for external integrations if needed
- Every risky PR must include:
  - Trigger conditions
  - Rollback owner
  - Validation steps post-rollback

## 8) Ownership Model and Sprint Signoff

| Workstream | Owner | Backup | Signoff Required |
| --- | --- | --- | --- |
| Security | Security Owner | Engineering Manager | Yes |
| Auth/Billing | Backend Owner | Security Owner | Yes |
| Performance | Frontend Owner | Engineering Owner | Yes |
| Quality | Engineering Owner | QA Owner | Yes |
| Testing | QA Owner | Frontend Owner | Yes |
| Operations | DevOps Owner | Engineering Manager | Yes |

Sprint 0 signoff authorities:
- Security Owner
- Engineering Owner
- QA Owner
- Product Owner

## 9) Sprint 0 Exit Criteria Status

- [x] Baseline metrics are recorded and shared.
- [x] Board and ownership model are active.
- [x] Rollback and release policy is documented.
- [ ] Functional baseline and smoke checklist are approved for use (pending recording capture and owner signoff).
