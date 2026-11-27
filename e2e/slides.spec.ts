import { expect, type Page, test } from "@playwright/test";

// Every case study shows its screens as a deck that moves by button and arrow
// key, loads every image and fits a phone. The case studies are read from the
// home page's links, so a new one is covered without touching this file.
async function caseStudyPaths(page: Page): Promise<string[]> {
  await page.goto("/");
  const hrefs = await page
    .locator('a[href^="/work/"]')
    .evaluateAll((as) => as.map((a) => a.getAttribute("href") ?? ""));
  return [...new Set(hrefs.filter((h) => /^\/work\/[^/]+$/.test(h)))];
}

test("every case study's deck moves by button and arrow key, and every screen loads", async ({
  page,
}) => {
  const paths = await caseStudyPaths(page);
  expect(paths.length).toBeGreaterThanOrEqual(3);
  for (const path of paths) {
    await page.goto(path);
    const deck = page.locator("[data-deck]");
    const total = await deck.locator(".deck-slide").count();
    expect(total, path).toBeGreaterThan(1);
    const pos = deck.locator("[data-pos]");
    await expect(pos).toHaveText(`1 of ${total}`);
    await deck.locator("[data-next]").click();
    await expect(pos).toHaveText(`2 of ${total}`);
    await deck.locator(".deck-track").focus();
    await page.keyboard.press("ArrowRight");
    await expect(pos).toHaveText(`3 of ${total}`);
    await page.keyboard.press("ArrowLeft");
    await expect(pos).toHaveText(`2 of ${total}`);
    for (const img of await deck.locator("img").all()) {
      await img.scrollIntoViewIfNeeded();
      await expect
        .poll(
          () =>
            img.evaluate(
              (i: HTMLImageElement) => i.complete && i.naturalWidth > 0,
            ),
          { message: path },
        )
        .toBe(true);
    }
  }
});

test("each project's screens open over the page and close with Escape", async ({
  page,
}) => {
  await page.goto("/");
  const buttons = page.getByRole("button", { name: /See it in use/ });
  const count = await buttons.count();
  expect(count).toBeGreaterThanOrEqual(6);
  for (let i = 0; i < count; i++) {
    const id = await buttons.nth(i).getAttribute("popovertarget");
    await buttons.nth(i).click();
    const pop = page.locator(`#${id}`);
    await expect(pop).toBeVisible();
    expect(await pop.locator(".deck-slide").count(), `${id}`).toBeGreaterThan(
      0,
    );
    await page.keyboard.press("Escape");
    await expect(pop).toBeHidden();
  }
});

test.describe("on a phone", () => {
  test.use({ viewport: { width: 390, height: 844 } });
  test("a swipe moves the counter, and the deck is as tall as the slide on screen", async ({
    page,
  }) => {
    for (const path of await caseStudyPaths(page)) {
      await page.goto(path, { waitUntil: "networkidle" });
      const track = page.locator(".deck-track");
      const total = await track.locator(".deck-slide").count();
      for (const i of [1, 2, 1]) {
        // A swipe is a scroll of the track with no button or key involved.
        await track.evaluate((t, n) => {
          const s = t.querySelectorAll<HTMLElement>(".deck-slide");
          t.scrollTo({
            left: s[n].offsetLeft - s[0].offsetLeft,
            behavior: "auto",
          });
        }, i);
        await expect(page.locator("[data-pos]"), path).toHaveText(
          `${i + 1} of ${total}`,
        );
        await expect
          .poll(() =>
            track.evaluate((t, n) => {
              const slide = t.querySelectorAll<HTMLElement>(".deck-slide")[n];
              return Math.abs(
                t.getBoundingClientRect().height - slide.offsetHeight,
              );
            }, i),
          )
          .toBeLessThan(2);
      }
    }
  });
  test("case studies fit the width, in both languages", async ({ page }) => {
    for (const path of await caseStudyPaths(page)) {
      for (const p of [path, `${path}/vi`]) {
        await page.goto(p);
        expect(
          await page.evaluate(
            () => document.documentElement.scrollWidth > window.innerWidth,
          ),
          p,
        ).toBe(false);
      }
    }
  });
});

test.describe("with reduced motion", () => {
  test("moving a slide jumps instead of animating", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    const [path] = await caseStudyPaths(page);
    await page.goto(path, { waitUntil: "networkidle" });
    const track = page.locator(".deck-track");
    await page.locator("[data-next]").click();
    await expect(page.locator("[data-pos]")).toHaveText(/^2 /);
    // With motion reduced the scroll lands at once: it has moved, and it is
    // not still moving a moment later, as a smooth scroll would be.
    const first = await track.evaluate((t) => t.scrollLeft);
    await page.waitForTimeout(150);
    const later = await track.evaluate((t) => t.scrollLeft);
    expect(first).toBeGreaterThan(0);
    expect(later).toBe(first);
  });
});
