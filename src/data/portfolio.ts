import metrics from "./metrics.json";

export const SITE_URL = "https://nguyendinhngoc.dev";

export const heroSubhead =
  "I build the systems a company runs on: people and records, face-recognition attendance, recruitment and payroll, on Supabase + Cloudflare, with AI as my engineering team. Three of them have run real businesses.";

export const aboutIntro =
  "I study international economics at Foreign Trade University and taught myself the rest — production software, cloud infrastructure, AI-directed engineering. The combination isn't padding, it's leverage. Macroeconomic reasoning for the business case. Creative problem-solving for the jobs no template fits. Infrastructure-deep understanding of the systems the code actually runs on. All three in one head at once. Self-taught means I picked up every tool because I needed it, not because a syllabus said to — hand me a framework I've never seen and I ship with it by the end of the week. I direct AI systems the way most developers use search: as an amplifier on the work, not a substitute for the understanding underneath. The public projects here are live: open them. The systems companies run on are private, and I'll gladly walk you through them.";

// ---------------------------------------------------------------------------
// CV content — the only source for /cv (English) and /cv/vi (Vietnamese) and
// their PDFs. Each text is { en, vi } so both languages come from one entry.
// "[ĐIỀN: …]" marks a fact the owner has not supplied yet; the CV page shows
// it highlighted and the PDF build refuses to call such a CV final.
// ---------------------------------------------------------------------------
export type Lang = "en" | "vi";
export type T = Record<Lang, string>;

// Every figure about the systems comes from metrics.json, written by
// scripts/collect-metrics.mjs from the repositories themselves. Never type a
// figure into the texts below; read it from metrics and format it with n().
export const measuredOn = metrics.measuredOn;
export const n = (x: number, lang: Lang) =>
  x.toLocaleString(lang === "en" ? "en-US" : "vi-VN");
// scripts/collect-metrics.mjs refuses to write metrics.json unless every field
// read here (roadmap and scale for Ops Platform, history for the other two) exists.
const ops = metrics.systems.opsPlatform;
const mau = metrics.systems.mauHeritageHub;
const kwc = metrics.systems.kwookCareer;
const opsRoadmap = ops.roadmap;
const opsScale = ops.scale;
const kwcHistory = kwc.history;
const mauHistory = mau.history;

export const cvTitle: T = {
  en: "AI-native builder — internal systems on Supabase + Cloudflare",
  vi: "Xây hệ thống vận hành bằng AI — Supabase + Cloudflare",
};

export const cvSummary: T = {
  en: "I design, build and run the systems a business operates on: people and records, face-recognition attendance, recruitment and payroll. Built alone on Supabase and Cloudflare with Claude Code, under tests and CI gates. Three of my systems have run real companies: Ops Platform and Kwook-career at Kwook, and Mau Heritage Hub, which Mau Heritage rents from me and runs its stores on. I write the procedures as well as the software, and check numbers to the đồng. Disciplined and always thinking ahead. Studying international economics at Foreign Trade University, Hanoi.",
  vi: "Tôi thiết kế, xây dựng và vận hành các hệ thống mà doanh nghiệp chạy hằng ngày: nhân sự và hồ sơ, chấm công nhận diện khuôn mặt, tuyển dụng và tiền lương. Một mình xây dựng trên Supabase và Cloudflare bằng Claude Code, với kiểm thử và kiểm tra tự động. Ba hệ thống của tôi đã vận hành doanh nghiệp thật: Ops Platform và Kwook-career tại Kwook, và Mau Heritage Hub, được Mau Heritage thuê để vận hành chuỗi cửa hàng. Tôi viết cả quy trình lẫn phần mềm, và đối chiếu số liệu đến từng đồng. Kỷ luật cao và luôn suy nghĩ trước. Đang học Kinh tế quốc tế tại Đại học Ngoại thương, Hà Nội.",
};

// Traits shown on the CV.
export const traits: { label: T; note: T }[] = [
  {
    label: { en: "Data first", vi: "Dữ liệu làm gốc" },
    note: {
      en: "One source for every fact, every derived number reproducible and traced back to it.",
      vi: "Mỗi thông tin chỉ có một nguồn; mọi con số tính ra đều tái lập được và truy được về nguồn.",
    },
  },
  {
    label: { en: "Built to grow", vi: "Xây để mở rộng" },
    note: {
      en: "Systems a company configures instead of rewriting: a new process becomes a setting, not a software project.",
      vi: "Hệ thống để doanh nghiệp tự cấu hình thay vì viết lại: quy trình mới là một thiết lập, không phải một dự án phần mềm.",
    },
  },
  {
    label: { en: "Knows the business", vi: "Hiểu nghiệp vụ" },
    note: {
      en: "Vietnamese labour, social-insurance and personal-income-tax rules applied in real payroll; reads accounts and operations, not just code.",
      vi: "Áp dụng Bộ luật Lao động, BHXH và thuế TNCN vào bảng lương thực tế; đọc được số liệu kế toán, vận hành chứ không chỉ code.",
    },
  },
  {
    label: { en: "AI in the real workflow", vi: "AI trong công việc thật" },
    note: {
      en: "Claude Code with written specs, review agents and CI gates; I check what the AI produces before it ships.",
      vi: "Claude Code với đặc tả rõ ràng, agent rà soát và kiểm tra CI; tôi kiểm tra kỹ những gì AI làm ra trước khi đưa vào dùng.",
    },
  },
];

