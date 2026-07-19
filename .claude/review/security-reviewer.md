# Security Review — Portfolio 2.0 (SEO + pricing + FAQ)

**Date:** 2026-07-19
**Verdict:** PASS.

## Findings
1. **JSON-LD `</script>` escaping (defense-in-depth)** — `src/pages/index.astro:81` — JSON-LD stringified output now runs `.replace(/</g, "\\u003c")` before `set:html`. Every field is currently hardcoded in `src/data/portfolio.ts` (not exploitable today), but this hardens against future dynamic content.
2. **No secrets in code** — grep for `SERVICE_ROLE`, `sb_secret_`, `_SECRET_` across `src/` returns only publishable-key references. `SITE_URL` is a public Worker hostname.
3. **CSP compatible** — existing `script-src 'self' 'unsafe-inline'` in middleware covers the new inline scroll-reveal script; no new external origins introduced.
4. **External links** — new `target="_blank"` links carry `rel="noopener noreferrer"`.
5. **robots.txt / sitemap.xml** — correctly disallow `/api/` and `/health`; sitemap exposes only public homepage URL.
6. **No new attack surface** — no PII collection, auth, payment, or upload changes.
