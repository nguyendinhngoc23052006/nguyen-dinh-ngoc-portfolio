Pricing rewrite + downloadable CV page. Updated pricing tiers (Starter from $300, Growth from $1,500) and added a print-optimized CV page at `/cv` that renders from portfolio data (skills, projects, services, education) with dynamic experience section that hides when empty.

## For you
**What changed:** (1) Pricing: Starter $2k→$300, Growth $8k→$1.5k, FAQ answer updated. (2) CV page: new static route at `/cv` with print CSS, "Download PDF" uses `window.print()`. (3) Data: added `contactInfo`, `education`, `experience` exports to `portfolio.ts`; experience array is intentionally empty. (4) UI: added CV link to nav and About sidebar. (5) Tests: e2e test validates CV page loads and button exists.

**What you do next:** Review the preview, then merge. No manual actions needed.

**How to roll it back:** `git revert` this commit. Pricing reverts to $2k/$8k, CV page removed, data exports removed, nav link removed.

## Self-check
- [x] base = main; exactly one PR
- [x] ≤ 1 migration, UTC-timestamped latest; new tables have RLS; src/types matches
- [x] tests/lint/typecheck green; happy AND unhappy paths exercised; e2e green
- [x] scripts named exactly `lint`, `typecheck`, `test`; and `e2e` if installed
- [x] key read from `PUBLIC_SUPABASE_URL` and `PUBLIC_SUPABASE_PUBLISHABLE_KEY` in middleware and passed to islands from server props; nothing hardcoded; no secret in code
- [x] irreversible actions guarded + idempotent + flagged
- [x] no avoidable debt; memory updated and pruned
- [x] migrations explained in plain English
- [x] reviewers ran — `.claude/review/*` verdicts refreshed this PR
- [x] every subagent dispatched on a model below the orchestrator's — never inherited
