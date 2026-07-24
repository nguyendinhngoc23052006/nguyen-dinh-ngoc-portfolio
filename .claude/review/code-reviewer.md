# Code Review — Pricing + CV page + Avatar + PDF build

**Date:** 2026-07-24 (updated for follow-up: avatar + PDF generation + prerender)  
**Verdict:** PASS — no functional, type, or dead-code defects; follow-up additions are clean.

## Findings (Follow-up Changes)

1. **Avatar asset — PASS.** 31KB JPEG at `public/jade-avatar.jpg`. Used correctly:
   - `src/pages/cv.astro:69-74`: `<img src="/jade-avatar.jpg" alt="Jade — ..." width="96" height="96" class="..." style="width:96px;height:96px" />`  
   - `src/pages/index.astro:169-176`: `<img src="/jade-avatar.jpg" alt="Jade — ..." width="280" height="280" loading="eager" class="..." />`  
   Both include width/height attributes (prevents layout shift) and descriptive alt text. No missing or generic alts.

2. **Prerender flag — PASS.** `export const prerender = true;` in `src/pages/cv.astro:2` frontmatter. Correct placement (top of frontmatter), no syntax issues, inert in runtime (Astro compile-time directive). Results in `dist/client/cv/index.html` static file generation (verified post-build).

3. **PDF generation script (`scripts/generate-cv-pdf.mjs`) — PASS.**
   - Lines 1-3: Imports sorted (node: standard lib before npm packages). Correctly uses `@playwright/test`, `node:child_process`, `node:timers/promises`.
   - Lines 7-8: `waitForServer()` async poll function with timeout (30s default). Proper error: `throw new Error(...)`. Timeout math correct.
   - Line 16: `spawn("npx", ["astro", "preview", ...])` with `stdio: "inherit"` (logs visible). Env spread passes through.
   - Line 21: Await `waitForServer(URL)` before browser launch — correct sequencing.
   - Line 23: `chromium.launch({ executablePath: '/opt/pw-browsers/chromium' })` — uses pre-installed binary (environment-specific, good for CI).
   - Line 24: `page.newPage()`, navigate, `page.evaluate(() => document.fonts.ready)` (waits for fonts), emulate print media, `page.pdf(...)` with A4 + margins — all standard Playwright patterns.
   - Line 33: `server.kill("SIGTERM")` in finally block — ensures cleanup even on error.
   - Error handling: `.catch((e) => { console.error(e); process.exit(1); })` — exits on failure (CI will see non-zero exit and fail build).
   - Dead code: NONE.

4. **Build chain (`package.json`) — PASS.** 
   ```json
   "build": "astro build && npm run build:pdf",
   "build:pdf": "node scripts/generate-cv-pdf.mjs",
   ```
   Uses `&&` (short-circuit: if astro build fails, PDF script doesn't run). Correct order: prerendered HTML first, then PDF capture. Script name is `build:pdf` (not `pdf` or `cv-pdf`), consistent with npm convention.

5. **e2e test update (`e2e/smoke.spec.ts:104-110`) — PASS.**
   ```typescript
   test("cv page loads and has download link", async ({ page }) => {
     await page.goto("/cv");
     await expect(page).toHaveTitle(/Jade — CV/);
     const link = page.locator('a[href="/jade-cv.pdf"]');
     await expect(link).toBeVisible();
     await expect(link).toHaveAttribute("download", /\.pdf$/);
   });
   ```
   - Test name updated (descriptive).
   - Checks title, link presence, href, and download attribute (good coverage of the change).
   - Selector `a[href="/jade-cv.pdf"]` is specific (avoids accidental matching other anchors).
   - Attribute matcher `/\.pdf$/` is slightly loose (matches `.pdf` at end, which is correct for the actual value `Jade-Nguyen-Dinh-Ngoc-CV.pdf`).
   - No async/await issues, correct Playwright usage.

6. **Workflow changes — PASS.** Both `.github/workflows/deploy-preview.yml` (line 26) and `deploy-production.yml` (line 82) add:
   ```yaml
   - name: Install Playwright chromium
     run: npx playwright install --with-deps chromium
   ```
   Placed immediately before Build step — correct. `--with-deps` installs system dependencies (headless-shell, libatk, etc.). Does not conflict with existing `npm ci` step (caches are separate: node_modules vs. browser cache).

7. **Import statement fix — PASS.** `src/pages/cv.astro:4` changed from `// biome-ignore-all` to `// biome-ignore` (line-specific instead of file-wide) to avoid false "unused suppression" warning on later imports. Correct.

8. **No new dependencies.** Playwright already in devDependencies (added in earlier PR for e2e tests); no new packages.

9. **No regressions.** Existing routes, middleware, Supabase client unchanged. Avatar file is new asset (doesn't overwrite anything). PDF write to dist/ (build artifact, not version-controlled).

## Verdict
Follow-up changes are clean and focused: avatar asset, prerender flag, PDF generation script with proper error handling and cleanup, build chain wiring, workflow steps, e2e test update. No dead code, type issues, or functional bugs. Playwright path is environment-correct (uses pre-installed chromium). All changes follow project style.