// Where a public project can be seen and read. `live` is left out until its
// address is known; a guessed link that 404s is worse than none.
export interface ProjectLinks {
  live?: string;
  source: string;
}

export interface CvWork {
  title: T;
  status: T;
  points: T[];
  tags: string[];
  // Public projects only: the live site (when it has one) and the source.
  // Ops Platform, Mau Heritage Hub and Kwook-career are private: never linked.
  links?: ProjectLinks;
  // Private systems: what I can walk an interviewer through, shown on the site.
  discuss?: T[];
}

// Selected work for the CV. Private systems are described, never linked.
// Employers are named; their internal data and figures never appear.
export const cvWork: CvWork[] = [
  {
    title: {
      en: "Ops Platform — run a company from one configurable app",
      vi: "Ops Platform — vận hành doanh nghiệp trên một ứng dụng tự cấu hình",
    },
    status: {
      en: "Used daily at Kwook, Sep – Nov 2026; mine, still developing",
      vi: "Dùng hằng ngày tại Kwook, 09–11/2026; của tôi, đang phát triển tiếp",
    },
    points: [
      {
        en: "At Kwook, HR and I ran employee profiles on it, kept forms, files and regulations as records, and tracked each asset against the employee holding it.",
        vi: "Tại Kwook, bộ phận nhân sự và tôi quản lý hồ sơ nhân viên trên đó, lưu biểu mẫu, tài liệu và quy chế của công ty thành hồ sơ, và theo dõi từng tài sản gắn với người đang giữ.",
      },
      {
        en: "Configured, not rewritten: an org creates its own record types and fields (files, formulas, conditional fields), lifecycles with guarded transitions, links between any records, document numbers and required documents, all inside the app.",
        vi: "Cấu hình thay vì viết lại: doanh nghiệp tự tạo loại hồ sơ và trường (tệp, công thức, trường theo điều kiện), vòng đời với điều kiện chuyển bước, liên kết giữa mọi hồ sơ, số văn bản và giấy tờ bắt buộc, ngay trong ứng dụng.",
      },
      {
        en: "Face-recognition attendance end to end: a phone becomes a door camera when a manager scans its QR, with no account or password; a person enrols with a three-pose scan that proves a live head; door events become check-ins and check-outs, every correction logged.",
        vi: "Chấm công khuôn mặt trọn vẹn: điện thoại thành camera cửa khi quản lý quét mã QR, không cần tài khoản hay mật khẩu; nhân viên đăng ký bằng quét ba góc kèm kiểm tra người thật; sự kiện ở cửa thành check-in/check-out, mọi chỉnh sửa được ghi lại.",
      },
      {
        en: "Authority comes from the org chart: privileges granted to jobs and seats and checked by one function every policy and screen calls, with maker-checker, separation of duties and break-glass.",
        vi: "Quyền hạn đi theo sơ đồ tổ chức: quyền cấp cho chức danh và vị trí, mọi chính sách và màn hình dùng chung một hàm kiểm tra, có duyệt hai người, tách nhiệm vụ xung đột và quyền khẩn cấp.",
      },
      {
        en: `${n(opsRoadmap.done, "en")} roadmap steps shipped, ${n(ops.testCases, "en")} test cases in ${n(ops.testFiles, "en")} files; a ${n(opsScale.seededPeople, "en")}-person, ${n(opsScale.seededUnits, "en")}-unit org seeded and checked in CI; deny-by-default row-level security; nothing deleted, with retention, legal hold and erasure.`,
        vi: `${n(opsRoadmap.done, "vi")} hạng mục lộ trình đã hoàn thành, ${n(ops.testCases, "vi")} ca kiểm thử trong ${n(ops.testFiles, "vi")} tệp; dữ liệu mẫu một tổ chức ${n(opsScale.seededPeople, "vi")} người, ${n(opsScale.seededUnits, "vi")} đơn vị được nạp và kiểm tra trong CI; phân quyền theo dòng mặc định từ chối truy cập; dữ liệu không bị xóa, kèm cơ chế lưu trữ theo thời hạn, phong tỏa pháp lý và xóa theo yêu cầu.`,
      },
    ],
    discuss: [
      {
        en: "How an org adds a new kind of record, with its own fields and rules, without code",
        vi: "Cách doanh nghiệp thêm loại hồ sơ mới, với trường và quy tắc riêng, không cần code",
      },
      {
        en: "From pairing a door camera to a person's check-in: the whole face-recognition flow",
        vi: "Từ ghép camera cửa đến lượt check-in của một người: toàn bộ luồng nhận diện khuôn mặt",
      },
      {
        en: "How the privilege model keeps every power traceable to a seat on the org chart",
        vi: "Cách mô hình phân quyền giữ mọi quyền hạn truy được về một vị trí trên sơ đồ tổ chức",
      },
      {
        en: "A live walkthrough on demo data",
        vi: "Trình diễn trực tiếp trên dữ liệu mẫu",
      },
    ],
    tags: [
      "Supabase",
      "Postgres RLS",
      "Edge Functions",
      "Cloudflare Workers",
      "React",
      "TypeScript",
      "ONNX face recognition",
    ],
  },
  {
    title: {
      en: "Kwook-career — recruitment run from a Telegram bot",
      vi: "Kwook-career — tuyển dụng vận hành qua bot Telegram",
    },
    status: { en: "In production", vi: "Đang chạy thực tế" },
    points: [
      {
        en: "Standardised Kwook's hiring: from a brief the bot drafts the post, publishes it to the Facebook Page, answers comments and collects CVs (files or photos) on the jobs website.",
        vi: "Chuẩn hóa tuyển dụng tại Kwook: từ một mô tả ngắn, bot soạn tin tuyển dụng, đăng lên Fanpage, trả lời bình luận và nhận hồ sơ, CV (tệp hoặc ảnh chụp) qua trang việc làm.",
      },
      {
        en: "Ranks every CV line by line against the job's checklist, quoting the CV; fixed rules, not the AI, sort candidates into Call / Consider / Reject, so the same CV always gets the same result.",
        vi: "Chấm từng CV theo từng tiêu chí của vị trí, trích dẫn đúng câu trong CV; quy tắc cố định, không phải AI, xếp ứng viên vào Nên gọi / Cân nhắc / Loại, nên cùng một CV luôn ra cùng một kết quả.",
      },
      {
        en: "Schedules interviews (candidates pick a time from an email link, with reminders), fills contracts from the company's own Word forms with legal pay floors enforced, and deletes candidates' data on a schedule.",
        vi: "Xếp lịch phỏng vấn (ứng viên tự chọn giờ qua email, có nhắc lịch), điền hợp đồng từ mẫu Word của công ty với mức lương tối thiểu theo luật được kiểm tra, và tự xóa dữ liệu ứng viên theo hạn.",
      },
      {
        en: `Built in ${n(kwcHistory.days, "en")} days: ${n(kwcHistory.commits, "en")} commits and ${n(kwcHistory.mergedPullRequests, "en")} merged pull requests, ${n(kwc.testCases, "en")} test cases, ${n(kwc.migrations, "en")} database migrations.`,
        vi: `Hoàn thành trong ${n(kwcHistory.days, "vi")} ngày: ${n(kwcHistory.commits, "vi")} commit và ${n(kwcHistory.mergedPullRequests, "vi")} pull request đã được gộp, ${n(kwc.testCases, "vi")} ca kiểm thử, ${n(kwc.migrations, "vi")} migration cơ sở dữ liệu.`,
      },
    ],
    discuss: [
      {
        en: "How CV ranking stays consistent and explainable when an AI reads the CV",
        vi: "Cách giữ việc xếp hạng CV nhất quán và giải thích được khi AI đọc CV",
      },
      {
        en: "A walkthrough of the bot, from posting a job to an offer",
        vi: "Trình diễn bot, từ đăng tin đến gửi thư mời nhận việc",
      },
    ],
    tags: [
      "Telegram Bot API",
      "Supabase Edge Functions",
      "LLM",
      "Make",
      "Cloudflare Pages",
    ],
  },
  {
    title: {
      en: "Mau Heritage Hub — store operations & payroll",
      vi: "Mau Heritage Hub — vận hành cửa hàng & tiền lương",
    },
    status: {
      en: "My product, rented to Mau Heritage; in production",
      vi: "Sản phẩm của tôi, Mau Heritage đang thuê; đang chạy thực tế",
    },
    points: [
      {
        en: "Staff need no account: a profile opens by face or code and PIN on their phone, for shift sign-up, face and location check-in, end-of-day cash logs and payslips.",
        vi: "Nhân viên không cần tài khoản: mở hồ sơ bằng khuôn mặt hoặc mã và PIN trên điện thoại để đăng ký ca, chấm công khuôn mặt và vị trí, nhập sổ tiền cuối ngày và xem phiếu lương.",
      },
      {
        en: "The owner configures pay rules (KPI, meals, night, overtime and holiday pay at Labour Code minimums) and runs the monthly payroll with arrears; face data only with consent (Law 91/2025); nightly encrypted backups; every migration replayed in tests.",
        vi: "Chủ cửa hàng tự cấu hình quy tắc lương (KPI, ăn ca, làm đêm, tăng ca, ngày lễ theo mức tối thiểu của BLLĐ) và chạy kỳ lương có truy lĩnh; dữ liệu khuôn mặt chỉ khi có đồng ý (Luật 91/2025); sao lưu mã hóa hằng đêm; kiểm thử chạy lại mọi migration.",
      },
      {
        en: `${n(mauHistory.commits, "en")} commits and ${n(mauHistory.mergedPullRequests, "en")} merged pull requests; all ${n(mau.migrations, "en")} migrations replayed on an empty database in every test run; ${n(mau.testCases, "en")} test cases.`,
        vi: `${n(mauHistory.commits, "vi")} commit và ${n(mauHistory.mergedPullRequests, "vi")} pull request đã được gộp; toàn bộ ${n(mau.migrations, "vi")} migration được chạy lại trên cơ sở dữ liệu trống ở mỗi lần kiểm thử; ${n(mau.testCases, "vi")} ca kiểm thử.`,
      },
    ],
    discuss: [
      {
        en: "The pay-rule engine: KPI, night, overtime, holiday pay and arrears",
        vi: "Bộ quy tắc lương: KPI, làm đêm, tăng ca, ngày lễ và truy lĩnh",
      },
      {
        en: "How a non-technical owner configures everything in the app",
        vi: "Cách chủ cửa hàng không rành kỹ thuật tự cấu hình mọi thứ trong ứng dụng",
      },
    ],
    tags: ["Supabase", "Cloudflare Pages", "PWA", "Playwright", "i18n"],
  },
  {
    title: {
      en: "Face recognition in the browser",
      vi: "Nhận diện khuôn mặt chạy trong trình duyệt",
    },
    status: { en: "Public demo", vi: "Bản demo công khai" },
    points: [
      {
        en: "OpenCV YuNet + SFace in one browser tab, no server; match thresholds tuned on 123 people across six ethnic groups and set by the worst-served group; rejects duplicates and impostors under a known name.",
        vi: "OpenCV YuNet + SFace trong một tab trình duyệt, không cần máy chủ; ngưỡng nhận diện hiệu chỉnh trên 123 người thuộc sáu nhóm dân tộc, chọn theo nhóm khó nhất; chặn người trùng và người mạo danh.",
      },
    ],
    tags: ["OpenCV.js", "Computer vision", "TypeScript"],
    links: {
      source:
        "https://github.com/nguyendinhngoc23052006/demo-computer-vision-nhom-10",
    },
  },
];

