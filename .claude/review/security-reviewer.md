# Security Review — restore deploy-preview guard for dependabot PRs

**Date:** 2026-07-23
**Verdict:** PASS.

Scanned diff (`.github/workflows/deploy-preview.yml`, `MEMORY.md`).

1. Missing RLS — N/A (no SQL migration in diff).
2. Secret in client code — N/A (no `src/` change; the workflow references `secrets.CLOUDFLARE_*`, which are Actions secrets, not client code).
3. Unvalidated input — N/A (no `src/pages/` change).
4. Missing abuse case — N/A (no auth/payments/PII/upload change). Guard indirectly improves the posture: a Dependabot PR (potentially from a malicious upstream release) will no longer trigger a preview deploy with the Cloudflare token in scope.

No security issues found.
