export const SITE_URL = "https://nguyendinhngoc.dev";

export const heroSubhead =
  "I build the systems a company runs on: ERP, HR, recruitment, attendance and payroll, on Supabase + Cloudflare, with computer vision where it pays off. Built alone, checked to the đồng, in production.";

export const aboutIntro =
  "I study international economics at Foreign Trade University and taught myself the rest — production software, cloud infrastructure, AI-directed engineering. The combination isn't padding, it's leverage. Macroeconomic reasoning for the business case. Creative problem-solving for the jobs no template fits. Infrastructure-deep understanding of the systems the code actually runs on. All three in one head at once. Self-taught means I picked up every tool because I needed it, not because a syllabus said to — hand me a framework I've never seen and I ship with it by the end of the week. I direct AI systems the way most developers use search: as an amplifier on the work, not a substitute for the understanding underneath. Every project on this site is live in production. Open the source and see for yourself.";

// ---------------------------------------------------------------------------
// CV content — the only source for /cv (English) and /cv/vi (Vietnamese) and
// their PDFs. Each text is { en, vi } so both languages come from one entry.
// "[ĐIỀN: …]" marks a fact the owner has not supplied yet; the CV page shows
// it highlighted and the PDF build refuses to call such a CV final.
// ---------------------------------------------------------------------------
export type Lang = "en" | "vi";
export type T = Record<Lang, string>;

export const cvTitle: T = {
  en: "Internal systems developer — ERP, HR & payroll on Supabase + Cloudflare",
  vi: "Phát triển hệ thống nội bộ — ERP, nhân sự & tiền lương trên Supabase + Cloudflare",
};

