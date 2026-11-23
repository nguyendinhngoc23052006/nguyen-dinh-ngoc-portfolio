import { createHash } from "node:crypto";
import { describe, expect, it } from "vitest";
import metrics from "./metrics.json";
import * as portfolio from "./portfolio";
import {
  aboutIntro,
  caseStudies,
  contactInfo,
  cvMore,
  cvSkills,
  cvSummary,
  cvTitle,
  education,
  experience,
  heroSubhead,
  howIShip,
  howIVerify,
  howIWork,
  inTheWorks,
  n,
  shipRules,
  stats,
  type T,
  traits,
} from "./portfolio";

// Every bilingual text the CV renders, so one missing translation or a
// forgotten "[ĐIỀN: …]" placeholder fails here instead of in a sent CV.
const texts: T[] = [
  cvTitle,
  cvSummary,
  ...traits.flatMap((t) => [t.label, t.note]),
  ...caseStudies.flatMap((c) => [
    c.tagline,
    c.status,
    c.problem,
    c.idea,
    ...c.decisions.flatMap((d) => [d.label, d.text]),
    ...c.built,
    ...c.proof,
    c.notYet,
    ...c.discuss,
    ...(c.model?.layers.flatMap((l) => [l.name, ...l.blocks]) ?? []),
  ]),
  ...inTheWorks.flatMap((x) => [x.title, x.line]),
  ...cvMore.map((m) => m.line),
  ...cvSkills.map((s) => s.group),
  ...education.flatMap((e) => [e.degree, e.institution, e.location, e.period]),
  ...experience.flatMap((e) => [e.role, e.organization, e.period, ...e.points]),
  ...howIWork.flatMap((h) => [h.label, h.text]),
  ...howIVerify,
  ...howIShip.flatMap((x) => x.lines),
  ...shipRules,
];

// Figures the texts may state without coming from metrics.json, each with its
// source. Everything else that looks like a number must be a measured count.
const ALLOWED_FIGURES = new Set([
  "123", // face-recognition demo: its documented test set (public repo, linked)
  "91",
  "2025", // Law 91/2025 on personal data
  "2019", // Labour Code 2019
  "08",
  "09",
  "11",
  "2026", // employment periods, e.g. 09/2026 – 11/2026
]);
const measuredFigures = { en: new Set<string>(), vi: new Set<string>() };
(function collect(v: unknown): void {
  if (typeof v === "number")
    for (const lang of ["en", "vi"] as const)
      measuredFigures[lang].add(n(v, lang));
  else if (v && typeof v === "object") Object.values(v).forEach(collect);
})({ systems: metrics.systems, totals: metrics.totals });
for (const lang of ["en", "vi"] as const)
  measuredFigures[lang].add(n(Object.keys(metrics.systems).length, lang));

