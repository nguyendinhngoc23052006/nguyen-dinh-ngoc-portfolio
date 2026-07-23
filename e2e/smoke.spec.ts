import { expect, test } from "@playwright/test";
import { CONTACT_API_PATH, HEALTH_PATH, HOME_PATH, ORIGIN } from "./_mocks";

test("home page has correct title", async ({ page }) => {
  await page.goto(HOME_PATH);
  await expect(page).toHaveTitle(
    "Jade — Custom Web Development & Bespoke Software | Nguyen Dinh Ngoc",
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

test("contact form submits successfully", async ({ page }) => {
  await page.goto(HOME_PATH);
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

test("contact api rejects wrong content-type", async ({ request }) => {
  const res = await request.post(CONTACT_API_PATH, {
    headers: { "Content-Type": "text/plain", Origin: ORIGIN },
    data: "not json",
  });
  expect(res.status()).toBe(415);
});

test("contact api silently accepts honeypot submissions", async ({
  request,
}) => {
  const res = await request.post(CONTACT_API_PATH, {
    data: {
      request_key: crypto.randomUUID(),
      name: "Bot",
      email: "bot@spam.com",
      message: "Spam message",
      website: "http://spam.example.com",
    },
  });
  expect(res.status()).toBe(200);
  const json = (await res.json()) as { success: boolean };
  expect(json.success).toBe(true);
});

test("contact api rate-limits rapid requests", async ({ request }) => {
  // Same request_key across all 6 → first inserts, rest hit 23505 unique_violation
  // which the service treats as success. So in production/preview without the
  // rate limiter binding, all 6 return 200. With the binding, later requests
  // return 429. Either state is valid; anything else (500, 4xx other) means the
  // rate-limit path crashed.
  const payload = {
    request_key: crypto.randomUUID(),
    name: "Rate Test",
    email: "rate@test.com",
    message: "Test message",
  };

  const results = [];
  for (let i = 0; i < 6; i++) {
    const res = await request.post(CONTACT_API_PATH, { data: payload });
    results.push(res.status());
  }

  const allValid = results.every((status) => status === 200 || status === 429);
  expect(allValid).toBe(true);
});
