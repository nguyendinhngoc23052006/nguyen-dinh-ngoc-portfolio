# Security Review — shadcn/Tailwind redesign

**Date:** 2026-07-12
**Verdict:** PASS — no security issues found.

## Checks

1. **Missing RLS** — `20260712000000_demo_requests.sql` enables RLS and creates an anon-insert-only policy; no SELECT/UPDATE/DELETE policies (default-deny). No new tables in this PR.
2. **Secrets in client code** — `src/lib/supabase.ts` reads only `PUBLIC_SUPABASE_URL` / `PUBLIC_SUPABASE_PUBLISHABLE_KEY` from `process.env`, server-side. `ContactForm.tsx` never touches Supabase — it fetches `/api/contact`.
3. **Unvalidated input** — `src/pages/api/contact.ts` passes request body through `validateDemoRequest` before any DB call. Validation covers UUID, required fields, email regex, length caps.
4. **PII abuse case** — anon insert-only RLS, no client reads, no PII in API responses, `request_key` dedup.
