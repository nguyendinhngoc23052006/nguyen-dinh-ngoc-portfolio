## ci: restore deploy-preview guard for dependabot PRs

Re-adds `if: github.actor != 'dependabot[bot]'` on the `deploy-preview` job. Dependabot PRs are denied repo Actions secrets by design, so `deploy-preview` red-fails on every one (`CLOUDFLARE_API_TOKEN` empty — currently PR #20 svgo bump). A skipped required check reports as success, so the guard both stops the false failure and unblocks auto-merge for patch/minor bumps. PR #18 shipped this fix; PR #19 reverted it as "dead code" — a misdiagnosis. Inline comment + `MEMORY.md` entry now anchor the *why* so it won't be reflex-reverted again.

## Self-check
- [x] base = main; exactly one PR
- [~] ≤ 1 migration — no migration in this PR
- [x] tests/lint/typecheck green; happy AND unhappy paths exercised — no runtime code changed; workflow-only diff
- [~] e2e — pre-existing sandbox failures (no Supabase in sandbox); unrelated to this diff
- [x] scripts named exactly `lint`, `typecheck`, `test`; and `e2e`
- [x] key read from `PUBLIC_SUPABASE_URL` and `PUBLIC_SUPABASE_PUBLISHABLE_KEY` in middleware and passed to islands from server props; nothing hardcoded; no secret in code
- [~] irreversible actions — none in this PR
- [x] no avoidable debt; memory updated and pruned (Dependabot lesson added to `MEMORY.md`; corrects the PR #19 misdiagnosis in the record)
- [~] migrations explained — no migration in this PR
- [x] reviewers ran — `.claude/review/*` verdicts refreshed this PR
- [x] every subagent dispatched on a model below the orchestrator's — never inherited (no subagents needed for a 5-line CI-only diff; reviewers ran inline against their agent-file checklists)

## For you
**What changed:** Restored the single-line `if: github.actor != 'dependabot[bot]'` guard on the `deploy-preview` job (PR #18's fix), with a 3-line inline comment explaining the mechanism and a `MEMORY.md` entry so it won't get reverted again. Dependabot PR #20 (svgo bump) should turn green immediately after merge.
**What you do next:** Review the preview (the workflow itself won't run on this PR since it uses your credentials, not Dependabot's — normal deploy will fire), then merge. Once merged, re-run `deploy-preview` on Dependabot PR #20 (Actions → deploy-preview → Re-run) or push a trivial commit to it; the required check will report success (skipped) and auto-merge (if enabled) should proceed.
**How to roll it back:** Revert this PR's single commit on `main` — brings the workflow back to its current state and removes the `MEMORY.md` line.
