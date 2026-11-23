// Reads the figures the CV and site quote about the three private systems
// (speed, scale, legal limits) from each system's own design documents and
// writes src/data/metrics.json, so no figure is typed by hand.
//
// metrics.json is bundled into the public site, so it holds ONLY those
// figures: no repository names, commit hashes or paths. The provenance (repo,
// commit, branch) is printed here, for the evidence report.
//
// The repos are private and are not available to CI: run this where they are
// checked out side by side on a clean tree, e.g. `node scripts/collect-metrics.mjs ..`.
import { execFileSync } from "node:child_process";
import { existsSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const base = resolve(process.argv[2] ?? "..");
const repos = {
  opsPlatform: "ops-platform",
  mauHeritageHub: "mau-heritage-hub",
  kwookCareer: "kwook-career",
};
// Design figures the CV quotes, read from each system's own design documents:
// a completed roadmap step ("- [x]") or goals.md. Each pattern captures the
// figures exactly as written there; if a phrase changes, collection fails
// instead of publishing a stale number.
const designFacts = {
  opsPlatform: [
    [
      "faceMatch",
      "roadmap",
      /(\d[\d,]*)-person org exactly, with the same cut-off, margin and scope, in under (\d+) ms/,
      ["people", "ms"],
    ],
    [
      "events",
      "roadmap",
      /sustained (\d[\d,]*) events a second/,
      ["perSecond"],
    ],
    [
      "onboarding",
      "roadmap",
      /then (\d[\d,]*) people seated in six pastes/,
      ["people"],
    ],
    [
      "links",
      "roadmap",
      /(\d[\d,]*) ended links read a page in about (\d+) ms/,
      ["count", "ms"],
    ],
    [
      "quorum",
      "roadmap",
      /(\d+) to (\d+) other people's confirmation/,
      ["min", "max"],
    ],
    ["breakGlass", "roadmap", /for 1 to (\d+) hours/, ["maxHours"]],
    ["removalWait", "roadmap", /platform's (\d+)-day wait/, ["days"]],
  ],
  mauHeritageHub: [
    [
      "compensationCap",
      "roadmap",
      /deducted at most (\d+)% of pay/,
      ["percent"],
    ],
  ],
  kwookCareer: [
    [
      "rejectedCvKept",
      "roadmap",
      /rejected CV's file is deleted (\d+) days after/,
      ["days"],
    ],
    [
      "closedJobCvKept",
      "roadmap",
      /CVs are deleted (\d+) months after it closes/,
      ["months"],
    ],
    ["blockingLine", "roadmap", /(\d+)% or more/, ["percent"]],
    ["probationPay", "goals", /probation pay at least (\d+)%/, ["percent"]],
  ],
};
const git = (dir, ...a) =>
  execFileSync("git", ["-C", dir, ...a], {
    encoding: "utf8",
    maxBuffer: 1 << 28,
  }).trim();
// Read the committed file at HEAD, never the working tree.
const show = (dir, f) => git(dir, "show", `HEAD:${f}`);
const fail = (msg) => {
  throw new Error(`collect-metrics: ${msg}`);
};
const num = (x) => Number(x.replace(/,/g, ""));

function measure(dir, repoKey) {
  if (git(dir, "status", "--porcelain"))
    fail(`${dir} has uncommitted changes; measure a clean tree`);
  const files = git(dir, "ls-tree", "-r", "--name-only", "HEAD");
  const read = (f) => (files.split("\n").includes(f) ? show(dir, f) : "");
  // A roadmap figure counts only once its step is done ("- [x]").
  const sources = {
    roadmap: read("goals-and-roadmap/roadmap.md")
      .split("\n")
      .filter((l) => /^\s*[-*] \[x\]/.test(l))
      .join("\n"),
    goals: read("goals-and-roadmap/goals.md"),
  };
  const design = {};
  for (const [key, where, re, names] of designFacts[repoKey]) {
    const m = sources[where].match(re);
    if (!m) fail(`${dir}: design fact "${key}" not found in ${where}`);
    design[key] = Object.fromEntries(
      names.map((name, i) => [name, num(m[i + 1])]),
    );
  }
  console.log(
    `${repoKey}: ${git(dir, "remote", "get-url", "origin").replace(/^.*github\.com[/:]|\.git$/g, "")} @ ${git(dir, "rev-parse", "--abbrev-ref", "HEAD")} ${git(dir, "rev-parse", "--short", "HEAD")}`,
  );
  return { design };
}

const out = { measuredOn: new Date().toISOString().slice(0, 10), systems: {} };
for (const [key, name] of Object.entries(repos)) {
  const dir = join(base, name);
  if (!existsSync(join(dir, ".git"))) fail(`missing checkout ${dir}`);
  out.systems[key] = measure(dir, key);
}
writeFileSync(
  new URL("../src/data/metrics.json", import.meta.url),
  `${JSON.stringify(out, null, 2)}\n`,
);
console.log(JSON.stringify(out, null, 2));
