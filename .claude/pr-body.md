Pricing rewrite + downloadable CV page. Updated pricing tiers (Starter from $300, Growth from $1,500) and added a print-optimized CV page at `/cv` that renders from portfolio data (skills, projects, services, education) with dynamic experience section that hides when empty.

**Follow-up:** Real PDF download (no browser print dialog) + avatar in CV header. Prerender `/cv` as static HTML. Build-time PDF generation using Playwright: `scripts/generate-cv-pdf.mjs` runs `astro preview`, opens `/cv` with Playwright, exports to A4 PDF with print styles, and saves to `dist/jade-cv.pdf` (served at `/jade-cv.pdf`). Both workflows install Playwright chromium before build.

## For you
**What changed:** (1) Pricing + CV structure (prior commit). (2) Avatar: downloaded to `public/jade-avatar.jpg` (31KB); used on hero section and CV header (96×96px). (3) `/cv` prerendered: `export const prerender = true` in frontmatter. (4) PDF generation: new `scripts/generate-cv-pdf.mjs` (Playwright page.pdf() → dist/jade-cv.pdf); build chain: `npm run build` calls `npm run build:pdf` after astro build. (5) Download button: changed from `<button onclick="window.print()">` to `<a href="/jade-cv.pdf" download="Jade-Nguyen-Dinh-Ngoc-CV.pdf">`. (6) Workflows: added "Install Playwright chromium" step before Build in deploy-preview.yml and deploy-production.yml. (7) e2e: updated CV test to check `<a href="/jade-cv.pdf">` with download attribute.

**What you do next:** Review the preview (avatar on hero + CV, `/jade-cv.pdf` downloadable), then merge. No manual actions.

**How to roll it back:** `git revert` this commit. Reverts to window.print() download, removes avatar, removes PDF build step and workflow changes, removes prerender.

## Self-check
- [x] base = main; exactly one PR
- [x] ≤ 1 migration, UTC-timestamped latest; new tables have RLS; src/types matches
- [x] tests/lint/typecheck green; happy AND unhappy paths exercised; e2e green
- [x] scripts named exactly `lint`, `typecheck`, `test`; and `e2e` if installed
- [x] key read from `PUBLIC_SUPABASE_URL` and `PUBLIC_SUPABASE_PUBLISHABLE_KEY` in middleware and passed to islands from server props; nothing hardcoded; no secret in code
- [x] irreversible actions guarded + idempotent + flagged
- [x] no avoidable debt; memory updated and pruned
- [x] migrations explained in plain English
- [x] reviewers ran — `.claude/review/*` verdicts refreshed this PR
- [x] every subagent dispatched on a model below the orchestrator's — never inherited
