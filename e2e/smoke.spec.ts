import { expect, test } from "@playwright/test";
import { HEALTH_PATH, HOME_PATH } from "./_mocks";

test("home page has correct title", async ({ page }) => {
  await page.goto(HOME_PATH);
  await expect(page).toHaveTitle(
    "Jade — Internal Systems Developer | Nguyen Dinh Ngoc",
  );
});

test("health endpoint returns 200", async ({ request }) => {
  const response = await request.get(HEALTH_PATH);
  expect(response.ok()).toBeTruthy();
});

test("responses include security headers", async ({ request }) => {
  const res = await request.get(HEALTH_PATH);
  expect(res.headers()["x-content-type-options"]).toBe("nosniff");
  expect(res.headers()["x-frame-options"]).toBe("DENY");
  expect(res.headers()["referrer-policy"]).toBe(
    "strict-origin-when-cross-origin",
  );
  expect(res.headers()["permissions-policy"]).toBeTruthy();
  expect(res.headers()["content-security-policy"]).toBeTruthy();
});

test("cv page loads and has download link", async ({ page }) => {
  await page.goto("/cv");
  await expect(page).toHaveTitle(/Jade — CV/);
  const link = page.locator('a[href="/jade-cv.pdf"]');
  await expect(link).toBeVisible();
  await expect(link).toHaveAttribute("download", /\.pdf$/);
});
