# Security Review — Pricing + CV page + Avatar + PDF build

**Date:** 2026-07-24 (updated for follow-up: avatar + PDF generation)  
**Verdict:** PASS (no new security vulnerabilities)

## Findings (Follow-up Changes)

1. **Avatar download — PASS.** GitHub avatar downloaded once to `public/jade-avatar.jpg` at development time (manual download, not CI). Image served as static asset from `public/` (immutable, cached). No third-party image CDN load in browsers for hero or CV; local asset reduces external requests and eliminates GitHub domain dependency.

2. **PDF generation script (`scripts/generate-cv-pdf.mjs`) — PASS.** (a) Chromium launch uses pre-installed `/opt/pw-browsers/chromium` — no download, no arbitrary binary execution. (b) Playwright opens localhost:4322 only (not internet) — confined to prerendered `/cv` page, no external fetch risk. (c) Page data is static (portfolio.ts constants), no user input. (d) PDF write to `dist/jade-cv.pdf` (build artifact directory, not committed, not served in production code until workflows publish). (e) Script runs at build time only (CI), not runtime — no production security surface.

3. **PDF served at `/jade-cv.pdf` — PASS.** Static file, immutable, no download-execution risk (PDF viewer opens in browser or user downloads). No Content-Disposition confusion: `download="Jade-Nguyen-Dinh-Ngoc-CV.pdf"` attribute on anchor is advisory (helps filename, no security bypass).

4. **Workflow steps — PASS.** `npx playwright install --with-deps chromium` runs in CI only (before build). No secrets exposed in CI logs; no chromium build from source (uses pre-built binary). Both workflows already have trusted GitHub token scoping (contents: read, pull-requests: write in preview; contents: read in production).

5. **`src/pages/cv.astro` avatar usage — PASS.** `<img src="/jade-avatar.jpg" alt="Jade — Nguyen Dinh Ngoc" ...>` is local asset reference, no injection. Similar usage in `index.astro` hero already verified (prior review).

6. **Secrets check — PASS.** No `process.env` or `import.meta.env` in `scripts/generate-cv-pdf.mjs` or new workflow blocks. Chromium executable path is hardcoded (safe).

7. **Overall attack surface — PASS.** Compared to original `window.print()` button: (a) print dialog no longer shown (user cannot accidentally reveal/screenshot sensitive data), (b) PDF is pre-rendered at known state (not user-interaction-dependent), (c) file is served as static asset (no runtime generation = lower risk).

## Verdict
All follow-up changes are security-safe. No new PII exposure, no secrets leakage, no execution risk from Playwright/Chromium, no injection vectors in PDF generation.
