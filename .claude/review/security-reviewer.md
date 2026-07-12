# security-reviewer — verdict for the portfolio + contact form PR

**Verdict: PASS.**
- RLS enabled on `demo_requests`; insert-only policy; no client SELECT/UPDATE/DELETE.
- No secrets in client code or `index.astro`; Supabase client injected via middleware locals.
- All user input validated server-side in `src/services/contact.ts` before hitting Supabase; JS client uses parameterised queries (no SQL injection).
- `index.astro` renders API response via `.textContent` — no XSS vector.
- **Abuse case (PII — name/email/company):** anonymous inserts only; no server-side email action triggered; RLS blocks all client reads; no PII returned in API responses.
