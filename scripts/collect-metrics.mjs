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
  opsPlatform: {
    dir: "ops-platform",
    needs: ["roadmap", "history", "reviewAgents"],
  },
  mauHeritageHub: { dir: "mau-heritage-hub", needs: ["history"] },
  kwookCareer: { dir: "kwook-career", needs: ["history"] },
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

function measure(dir, repoKey) {
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
  // Review agents: those defined in the repo, plus those whose signed verdicts
  // the repo keeps (.claude/review/*.json names its reviewer). None found is
  // "not measured" (null), so a repo that needs this fails instead of showing 0.
  const reviewerNames = new Set(
    files
      .filter((f) => /^\.claude\/agents\/[^/.]+\.md$/.test(f))
      .map((f) => f.split("/").pop().replace(/\.md$/, "")),
  );
  for (const f of files.filter((f) =>
    /^\.claude\/review\/[^/]+\.json$/.test(f),
  )) {
    const name = JSON.parse(show(dir, f)).reviewer;
    if (typeof name === "string") reviewerNames.add(name);
  }
  const reviewAgents = reviewerNames.size || null;
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

  const shallow = git(dir, "rev-parse", "--is-shallow-repository") === "true";
  const commits = Number(git(dir, "rev-list", "--count", "HEAD"));
  let history = null;
  let people = new Set();
  if (!shallow && commits > 1) {
    const subjects = git(dir, "log", "--format=%s");
    const prs = new Set(
      [...subjects.matchAll(/(?:\(#|pull request #)(\d+)/g)].map((m) => m[1]),
    ).size;
    const dates = git(dir, "log", "--format=%as").split("\n").sort();
    const days =
      Math.round((Date.parse(dates.at(-1)) - Date.parse(dates[0])) / 864e5) + 1;
    // Who wrote the commits: people, versus the agents they directed. Bots
    // (Dependabot, Actions) are neither.
    const authors = git(dir, "log", "--format=%ae").split("\n");
    const agent = (e) => e === "noreply@anthropic.com";
    people = new Set(authors.filter((e) => !agent(e) && !e.includes("[bot]")));
    const humanAuthors = people.size;
    const agentCommits = authors.filter(agent).length;
    history = {
      commits,
      mergedPullRequests: prs,
      days,
      humanAuthors,
      agentCommits,
    };
  }
  const goalsPath = "goals-and-roadmap/goals.md";
  const sources = {
    roadmap: doneText,
    goals: files.includes(goalsPath) ? show(dir, goalsPath) : "",
  };
  const design = {};
  for (const [key, where, re, names] of designFacts[repoKey] ?? []) {
    const m = sources[where].match(re);
    if (!m) fail(`${dir}: design fact "${key}" not found in ${where}`);
    design[key] = Object.fromEntries(
      names.map((name, i) => [name, num(m[i + 1])]),
    );
  }
  const sqlTestSuites = files.filter((f) =>
    /^supabase\/tests\/[^/]+\.test\.sql$/.test(f),
  ).length;
  const provenance = {
    repo: git(dir, "remote", "get-url", "origin").replace(
      /^.*github\.com[/:]|\.git$/g,
      "",
    ),
    branch: git(dir, "rev-parse", "--abbrev-ref", "HEAD"),
    commit: git(dir, "rev-parse", "--short", "HEAD"),
    people,
  };
  return {
    metrics: {
      testFiles: codeTests.length,
      testCases,
      sqlTestSuites,
      design,
      migrations,
      workflowCount,
      reviewAgents,
      skills,
      roadmap,
      history,
    },
    provenance,
  };
}

const out = {
  measuredOn: new Date().toISOString().slice(0, 10),
  systems: {},
  totals: {},
};
const people = new Set();
for (const [key, { dir: name, needs }] of Object.entries(repos)) {
  const dir = join(base, name);
  if (!existsSync(join(dir, ".git"))) fail(`missing checkout ${dir}`);
  const { metrics, provenance } = measure(dir, key);
  for (const field of needs)
    if (metrics[field] == null) fail(`${name}: ${field} could not be measured`);
  out.systems[key] = metrics;
  for (const p of provenance.people) people.add(p);
  console.log(
    `${key}: ${provenance.repo} @ ${provenance.branch} ${provenance.commit}`,
  );
}
// Across the three systems: commits, the agents' share, merged pull requests,
// and how many different people wrote any of it.
const sum = (f) =>
  Object.values(out.systems).reduce((a, m) => a + m.history[f], 0);
// The CV says "the only human author": make a second author impossible to miss.
if (people.size !== 1)
  console.warn(
    `collect-metrics: ${people.size} human authors: ${[...people].join(", ")}`,
  );
out.totals = {
  commits: sum("commits"),
  agentCommits: sum("agentCommits"),
  mergedPullRequests: sum("mergedPullRequests"),
  humanAuthors: people.size,
};
writeFileSync(
  new URL("../src/data/metrics.json", import.meta.url),
  `${JSON.stringify(out, null, 2)}\n`,
);
console.log(JSON.stringify(out, null, 2));
