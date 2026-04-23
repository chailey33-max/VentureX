# Sprint 0 Functional Baseline Evidence

Date: 2026-04-23
Purpose: Preserve functional parity for golden flows while remediation proceeds.

## Evidence Requirements

For each flow:
- Record a screen capture (start to finish).
- Capture expected result.
- Capture observed result.
- Mark pass/fail and owner validation.

## Golden Flow Baseline Log

| Flow | Recording Artifact | Expected Result | Observed Baseline | Status | Owner |
| --- | --- | --- | --- | --- | --- |
| Authentication (signup/signin/signout/session restore) | `evidence/sprint0/auth-flow.mp4` | User can authenticate and restore session reliably | Baseline expectation documented | Pending recording | QA Owner |
| Idea browsing/search/filter/shortlist | `evidence/sprint0/idea-browse-flow.mp4` | Ideas load/filter/search and shortlist persists | Baseline expectation documented | Pending recording | Frontend Owner |
| Idea actions and persistence restore | `evidence/sprint0/idea-actions-persistence.mp4` | Favorites/checked steps persist and restore correctly | Baseline expectation documented | Pending recording | Frontend Owner |
| Billing checkout and entitlement reflection | `evidence/sprint0/checkout-entitlement-flow.mp4` | Redirect, success callback, and entitlement reflection remain functionally equivalent | Baseline expectation documented; entitlement latency risk tracked in audit | Pending recording | Backend Owner |
| Admin create/edit/delete/sync | `evidence/sprint0/admin-crud-sync.mp4` | Authorized admin can complete CRUD and sync operations | Baseline expectation documented | Pending recording | Security Owner |
| Error handling and recovery | `evidence/sprint0/error-handling-recovery.mp4` | User-visible errors are informative and recoverable | Baseline expectation documented | Pending recording | QA Owner |

## Approval

- [ ] QA Owner approved baseline evidence set.
- [ ] Engineering Owner approved baseline expectations.
- [ ] Product Owner approved parity definition for Sprint 1+ remediations.