// More shipped projects, one line each on the CV (public, so linked).
export const cvMore: { title: string; line: T; links: ProjectLinks }[] = [
  {
    title: "Nguyễn Ngọc Anh — portfolio",
    line: {
      en: "Bilingual scrollytelling site: one silk thread drawn live through every chapter (GSAP DrawSVG/MotionPath, Lenis), synthesised sound, hidden easter eggs, reduced-motion safe.",
      vi: "Portfolio kể chuyện theo cuộn trang, song ngữ: một sợi tơ vẽ xuyên suốt mọi chương (GSAP DrawSVG/MotionPath, Lenis), âm thanh tự tổng hợp, easter egg, an toàn với chế độ giảm chuyển động.",
    },
    links: {
      source:
        "https://github.com/nguyendinhngoc23052006/Portfolio-for-Ngoc-Anh",
    },
  },
  {
    title: "Dinh Ngoc Edu",
    line: {
      en: "Upload a subject's materials and AI builds a Duolingo-style course with verified questions and mock tests; React + Supabase (Auth, Storage, Edge Functions, RLS).",
      vi: "Tải tài liệu môn học lên, AI tạo khóa học kiểu Duolingo với câu hỏi đã kiểm chứng và đề thi thử; React + Supabase (Auth, Storage, Edge Functions, RLS).",
    },
    links: {
      live: "https://dinhngocedu.vercel.app",
      source: "https://github.com/nguyendinhngoc23052006/Dinh-Ngoc-Edu",
    },
  },
  {
    title: "Nguyễn Lê Khánh — portfolio",
    line: {
      en: "Bilingual scrollytelling portfolio for a conservation-project candidate: nine narrative beats pinned to the scroll, GSAP ScrollTrigger, i18n with no copy in JSX.",
      vi: "Portfolio song ngữ kể chuyện theo cuộn trang cho ứng viên dự án bảo tồn: chín phân cảnh ghim theo cuộn, GSAP ScrollTrigger, đa ngôn ngữ không viết cứng chữ trong code.",
    },
    links: {
      live: "https://nguyen-le-khanh-portfolio.pages.dev",
      source:
        "https://github.com/nguyendinhngoc23052006/nguyen-le-khanh-portfolio",
    },
  },
  {
    title: "saasmath",
    line: {
      en: "Calculators for SaaS founders (runway, burn multiple, LTV/CAC, dilution) with shareable URL state and cited formulas.",
      vi: "Bộ máy tính cho nhà sáng lập SaaS (runway, burn multiple, LTV/CAC, pha loãng cổ phần), chia sẻ kết quả qua đường link, công thức có trích nguồn.",
    },
    links: {
      live: "https://saasmath.pages.dev",
      source: "https://github.com/nguyendinhngoc23052006/saasmath",
    },
  },
];

