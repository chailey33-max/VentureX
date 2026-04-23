# Sprint 3 Secrets and Configuration Hygiene Verification

Date: 2026-04-23

## 1) Verify no sensitive secrets are injected into client bundle

Status: PASS

Evidence:
- Removed client env injection from `vite.config.ts` (`process.env.API_KEY` define removed).
- Production bundle rebuilt (`pnpm build`).
- Local secret-value check against built JS bundle confirms no server secret leakage:
  - `STRIPE_SECRET_KEY`: NOT_FOUND_IN_BUNDLE
  - `STRIPE_WEBHOOK_SECRET`: NOT_FOUND_IN_BUNDLE
  - `GEMINI_API_KEY`: not set locally at verification time

## 2) Add secret scanning to CI

Status: PASS

Evidence:
- Added GitHub Actions workflow: `.github/workflows/secret-scan.yml`
- Uses `gitleaks/gitleaks-action@v2` on pull requests and pushes to `main`.

## 3) Ensure production secrets are managed via environment configuration only

Status: PASS

Evidence:
- Runtime secret reads remain server-side only (`server.ts` and Netlify functions read from `process.env`).
- Added explicit repo guidance in `README.md`:
  - Never expose server secrets via `VITE_*`.
  - Keep production secrets in host environment variables only.

