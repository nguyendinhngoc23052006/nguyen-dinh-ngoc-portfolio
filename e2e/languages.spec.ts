import { expect, test } from "@playwright/test";

// The home page is English at / (the default) and Vietnamese at /vi; every
// bilingual page links to its counterpart and tells search engines about it.
test("the home page is English at / and Vietnamese at /vi", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await page.locator("[data-switch]").click();
  await expect(page).toHaveURL(/\/vi$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "vi");
  await page.locator("[data-switch]").click();
  await expect(page).toHaveURL(/\/$/);
});

test("no English section heading or label is left on /vi", async ({ page }) => {
  const read = async (path: string) => {
    await page.goto(path);
    return page
      .locator("h2, .section-label, nav a, header button, h3")
      .allInnerTexts();
  };
  const english = await read("/");
  const vietnamese = new Set(await read("/vi"));
  // Names stay the same in both languages: people, products, "CV", "GitHub".
  const names =
    /^(Jade|CV|GitHub|Email|Ops Platform|Mau Heritage Hub|Kwook-career|Dinh Ngoc Edu|saasmath|Browser tools|Face recognition in the browser|Nguyễn .*|AI visor|Firmware hub|Tiếng Việt|English|.*\.dev)$/;
  const left = english.filter(
    (t) => t.trim() && vietnamese.has(t) && !names.test(t.trim()),
  );
  expect(left).toEqual([]);
});

test("links on /vi stay in Vietnamese", async ({ page }) => {
  await page.goto("/vi");
  // A link marked as English (hreflang="en") offers the other language on purpose.
  const hrefs = await page
    .locator('a[href^="/"]:not([hreflang="en"])')
    .evaluateAll((as) => as.map((a) => a.getAttribute("href") ?? ""));
  for (const h of hrefs) {
    if (/^\/work\/[^/.]+(\/[^/.]+)?$/.test(h)) expect(h, h).toMatch(/\/vi$/);
    if (h.startsWith("/cv")) expect(h, h).toBe("/cv/vi");
  }
});

test("search engines see both languages, English by default", async ({
  page,
}) => {
  for (const [path, en, vi] of [
    ["/", "/", "/vi"],
    ["/vi", "/", "/vi"],
    ["/work/ops-platform", "/work/ops-platform", "/work/ops-platform/vi"],
  ]) {
    await page.goto(path);
    const alt = (l: string) =>
      page.locator(`link[rel=alternate][hreflang="${l}"]`).getAttribute("href");
    expect(
      new URL((await alt("en")) ?? "").pathname.replace(/\/$/, "") || "/",
      path,
    ).toBe(en);
    expect(new URL((await alt("vi")) ?? "").pathname, path).toBe(vi);
    expect(
      new URL((await alt("x-default")) ?? "").pathname.replace(/\/$/, "") ||
        "/",
      path,
    ).toBe(en);
  }
});

test("a project's screens open in Vietnamese on /vi", async ({ page }) => {
  await page.goto("/vi");
  const button = page
    .getByRole("button", { name: /Xem giao diện thực tế/ })
    .first();
  await button.click();
  const pop = page.locator(`#${await button.getAttribute("popovertarget")}`);
  await expect(pop).toBeVisible();
  await expect(pop.locator("[data-pos]")).toHaveText(/^1 \/ \d+$/);
});