export const cvSummary: T = {
  en: "I build the systems a company runs on: org chart and permissions, hiring, attendance, payroll and the reports leadership decides from. Full stack on Supabase (Postgres, row-level security, migrations) and Cloudflare, delivered with Claude Code under CI gates, with computer vision where it pays off (face-recognition attendance). I check numbers to the đồng against the source before anyone relies on them. Disciplined and always thinking ahead: I built a company ERP alone in two months while running its payroll. Studying international economics at Foreign Trade University, Hanoi.",
  vi: "Tôi xây các hệ thống mà doanh nghiệp vận hành hằng ngày: sơ đồ tổ chức và phân quyền, tuyển dụng, chấm công, tính lương và báo cáo cho Ban Giám đốc ra quyết định. Làm trọn từ cơ sở dữ liệu đến giao diện trên Supabase (Postgres, phân quyền theo dòng, migration) và Cloudflare, phát triển bằng Claude Code với kiểm tra tự động trước mỗi lần đưa lên; ứng dụng thị giác máy tính khi có lợi (chấm công nhận diện khuôn mặt). Mọi con số được đối chiếu đến từng đồng với nguồn trước khi đưa ra dùng. Kỷ luật cao và không ngừng suy nghĩ cải tiến: một mình xây ERP cho công ty trong hai tháng song song với phụ trách bảng lương. Đang học Kinh tế quốc tế tại Đại học Ngoại thương, Hà Nội.",
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

export interface CvWork {
  title: T;
  status: T;
  points: T[];
  tags: string[];
  url?: string;
  // Private systems: what I can walk an interviewer through, shown on the site.
  discuss?: T[];
}

// Selected work for the CV. Private systems are described, never linked.
// Employers stay unnamed until they agree to be named.
export const cvWork: CvWork[] = [
  {
    title: {
      en: "Operations system (ERP) — food manufacturer",
      vi: "Hệ thống vận hành (ERP) — công ty sản xuất thực phẩm",
    },
    status: {
      en: "In production; still expanding",
      vi: "Đang chạy thực tế; tiếp tục mở rộng",
    },
    points: [
      {
        en: "Attendance in production: face-recognition check-in/out from door cameras, the rules that decide what counts as a check-in or check-out, and attendance statistics; every correction logged with who and why.",
        vi: "Chấm công đang chạy thực tế: check-in/out bằng nhận diện khuôn mặt qua camera cửa, quy tắc xác định thế nào là check-in/check-out, và thống kê chấm công; mọi chỉnh sửa lưu người sửa và lý do.",
      },
      {
        en: "Configurable records: admins add fields and record types from inside the app, so a new process becomes a setting, not a software project.",
        vi: "Hồ sơ cấu hình được: quản trị viên tự thêm trường và loại hồ sơ ngay trong ứng dụng; quy trình mới là một thiết lập, không phải một dự án phần mềm.",
      },
      {
        en: "Fully customisable, extensible privilege system: privileges granted to jobs and positions on an org chart of any depth, one check used by every policy and screen.",
        vi: "Hệ thống phân quyền tùy biến và mở rộng hoàn toàn: quyền cấp cho chức danh và vị trí trên sơ đồ tổ chức nhiều cấp, mọi chính sách và màn hình dùng chung một hàm kiểm tra.",
      },
      {
        en: "Streamlined recruitment: public job pages → applications with automatic scoring → candidates book their own interview → appointment to a position → onboarding, with each person's data carried from first application to employee record, never typed twice.",
        vi: "Quy trình tuyển dụng liền mạch: trang việc làm công khai → hồ sơ ứng tuyển được chấm điểm tự động → ứng viên tự đặt lịch phỏng vấn → bổ nhiệm vào vị trí → hội nhập, dữ liệu mỗi người đi thẳng từ lúc ứng tuyển đến hồ sơ nhân viên, không nhập lại lần nào.",
      },
      {
        en: "Self-service sign-up kiosk for low-tech staff; any phone becomes a camera by scanning a QR.",
        vi: "Kiosk tự đăng ký cho nhân sự ít dùng công nghệ; điện thoại bất kỳ thành camera bằng quét QR.",
      },
      {
        en: "Deny-by-default row-level security, schema only as migrations, an isolated Supabase branch and Cloudflare preview for every pull request, full audit log.",
        vi: "Phân quyền theo dòng mặc định từ chối, cấu trúc dữ liệu chỉ qua migration, mỗi pull request có nhánh Supabase và bản xem trước Cloudflare riêng, nhật ký kiểm toán đầy đủ.",
      },
    ],
    discuss: [
      {
        en: "How the privilege system is modelled so new roles and rules need no code",
        vi: "Cách mô hình hệ thống phân quyền để thêm vai trò, quy tắc mới mà không cần viết code",
      },
      {
        en: "The rules that turn raw door-camera events into check-ins, check-outs and attendance statistics",
        vi: "Quy tắc biến dữ liệu camera cửa thành check-in, check-out và thống kê chấm công",
      },
      {
        en: "The recruitment-to-onboarding data flow, end to end",
        vi: "Luồng dữ liệu tuyển dụng đến hội nhập, từ đầu đến cuối",
      },
      {
        en: "A live walkthrough of the running system",
        vi: "Trình diễn trực tiếp hệ thống đang chạy",
      },
    ],
    tags: [
      "Supabase",
      "Postgres RLS",
      "Cloudflare Workers",
      "React",
      "TypeScript",
      "Face recognition",
      "GitHub Actions",
    ],
  },
  {
    title: {
      en: "Mau Heritage Hub — store operations & payroll",
      vi: "Mau Heritage Hub — vận hành cửa hàng & tiền lương",
    },
    status: {
      en: "Internal app, built as manager",
      vi: "Ứng dụng nội bộ, xây khi làm quản lý",
    },
    points: [
      {
        en: "Staff phones: shift sign-up, face + location check-in, end-of-day cash logs, payslips. Owner: pay rules (KPI, meals, night/overtime/holiday pay at Labour Code minimums) and a monthly pay run with arrears. Face data only with consent (Law 91/2025); nightly encrypted backups; every migration replayed in tests.",
        vi: "Trên điện thoại nhân viên: đăng ký ca, chấm công khuôn mặt + vị trí, sổ tiền cuối ngày, phiếu lương. Chủ cửa hàng: quy tắc lương (KPI, ăn ca, làm đêm/tăng ca/lễ theo mức tối thiểu của BLLĐ) và kỳ trả lương có truy lĩnh. Dữ liệu khuôn mặt chỉ khi có đồng ý (Luật 91/2025); sao lưu mã hóa hằng đêm; kiểm thử chạy lại mọi migration.",
      },
    ],
    discuss: [
      {
        en: "The pay-rule engine: KPI, night, overtime, holiday pay and arrears",
        vi: "Bộ quy tắc lương: KPI, làm đêm, tăng ca, ngày lễ và truy lĩnh",
      },
      {
        en: "Face data handling under Law 91/2025: consent, withdrawal, backups",
        vi: "Xử lý dữ liệu khuôn mặt theo Luật 91/2025: đồng ý, rút lại, sao lưu",
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
      en: "Payroll standard for 79 staff in 10 departments",
      vi: "Chuẩn hóa bảng lương cho 79 nhân sự, 10 bộ phận",
    },
    status: {
      en: "Built and verified on September data",
      vi: "Đã xây dựng và kiểm chứng trên số liệu tháng 9",
    },
    points: [
      {
        en: "Replaced hand-edited formulas with one formula per column driven by the month's calendar; an independent Python model matched the workbook on all 2,212 checked cells across three test months.",
        vi: "Thay công thức sửa tay bằng một công thức cho mỗi cột theo lịch của tháng; mô hình Python độc lập khớp bảng tính trên toàn bộ 2.212 ô kiểm tra qua ba tháng thử.",
      },
      {
        en: "Explained all 349 numbers that changed from the old file, and traced every payslip number to its source cell (2,284 automated checks) for leadership sign-off.",
        vi: "Giải trình toàn bộ 349 con số thay đổi so với file cũ và truy mọi số trên phiếu lương về ô nguồn (2.284 phép kiểm tự động) để Ban Giám đốc duyệt.",
      },
    ],
    discuss: [
      {
        en: "The method and the reconciliation that matched every cell",
        vi: "Phương pháp và cách đối chiếu khớp từng ô",
      },
      {
        en: "Anonymised sample payslips with every number traced to its source",
        vi: "Phiếu lương mẫu ẩn danh, mỗi con số truy được về nguồn",
      },
    ],
    tags: [
      "Excel",
      "Python",
      "openpyxl",
      "Labour Code",
      "Social insurance",
      "PIT",
    ],
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
    url: "https://github.com/nguyendinhngoc23052006/demo-computer-vision-nhom-10",
  },
];

// More shipped projects, one line each on the CV (public, so linked).
export const cvMore: { title: string; line: T; url: string }[] = [
  {
    title: "Nguyễn Ngọc Anh — portfolio",
    line: {
      en: "Bilingual scrollytelling site: one silk thread drawn live through every chapter (GSAP DrawSVG/MotionPath, Lenis), synthesised sound, hidden easter eggs, reduced-motion safe.",
      vi: "Portfolio kể chuyện theo cuộn trang, song ngữ: một sợi tơ vẽ xuyên suốt mọi chương (GSAP DrawSVG/MotionPath, Lenis), âm thanh tự tổng hợp, easter egg, an toàn với chế độ giảm chuyển động.",
    },
    url: "https://github.com/nguyendinhngoc23052006/Portfolio-for-Ngoc-Anh",
  },
  {
    title: "Dinh Ngoc Edu",
    line: {
      en: "Upload a subject's materials and AI builds a Duolingo-style course with verified questions and mock tests; React + Supabase (Auth, Storage, Edge Functions, RLS).",
      vi: "Tải tài liệu môn học lên, AI tạo khóa học kiểu Duolingo với câu hỏi đã kiểm chứng và đề thi thử; React + Supabase (Auth, Storage, Edge Functions, RLS).",
    },
    url: "https://dinhngocedu.vercel.app",
  },
  {
    title: "Nguyễn Lê Khánh — portfolio",
    line: {
      en: "Bilingual scrollytelling portfolio for a conservation-project candidate: nine narrative beats pinned to the scroll, GSAP ScrollTrigger, i18n with no copy in JSX.",
      vi: "Portfolio song ngữ kể chuyện theo cuộn trang cho ứng viên dự án bảo tồn: chín phân cảnh ghim theo cuộn, GSAP ScrollTrigger, đa ngôn ngữ không viết cứng chữ trong code.",
    },
    url: "https://nguyen-le-khanh-portfolio.pages.dev",
  },
  {
    title: "saasmath",
    line: {
      en: "Calculators for SaaS founders (runway, burn multiple, LTV/CAC, dilution) with shareable URL state and cited formulas.",
      vi: "Bộ máy tính cho nhà sáng lập SaaS (runway, burn multiple, LTV/CAC, pha loãng cổ phần), chia sẻ kết quả qua đường link, công thức có trích nguồn.",
    },
    url: "https://saasmath.pages.dev",
  },
  {
    title: "Browser tools: PDF merger · format converter · regex tester",
    line: {
      en: "Files and data never leave the tab (strict CSP); state lives in the URL so a link reproduces the exact view.",
      vi: "Tệp và dữ liệu không rời khỏi trình duyệt (CSP chặt); trạng thái nằm trong đường link nên mở link là thấy đúng kết quả.",
    },
    url: "https://github.com/nguyendinhngoc23052006",
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

export const projectsHeading = "More things I shipped";
export const projectsSubhead =
  "Public sites and tools. Open them, or read the source on GitHub.";
export const projectsTail =
  "Follow along on GitHub — more shipping this quarter.";

export const navLinks = [
  { href: "#work", label: "Work" },
  { href: "#projects", label: "Projects" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "/cv", label: "CV" },
  { href: "#contact", label: "Contact" },
];

export const stats = [
  {
    number: "2 months",
    label: "To build a company ERP alone, now in production",
  },
  {
    number: "2,212 / 2,212",
    label: "Payroll cells matching an independent check",
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
    url: "https://github.com/nguyendinhngoc23052006/Portfolio-for-Ngoc-Anh",
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
    organization: {
      en: "Food manufacturer, Bắc Ninh",
      vi: "Công ty sản xuất thực phẩm, Bắc Ninh",
    },
    period: { en: "Sep 2026 – present", vi: "09/2026 – nay" },
    points: [
      {
        en: "Single-handedly designed and built the company's operations system (ERP) in two months — now in production for attendance, recruitment-to-onboarding, configurable records and privileges — and keep extending it.",
        vi: "Một mình thiết kế và xây dựng hệ thống vận hành (ERP) của công ty trong hai tháng — đã chạy thực tế cho chấm công, tuyển dụng đến hội nhập, hồ sơ cấu hình được và phân quyền — và đang tiếp tục mở rộng.",
      },
      {
        en: "Standardised company procedures into written rules and tools: the payroll regulation and method, checked to the đồng; HR records and asset-handover documents.",
        vi: "Chuẩn hóa quy trình của công ty thành quy chế và công cụ: quy chế và cách tính lương, đối chiếu đến từng đồng; hồ sơ nhân sự và biên bản bàn giao tài sản.",
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
        en: "Ran the stores; standardised how they work (shifts, attendance, daily cash, pay rules, monthly pay run), then designed and built Mau Heritage Hub, the internal app those procedures run on.",
        vi: "Vận hành cửa hàng và chuẩn hóa cách làm việc (ca làm, chấm công, tiền mặt cuối ngày, quy tắc lương, kỳ trả lương), rồi thiết kế và xây dựng Mau Heritage Hub, ứng dụng nội bộ để vận hành các quy trình đó.",
      },
    ],
  },
];
