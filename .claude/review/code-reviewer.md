# Code Review — restore deploy-preview guard for dependabot PRs

**Date:** 2026-07-23
**Verdict:** PASS.

Scanned diff (`.github/workflows/deploy-preview.yml`, `MEMORY.md`).

1. Duplicated logic — none (single `if:` line on one job).
2. Oversized or mixed-responsibility file — `deploy-preview.yml` is 58 lines; `MEMORY.md` is 16 lines. Both well under threshold.
3. Component doing data access — N/A (no `src/components/` change).
4. Missing UI states — N/A (no UI change).
5. Service file with no test change — N/A (no `src/services/` change).

Note: the 3-line inline comment on `deploy-preview` documents the non-obvious *why* (Dependabot has a separate secret store; a skipped required check reports as success). This is exactly the code-floor rule's carve-out for a hidden constraint, and it inoculates the guard against another PR #19-style "dead code" revert.

No code-quality issues found.