// Designs in progress, shown on the site only; details on request.
export const inTheWorks: { title: T; line: T }[] = [
  {
    title: { en: "AI visor", vi: "Kính AI đeo đầu" },
    line: {
      en: "A head-worn visor that labels what is in view, gives step-by-step guidance on a captured photo, and translates a two-person conversation, with the owner's own AI providers. Hardware, firmware and app designed together.",
      vi: "Kính đeo đầu gắn nhãn những gì đang nhìn, hướng dẫn từng bước từ ảnh chụp và dịch hội thoại hai người, dùng nhà cung cấp AI của chính chủ máy. Thiết kế đồng thời phần cứng, firmware và ứng dụng.",
    },
  },
  {
    title: { en: "Firmware hub", vi: "Trung tâm firmware" },
    line: {
      en: "A private store for every device's firmware releases: flash a board from the browser, register each device with its own credential, and let devices update themselves with signed releases.",
      vi: "Kho riêng cho mọi bản phát hành firmware: nạp firmware từ trình duyệt, đăng ký từng thiết bị với khóa riêng, và cho thiết bị tự cập nhật bằng bản phát hành có chữ ký.",
    },
  },
];

// Skills shown on the CV, grouped by what a hiring team looks for.
export const cvSkills: { group: T; items: string[] }[] = [
  {
    group: { en: "Backend & data", vi: "Backend & dữ liệu" },
    items: [
      "Supabase",
      "PostgreSQL",
      "Row-level security",
      "Migrations",
      "Edge Functions",
      "SQL",
    ],
  },
  {
    group: { en: "Cloud & delivery", vi: "Cloud & triển khai" },
    items: [
      "Cloudflare Workers / Pages",
      "GitHub Actions CI/CD",
      "Preview environments",
      "Backups",
    ],
  },
  {
    group: { en: "Frontend", vi: "Frontend" },
    items: ["TypeScript", "React", "Astro", "Tailwind CSS", "PWA"],
  },
  {
    group: { en: "AI & computer vision", vi: "AI & thị giác máy tính" },
    items: [
      "Claude Code",
      "MCP",
      "Review agents",
      "OpenCV (YuNet, SFace)",
      "Face recognition",
    ],
  },
  {
    group: { en: "Data & reporting", vi: "Dữ liệu & báo cáo" },
    items: [
      "Python",
      "Excel / openpyxl",
      "Reconciliation",
      "Playwright",
      "Vitest",
    ],
  },
  {
    group: { en: "Business domain", vi: "Nghiệp vụ" },
    items: [
      "HR & payroll",
      "Labour Code 2019",
      "Social insurance",
      "Personal income tax",
      "Asset handover",
    ],
  },
];

