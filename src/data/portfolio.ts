export const SITE_URL =
  "https://nguyen-dinh-ngoc-portfolio.dinhnhuong1969.workers.dev";

export const heroSubhead =
  "Custom web apps, dashboards, and automation tools. I solve problems that off-the-shelf software won't. Fast, clean, built to last.";

export const aboutIntro =
  "I'm a full-stack developer in Hanoi. I build custom software—web apps, dashboards, automation systems—for teams that need something real, not a template. Fast shipping, clean code, no unnecessary bells. That's the standard I hold every project to.";

export const navLinks = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#pricing", label: "Pricing" },
  { href: "#process", label: "Process" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
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
  "TypeScript",
  "React",
  "Next.js",
  "Astro",
  "Tailwind",
  "Node.js",
  "Hono",
  "FastAPI",
  "Cloudflare",
  "Supabase",
  "PostgreSQL",
  "Docker",
];

export const skills = [
  {
    group: "Languages",
    items: ["TypeScript", "JavaScript", "Python", "SQL"],
  },
  {
    group: "Frontend",
    items: ["React", "Next.js", "Astro", "Tailwind CSS"],
  },
  {
    group: "Backend",
    items: ["Node.js", "Express", "Hono", "FastAPI"],
  },
  {
    group: "Cloud & DevOps",
    items: ["Cloudflare Workers", "Supabase", "GitHub Actions", "Docker"],
  },
  {
    group: "Databases",
    items: ["PostgreSQL", "Redis"],
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

export const projects = [
  {
    num: "01",
    title: "Full-Stack Web App",
    desc: "A production-grade application with auth, real-time features, and edge deployment.",
    tags: ["React", "TypeScript", "Supabase", "Cloudflare"],
  },
  {
    num: "02",
    title: "Developer Tooling",
    desc: "CLI and automation tools that streamline development workflows end to end.",
    tags: ["Node.js", "CLI", "GitHub Actions"],
  },
  {
    num: "03",
    title: "Cloud Dashboard",
    desc: "An analytics dashboard with live data, role-based access, and responsive charts.",
    tags: ["Next.js", "PostgreSQL", "Tailwind CSS"],
  },
];

export const contactInfo = {
  email: "nguyendinhngoc23052006@gmail.com",
  github: "https://github.com/nguyendinhngoc23052006",
  location: "Hanoi, Vietnam",
};

export const education = [
  {
    degree: "B.A. International Economics",
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
