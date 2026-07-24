import { spawn } from "node:child_process";
import { setTimeout as sleep } from "node:timers/promises";

import { chromium } from "@playwright/test";

const OUT_PATH = "dist/jade-cv.pdf";
const PORT = 4322;
const URL = `http://localhost:${PORT}/cv`;

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

async function main() {
  // Start `astro preview` on a background process
  const server = spawn("npx", ["astro", "preview", "--port", String(PORT)], {
    stdio: "inherit",
    env: { ...process.env },
  });
  try {
    await waitForServer(URL);

    const browser = await chromium.launch({
      executablePath: "/opt/pw-browsers/chromium",
    });
    const page = await browser.newPage();
    await page.goto(URL, { waitUntil: "networkidle" });
    // Wait for web fonts to be loaded
    await page.evaluate(() => document.fonts.ready);
    await page.emulateMedia({ media: "print" });
    await page.pdf({
      path: OUT_PATH,
      format: "A4",
      margin: { top: "15mm", right: "20mm", bottom: "15mm", left: "20mm" },
      printBackground: true,
    });
    await browser.close();
    console.log(`✓ Generated ${OUT_PATH}`);
  } finally {
    server.kill("SIGTERM");
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