// ---------------------------------------------------------------------------
// How I work, verify and ship. The orchestration setup itself is private: it is
// described here only by the kind of mechanism, never named or linked.
// ---------------------------------------------------------------------------
export const howIWork: { label: T; text: T }[] = [
  {
    label: { en: "A written rulebook", vi: "Bộ quy tắc thành văn" },
    text: {
      en: "Every agent loads the same rules at the start of a session: scope, conventions, what needs my approval and what counts as done.",
      vi: "Mọi agent đều nạp cùng một bộ quy tắc khi bắt đầu phiên làm việc: phạm vi, quy ước, những việc cần tôi phê duyệt và tiêu chí hoàn thành.",
    },
  },
  {
    label: { en: "Plan before code", vi: "Lập kế hoạch trước khi viết mã" },
    text: {
      en: "Each change starts as a written plan with acceptance criteria. Building starts only after I approve it.",
      vi: "Mỗi thay đổi bắt đầu bằng một kế hoạch có tiêu chí nghiệm thu rõ ràng. Việc triển khai chỉ bắt đầu sau khi tôi phê duyệt.",
    },
  },
  {
    label: { en: "Hooks that enforce it", vi: "Hook bảo đảm quy trình" },
    text: {
      en: "Hooks hold that order: until a plan is approved, an agent may read and plan, and its edits and commands are blocked.",
      vi: "Các hook duy trì đúng trình tự đó: khi kế hoạch chưa được phê duyệt, agent chỉ được đọc và lập kế hoạch; các thao tác chỉnh sửa và chạy lệnh đều bị chặn.",
    },
  },
  {
    label: { en: "Specialist reviewers", vi: "Agent rà soát chuyên trách" },
    text: {
      en: `Review agents check each change for security, code quality, scale and the accuracy of what it claims. Ops Platform runs ${n(ops.reviewAgents, "en")} of them alongside ${n(ops.skills, "en")} skills.`,
      vi: `Các agent rà soát kiểm tra từng thay đổi về bảo mật, chất lượng mã, khả năng mở rộng và độ chính xác của nội dung được nêu. Riêng Ops Platform sử dụng ${n(ops.reviewAgents, "vi")} agent rà soát cùng ${n(ops.skills, "vi")} skill.`,
    },
  },
  {
    label: {
      en: "Evidence before a pull request",
      vi: "Mở pull request khi đã có bằng chứng",
    },
    text: {
      en: "Scripts hold back a pull request until the evidence exists: test results, step-by-step screenshots and a report I read myself.",
      vi: "Các script chỉ cho phép mở pull request khi đã có đủ bằng chứng: kết quả kiểm thử, ảnh chụp màn hình từng bước và một báo cáo do chính tôi trực tiếp xem xét.",
    },
  },
  {
    label: {
      en: "A human merges",
      vi: "Con người là người quyết định cuối cùng",
    },
    text: {
      en: "CI is the last gate, and I merge by hand. Agents propose; they do not merge or deploy.",
      vi: "CI là bước kiểm tra cuối cùng, và việc gộp mã do chính tôi thực hiện. Agent chỉ đề xuất, không tự động gộp mã hoặc triển khai.",
    },
  },
];

