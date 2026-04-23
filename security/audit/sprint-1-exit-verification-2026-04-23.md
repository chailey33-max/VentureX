# Sprint 1 Exit Criteria Verification

Date: 2026-04-23
Verifier: Codex agent + runtime command checks

## Criteria Results

### 1) No browser path exposes Gemini key
Status: PASS

Evidence:
- Client source has no Gemini SDK usage: no `@google/genai` imports in `src`.
- Production build scan found no Gemini key exposure tokens in `dist`.
- Gemini key is initialized server-side only in `server.ts` via `process.env.GEMINI_API_KEY`.

Commands used:
- `npm run build`
- `rg "GEMINI_API_KEY|GoogleGenAI|@google/genai|process\\.env\\.GEMINI|gemini-3-flash-preview" dist`

### 2) Unauthenticated checkout attempts fail with 401
Status: PASS

Evidence:
- Runtime request to `/api/create-checkout-session` without `Authorization` returned HTTP `401`.
- Response body: `{"error":"Missing or invalid authorization token."}`

Command used:
- `curl -X POST http://localhost:3000/api/create-checkout-session -H "Content-Type: application/json" --data '{"userId":"attacker","userEmail":"attacker@example.com"}'`

### 3) Origin tampering cannot control payment return URLs
Status: PASS

Evidence:
- Checkout success/cancel URLs are derived from `resolveApprovedCheckoutOrigin(req)` and not caller body data.
- Approved origin resolution only accepts normalized allowlisted `Origin`/`Referer` headers (or configured default).
- Checkout payload `origin` field is validated but not used for `success_url`/`cancel_url`.

Code references:
- `server.ts`: `resolveApprovedCheckoutOrigin` and checkout route `success_url` / `cancel_url`
- `netlify/functions/create-checkout-session.mjs`: same allowlisted origin derivation

### 4) Dependency audit has 0 critical and 0 high findings
Status: PASS

Evidence:
- `npm audit --json` report stored at:
  - `security/audit/npm-audit-2026-04-23-sprint1-verification.json`
- Report metadata:
  - Critical: `0`
  - High: `0`
  - Moderate: `8`

### 5) Golden flows remain functionally equivalent after security changes
Status: PENDING

Reason:
- This criterion requires executed functional parity evidence (golden flow runs with expected vs observed outcomes).
- Evidence template exists at:
  - `security/audit/sprint-0-functional-baseline-evidence-2026-04-23.md`
  - `security/audit/functional-parity-smoke-checklist.md`
- Screen recordings and execution signoff have not yet been attached.

## Overall Sprint 1 Exit State

- Passed: 4/5
- Remaining blocker: Golden-flow parity execution evidence and approvals
