# Security Review — CSP allowlist extension for Google Fonts + Cloudflare Insights

**Date:** 2026-07-24
**Verdict:** PASS.

CSP extended narrowly (4 specific hosts, all first-party integrations the site actually uses):
- `https://static.cloudflareinsights.com` (Cloudflare's own analytics script, auto-injected on CF-hosted sites)
- `https://fonts.googleapis.com` (Google Fonts CSS stylesheet)
- `https://fonts.gstatic.com` (Google Fonts WOFF2 files)
- `https://cloudflareinsights.com` (CF Analytics beacon endpoint for POSTing pageviews)

No wildcards, no unrelated hosts allowlisted. Both middleware CSP (for dynamic routes) and public/_headers CSP (for prerendered routes) updated byte-identically — no drift. No secret changes, no auth/PII touched. Self-review — 4-line policy string extension.