export const howIVerify: T[] = [
  {
    en: `Tests written to fail when the feature breaks: ${n(ops.testCases, "en")} test cases on Ops Platform, ${n(kwc.testCases, "en")} on Kwook-career, ${n(mau.testCases, "en")} on Mau Heritage Hub.`,
    vi: `Kiểm thử được viết để phát hiện lỗi ngay khi tính năng gặp sự cố: ${n(ops.testCases, "vi")} ca kiểm thử trên Ops Platform, ${n(kwc.testCases, "vi")} trên Kwook-career, ${n(mau.testCases, "vi")} trên Mau Heritage Hub.`,
  },
  {
    en: `Every database migration replayed on an empty Postgres in each test run (all ${n(mau.migrations, "en")} on Mau Heritage Hub), then the guarantees checked: append-only history, face consent, lawful pay.`,
    vi: `Mọi migration cơ sở dữ liệu được chạy lại trên một Postgres trống ở mỗi lần kiểm thử (toàn bộ ${n(mau.migrations, "vi")} migration của Mau Heritage Hub), sau đó kiểm tra các bảo đảm: lịch sử chỉ được ghi thêm, sự đồng ý sử dụng dữ liệu khuôn mặt, tiền lương đúng quy định pháp luật.`,
  },
  {
    en: "The whole app walked through in a real browser with Playwright, a screenshot at every step, collected into a report.",
    vi: "Toàn bộ ứng dụng được chạy thử trên trình duyệt thật bằng Playwright, chụp ảnh ở từng bước và tổng hợp thành báo cáo.",
  },
  {
    en: "I check the artefact, not the agent's summary: the diff, the test output, the running preview.",
    vi: "Tôi kiểm tra trực tiếp sản phẩm thực tế chứ không chỉ dựa vào bản tóm tắt của agent: phần mã thay đổi (diff), kết quả kiểm thử và bản xem trước đang chạy.",
  },
  {
    en: `Load proven before it is claimed: a ${n(opsScale.seededPeople, "en")}-person org seeded and checked in CI, and every save answering in under a second on a ${n(opsScale.subSecondSavePeople, "en")}-person sample org.`,
    vi: `Khả năng chịu tải được kiểm chứng trước khi nêu trong tài liệu: dữ liệu mẫu ${n(opsScale.seededPeople, "vi")} người được nạp và kiểm tra trong CI, và mọi thao tác lưu đều phản hồi trong vòng dưới một giây trên tổ chức mẫu ${n(opsScale.subSecondSavePeople, "vi")} người.`,
  },
  {
    en: "Where output cannot be unit-tested, a read-back gate: for an AI-voiced course, every generated sentence was transcribed back and compared with the script, and failing takes were regenerated.",
    vi: "Với những kết quả không thể kiểm thử tự động, tôi áp dụng bước đối chiếu ngược (read-back): trong một khóa học lồng tiếng bằng AI, từng câu được chuyển lại thành văn bản để so với kịch bản, và những đoạn chưa đạt được tạo lại.",
  },
];

