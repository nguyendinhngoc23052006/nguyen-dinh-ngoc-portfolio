Harden production deploy by gating on CI success + blue-green promotion.

## Changes

1. **`.github/workflows/deploy-production.yml`** — Added `wait-for-ci` job that polls `gh api` for lint, tests, typecheck, e2e check-runs (20min timeout); deploy now `needs: wait-for-ci`, blocking until all CI passes.
2. **`.github/workflows/deploy-production.yml`** — Replaced single-step deploy with three-step blue-green: (A) `versions upload` captures version ID + preview URL via wrangler's `command-output`, (B) health probe tests `/health` endpoint (12 × 5s retry), (C) `versions deploy <id>@100%` promotes only on probe success.

## Why this matters
- Prevents shipping with broken CI (cloud-pipeline-guide step 8.3 requirement).
- Isolates new version for testing; if `/health` fails, old version stays live.
- If version upload or health check fails, deploy stops — no silent failures.

## Self-check
- [x] base = main; exactly one PR
- [~] no migrations
- [x] tests/lint/typecheck green; e2e not blocking (PR-only trigger)
- [x] CI scripts named exactly `lint`, `typecheck`, `test` (and `e2e` on PR)
- [x] no hardcoded secrets; vars correctly wired
- [~] no irreversible actions
- [x] no avoidable debt; MEMORY updated
- [~] no migrations to explain
- [x] reviewers run — verdicts to `.claude/review/<agent>.md`
- [x] subagents at sonnet (one below orchestrator)

## For you
**What changed:** `deploy-production.yml` waits for all CI checks before deploying, and uses blue-green: upload version, probe `/health`, then promote only if healthy.

**What you do next:** Review the preview, then merge.

**How to roll it back:** `git revert <sha>` — restores single-step deploy without CI gate or health probe.