// The private orchestration setup is never named. Only hashes of its name are
// kept here, so this test cannot publish what it guards.
const PRIVATE_NAME_HASHES = new Set([
  "47a941d9570f0153a00e0ed5d92bb6e993e10552a79d55e0dce2bb80cf8ec977",
  "12c5360749b570c480314bb7ac0ee24c33e4a182a30152f2431c92e63d9ca6f4",
]);
const sha = (x: string) => createHash("sha256").update(x).digest("hex");
function namesPrivateSetup(text: string): boolean {
  const tokens = text
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter(Boolean);
  for (let i = 0; i < tokens.length; i++)
    for (let w = 2; w <= 3 && i + w <= tokens.length; w++)
      if (PRIVATE_NAME_HASHES.has(sha(tokens.slice(i, i + w).join("-"))))
        return true;
  return false;
}

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
      ...cvMore.flatMap((m) => [m.links.live, m.links.source]),
      contactInfo.github,
    ].filter((u): u is string => Boolean(u));
    for (const u of urls) expect(u).toMatch(/^https:\/\//);
  });

  it("takes every figure from metrics.json, in the text's own language", () => {
    const pairs: [string, "en" | "vi"][] = [
      ...texts.flatMap((t): [string, "en" | "vi"][] => [
        [t.en, "en"],
        [t.vi, "vi"],
      ]),
      ...stats.flatMap((s): [string, "en" | "vi"][] => [
        [s.number, "en"],
        [s.label, "en"],
      ]),
      [heroSubhead, "en"],
      [aboutIntro, "en"],
    ];
    // A digit inside a word ("i18n") is part of a name, not a quantity.
    for (const [text, lang] of pairs)
      for (const figure of text.match(
        /(?<!\p{L})\d(?:[\d.,]*\d)?(?!\p{L})/gu,
      ) ?? [])
        expect(
          measuredFigures[lang].has(figure) || ALLOWED_FIGURES.has(figure),
          `"${figure}" (${lang}) in: ${text}`,
        ).toBe(true);
  });

  it("publishes only counts and the measurement date in metrics.json", () => {
    expect(metrics.measuredOn).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    (function check(v: unknown, path: string): void {
      if (v === null || typeof v === "number") return;
      if (v && typeof v === "object") {
        for (const [k, x] of Object.entries(v)) check(x, `${path}.${k}`);
        return;
      }
      throw new Error(
        `${path} is ${JSON.stringify(v)}: only counts may be published`,
      );
    })({ systems: metrics.systems, totals: metrics.totals }, "metrics");
    const s = metrics.systems;
    expect(s.opsPlatform.roadmap).not.toBeNull();
    expect(s.opsPlatform.scale).not.toBeNull();
    expect(s.mauHeritageHub.history).not.toBeNull();
    expect(s.kwookCareer.history).not.toBeNull();
  });

  it("never names the private orchestration setup", () => {
    const everything = JSON.stringify({ portfolio, metrics });
    expect(namesPrivateSetup(everything)).toBe(false);
  });

  // Ops Platform, Mau Heritage Hub and Kwook-career run on private company
  // data: described, never linked. Every public project links its source.
  it("links every public project's source and no private system", () => {
    for (const c of caseStudies)
      expect(JSON.stringify(c), c.name).not.toMatch(/https?:\/\//);
    for (const m of cvMore)
      expect(m.links.source).toMatch(/^https:\/\/github\.com\//);
  });

  // Every design claim names where in its system's own documents it comes
  // from, so a reviewer can check it line by line.
  it("cites a source for every design claim", () => {
    for (const c of caseStudies)
      for (const claim of [
        c.problem,
        c.idea,
        ...c.decisions.map((d) => d.text),
        ...c.built,
        ...c.proof,
        c.notYet,
      ])
        expect(claim.src, claim.en).toMatch(
          /^(goals (§|\()|roadmap [BCS(]|metrics \(repository\)$)/,
        );
    for (const c of caseStudies)
      if (c.model) expect(c.model.src, c.name).toMatch(/^goals §/);
  });

  // The summary says "the only human author"; the measurement must agree.
  it("has exactly one human author across the systems", () => {
    expect(metrics.totals.humanAuthors).toBe(1);
  });

  it("names a reachable contact", () => {
    expect(contactInfo.email).toMatch(/^[^@\s]+@[^@\s]+$/);
  });

  // Kwook's confidentiality agreement covers its internal figures, and the
  // user left Kwook in Nov 2026: neither may creep back into a public page.
  it("keeps Kwook's internal figures off and its work in the past", () => {
    const all = [
      heroSubhead,
      aboutIntro,
      ...stats.flatMap((s) => [s.number, s.label]),
      ...texts.flatMap((t) => [t.en, t.vi]),
    ].join("\n");
    for (const figure of [
      "79 staff",
      "79 nhân",
      "10 departments",
      "10 bộ phận",
      "2,212",
      "2.212",
      "349",
      "2,284",
      "2.284",
      "KW-",
    ])
      expect(all).not.toContain(figure);
    const kwook = experience.find((e) => e.organization.en.startsWith("Kwook"));
    expect(kwook?.period.en).not.toMatch(/present/i);
    expect(kwook?.period.vi).not.toMatch(/nay/);
  });
});