export const howIShip: { system: string; lines: T[] }[] = [
  {
    system: "Ops Platform",
    lines: [
      {
        en: "Every change moves from a working branch to a pull request, into staging, then by a second pull request into main. Each pull request gets its own preview: an isolated database branch with the migrations applied, and its own URL.",
        vi: "Mỗi thay đổi đi từ nhánh làm việc qua pull request vào môi trường staging, rồi qua một pull request thứ hai vào main. Mỗi pull request có bản xem trước riêng: một nhánh cơ sở dữ liệu độc lập đã áp dụng migration, kèm đường dẫn riêng.",
      },
      {
        en: `Staging deploys on merge; production sits behind a gate check, with rollback, nightly backup and scale-test workflows (${n(ops.workflowCount, "en")} workflows in all). Production is not live yet.`,
        vi: `Staging được tự động triển khai khi gộp mã; production có bước kiểm tra cổng (gate check) trước khi phát hành, cùng các workflow hoàn tác (rollback), sao lưu hằng đêm và kiểm thử tải (tổng cộng ${n(ops.workflowCount, "vi")} workflow). Production hiện chưa đi vào vận hành.`,
      },
    ],
  },
  {
    system: "Mau Heritage Hub",
    lines: [
      {
        en: "Live for a retail chain. Each pull request gets a preview link, labelled on every screen because the free tier shares the live database.",
        vi: "Đang vận hành cho một chuỗi cửa hàng bán lẻ. Mỗi pull request có đường dẫn xem trước, được gắn nhãn trên mọi màn hình vì gói miễn phí dùng chung cơ sở dữ liệu đang vận hành.",
      },
      {
        en: "Merging runs the migration workflow. Main is protected: lint, typecheck, tests, the database suite and the site build must all pass before a merge.",
        vi: "Khi gộp mã, workflow migration được tự động chạy. Nhánh main được bảo vệ: lint, kiểm tra kiểu (typecheck), kiểm thử, bộ kiểm thử cơ sở dữ liệu và bản dựng trang web đều phải đạt yêu cầu trước khi được gộp.",
      },
      {
        en: "An encrypted backup every night that emails on failure, a written restore procedure, and face data deliberately kept out of backups.",
        vi: "Sao lưu mã hóa hằng đêm, tự động gửi email khi xảy ra lỗi; quy trình khôi phục được lập thành văn bản; dữ liệu khuôn mặt được chủ động loại khỏi bản sao lưu.",
      },
    ],
  },
  {
    system: "Kwook-career",
    lines: [
      {
        en: "Merging to main deploys the database and the site. Undoing a change means reverting its pull request; migrations only move forward.",
        vi: "Khi gộp vào main, cơ sở dữ liệu và trang web được tự động triển khai. Việc hoàn tác được thực hiện bằng cách hoàn nguyên (revert) pull request tương ứng; migration chỉ được áp dụng theo một chiều tiến.",
      },
    ],
  },
];

export const shipRules: T[] = [
  {
    en: "Schema changes only as migration files, and an applied migration is never edited.",
    vi: "Mọi thay đổi cấu trúc dữ liệu chỉ được thực hiện qua tệp migration; migration đã áp dụng không được chỉnh sửa.",
  },
  {
    en: "Row-level security denies by default; secrets stay on the server.",
    vi: "Phân quyền theo dòng (row-level security) mặc định từ chối truy cập; khóa bí mật chỉ được lưu trên máy chủ.",
  },
];

export const projectsHeading = "More things I shipped";
export const projectsSubhead =
  "Public sites and tools. Open them, or read the source on GitHub.";
export const projectsTail =
  "Follow along on GitHub — more shipping this quarter.";

export const navLinks = [
  { href: "#work", label: "Work" },
  { href: "#method", label: "How I work" },
  { href: "#projects", label: "Projects" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "/cv", label: "CV" },
  { href: "#contact", label: "Contact" },
];

