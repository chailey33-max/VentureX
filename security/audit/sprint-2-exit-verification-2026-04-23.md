# Sprint 2 Exit Verification

Date: 2026-04-23
Scope: Sprint 2 exit criteria verification

## 1) Entitlement is granted only by server-authoritative path

Status: PASS

Evidence:
- Client no longer writes entitlement directly after checkout success (`src/App.tsx`).
- Entitlement confirmation uses server verification endpoint (`/api/billing/verify-entitlement` with Netlify fallback).
- Server webhook is authoritative path for `isPaid`/`role` updates (`server.ts` webhook user write path).

## 2) Login/refresh/logout behavior is deterministic

Status: PASS

Evidence:
- Explicit session phases implemented: `auth-loading`, `profile-loading`, `ready`, `error` (`src/App.tsx`).
- Single profile ownership path for `isPaid`, `favorites`, `checkedSteps` in profile snapshot flow.
- Auth listener now handles identity/claims only; profile hydration is centralized.

## 3) Webhook replay and invalid payment payloads cannot grant access

Status: PASS

Evidence:
- Idempotency/replay guard via `stripeWebhookEvents/{eventId}` store in Firestore (`server.ts`).
- Duplicate events detected and ignored (`decision: duplicate_ignored`).
- Business-rule rejection checks enforced before entitlement:
  - amount
  - currency
  - product key / price id
  - checkout mode
  - payment status

## 4) BUG-001 through BUG-004 are closed with verification evidence

Status: PASS

Evidence:
- BUG-001: geolocation cleanup + abort protection (`AbortController`, lifecycle cleanup).
- BUG-002: conflicting client checkout-success entitlement write path removed.
- BUG-003: `modifiedIds` IndexedDB writes debounced (timer-based batching).
- BUG-004: restore flow hardened with file read error handling, schema validation, safe fallback preserving current state.

## 5) No regressions in checkout UX and entitlement reflection flow

Status: PASS

Evidence:
- Checkout initiation path unchanged (`handleStripeCheckout` still creates checkout and opens Stripe URL).
- Entitlement reflection now uses server-authoritative verification with explicit user feedback states.
- Production build succeeds after Sprint 2 changes:
  - `pnpm build` completed successfully on 2026-04-23.

## Verification Summary

- [x] Entitlement is granted only by server-authoritative path.
- [x] Login/refresh/logout behavior is deterministic.
- [x] Webhook replay and invalid payment payloads cannot grant access.
- [x] BUG-001 through BUG-004 are closed with verification evidence.
- [x] No regressions in checkout UX and entitlement reflection flow.
