import { describe, expect, it } from "vitest";
import {
  contactInfo,
  cvMore,
  cvSkills,
  cvSummary,
  cvTitle,
  cvWork,
  education,
  experience,
  inTheWorks,
  type T,
  traits,
} from "./portfolio";

// Every bilingual text the CV renders, so one missing translation or a
// forgotten "[ĐIỀN: …]" placeholder fails here instead of in a sent CV.
const texts: T[] = [
  cvTitle,
  cvSummary,
  ...traits.flatMap((t) => [t.label, t.note]),
  ...cvWork.flatMap((w) => [
    w.title,
    w.status,
    ...w.points,
    ...(w.discuss ?? []),
  ]),
  ...inTheWorks.flatMap((x) => [x.title, x.line]),
  ...cvMore.map((m) => m.line),
  ...cvSkills.map((s) => s.group),
  ...education.flatMap((e) => [e.degree, e.institution, e.location, e.period]),
  ...experience.flatMap((e) => [e.role, e.organization, e.period, ...e.points]),
];

describe("CV content", () => {
  it("has both languages for every text", () => {
    for (const t of texts) {
      expect(t.en.trim()).not.toBe("");
      expect(t.vi.trim()).not.toBe("");
    }
  });

  it("has no unfilled placeholder", () => {
    for (const t of texts) {
      expect(t.en).not.toContain("[ĐIỀN");
      expect(t.vi).not.toContain("[ĐIỀN");
    }
  });

  it("links only to public https pages", () => {
    const urls = [
      ...cvWork.flatMap((w) => (w.url ? [w.url] : [])),
      ...cvMore.map((m) => m.url),
      contactInfo.github,
    ];
    for (const u of urls) expect(u).toMatch(/^https:\/\//);
  });

  it("names a reachable contact", () => {
    expect(contactInfo.email).toMatch(/^[^@\s]+@[^@\s]+$/);
  });
});
