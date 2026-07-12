# feat: portfolio page + demo request form

Replaces the "Coming soon" placeholder with a complete portfolio site and wires up a Supabase-backed contact/demo-request form.

**Abuse case (PII — name/email/company):** anonymous inserts only via RLS insert policy; no server-side email action; RLS blocks all client reads; no PII returned in API responses. Duplicate submissions (double-click, network retry) are deduplicated server-side via `request_key` upsert.

## Self-check
- [x] base = main; exactly one PR
- [x] ≤ 1 migration, UTC-timestamped latest; new tables have RLS; src/types matches
- [x] tests/lint/typecheck green; happy AND unhappy paths exercised; e2e green
- [x] scripts named exactly `lint`, `typecheck`, `test`, `e2e`
- [x] key read from `PUBLIC_SUPABASE_URL` and `PUBLIC_SUPABASE_PUBLISHABLE_KEY` in middleware and passed to islands from server props; nothing hardcoded; no secret in code
- [x] irreversible actions guarded + idempotent + flagged
- [x] no avoidable debt; memory updated and pruned
- [x] migrations explained in plain English — see below
- [x] reviewers ran — `.claude/review/*` verdicts refreshed this PR
- [x] every subagent dispatched on a model below the orchestrator's — never inherited

**Migration:** adds `demo_requests` table storing contact form submissions. Columns: `id` (uuid pk), `request_key` (uuid unique — idempotency key generated client-side), `name`, `email`, `company` (nullable), `message`, `created_at`. RLS enabled; anonymous INSERT allowed; no client SELECT/UPDATE/DELETE. Index on `created_at DESC` for admin queries.

## For you
**What changed:** full portfolio page with hero/about/skills/projects/contact sections replaces the placeholder; a `demo_requests` Supabase table stores form submissions; server-side validation + idempotent upsert via `request_key`; unit tests cover all validation paths; e2e tests cover form submission and API rejection.
**What you do next:** review the preview, then merge. No manual env/secret action needed — the table is created by the migration on merge. View incoming demo requests in the Supabase dashboard under **Table Editor → demo_requests**.
**How to roll it back:** revert this PR; the `demo_requests` table will remain in Supabase (migrations are append-only) but the code that writes to it will be gone — drop the table manually in the Supabase SQL editor if needed.
