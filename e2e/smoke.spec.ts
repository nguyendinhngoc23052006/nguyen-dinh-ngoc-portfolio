import { expect, test } from "@playwright/test";
import { CONTACT_API_PATH, HEALTH_PATH, HOME_PATH } from "./_mocks";

test("home page has correct title", async ({ page }) => {
  await page.goto(HOME_PATH);
  await expect(page).toHaveTitle("Nguyen Dinh Ngoc");
});

test("health endpoint returns 200", async ({ request }) => {
  const response = await request.get(HEALTH_PATH);
  expect(response.ok()).toBeTruthy();
});

test("contact form submits successfully", async ({ page }) => {
  await page.goto(HOME_PATH);
  // Wait for React island to hydrate (form submit handler needs it)
  await page.waitForFunction(
    () =>
      document.querySelector("#submit-btn")?.getAttribute("data-hydrated") ===
      "true",
    { timeout: 15000 },
  );
  await page.fill("#name", "Test User");
  await page.fill("#email", "test@example.com");
  await page.fill("#company", "Test Co");
  await page.fill(
    "#message",
    "This is a test demo request from the e2e suite.",
  );
  await page.click("#submit-btn");
  const msg = page.locator("#form-msg");
  await expect(msg).toHaveClass(/success/, { timeout: 10000 });
});

test("contact api rejects invalid payload", async ({ request }) => {
  const res = await request.post(CONTACT_API_PATH, {
    data: { request_key: "not-a-uuid", name: "", email: "bad", message: "" },
  });
  expect(res.status()).toBe(400);
  const json = (await res.json()) as { error: string };
  expect(json.error).toBeTruthy();
});