export const stats = [
  {
    number: "3 systems",
    label: "Built alone and run by real companies",
  },
  {
    number: `${n(opsRoadmap.done, "en")} steps`,
    label: `Shipped on Ops Platform, covered by ${n(ops.testCases, "en")} test cases`,
  },
  {
    number: "123 people",
    label: "Face recognition tuned across six ethnic groups",
  },
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
    title: "Nguyễn Ngọc Anh — portfolio",
    desc: "Bilingual scrollytelling portfolio where one silk thread is drawn live through every chapter: cocoon, journey route, globe, supply-chain network, guitar strings, contact knot. GSAP DrawSVG/MotionPath with Lenis, synthesised sound, hidden easter eggs, and every animation off for readers who prefer reduced motion.",
    tags: ["React", "TypeScript", "GSAP", "Lenis", "i18n", "Web Audio"],
    source: "https://github.com/nguyendinhngoc23052006/Portfolio-for-Ngoc-Anh",
  },
  {
    num: "02",
    title: "Dinh Ngoc Edu",
    desc: "Upload a subject's materials once and AI builds a Duolingo-style course: chapters, lesson nodes and verified questions that also feed mock tests. Private by default, shareable when public, with a pet companion that grows as you learn.",
    tags: ["React", "TypeScript", "Supabase", "Edge Functions", "RLS", "AI"],
    status: "shipped",
    url: "https://dinhngocedu.vercel.app",
    source: "https://github.com/nguyendinhngoc23052006/Dinh-Ngoc-Edu",
  },
  {
    num: "03",
    title: "Nguyễn Lê Khánh — portfolio",
    desc: "Bilingual (Vietnamese / English) scrollytelling portfolio for a content and media candidate applying to an environmental conservation project. Nine narrative beats pinned to the scroll, GSAP ScrollTrigger with Lenis smooth-scroll, i18n via react-i18next — no copy hard-coded in JSX.",
    tags: [
      "React",
      "TypeScript",
      "GSAP ScrollTrigger",
      "Lenis",
      "i18n",
      "Cloudflare Pages",
    ],
    status: "shipped",
    url: "https://nguyen-le-khanh-portfolio.pages.dev",
    source:
      "https://github.com/nguyendinhngoc23052006/nguyen-le-khanh-portfolio",
  },
  {
    num: "04",
    title: "saasmath",
    desc: "Free calculators and explainers for SaaS founders — runway, burn multiple, LTV/CAC, MRR/ARR growth, Rule of 40, cap-table dilution, option value, seed sizing, bridge notes. State lives in the URL so results are shareable; every formula cites its source.",
    tags: [
      "Astro",
      "React islands",
      "Tailwind",
      "URL state",
      "Cloudflare Pages",
    ],
    status: "shipped",
    url: "https://saasmath.pages.dev",
    source: "https://github.com/nguyendinhngoc23052006/saasmath",
  },
  {
    num: "05",
    title: "Browser tools: PDF merger · format converter · regex tester",
    desc: "Three small tools where nothing leaves the tab: merge and slice PDFs under a strict CSP, convert JSON/YAML/TOML in live editors, and test regexes, with state in the URL so a link reproduces the exact view.",
    tags: ["Preact", "Svelte 5", "CodeMirror 6", "pdf-lib", "Cloudflare Pages"],
    status: "shipped",
    url: "https://pdf-merger-c6h.pages.dev",
    source: "https://github.com/nguyendinhngoc23052006",
  },
];

export const contactInfo = {
  // Shown on the site and the CV only when filled in.
  phone: "",
  email: "nguyendinhngoc23052006@gmail.com",
  github: "https://github.com/nguyendinhngoc23052006",
  location: "Hanoi, Vietnam",
};

export const education: {
  degree: T;
  institution: T;
  location: T;
  period: T;
}[] = [
  {
    degree: {
      en: "Bachelor of International Economics",
      vi: "Cử nhân Kinh tế quốc tế",
    },
    institution: {
      en: "Foreign Trade University (FTU)",
      vi: "Đại học Ngoại thương (FTU)",
    },
    location: { en: "Hanoi, Vietnam", vi: "Hà Nội" },
    period: { en: "In progress", vi: "Đang theo học" },
  },
];

export const experience: {
  role: T;
  organization: T;
  period: T;
  points: T[];
}[] = [
  {
    role: {
      en: "AI Solutions & SOP Standardization Specialist",
      vi: "Chuyên viên Giải pháp AI & Chuẩn hóa quy trình (SOP)",
    },
    organization: { en: "Kwook, Bắc Ninh", vi: "Kwook, Bắc Ninh" },
    period: { en: "Sep – Nov 2026", vi: "09/2026 – 11/2026" },
    points: [
      {
        en: "Built Ops Platform and Kwook-career alone (below): HR and I ran employee profiles, records and asset tracking with face-recognition attendance on Ops Platform, and hiring was standardised on Kwook-career.",
        vi: "Một mình xây dựng Ops Platform và Kwook-career (bên dưới): bộ phận nhân sự và tôi quản lý hồ sơ nhân viên, hồ sơ tài liệu và tài sản kèm chấm công khuôn mặt trên Ops Platform, còn tuyển dụng được chuẩn hóa trên Kwook-career.",
      },
      {
        en: "Standardised company procedures into written rules and tools: the salary regulation and payroll method checked to the đồng, the meal-allowance rule, asset handover and HR records.",
        vi: "Chuẩn hóa quy trình của công ty thành quy chế và công cụ: quy chế lương và cách tính lương đối chiếu đến từng đồng, quy định ăn ca, bàn giao tài sản và hồ sơ nhân sự.",
      },
    ],
  },
  {
    role: { en: "Manager", vi: "Quản lý" },
    organization: {
      en: "Mau Heritage (retail stores)",
      vi: "Mau Heritage (chuỗi cửa hàng)",
    },
    period: { en: "Aug 2025 – Nov 2026", vi: "08/2025 – 11/2026" },
    points: [
      {
        en: "Ran the stores and standardised how they work (shifts, attendance, daily cash, pay rules, the monthly pay run), then built Mau Heritage Hub to run them; Mau Heritage now rents it from me.",
        vi: "Vận hành cửa hàng và chuẩn hóa cách làm việc (ca làm, chấm công, tiền mặt cuối ngày, quy tắc lương, kỳ trả lương), rồi xây dựng Mau Heritage Hub để vận hành; Mau Heritage hiện thuê lại từ tôi.",
      },
    ],
  },
];
