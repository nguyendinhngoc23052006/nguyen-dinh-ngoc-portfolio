export const SITE_URL = "https://nguyendinhngoc.dev";

export const heroSubhead =
  "Custom web apps, dashboards, and automation tools. I solve problems that off-the-shelf software won't. Fast, clean, built to last.";

export const aboutIntro =
  "I study international economics at Foreign Trade University and taught myself the rest — production software, cloud infrastructure, AI-directed engineering. The combination isn't padding, it's leverage. Macroeconomic reasoning for the business case. Creative problem-solving for the jobs no template fits. Infrastructure-deep understanding of the systems the code actually runs on. All three in one head at once. Self-taught means I picked up every tool because I needed it, not because a syllabus said to — hand me a framework I've never seen and I ship with it by the end of the week. I direct AI systems the way most developers use search: as an amplifier on the work, not a substitute for the understanding underneath. Every project on this site is live in production. Open the source and see for yourself.";

export const projectsHeading = "Proof of work — every project is live";
export const projectsSubhead =
  "Not case studies. Not mockups. Tools shipped to production, running right now. Click any card to open it — the source is on GitHub if you want to audit the code.";
export const projectsTail =
  "Follow along on GitHub — more shipping this quarter.";

export const navLinks = [
  { href: "#projects", label: "Projects" },
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#pricing", label: "Pricing" },
  { href: "#process", label: "Process" },
  { href: "#skills", label: "Skills" },
  { href: "/cv", label: "CV" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
];

export const stats = [
  { number: "24h", label: "Response time — always" },
  { number: "1:1", label: "Direct collaboration, no middlemen" },
  { number: "100%", label: "Code ownership — zero lock-in" },
];

export const techMarquee = [
  "Cloudflare Workers",
  "Supabase",
  "Claude Code",
  "TypeScript",
  "MCP",
  "Astro",
  "Svelte",
  "React",
  "Hono",
  "Python",
  "PostgreSQL",
  "GitHub Actions",
  "Anthropic API",
  "Tailwind",
];

export const skills = [
  {
    group: "Cloud-Native",
    items: [
      "Cloudflare Workers",
      "Cloudflare Pages",
      "Supabase",
      "Edge deployment",
    ],
  },
  {
    group: "AI-Directed Engineering",
    items: [
      "Claude Code",
      "Multi-agent orchestration",
      "Custom MCP servers",
      "Spec-driven workflows",
    ],
  },
  {
    group: "Languages",
    items: ["TypeScript", "JavaScript", "Python", "SQL", "HTML / CSS"],
  },
  {
    group: "Frontend",
    items: ["React", "Astro", "Svelte", "Next.js", "Tailwind CSS"],
  },
  {
    group: "Backend & APIs",
    items: ["Node.js", "Hono", "REST APIs", "Webhooks"],
  },
  {
    group: "Ops & Data",
    items: ["GitHub Actions", "PostgreSQL", "Cloudflare KV", "Cloudflare R2"],
  },
];

export const services = [
  {
    title: "Custom Web Applications",
    desc: "Full-stack apps with auth, real-time data, and polished UI — built to your exact spec, from prototype to production.",
    cta: "Let's build yours",
  },
  {
    title: "Automation & Tooling",
    desc: "Internal dashboards, workflow automation, and bespoke tools that save your team hours every week.",
    cta: "Automate something",
  },
  {
    title: "Cloud Infrastructure",
    desc: "CI/CD pipelines, edge deployments, and database architecture — zero-downtime from day one.",
    cta: "Ship faster",
  },
  {
    title: "API Integrations",
    desc: "Payment gateways, third-party services, custom webhooks — connect your tools seamlessly and reliably.",
    cta: "Integrate now",
  },
  {
    title: "Migrations & Refactors",
    desc: "Move off legacy systems safely. Replatform, rewrite, or modernize without downtime or data loss.",
    cta: "Start fresh",
  },
  {
    title: "Development Consulting",
    desc: "Architecture reviews, technical strategy, and hands-on mentoring for your in-house team.",
    cta: "Get expert input",
  },
];

export const pricing = [
  {
    name: "Starter",
    tagline: "Fixed-scope projects · 2–4 weeks",
    priceHint: "from $300",
    features: [
      "Single-feature web app or tool",
      "Full-stack setup (DB to deploy)",
      "One revision round included",
      "30 days of post-launch support",
    ],
    cta: "Get a quote",
    recommended: false,
  },
  {
    name: "Growth",
    tagline: "Custom applications · 4–12 weeks",
    priceHint: "from $1,500",
    features: [
      "Multi-feature application with auth",
      "Real-time features and complex workflows",
      "Unlimited revisions during build",
      "3 months of updates and optimization",
      "API integrations and third-party wiring",
    ],
    cta: "Discuss scope",
    recommended: true,
  },
  {
    name: "Enterprise",
    tagline: "Bespoke software + advisory · custom",
    priceHint: "Custom",
    features: [
      "Fully custom architecture to your spec",
      "Dedicated availability during dev phase",
      "Deep customization and edge cases",
      "6 months of support and iterations",
      "Technical consulting and mentorship",
    ],
    cta: "Start a conversation",
    recommended: false,
  },
];

export const process = [
  {
    num: "01",
    title: "Discovery",
    desc: "We align on goals, constraints, and the exact problem your software solves.",
  },
  {
    num: "02",
    title: "Design & Plan",
    desc: "Architecture, data model, and timeline — you approve before build starts.",
  },
  {
    num: "03",
    title: "Build & Collaborate",
    desc: "Iterative development with transparent progress, revisions, and direct partner access.",
  },
  {
    num: "04",
    title: "Ship & Support",
    desc: "Deploy to production, hand over docs, then ongoing support to keep it running.",
  },
];

export const faq = [
  {
    question: "How do you price projects?",
    answer:
      "Transparent, fixed pricing for defined scope. I quote upfront with zero surprises — you know the cost before we start. Starter projects from $300; custom work discussed during Discovery.",
  },
  {
    question: "How long does a typical project take?",
    answer:
      "Starter work: 2–4 weeks. Growth tier: 4–12 weeks. Enterprise bespoke: timeline set during planning. Speed depends on scope and your feedback cycle, not on artificial compression.",
  },
  {
    question:
      "You studied economics, not computer science. Should that concern me?",
    answer:
      "Wrong frame — it's leverage, not a gap. Economics at Foreign Trade University trained me to reason about incentives, second-order effects, and cost structures before I write a single line. I built the engineering side myself: production Postgres, Cloudflare edge deploys, AI-directed pipelines, the whole stack — because self-taught means I picked up every tool because I needed it, and I understand it end-to-end. The proof is public: every project on this site runs in production with source on GitHub. Click, use, read the code. Software you can actually run is the credential I'm asking to be judged on.",
  },
  {
    question: "Can I customize the tech stack?",
    answer:
      "Yes. If your team prefers specific tools, we adapt — React, Vue, Python, Go, whatever fits. My job is to build what works for you, not impose my preferences.",
  },
  {
    question: "Do I own the code and data?",
    answer:
      "100%. You own every line of code, all databases, credentials, and deployment infrastructure. No lock-in, no escrow — full transparency and control from day one.",
  },
  {
    question: "What if the scope changes mid-project?",
    answer:
      "We handle it cleanly. Growth tier includes unlimited revisions; Starter includes one round. Additional scope becomes a separate mini-project — no surprise bills.",
  },
  {
    question: "What happens after launch?",
    answer:
      "Your tier includes post-launch support (30 days for Starter, 3–6 months for Growth/Enterprise). Beyond that, we can set up an ongoing retainer or you manage it yourself — your call.",
  },
];

export interface Project {
  num: string;
  title: string;
  desc: string;
  tags: string[];
  status?: "shipped";
  url?: string;
  source?: string;
}

export const projects: Project[] = [
  {
    num: "01",
    title: "regex tester",
    desc: "A regex tester where state lives in the URL. Paste, edit, share — anyone opening the link sees exactly what you saw. One HTML file, zero framework; sometimes that's the right call.",
    tags: ["Vanilla JS", "URL state", "Cloudflare Pages"],
    status: "shipped",
    url: "https://regex-tester-6dz.pages.dev",
    source: "https://github.com/nguyendinhngoc23052006/regex-tester",
  },
  {
    num: "02",
    title: "format converter",
    desc: "Convert between JSON, YAML, and TOML in the browser. Two live CodeMirror editors, auto-detected input, and every keystroke saved to the URL — send someone a link, they see exactly what you saw. No server, no data leaves the page.",
    tags: ["Svelte 5", "Vite", "CodeMirror 6", "Cloudflare Pages"],
    status: "shipped",
    url: "https://format-converter-642.pages.dev",
    source: "https://github.com/nguyendinhngoc23052006/format-converter",
  },
  {
    num: "03",
    title: "pdf merger",
    desc: "Merge, reorder, and slice PDFs in the browser. Drag-and-drop stack, first-page thumbnails, per-file page ranges, optional editorial cover page. Strict CSP with connect-src 'none' — files never leave the tab, and DevTools proves it.",
    tags: ["Preact", "Vite", "pdf-lib", "@dnd-kit", "Cloudflare Pages"],
    status: "shipped",
    url: "https://pdf-merger-c6h.pages.dev",
    source: "https://github.com/nguyendinhngoc23052006/pdf-merger",
  },
];

export const contactInfo = {
  email: "nguyendinhngoc23052006@gmail.com",
  github: "https://github.com/nguyendinhngoc23052006",
  location: "Hanoi, Vietnam",
};

export const education = [
  {
    degree: "Bachelor of International Economics",
    institution: "Foreign Trade University (FTU)",
    location: "Hanoi, Vietnam",
    period: "In progress",
  },
];

export const experience: {
  role: string;
  organization: string;
  period: string;
  summary: string;
}[] = [];
