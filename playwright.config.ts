import { existsSync } from "node:fs";
import { defineConfig, devices } from "@playwright/test";

const localChromium = "/opt/pw-browsers/chromium-1194/chrome-linux/chrome";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 1 : undefined,
  use: {
    baseURL: process.env.BASE_URL ?? "http://localhost:4321",
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        launchOptions: existsSync(localChromium)
          ? { executablePath: localChromium }
          : {},
      },
    },
  ],
  webServer: process.env.BASE_URL
    ? undefined
    : {
        command: "npx astro dev; npx astro dev logs --follow",
        url: "http://localhost:4321",
        reuseExistingServer: !process.env.CI,
      },
});
