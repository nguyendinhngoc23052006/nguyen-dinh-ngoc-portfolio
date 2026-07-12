# Security Review — maxLength on contact form inputs

**Date:** 2026-07-12
**Verdict:** PASS — no security issues found.

## Checks

1. **Missing RLS** — no new tables; `demo_requests` has RLS enabled with anon-insert-only policy.
2. **Secrets in client code** — no secret/service-role references in `src/`; `ContactForm.tsx` fetches `/api/contact`, never touches Supabase directly.
3. **Unvalidated input** — `contact.ts:8` `validateDemoRequest` unchanged; new `maxLength` attrs are client-only, mirroring existing server truncation.
4. **PII abuse case** — no new PII surface; anon insert-only RLS, no client reads, `request_key` dedup. PR notes rate-limiting as a follow-up dashboard action.
