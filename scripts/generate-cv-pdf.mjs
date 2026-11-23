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

const PORT = 4322;
// One PDF per language, both rendered from the same CV entries.
const TARGETS = [
  {
    url: `http://127.0.0.1:${PORT}/cv/`,
    out: "dist/client/Nguyen-Dinh-Ngoc-CV-EN.pdf",
  },
  {
    url: `http://127.0.0.1:${PORT}/cv/vi/`,
    out: "dist/client/Nguyen-Dinh-Ngoc-CV-VI.pdf",
  },
];

// A4 = 297mm tall. Print margins: MARGIN_MM below, the same as globals.css @page.
// Usable content height per page = 297mm minus both margins; at 96 CSS pixels
// per inch that is about 3.78 CSS px per mm.
// We warn early (browser-side) and hard-fail late (page count in the emitted PDF).
// Two-page ceiling: recruiters read one to two pages; the depth lives on the
// case-study pages the CV links to.
const MAX_PAGES = 2;
const MARGIN_MM = { y: 10, x: 14 };
const USABLE_HEIGHT_CSS_PX = Math.round(
  MAX_PAGES * (297 - 2 * MARGIN_MM.y) * 3.7795,
);

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
    [
      "-m",
      "http.server",
      String(PORT),
      "--directory",
      "dist/client",
      "--bind",
      "127.0.0.1",
    ],
    {
      stdio: "inherit",
      env: { ...process.env },
    },
  );
  try {
    await waitForServer(TARGETS[0].url);

    const browser = await chromium.launch(LAUNCH_OPTS);
    for (const { url: URL, out: OUT_PATH } of TARGETS) {
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
        () =>
          document.querySelector(".cv-page")?.scrollHeight ??
          document.body.scrollHeight,
      );
      console.log(
        `[diag] .cv-page scrollHeight=${contentHeight}px; usable ceiling=${USABLE_HEIGHT_CSS_PX}px`,
      );
      if (contentHeight > USABLE_HEIGHT_CSS_PX) {
        console.warn(
          `⚠ CV content height ${contentHeight}px exceeds the ${MAX_PAGES}-page ceiling ${USABLE_HEIGHT_CSS_PX}px. ` +
            `Print may span multiple pages. Tighten data or CSS.`,
        );
      }

      await page.pdf({
        path: OUT_PATH,
        format: "A4",
        margin: {
          top: `${MARGIN_MM.y}mm`,
          right: `${MARGIN_MM.x}mm`,
          bottom: `${MARGIN_MM.y}mm`,
          left: `${MARGIN_MM.x}mm`,
        },
        printBackground: true,
      });
      // Authoritative check: fail the build if the emitted PDF is more than one page.
      const pages = countPdfPages(OUT_PATH);
      if (pages > MAX_PAGES) {
        throw new Error(
          `CV PDF is ${pages} pages; the ceiling is ${MAX_PAGES}. ` +
            `Trim src/components/CvDocument.astro or src/data/portfolio.ts (compact cvSummary, ` +
            `shorten trait notes, cap projects/skills, tighten @media print CSS in ` +
            `src/styles/globals.css).`,
        );
      }
      console.log(
        `✓ Generated ${OUT_PATH} (${pages} page${pages === 1 ? "" : "s"})`,
      );
    }
    await browser.close();
  } finally {
    server.kill("SIGTERM");
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
