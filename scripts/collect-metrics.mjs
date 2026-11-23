// Measures the systems shown on the CV and writes src/data/metrics.json.
// Every number on the CV and site that describes those systems comes from that
// file, so nothing is typed by hand and every figure can be re-measured.
//
// metrics.json is bundled into the public site, so it holds ONLY the counts the
// texts use: no repository names, commit hashes, paths or workflow names. The
// provenance (repo, commit, branch) is printed here, for the evidence report.
//
// The repos are private and are not available to CI: run this where they are
// checked out side by side on a clean tree, e.g. `node scripts/collect-metrics.mjs ..`.
import { execFileSync } from "node:child_process";
import { existsSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const base = resolve(process.argv[2] ?? "..");
const repos = {
  opsPlatform: { dir: "ops-platform", needs: ["roadmap", "scale"] },
  mauHeritageHub: { dir: "mau-heritage-hub", needs: ["history"] },
  kwookCareer: { dir: "kwook-career", needs: ["history"] },
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

function measure(dir) {
  if (git(dir, "status", "--porcelain"))
    fail(`${dir} has uncommitted changes; measure a clean tree`);
  const files = git(dir, "ls-tree", "-r", "--name-only", "HEAD")
    .split("\n")
    .filter(Boolean);
  const codeTests = files.filter((f) =>
    /\.(test|spec)\.(ts|tsx|js|mjs)$/.test(f),
  );
  // it(...), test(...), Deno.test(...), it.only/skip/concurrent/each: not regex .test( calls.
  const caseRe =
    /(?:\bDeno\.|(?<![.\w]))(?:it|test)(?:\.(?:only|skip|concurrent|each))?\s*[(`]/g;
  const testCases = codeTests.reduce(
    (n, f) => n + (show(dir, f).match(caseRe) ?? []).length,
    0,
  );
  const migrations = files.filter((f) =>
    /^supabase\/migrations\/[^/]+\.sql$/.test(f),
  ).length;
  const workflowCount = files.filter((f) =>
    /^\.github\/workflows\/[^/]+\.ya?ml$/.test(f),
  ).length;
  const reviewAgents = files.filter((f) =>
    /^\.claude\/agents\/[^/]+\.md$/.test(f),
  ).length;
  const skills = files.filter((f) => /(^|\/)SKILL\.md$/.test(f)).length;

  const rmPath = "goals-and-roadmap/roadmap.md";
  const lines = files.includes(rmPath) ? show(dir, rmPath).split("\n") : [];
  const done = lines.filter((l) => /^\s*[-*] \[x\]/.test(l));
  const roadmap = lines.length
    ? {
        done: done.length,
        open: lines.filter((l) => /^\s*[-*] \[ \]/.test(l)).length,
      }
    : null;
  // Load proofs only from items the roadmap marks done.
  const num = (x) => Number(x.replace(/,/g, ""));
  const doneText = done.join("\n");
  const seeded = doneText.match(
    /(\d[\d,]*)-person, (\d[\d,]*)-unit org with a month of door passes is seeded/,
  );
  const saves = doneText.match(
    /Proven on a (\d[\d,]*)-person sample org: every save answers in under a second/,
  );
  const scale =
    seeded && saves
      ? {
          seededPeople: num(seeded[1]),
          seededUnits: num(seeded[2]),
          subSecondSavePeople: num(saves[1]),
        }
      : null;

  const shallow = git(dir, "rev-parse", "--is-shallow-repository") === "true";
  const commits = Number(git(dir, "rev-list", "--count", "HEAD"));
  let history = null;
  if (!shallow && commits > 1) {
    const subjects = git(dir, "log", "--format=%s");
    const prs = new Set(
      [...subjects.matchAll(/(?:\(#|pull request #)(\d+)/g)].map((m) => m[1]),
    ).size;
    const dates = git(dir, "log", "--format=%as").split("\n").sort();
    const days =
      Math.round((Date.parse(dates.at(-1)) - Date.parse(dates[0])) / 864e5) + 1;
    history = { commits, mergedPullRequests: prs, days };
  }
  const provenance = {
    repo: git(dir, "remote", "get-url", "origin").replace(
      /^.*github\.com[/:]|\.git$/g,
      "",
    ),
    branch: git(dir, "rev-parse", "--abbrev-ref", "HEAD"),
    commit: git(dir, "rev-parse", "--short", "HEAD"),
  };
  return {
    metrics: {
      testFiles: codeTests.length,
      testCases,
      migrations,
      workflowCount,
      reviewAgents,
      skills,
      roadmap,
      scale,
      history,
    },
    provenance,
  };
}

const out = { measuredOn: new Date().toISOString().slice(0, 10), systems: {} };
for (const [key, { dir: name, needs }] of Object.entries(repos)) {
  const dir = join(base, name);
  if (!existsSync(join(dir, ".git"))) fail(`missing checkout ${dir}`);
  const { metrics, provenance } = measure(dir);
  for (const field of needs)
    if (metrics[field] == null) fail(`${name}: ${field} could not be measured`);
  out.systems[key] = metrics;
  console.log(
    `${key}: ${provenance.repo} @ ${provenance.branch} ${provenance.commit}`,
  );
}
writeFileSync(
  new URL("../src/data/metrics.json", import.meta.url),
  `${JSON.stringify(out, null, 2)}\n`,
);
console.log(JSON.stringify(out, null, 2));
