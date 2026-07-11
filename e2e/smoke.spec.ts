import { expect, test } from "@playwright/test";
import { HEALTH_PATH, HOME_PATH } from "./_mocks";

test("home page has correct title", async ({ page }) => {
  await page.goto(HOME_PATH);
  await expect(page).toHaveTitle("Nguyen Dinh Ngoc");
});

test("health endpoint returns 200", async ({ request }) => {
  const response = await request.get(HEALTH_PATH);
  expect(response.ok()).toBeTruthy();
});
