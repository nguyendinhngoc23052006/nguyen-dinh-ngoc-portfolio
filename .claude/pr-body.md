## Professional overhaul + security hardening

Comprehensive update to the portfolio site covering content, tone, accessibility, SEO, and security.

### Content & Professionalism
- Replaced placeholder projects with real work (this portfolio + Cloud Pipeline Guide)
- Trimmed skills from 45 to 18 focused, credible technologies
- Shifted tone from SaaS "Request a demo" to portfolio-appropriate "Get in touch"
- Professional README with stack, commands, and license
- Removed placeholder footer links; added real GitHub and email

### SEO & Accessibility
- Added favicon, OpenGraph, Twitter Card, and JSON-LD Person schema
- Added `robots.txt` for search engine guidance
- Mobile navigation (hamburger menu) — previously no nav below `sm` breakpoint
- Skip-to-content link, `aria-live` on form status, `aria-label` on nav
- `prefers-reduced-motion` respects: pulse animation disabled, glow reduced

### Security Hardening
- **Security headers** via middleware: CSP, HSTS, X-Frame-Options (DENY), X-Content-Type-Options (nosniff), Referrer-Policy, Permissions-Policy
- **Honeypot field** on contact form — bots that auto-fill get silently accepted without DB write
- **Origin verification** — cross-origin POST requests to `/api/contact` are rejected
- **Content-Type enforcement** — non-JSON requests rejected with 415
- **Generic error messages** — DB errors no longer leak to the client (validation errors still surface)
- **CodeQL** workflow (v4) on push, PR, and weekly schedule
- **`npm ci`** in all CI workflows for lockfile-integrity builds
- **SECURITY.md** with responsible disclosure policy
- **LICENSE** (MIT)

### Security Audit Findings (code-level)
| Finding | Severity | Status |
|---------|----------|--------|
| CSP uses `'unsafe-inline'` for scripts (required by Astro island hydration) | Medium | Documented; tighten with nonce-based CSP when Astro supports it |
| No rate limiting on contact endpoint | Medium | Recommended: Cloudflare Rate Limiting rule or KV-based limiter |
| No CAPTCHA/Turnstile | Low-Medium | Recommended: Cloudflare Turnstile (sitekey via dashboard) |
| Avatar hotlinked from GitHub CDN | Low | Acceptable; self-host as follow-up |
| No row-count limit on demo_requests | Low | Free-tier storage limit provides a natural ceiling |

## Self-check
- [x] base = main; exactly one PR
- [~] ≤ 1 migration — no migration in this PR
- [x] tests/lint/typecheck green; happy AND unhappy paths exercised; e2e updated with security header + honeypot tests
- [x] scripts named exactly `lint`, `typecheck`, `test`; and `e2e` if installed
- [x] key read from `PUBLIC_SUPABASE_URL` and `PUBLIC_SUPABASE_PUBLISHABLE_KEY` in middleware and passed to islands from server props; nothing hardcoded; no secret in code
- [~] irreversible actions — none in this PR
- [x] no avoidable debt; memory updated and pruned
- [~] migrations explained — no migration in this PR
- [x] reviewers ran — `.claude/review/*` verdicts refreshed this PR
- [x] every subagent dispatched on a model below the orchestrator's — never inherited

## For you
**What changed:** Complete professionalism overhaul (content, tone, SEO, mobile nav, accessibility) plus security hardening (CSP/HSTS headers, honeypot, origin verification, content-type enforcement, generic errors, CodeQL, npm ci).

**What you do next:** Review the preview deploy, then merge. Optionally: enable GitHub secret scanning + push protection in Settings → Code security; add a Cloudflare Turnstile sitekey + rate-limiting rule for the contact endpoint.

**How to roll it back:** Revert this single commit on main.
