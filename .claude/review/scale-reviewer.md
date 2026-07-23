# Scale Review — restore deploy-preview guard for dependabot PRs

**Date:** 2026-07-23
**Verdict:** PASS — no scale issues.

Scanned diff (`.github/workflows/deploy-preview.yml`, `MEMORY.md`).

1. Unbounded query — N/A (no Supabase call in diff).
2. Unindexed filter or join — N/A (no query in diff).
3. N+1 pattern — N/A (no loop in diff).
4. Non-idempotent write — N/A (no `.insert()` in diff).

Bonus: skipping the ~30-second build + wrangler deploy on Dependabot PRs is a small CI-time win.
