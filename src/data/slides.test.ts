import { existsSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { caseStudies, projects } from "./portfolio";
import screens from "./screens.json";
import { decks } from "./slides";

const ledger = screens as Record<
  string,
  { width: number; height: number; from: string; taken: string }
>;
const slides = Object.values(decks).flatMap((d) => d.slides);
const shown = Object.values(decks).flatMap((d) => [
  d.note,
  ...d.slides.flatMap((s) => [s.title, s.text]),
]);

describe("slide decks", () => {
  it("give every case study and every project a deck with slides", () => {
    for (const slug of [
      ...caseStudies.map((c) => c.slug),
      ...projects.map((p) => p.deck),
    ]) {
      expect(decks[slug]?.slides.length ?? 0, slug).toBeGreaterThan(0);
    }
  });

  it("show only images the import script produced, each with its origin and date", () => {
    for (const s of slides) {
      const entry = ledger[s.image];
      expect(entry, `${s.image} is not in screens.json`).toBeDefined();
      expect(
        existsSync(join("public", "work", `${s.image}.webp`)),
        s.image,
      ).toBe(true);
      expect(entry.from.length, s.image).toBeGreaterThan(10);
      expect(entry.taken).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(entry.width * entry.height).toBeGreaterThan(0);
    }
  });

  it("leave no image unused", () => {
    const used = new Set(slides.map((s) => s.image));
    for (const key of Object.keys(ledger))
      expect(used.has(key), `${key} is on no slide`).toBe(true);
    for (const deck of readdirSync(join("public", "work"))) {
      for (const file of readdirSync(join("public", "work", deck))) {
        expect(
          used.has(`${deck}/${file.replace(/\.webp$/, "")}`),
          `${deck}/${file} is on no slide`,
        ).toBe(true);
      }
    }
  });

  it("say every caption in English and Vietnamese, with its source", () => {
    for (const t of shown) {
      expect(t.en.trim().length, t.en).toBeGreaterThan(0);
      expect(t.vi.trim().length, t.en).toBeGreaterThan(0);
      expect(t.vi, "Vietnamese text is a copy of the English").not.toBe(t.en);
    }
    for (const s of slides)
      expect(s.src.trim().length, s.image).toBeGreaterThan(5);
  });

  it("never name Kwook in what a visitor reads (its screens show Example Co.)", () => {
    for (const t of shown) expect(`${t.en} ${t.vi}`).not.toMatch(/kwook/i);
  });
});
