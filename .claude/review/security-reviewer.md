# Security Review — harden production deploy on CI + blue-green promotion

**Date:** 2026-07-24
**Verdict:** PENDING — awaiting reviewer completion.

## Changes under review
- `.github/workflows/deploy-production.yml`: Added CI gate (`wait-for-ci` job), replaced single deploy with blue-green pattern (upload → health probe → promote).

## Security focus points
1. **CI gate permissions** — `checks: read`, `contents: read` scope on `wait-for-ci`.
2. **Version upload safety** — `wrangler versions upload` output parsing.
3. **Health probe** — `/health` endpoint validation before promotion.
4. **Secrets & vars** — `PUBLIC_SUPABASE_*` wired as vars, not secrets.
5. **Env vars** — no secret key references in workflow.

(Verdict and detailed findings to be updated by reviewer.)
