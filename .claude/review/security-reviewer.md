# Security Review — professional overhaul + security hardening

**Date:** 2026-07-16
**Verdict:** PASS — findings addressed; no blocking issues.

## Findings

1. **CSP `'unsafe-inline'` for scripts** — required by Astro's island hydration (inline `<script>` tags generated at build time). Documented; tighten with nonce-based CSP when Astro supports it. Severity: Medium; Status: Accepted risk.
2. **Origin verification redundancy** — custom origin check in API handler was redundant with Astro's built-in `security.checkOrigin` (default `true` for SSR). Removed; Astro handles CSRF at the framework level.
3. **Honeypot field** — uses Tailwind class for off-screen positioning (no inline style). Silent 200 response for bots avoids tipping off the sender.
4. **Generic error messages** — DB errors in `submitDemoRequest` return generic "Something went wrong" (500); validation errors still surface to the user.
5. **No rate limiting** — recommended as follow-up (Cloudflare Rate Limiting rule or KV-based limiter).
6. **No CAPTCHA/Turnstile** — recommended as follow-up (Cloudflare Turnstile).
7. **Content-type enforcement** — non-JSON POST requests rejected with 415 before any service check.
8. **No secrets in client code** — publishable key only; Supabase config read server-side in middleware.
