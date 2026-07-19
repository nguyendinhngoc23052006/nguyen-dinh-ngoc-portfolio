## Skip deploy-preview for Dependabot PRs

Dependabot PRs run with a read-only `GITHUB_TOKEN` and no access to repo secrets (GitHub security default), so `deploy-preview.yml` fails at the wrangler step — which blocks the Dependabot auto-merge workflow's patch/minor merges.

### Fix
- Added `if: github.actor != 'dependabot[bot]'` at the job level in `deploy-preview.yml`.
- Skipped required checks report as success for the branch ruleset, so Dependabot PRs now pass the gate cleanly.
- Version bumps don't produce any visible preview change worth reviewing — unit/typecheck/e2e gates already validate the bump.

## Self-check
- [x] base = main; exactly one PR
- [~] ≤ 1 migration — no migration
- [x] tests/lint/typecheck green (workflow-only change; no product code)
- [x] scripts named `lint`, `typecheck`, `test`, `e2e`
- [x] key read from `PUBLIC_SUPABASE_URL` and `PUBLIC_SUPABASE_PUBLISHABLE_KEY` in middleware; nothing hardcoded; no secret in code
- [~] irreversible actions — none
- [x] no avoidable debt; memory updated
- [~] migrations explained — no migration
- [x] reviewers ran — verdicts refreshed
- [x] every subagent dispatched on a model below the orchestrator's — no subagents needed for this workflow-only 1-line change

## For you
**What changed:** Deploy-preview workflow now skips itself for Dependabot PRs; skipped required checks count as success, so Dependabot auto-merge for patch/minor version bumps will now actually go through.
**What you do next:** Review, merge. Next Dependabot PR should auto-merge if it's patch/minor and other checks are green.
**How to roll it back:** Revert this single commit.
