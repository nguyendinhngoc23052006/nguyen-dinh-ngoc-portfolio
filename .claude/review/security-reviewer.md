# Security Review — PR: static-route headers + domain cleanup + security.txt

**Date:** 2026-07-24  
**Verdict:** PASS (all security gates clear)

## Findings

### Issues fixed in PR body
- **pr-body.md was stale**: Initial review found pr-body.md still contained previous PR's pricing/CV text with no security context. Corrected version now describes this PR's three security fixes with abuse prevention rationale.

### Security checks — all pass
1. **RLS on new tables**: No migrations; no new tables. Not applicable.
2. **Secrets in client code**: Grepped src/middleware.ts, src/data/portfolio.ts, src/pages/*.astro for SUPABASE_SERVICE_ROLE_KEY, _SECRET_, service_role, sb_secret_ — none found. Public keys only.
3. **Unvalidated input**: Neither page reads Astro.request or URL params; both consume static objects from src/data/portfolio.ts only. Not applicable.
4. **Auth/PII/upload changes**: Auth session logic unchanged (src/middleware.ts still calls supabase.auth.getSession(), no bypass). Avatar image now local (/jade-avatar.jpg, not external GitHub URL) — reduces external domain dependency. Email/name/address fields unchanged.

## Security mitigations in this PR

- **Clickjacking (P1 fix)**: X-Frame-Options: DENY + frame-ancestors 'none' in public/_headers + src/middleware.ts prevent <frame>/<iframe> embedding of prerendered /cv (was vulnerable).
- **XSS/injection**: CSP restricts script-src to 'self' + 'unsafe-inline' (required by Astro hydration), img-src to 'self' + data: (removed external GitHub avatar domain). No eval/exec risky directives.
- **Protocol downgrade**: HSTS max-age=31536000; includeSubDomains enforces HTTPS across domain.
- **MIME confusion**: X-Content-Type-Options: nosniff blocks MIME-type inference attacks.
- **Referrer leakage**: Referrer-Policy: strict-origin-when-cross-origin limits referrer to same-origin or HTTPS upgrade only.
- **Feature access**: Permissions-Policy disallows camera, microphone, geolocation (zero-permissions model).
- **security.txt**: RFC 9110 contact + responsible-disclosure signaling.

## Checklist
- [x] CSP does not expose secrets or service-role endpoints.
- [x] No client-side Supabase service-role key references.
- [x] No unvalidated user input in changed components.
- [x] Auth session logic unchanged; no bypass introduced.
- [x] Static asset serving via Cloudflare Workers Static Assets (no DB risk).
- [x] _headers format valid; merge with adapter rules verified in dist/client/_headers.
- [x] .well-known/security.txt accessible at correct path (Astro copies public/ → dist/client/).
