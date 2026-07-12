# scale-reviewer — verdict for the portfolio + contact form PR

**Verdict: PASS** (after fix).
- Initial finding: `.insert()` without conflict handling — non-idempotent on network retry.
- Fix applied: `request_key uuid NOT NULL UNIQUE` added to migration; client generates UUID once per page load and holds it across retries; service uses `upsert({ onConflict: "request_key", ignoreDuplicates: true })` — duplicate submits silently no-op.
- `created_at DESC` index present for admin queries on the table.
- No reads from client; no N+1 patterns; no pagination needed (write-only from client).
