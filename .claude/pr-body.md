Restore `.github/workflows/uptime.yml` (removed in PR #39) and disguise the curl request as a real Chrome navigation so Cloudflare Bot Fight Mode's default-UA fingerprint no longer 403s the probe. PR #39 misread "disguise the bot as an agent" (a browser User-Agent) as "migrate to an external monitoring agent" and deleted the workflow without approval — this reverses that direction and applies the disguise instead.

## Changes
- `.github/workflows/uptime.yml` — recreated. Same cron (`*/30 * * * *`), same `PRODUCTION_URL` guard, same `200`-or-fail semantics, same workflow name `Uptime`. The curl call now sends:
  - `User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36`
  - `Accept`, `Accept-Language`, `Accept-Encoding`, `Upgrade-Insecure-Requests`, `Sec-Fetch-Site: none`, `Sec-Fetch-Mode: navigate`, `Sec-Fetch-User: ?1`, `Sec-Fetch-Dest: document` — headers a top-level browser navigation would send.
  - `--compressed` so the `Accept-Encoding` claim is honest.
  - One retry on HTTP 403 (5s sleep) — a managed BFM challenge occasionally clears on a second hit.
- Added `permissions: contents: read` at the `health` job (parity with `ci.yml` / `deploy-production.yml`; workflow needs no write scope).

## Honest limits
UA disguise beats BFM's cheapest fingerprint (the literal `curl/x.y.z` string). BFM also weighs TLS JA3 and source-IP reputation, and GitHub-hosted Azure runners share reputation with a lot of noisy traffic. If 403s recur after this lands, the compliant no-terminal fallback is a **Cloudflare WAF Custom Rule** on the `nguyendinhngoc.dev` zone — expression `http.request.uri.path eq "/health"`, action `Skip → all security features` — set in the CF dashboard. Not bundled here; the ask was the disguise, not the WAF change.

## Verification
- Workflow syntax: hand-verified against the CI/deploy siblings in `.github/workflows/`.
- No code, migrations, `src/types`, or Supabase touched — nothing for `lint`/`typecheck`/`test`/`e2e` to exercise on this diff. Those suites remain green on `main`.
- The workflow's live behavior is only observable on the schedule (or via `workflow_dispatch`) once merged, because it needs the `PRODUCTION_URL` variable and a real production hit through Cloudflare.

## Self-check
- [x] base = main; exactly one PR
- [~] no migrations
- [~] no code changes — nothing for `lint`/`typecheck`/`test`/`e2e` to newly exercise; existing suites unaffected
- [x] scripts named `lint`, `typecheck`, `test`, `e2e` (unchanged)
- [~] no Supabase env change; middleware unaffected; no secret in code
- [~] no irreversible actions; `workflow_dispatch` lets you dry-run manually after merge before trusting the cron
- [x] no avoidable debt; memory unchanged (no reusable lesson beyond what PR #39 already surfaced)
- [~] no migrations to explain
- [x] reviewers ran — `.claude/review/security-reviewer.md`, `.claude/review/code-reviewer.md`, `.claude/review/scale-reviewer.md` refreshed this PR (all APPROVE)
- [x] every subagent dispatched on a model below the orchestrator's — reviewers ran on Haiku (below the session's Opus tier)

## For you
**What changed:** the `Uptime` GitHub Actions workflow is back and now presents itself as a Chrome browser instead of default `curl`, so Cloudflare Bot Fight Mode's cheap UA fingerprint stops 403-ing the `/health` probe.

**What you do next:** review, then merge. After it lands, open `Actions → Uptime → Run workflow` once to confirm the first real run goes green against production. If it still 403s, tell me and I'll follow up with the CF WAF Skip rule on `/health` (dashboard-only, no code).

**How to roll it back:** revert this PR — the workflow file goes away again and the current post-#39 state (no workflow) returns. No other undo needed.
