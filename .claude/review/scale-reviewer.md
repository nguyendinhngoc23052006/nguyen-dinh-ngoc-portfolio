# Scale Review — Pricing + CV page + Avatar + PDF build (follow-up)

**Date:** 2026-07-24 (updated for follow-up: avatar + PDF generation + prerender)  
**Verdict:** PASS — no scale issues found.

## Findings (Follow-up Changes)

1. **`src/pages/cv.astro:2` — `prerender = true`** — page renders from the static `../data/portfolio` import at build time. No runtime query path, no Supabase calls, no `.select()` or `.filter()` in this file or its imports.

2. **`scripts/generate-cv-pdf.mjs`** — build-time script only. Spawns `astro preview` and uses Playwright to print `/cv` to `dist/jade-cv.pdf` once per build. No database access, no Supabase calls, no loop over query results. Out of runtime scale scope (CI/CD, not production code path).

3. **`e2e/smoke.spec.ts:104-110`** — new test hits `/cv` endpoint and asserts PDF link presence. One page load, no repeated queries, no new Supabase-backed route. No scale impact.

4. **Avatar asset** (`public/jade-avatar.jpg`) — static file, served once at build time, immutable. No scale impact.

## Scale checks
- **Unbounded queries:** None. `/cv` pulls from static `portfolio.ts` object (fixed data).
- **Unindexed filters/joins:** N/A (no database queries in diff).
- **N+1 patterns:** N/A (no loops over query results).
- **Non-idempotent writes:** None (PDF generation is read-only from the page; no `.insert()` added).

## Verdict
No scale issues found. All follow-up changes are static or build-time only: avatar is immutable, `/cv` is prerendered with static data, PDF is generated once at build time, e2e test is a single page load assertion.
