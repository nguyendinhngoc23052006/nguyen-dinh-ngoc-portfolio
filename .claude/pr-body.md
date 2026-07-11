## Intent + impact

Solo project on Supabase's free tier (no Supabase Branching) — the `staging` integration branch existed for team-size review batching, which doesn't apply here. Dropped the two-hop `claude/…` → `staging` → `main` flow for a single-hop `claude/…` → `main` flow, per explicit human decision.

Deleted `deploy-staging.yml` (deployed live to a persistent staging Worker — no longer exists) and `gate-main.yml` (`require-staging-source` — meaningless with no staging branch to require). Retargeted `deploy-preview.yml`, `ci.yml`, `e2e.yml` from `staging` to `main` — every PR still gets a live Cloudflare preview deploy (`versions upload --env preview`, renamed from `staging` for clarity now that it no longer maps to a git branch) and the full CI suite, just landing on `main` directly instead of via a second hop. `dependabot.yml` no longer pins `target-branch: staging`, so Dependabot now targets the default branch (`main`). Updated `.claude/hooks/stop.sh`'s dirty-check to diff against `origin/main` instead of `origin/staging`. Updated the root `CLAUDE.md` (7 edits) so its own stated PR-target policy says `main` everywhere it said `staging` — this file is normally read-only/self-edit-forbidden, but the human's explicit choice in this session is direct authorization for this specific, scoped change.

No product code, migration, or query touched — CI/workflow/config only.

## Self-check
- [x] base = main; exactly one PR
- [~] ≤ 1 migration — none in this PR
- [x] tests/lint/typecheck green; e2e unaffected (trigger branch changed only, test content untouched)
- [x] scripts named exactly `lint`, `typecheck`, `test`, `e2e` — unchanged
- [~] key read from PUBLIC_SUPABASE_URL/PUBLIC_SUPABASE_PUBLISHABLE_KEY — untouched by this PR
- [~] irreversible actions guarded — none in this PR
- [x] no avoidable debt; memory updated (MEMORY.md, this session)
- [~] migrations — none in this PR
- [x] reviewers ran — `.claude/review/*` verdicts refreshed this PR
- [x] every subagent dispatched on a model below the orchestrator's (haiku, one tier under sonnet-5)

## For you
**What changed:** dropped the `staging` branch/ruleset layer entirely — `claude/…` branches now PR straight into `main`; deleted the two workflows whose only job was staging-branch mechanics; every other workflow retargeted to `main`; `CLAUDE.md` itself updated to match.
**What you do next:** review the preview, then merge. Delete the now-unused `staging` branch on GitHub if it still exists after this merges (it has no commits `main` doesn't already have — safe). If you'd previously started creating GitHub rulesets, you now only need **one** — on `main` — requiring PR + 1 approval + checks `tests`/`lint`/`typecheck`/`e2e`/`deploy-preview` (no more `require-staging-source`, that check no longer exists).
**How to roll it back:** revert this PR — restores both workflows, the `staging` triggers, the `staging` wrangler env name, the `target-branch: staging` Dependabot lines, and the `CLAUDE.md` wording. You'd also need to recreate the `staging` branch (`git checkout -b staging main` + push) since this PR doesn't delete it itself.
