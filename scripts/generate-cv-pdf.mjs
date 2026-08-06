import { spawn } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { setTimeout as sleep } from "node:timers/promises";

import { chromium } from "@playwright/test";

// Prefer a pre-installed Chromium if the environment provides one (matches
// the sandbox convention documented in CCR env docs). Falls back to
// Playwright's managed browser otherwise.
const PREINSTALLED_CHROMIUM = "/opt/pw-browsers/chromium";
const LAUNCH_OPTS = existsSync(PREINSTALLED_CHROMIUM)
  ? { executablePath: PREINSTALLED_CHROMIUM }
  : {};

const OUT_PATH = "dist/client/jade-cv.pdf";
const PORT = 4322;
const URL = `http://127.0.0.1:${PORT}/cv/`;

// A4 = 297mm tall. Print margins are 12mm top + 12mm bottom (globals.css @page).
// Usable content height = 273mm. At 96 CSS pixels per inch = 1032 CSS px.
// We warn early (browser-side) and hard-fail late (page count in the emitted PDF).
const USABLE_HEIGHT_CSS_PX = Math.round((297 - 10 - 10) * 3.7795);
const MAX_PAGES = 1;

async function waitForServer(url, timeoutMs = 30_000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    try {
      const res = await fetch(url);
      if (res.ok) return;
    } catch {}
    await sleep(500);
  }
  throw new Error(`Server didn't respond at ${url} within ${timeoutMs}ms`);
}

// Count /Type /Page (but not /Type /Pages) objects in the PDF. This is the
// ground-truth page count once the PDF is written.
function countPdfPages(path) {
  const bytes = readFileSync(path);
  // Convert once, cheaper than repeated string ops on binary buffers.
  const text = bytes.toString("latin1");
  const matches = text.match(/\/Type\s*\/Page(?![sA-Za-z])/g);
  return matches ? matches.length : 0;
}

async function main() {
  // Serve the prerendered static output directly. `astro preview` boots the
  // Cloudflare adapter's SSR harness which can 500 on /cv/ in this sandbox;
  // the built dist/client/ already contains a valid cv/index.html.
  const server = spawn(
    "python3",
    ["-m", "http.server", String(PORT), "--directory", "dist/client", "--bind", "127.0.0.1"],
    {
      stdio: "inherit",
      env: { ...process.env },
    },
  );
  try {
    await waitForServer(URL);

    const browser = await chromium.launch(LAUNCH_OPTS);
    const page = await browser.newPage();
    // Set viewport to A4 CSS-pixel width (approx) so scrollHeight measures
    // what the print layout will actually flow into.
    await page.setViewportSize({ width: 794, height: 1122 });
    await page.goto(URL, { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    await page.emulateMedia({ media: "print" });

    // Browser-side pre-check: measure rendered content height at print media.
    // Overflow here is diagnostic; the authoritative check is the PDF page count.
    const contentHeight = await page.evaluate(
      () => document.querySelector(".cv-page")?.scrollHeight ?? document.body.scrollHeight,
    );
    console.log(
      `[diag] .cv-page scrollHeight=${contentHeight}px; usable ceiling=${USABLE_HEIGHT_CSS_PX}px`,
    );
    if (contentHeight > USABLE_HEIGHT_CSS_PX) {
      console.warn(
        `⚠ CV content height ${contentHeight}px exceeds one-page ceiling ${USABLE_HEIGHT_CSS_PX}px. ` +
          `Print may span multiple pages. Tighten data or CSS.`,
      );
    }

    await page.pdf({
      path: OUT_PATH,
      format: "A4",
      margin: { top: "10mm", right: "14mm", bottom: "10mm", left: "14mm" },
      printBackground: true,
    });
    await browser.close();

    // Authoritative check: fail the build if the emitted PDF is more than one page.
    const pages = countPdfPages(OUT_PATH);
    if (pages > MAX_PAGES) {
      throw new Error(
        `CV PDF is ${pages} pages; the one-page ceiling is ${MAX_PAGES}. ` +
          `Trim src/pages/cv.astro or src/data/portfolio.ts. See docs on tightening cvSummary, ` +
          `traits, projects/skills caps, and @media print CSS in src/styles/globals.css.`,
      );
    }
    console.log(`✓ Generated ${OUT_PATH} (${pages} page${pages === 1 ? "" : "s"})`);
  } finally {
    server.kill("SIGTERM");
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
