Add `maxLength` to all contact form inputs so the browser enforces the same limits the backend already applies (name/email/company: 200, message: 2000).

## Self-check
- [x] base = main; exactly one PR
- [~] ≤ 1 migration — no migration
- [x] tests/lint/typecheck green
- [x] scripts named exactly `lint`, `typecheck`, `test`; and `e2e` if installed
- [x] key read from `PUBLIC_SUPABASE_URL` and `PUBLIC_SUPABASE_PUBLISHABLE_KEY` in middleware; nothing hardcoded; no secret in code
- [~] irreversible actions — none
- [x] no avoidable debt; memory updated and pruned
- [~] migrations — none
- [x] reviewers ran — `.claude/review/*` verdicts refreshed this PR
- [x] every subagent dispatched on a model below the orchestrator's — never inherited

## For you
**What changed:** Added `maxLength` attributes to every contact form field so the browser stops input at the same limits the server enforces (200 chars for name/email/company, 2000 for message).
**What you do next:** Merge when happy. For rate limiting on `/api/contact`, add a Cloudflare WAF rate-limiting rule in the dashboard (Security > WAF > Rate limiting rules > Create rule: URI path equals `/api/contact`, method POST, 5 requests per minute per IP, action Block).
**How to roll it back:** Revert this PR.
