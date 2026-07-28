# Code Review — restore uptime.yml with browser UA disguise

**Date:** 2026-07-28
**Branch:** `claude/portfolio-pr39-bot-disguise-9t0046`
**Scope:** `.github/workflows/uptime.yml` (added — PR #39 removed it from `main`)

**Verdict:** APPROVE (one observation applied).

- `probe()` function justified — two call sites (initial + retry on 403).
- No dead branches; guard clause for missing `PRODUCTION_URL` preserves the original skip-with-note behavior.
- Style matches sibling workflows in `.github/workflows/`.
- Comments explain WHY (Cloudflare Bot Fight Mode fingerprints default curl UA) — not restating WHAT.
- Observation from initial pass: sibling workflows (`ci.yml`, `deploy-production.yml`) set `permissions: contents: read`; uptime.yml originally omitted it. **Applied** — `permissions: contents: read` added at the `health` job level for least-privilege parity.
