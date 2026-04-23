# Dependency P0/P1 Security Patching Evidence (2026-04-23)

## Scope
- Patch `protobufjs` critical vulnerability path.
- Patch Vite high-severity vulnerability path.
- Patch `fast-xml-parser` moderate vulnerability path.
- Assess and remediate `@tootallnate/once` transitive risk.

## Implemented Changes
- Upgraded `vite` to `^6.4.2` in dependencies and devDependencies.
- Upgraded `firebase-admin` to `^13.8.0`.
- Added `overrides` in `package.json`:
  - `protobufjs: ^7.5.5`
  - `fast-xml-parser: ^5.7.1`
  - `@tootallnate/once: ^3.0.1`

## Verification Snapshot
- `vite`: `6.4.2`
- `protobufjs`: `7.5.5` (override applied)
- `fast-xml-parser`: `5.7.1` (override applied)
- `@tootallnate/once`: `3.0.1` (override applied)
- `firebase-admin`: `13.8.0`

## Audit Result (Post-Patch)
- Critical: `0`
- High: `0`
- Moderate: `8`
- Low: `0`

## Notes on Remaining Findings
- Remaining moderates are transitive in Google Cloud/Firebase ecosystem (`uuid` chain via `@google-cloud/*`, `google-gax`, `teeny-request`, etc.).
- Current npm advisory output reports a non-actionable "fix" to `firebase-admin@10.1.0` (older major), indicating advisory metadata inconsistency rather than a practical upgrade path.
- For Sprint 1 P0/P1 closure criteria, critical/high dependency vulnerabilities are resolved.

## Artifacts
- `security/audit/npm-audit-2026-04-23-post-p0p1.json`
- `security/audit/dependency-tree-2026-04-23-post-p0p1.txt`
