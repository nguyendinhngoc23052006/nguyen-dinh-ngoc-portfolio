import metrics from "./metrics.json";

export const SITE_URL = "https://nguyendinhngoc.dev";

export const heroSubhead =
  "Solo developer: I design and build the systems a company runs on: people and records, face-recognition attendance, recruitment and payroll, on Supabase + Cloudflare, directing AI agents as my engineering team. Three of them have run real businesses.";

export const aboutIntro = `I study international economics at Foreign Trade University and taught myself the rest — production software, cloud infrastructure, AI-directed engineering. The combination isn't padding, it's leverage. Macroeconomic reasoning for the business case. Creative problem-solving for the jobs no template fits. Infrastructure-deep understanding of the systems the code actually runs on. All three in one head at once. Self-taught means I picked up every tool because I needed it, not because a syllabus said to — each system here needed a field I learned from published sources first: labour law, cash control, pay regulations, face recognition. I direct AI systems the way most developers use search: as an amplifier on the work, not a substitute for the understanding underneath. Most public projects here are live: open them. The systems companies run on are private, and I'll gladly walk you through them.`;

// ---------------------------------------------------------------------------
// CV content — the only source for /cv (English) and /cv/vi (Vietnamese) and
// their PDFs. Each text is { en, vi } so both languages come from one entry.
// "[ĐIỀN: …]" marks a fact the owner has not supplied yet; the CV page shows
// it highlighted and the PDF build refuses to call such a CV final.
// ---------------------------------------------------------------------------
export type Lang = "en" | "vi";
export type T = Record<Lang, string>;

// The only figures on the CV and site describe what the systems do (speed,
// scale, legal limits). They come from metrics.json, read by
// scripts/collect-metrics.mjs from each system's own roadmap and goals; never
// type one into the texts below. Process statistics (commits, pull requests,
// test counts) are not shown: a test fails if one appears.
export const n = (x: number, lang: Lang) =>
  x.toLocaleString(lang === "en" ? "en-US" : "vi-VN");
const od = metrics.systems.opsPlatform.design;
const md = metrics.systems.mauHeritageHub.design;
const kd = metrics.systems.kwookCareer.design;

export const cvTitle: T = {
  en: "Full-stack & AI engineer · Supabase + Cloudflare",
  vi: "Kỹ sư Full-stack & AI · Supabase + Cloudflare",
};

export const cvSummary: T = {
  en: "Self-taught full-stack engineer and solo developer in Hanoi. I design and build the systems a business runs on: people records, face-recognition attendance, recruiting, shifts and payroll; three of them have run real companies. I build with Claude Code and own the design, data model, review and testing. I learn the business first: I ran the stores and wrote the procedures, and learned labour law, cash control and pay regulations to build them in.",
  vi: "Kỹ sư full-stack tự học, phát triển độc lập, tại Hà Nội. Tôi thiết kế và xây dựng các hệ thống vận hành doanh nghiệp: hồ sơ nhân sự, chấm công nhận diện khuôn mặt, tuyển dụng, xếp ca và tính lương; ba hệ thống đã được đưa vào vận hành tại doanh nghiệp. Tôi phát triển cùng Claude Code và trực tiếp đảm nhận thiết kế, mô hình dữ liệu, rà soát và kiểm thử. Tôi tìm hiểu nghiệp vụ trước khi xây dựng: đã trực tiếp quản lý cửa hàng, soạn thảo quy trình, và nghiên cứu pháp luật lao động, kiểm soát tiền mặt, quy chế tiền lương.",
};

// How I work, condensed for the CV. The site's "How I work" section has the detail.
export const cvMethod: { label: T; text: T }[] = [
  {
    label: {
      en: "Agents under rules I set",
      vi: "Agent làm việc theo quy tắc tôi đặt ra",
    },
    text: {
      en: "Claude Code agents load a written rulebook every session; hooks block edits and commands until I approve the plan, and a readiness check refuses a pull request until the tests, step-by-step screenshots and an evidence report exist.",
      vi: "Các agent Claude Code nạp bộ quy tắc thành văn ở mỗi phiên làm việc; hook chặn chỉnh sửa và chạy lệnh cho đến khi tôi duyệt kế hoạch, và bước kiểm tra sẵn sàng chỉ cho mở pull request khi đã có kết quả kiểm thử, ảnh chụp từng bước và báo cáo.",
    },
  },
  {
    label: { en: "Reviewed before it merges", vi: "Rà soát trước khi gộp" },
    text: {
      en: "Review agents check security, code quality and scale; I read the diff, tests and running preview; nothing merges without my approval except routine dependency updates.",
      vi: "Agent rà soát kiểm tra bảo mật, chất lượng mã và khả năng mở rộng; tôi xem mã thay đổi, kết quả kiểm thử và bản chạy thử; không gì được gộp khi chưa có phê duyệt của tôi, trừ cập nhật thư viện định kỳ.",
    },
  },
  {
    label: { en: "Verified, not assumed", vi: "Kiểm chứng thay vì giả định" },
    text: {
      en: "On Ops Platform and Mau Heritage Hub, database tests replay every migration on an empty Postgres and check the rules that must hold; Mau Heritage Hub's flows are also tested in a real browser.",
      vi: "Tại Ops Platform và Mau Heritage Hub, kiểm thử chạy lại mọi migration trên Postgres trống và kiểm tra các quy tắc bắt buộc; các luồng của Mau Heritage Hub còn được thử trên trình duyệt.",
    },
  },
  {
    label: { en: "Careful releases", vi: "Phát hành cẩn trọng" },
    text: {
      en: "Ops Platform: a preview with its own database for each change, then staging, then production. Mau Heritage Hub: a preview link for each change. Schema changes only as migrations; row-level security denies by default.",
      vi: "Ops Platform: mỗi thay đổi có bản xem trước với cơ sở dữ liệu riêng, rồi qua staging trước khi lên production. Mau Heritage Hub: mỗi thay đổi có đường dẫn xem trước. Cấu trúc dữ liệu chỉ đổi qua migration; RLS mặc định từ chối truy cập.",
    },
  },
];

// Traits shown on the site's About section.
export const traits: { label: T; note: T }[] = [
  {
    label: { en: "Designs the whole system", vi: "Thiết kế toàn bộ hệ thống" },
    note: {
      en: "The model, the rules no setting can switch off, the data and the screens are my design decisions; the pay and HR rules follow each company's own regulations and the law.",
      vi: "Mô hình, các nguyên tắc không thể tắt bằng cấu hình, dữ liệu và giao diện đều do tôi thiết kế; các quy tắc tiền lương và nhân sự tuân theo quy chế của từng doanh nghiệp và pháp luật.",
    },
  },
  {
    label: {
      en: "Solo developer, with agents",
      vi: "Phát triển độc lập cùng agent AI",
    },
    note: {
      en: "I solo-developed each system. Agents write code to my written specification; nothing I or an agent writes ships until I have reviewed and tested it.",
      vi: "Mỗi hệ thống do tôi phát triển độc lập. Các agent viết mã theo đặc tả do tôi soạn; mọi thay đổi do tôi hoặc agent viết chỉ được phát hành sau khi tôi rà soát và kiểm thử.",
    },
  },
  {
    label: { en: "Learns a new field fast", vi: "Tiếp thu lĩnh vực mới nhanh" },
    note: {
      en: "Labour law, cash control, pay regulations, database security, face recognition: each learned from published sources when a system needed it, then turned into rules the code enforces.",
      vi: "Pháp luật lao động, kiểm soát tiền mặt, quy chế tiền lương, bảo mật cơ sở dữ liệu, nhận diện khuôn mặt: mỗi lĩnh vực được tôi tự nghiên cứu từ nguồn đã công bố khi hệ thống cần, rồi chuyển thành quy tắc do mã nguồn bảo đảm.",
    },
  },
  {
    label: {
      en: "A sense for the whole business",
      vi: "Nắm bắt toàn diện hoạt động doanh nghiệp",
    },
    note: {
      en: "I ran the stores and wrote the procedures before writing software for them, so the hard calls are business and legal judgement: no fines, a CV is never rejected just for not mentioning something, nobody counts cash knowing the expected amount.",
      vi: "Tôi trực tiếp vận hành cửa hàng và soạn quy trình trước khi viết phần mềm, nên các quyết định quan trọng dựa trên hiểu biết kinh doanh và pháp luật: không áp dụng tiền phạt, không loại CV chỉ vì không đề cập, không ai đếm tiền khi đã biết trước số dự kiến.",
    },
  },
];

// A claim about a system's design, with the place in that system's own design
// documents it comes from ("goals §5", "roadmap B7.1"). The accuracy review
// checks every claim against its source before it is published.
export interface Claim extends T {
  src: string;
}

export interface CaseStudy {
  slug: string;
  name: string;
  tagline: T;
  // What the CV says about the system: three lines, each cited.
  highlights: Claim[];
  status: T;
  problem: Claim;
  idea: Claim;
  decisions: { label: T; text: Claim }[];
  built: Claim[];
  proof: Claim[];
  notYet: Claim;
  tags: string[];
  // What I can walk an interviewer through on demo data.
  discuss: T[];
  // The system's model as layers of blocks, drawn as a diagram.
  model?: { src: string; layers: { name: T; blocks: T[] }[] };
}

// The three systems, as designs. Private: described, never linked.
export const caseStudies: CaseStudy[] = [
  {
    slug: "ops-platform",
    highlights: [
      {
        en: "Records, links, ledgers, formulas and events the organisation configures itself in the app, so most new processes are a setting, not a software project; any record prints a QR tag that traces a physical asset to its record.",
        vi: "Hồ sơ, liên kết, sổ cái, công thức và sự kiện do tổ chức tự cấu hình trong ứng dụng, nên phần lớn quy trình mới chỉ là một thiết lập; mọi hồ sơ in được tem QR để truy vết tài sản thực tế về hồ sơ của nó.",
        src: "goals §0, §1, §4; roadmap B4.40",
      },
      {
        en: `Face attendance on any device with a camera and a browser: paired with no account, it becomes a registration kiosk or a door; duplicate faces are refused, and a face is matched against a ${n(od.faceMatch.people, "en")}-person organisation in under ${n(od.faceMatch.ms, "en")} ms.`,
        vi: `Chấm công khuôn mặt trên bất kỳ thiết bị nào có camera và trình duyệt: ghép nối không cần tài khoản để làm kiosk đăng ký hoặc cửa chấm công; khuôn mặt trùng bị từ chối, và một khuôn mặt được nhận diện trong tổ chức ${n(od.faceMatch.people, "vi")} người dưới ${n(od.faceMatch.ms, "vi")} ms.`,
        src: "roadmap B14.15, B11.8 (owner ruling 2026-11-23: any device with a camera and a browser)",
      },
      {
        en: "Door passes become each person's worked and late minutes, priced by the organisation's own formulas, which it writes as plain questions; a door that sent nothing reads 'no data', never absent.",
        vi: "Lượt qua cửa được quy đổi thành số phút làm việc và đi muộn của từng người, tính giá trị theo công thức riêng của tổ chức dưới dạng câu hỏi đơn giản; cửa không gửi dữ liệu được ghi là 'không có dữ liệu', không bao giờ bị tính vắng mặt.",
        src: "roadmap B11.4",
      },
      {
        en: "Trust built in: powers held through positions, approvals by a quorum and by a second person, time-limited emergency access with review, and sensitive values such as national IDs and bank numbers sealed under each person's own key.",
        vi: "Tin cậy từ thiết kế: quyền hạn gắn với vị trí, phê duyệt theo số đông và bởi người thứ hai, quyền khẩn cấp có thời hạn kèm rà soát, dữ liệu nhạy cảm được niêm phong bằng khóa riêng của mỗi người.",
        src: "roadmap B3.2–B3.12, B4.9, B4.10",
      },
      {
        en: `Proven at scale: ${n(od.events.perSecond, "en")} events a second in the scale test on every pull request into main, and a ${n(od.onboarding.people, "en")}-person organisation onboarded from pasted spreadsheets in ordered, restartable stages.`,
        vi: `Kiểm chứng ở quy mô lớn: ${n(od.events.perSecond, "vi")} sự kiện mỗi giây trong kiểm thử tải chạy trên mọi pull request vào main, và tiếp nhận tổ chức ${n(od.onboarding.people, "vi")} người từ bảng tính theo từng giai đoạn, có thể chạy lại.`,
        src: "roadmap B7.3, C106",
      },
    ],
    name: "Ops Platform",
    tagline: {
      en: "One configurable platform an organisation runs on: fifteen general blocks instead of one module per department.",
      vi: "Một nền tảng cấu hình được để tổ chức vận hành mọi hoạt động: mười lăm khối chức năng dùng chung thay cho mỗi phòng ban một phân hệ riêng.",
    },
    status: {
      en: "Ran Kwook's people records and attendance while I worked there; mine, in development",
      vi: "Đã vận hành hồ sơ nhân sự và chấm công của Kwook khi tôi công tác tại đây; sản phẩm của tôi, đang phát triển",
    },
    problem: {
      en: "Businesses run one system per area, each with its own data, and pay for the gaps: HR does not know what production recorded, accounting does not know what HR processed, and nobody can say who approved something six months ago.",
      vi: "Doanh nghiệp thường dùng mỗi mảng một hệ thống với dữ liệu riêng và phải trả giá cho khoảng trống giữa chúng: nhân sự không biết sản xuất đã ghi nhận gì, kế toán không biết nhân sự đã xử lý gì, và không ai cho biết được ai đã phê duyệt một việc từ sáu tháng trước.",
      src: "goals §1",
    },
    idea: {
      en: "One app whose modules are places to work, never separate data. Every area of every organisation is a configuration of the same fifteen blocks in five layers: structure, records, motion, surface and governance. It is designed so the organisation builds and reshapes it in the app, with no developer and no code release; when it cannot express a flow, the block is improved once, for every organisation.",
      vi: "Một ứng dụng duy nhất, trong đó các phân hệ là nơi làm việc chứ không phải kho dữ liệu riêng. Mọi mảng hoạt động của mọi tổ chức đều là cấu hình của cùng mười lăm khối chức năng thuộc năm tầng: cấu trúc, hồ sơ, vận động, giao diện và quản trị cấu hình. Nền tảng được thiết kế để tổ chức tự xây dựng và điều chỉnh ngay trong ứng dụng, không cần lập trình viên hay phát hành mã mới; khi một quy trình chưa diễn đạt được, khối chức năng tương ứng được cải tiến một lần cho mọi tổ chức.",
      src: "goals §0, §1, §4",
    },
    decisions: [
      {
        label: {
          en: "Holders and proofs",
          vi: "Người nắm giữ và phương thức xác thực",
        },
        text: {
          en: "Authority belongs to seats, and a seat's holder has exactly the seat's privileges: a person today, with devices and AI agents designed to hold seats too. Who someone is stays separate from how they prove it: a login, a face, a PIN and a second factor are separate proofs, and a privilege can demand a stronger one. A worker with no phone or email is still a complete person in the system.",
          vi: "Quyền hạn thuộc về vị trí, và người nắm giữ có đúng các quyền của vị trí đó: hiện là con người, còn thiết bị và agent AI đã được thiết kế để cũng nắm giữ vị trí. Danh tính tách khỏi phương thức xác thực: đăng nhập, khuôn mặt, mã PIN và xác thực hai lớp là các phương thức riêng, và một quyền có thể yêu cầu phương thức mạnh hơn. Người lao động không có điện thoại hay email vẫn là một hồ sơ đầy đủ trong hệ thống.",
          src: "goals §3, §4.2, §5; roadmap B2.2 (unticked)",
        },
      },
      {
        label: {
          en: "One shape for every operation",
          vi: "Một khuôn mẫu cho mọi hoạt động",
        },
        text: {
          en: "Every operational flow is record, expect, measure, calculate, decide. Evidence is append-only; facts such as worked or late minutes are measured the same way in every organisation and never typed in; the organisation's own formulas price them; people approve, and a correction is a new linked record.",
          vi: "Mọi quy trình vận hành đều theo năm bước: ghi nhận, kỳ vọng, đo lường, tính toán và quyết định. Bằng chứng chỉ được ghi thêm; các dữ kiện như số phút làm việc hay đi muộn được đo theo cùng một cách ở mọi tổ chức, không nhập tay; công thức riêng của tổ chức quy đổi chúng thành giá trị; con người phê duyệt, và mỗi chỉnh sửa là một bản ghi mới có liên kết.",
          src: "goals §5",
        },
      },
      {
        label: {
          en: "Fixed, shaped, built",
          vi: "Cố định, tùy chỉnh, tự xây dựng",
        },
        text: {
          en: "Everything sits in one of three tiers. The grammar is fixed, so a number means the same thing across organisations and over time; policy is shaped through plain questions with defaults; formulas and record types are built behind type-checked previews, with rules and versioned packages designed next. Four tests decide where anything new belongs.",
          vi: "Mọi thành phần thuộc một trong ba tầng. Ngữ pháp được cố định để mỗi con số mang cùng một ý nghĩa giữa các tổ chức và theo thời gian; chính sách được tùy chỉnh qua các câu hỏi đơn giản có giá trị mặc định; công thức và loại hồ sơ được tự xây dựng qua bản xem trước có kiểm tra kiểu dữ liệu, còn quy tắc và gói cấu hình có phiên bản đã được thiết kế cho giai đoạn tiếp theo. Bốn phép kiểm tra xác định một yêu cầu mới thuộc tầng nào.",
          src: "goals §6",
        },
      },
      {
        label: {
          en: "Trust that cannot be configured away",
          vi: "Nguyên tắc tin cậy không thể tắt bằng cấu hình",
        },
        text: {
          en: "Nobody grants more than they hold, checked at every use; quorum and maker-checker are enforced by the platform, not by policy; an AI agent is never the only checker of a controlled act, and silence is never consent; nothing recorded is deleted, and personal data is erased by destroying its key; devices only write.",
          vi: "Không ai cấp quyền vượt quá quyền mình nắm giữ, và điều này được kiểm tra ở mỗi lần sử dụng; yêu cầu đủ số người duyệt và nguyên tắc người lập khác người duyệt do nền tảng bảo đảm, không dựa vào văn bản chính sách; agent AI không là người kiểm tra duy nhất của thao tác cần kiểm soát, và sự im lặng không được xem là đồng ý; dữ liệu đã ghi nhận không bị xóa, dữ liệu cá nhân được xóa bằng cách hủy khóa mã hóa; thiết bị chỉ ghi dữ liệu.",
          src: "goals §6 (never configurable)",
        },
      },
      {
        label: { en: "The observation layer", vi: "Tầng quan sát" },
        text: {
          en: "Any device with a camera and a browser pairs as a camera by showing a QR code a manager claims: no account, and its function set by the server, today from a fixed list, with functions as data designed next. Every observed event names the model version that produced it. Camera law: no audio, no stored live video, rates rather than names.",
          vi: "Thiết bị nào có camera và trình duyệt cũng có thể ghép nối làm camera bằng cách hiển thị mã QR để quản lý xác nhận: không cần tài khoản, chức năng do máy chủ quy định, hiện chọn từ một danh sách cố định và đã thiết kế để chức năng trở thành dữ liệu cấu hình. Mỗi sự kiện quan sát đều ghi rõ phiên bản mô hình đã tạo ra. Quy tắc cho camera: không thu âm, không lưu video trực tiếp, chỉ báo cáo tỷ lệ thay vì tên người.",
          src: "goals §4.14 (owner ruling 2026-11-23: any device with a camera and a browser), §9 (camera law); roadmap B14.2 (unticked)",
        },
      },
    ],
    built: [
      {
        en: "An event spine: every event goes through one writer, append-only and partitioned by month, ordered per organisation, with an idempotency key, the acting seat, who held it at that moment and the version that acted.",
        vi: "Trục sự kiện: mọi sự kiện đi qua một điểm ghi duy nhất, chỉ ghi thêm, phân vùng theo tháng, có thứ tự riêng cho từng tổ chức, kèm khóa chống trùng lặp, vị trí thực hiện, người nắm giữ vị trí tại thời điểm đó và phiên bản xử lý.",
        src: "roadmap B7.1, B2.3",
      },
      {
        en: `Privilege controls: a quorum of ${n(od.quorum.min, "en")} to ${n(od.quorum.max, "en")} other people, maker-checker, break-glass of up to ${n(od.breakGlass.maxHours, "en")} hours with a review nobody can withdraw, separation of duties, and a required sign-in strength per privilege area; sysadmin power holds only in a session confirmed with a second factor.`,
        vi: `Kiểm soát quyền hạn: yêu cầu từ ${n(od.quorum.min, "vi")} đến ${n(od.quorum.max, "vi")} người khác xác nhận, người lập khác người duyệt, quyền khẩn cấp tối đa ${n(od.breakGlass.maxHours, "vi")} giờ kèm bước rà soát không thể rút lại, tách biệt nhiệm vụ xung đột và mức xác thực bắt buộc cho từng nhóm quyền; quyền quản trị hệ thống chỉ có hiệu lực trong phiên xác thực hai lớp.`,
        src: "roadmap B3.2–B3.12",
      },
      {
        en: "Records an organisation invents, with no code per kind: record types, lifecycles, versions, corrections and gapless numbers; links that carry quantities and fields of their own; one formula language from field rules to bill-of-materials roll-ups; and append-only ledgers whose closed days refuse postings in the database.",
        vi: "Hồ sơ do tổ chức tự định nghĩa, không cần viết mã cho từng loại: loại hồ sơ, vòng đời, phiên bản, chỉnh sửa và số văn bản liên tục; liên kết mang số lượng và trường dữ liệu riêng; một ngôn ngữ công thức dùng từ quy tắc của trường đến tổng hợp định mức nguyên vật liệu; và sổ cái chỉ ghi thêm, trong đó ngày đã khóa từ chối bút toán ngay trong cơ sở dữ liệu.",
        src: "roadmap B4.2–B4.18, B5.1, B10.1, B6.1",
      },
      {
        en: `Privacy by design: sensitive values sealed under each person's own key, every reveal logged with a reason; legal hold; permanent removal needs two different holders and a ${n(od.removalWait.days, "en")}-day wait; erasure is replayed after any restore.`,
        vi: `Bảo vệ dữ liệu ngay từ thiết kế: thông tin nhạy cảm được niêm phong bằng khóa riêng của từng người, mọi lần xem đều ghi lại kèm lý do; cơ chế phong tỏa pháp lý; xóa vĩnh viễn cần hai người khác nhau và thời gian chờ ${n(od.removalWait.days, "vi")} ngày; việc xóa dữ liệu cá nhân được áp dụng lại sau mỗi lần khôi phục.`,
        src: "roadmap B4.9, B4.10, B4.14",
      },
    ],
    proof: [
      {
        en: `Load proven before it is claimed: a face matched against a ${n(od.faceMatch.people, "en")}-person organisation in under ${n(od.faceMatch.ms, "en")} ms; ${n(od.events.perSecond, "en")} events a second sustained in the scale test that runs on every pull request into main; a ${n(od.onboarding.people, "en")}-person onboarding by import; a page of ${n(od.links.count, "en")} ended links read in about ${n(od.links.ms, "en")} ms.`,
        vi: `Khả năng chịu tải được kiểm chứng trước khi công bố: nhận diện một khuôn mặt trong tổ chức ${n(od.faceMatch.people, "vi")} người với thời gian dưới ${n(od.faceMatch.ms, "vi")} ms; duy trì ${n(od.events.perSecond, "vi")} sự kiện mỗi giây trong bài kiểm thử tải chạy trên mọi pull request vào main; tiếp nhận ${n(od.onboarding.people, "vi")} nhân sự bằng tệp nhập; đọc một trang trong ${n(od.links.count, "vi")} liên kết đã kết thúc trong khoảng ${n(od.links.ms, "vi")} ms.`,
        src: "roadmap B11.8, B7.3, C106, B5.2",
      },
    ],
    notYet: {
      en: "Designed, not built yet: workflows beyond tasks, rules and automation, dashboards and metrics, pay runs, posting rules, bookings, connections to other software, devices and agents holding seats, the offline outbox, installable packages, self-service sign-up and dedicated deployments.",
      vi: "Đã thiết kế, chưa xây dựng: quy trình nhiều bước ngoài giao việc, quy tắc và tự động hóa, bảng điều khiển và chỉ số, kỳ lương, quy tắc hạch toán, đặt lịch tài nguyên, kết nối với phần mềm khác, thiết bị và agent nắm giữ vị trí, hàng đợi ngoại tuyến, gói cấu hình cài đặt được, tự đăng ký tổ chức và triển khai riêng cho doanh nghiệp lớn.",
      src: "roadmap B9.2, B8.1, B12.3, B12.19, B6.2, B11.2, B14.1, B2.2, B14.9, B15.2, S2, S3",
    },
    model: {
      src: "goals §4",
      layers: [
        {
          name: { en: "Structure: who and where", vi: "Cấu trúc: ai và ở đâu" },
          blocks: [
            { en: "Org tree", vi: "Cây tổ chức" },
            {
              en: "Seats, jobs and lines",
              vi: "Vị trí, chức danh và tuyến báo cáo",
            },
            { en: "Privileges", vi: "Quyền hạn" },
          ],
        },
        {
          name: { en: "Records: what exists", vi: "Hồ sơ: những gì tồn tại" },
          blocks: [
            { en: "Record types", vi: "Loại hồ sơ" },
            { en: "Links", vi: "Liên kết" },
            { en: "Ledgers", vi: "Sổ cái" },
          ],
        },
        {
          name: {
            en: "Motion: what happens",
            vi: "Vận động: những gì diễn ra",
          },
          blocks: [
            { en: "Events", vi: "Sự kiện" },
            { en: "Rules", vi: "Quy tắc" },
            { en: "Workflows", vi: "Quy trình" },
            { en: "Formula language", vi: "Ngôn ngữ công thức" },
            { en: "Calendars and resources", vi: "Lịch và nguồn lực" },
          ],
        },
        {
          name: {
            en: "Surface: how people work",
            vi: "Giao diện: cách mọi người làm việc",
          },
          blocks: [
            { en: "Views and insight", vi: "Màn hình và phân tích" },
            { en: "Conversation", vi: "Trao đổi" },
            { en: "Connections", vi: "Kết nối" },
          ],
        },
        {
          name: {
            en: "Governance: how configuration lives",
            vi: "Quản trị cấu hình",
          },
          blocks: [{ en: "Packages", vi: "Gói cấu hình" }],
        },
      ],
    },
    tags: [
      "Supabase",
      "Postgres RLS",
      "Edge Functions",
      "Cloudflare Workers",
      "React",
      "TypeScript",
      "ONNX",
    ],
    discuss: [
      {
        en: "How an organisation adds a new kind of record, with its own fields, lifecycle and rules, without code",
        vi: "Cách tổ chức thêm loại hồ sơ mới, với trường, vòng đời và quy tắc riêng, không cần lập trình",
      },
      {
        en: "From pairing a camera to a person's measured day: the whole observation flow",
        vi: "Từ ghép nối camera đến ngày công đo được của từng người: trọn vẹn luồng quan sát",
      },
      {
        en: "How the privilege model keeps every power traceable to a seat",
        vi: "Cách mô hình phân quyền giữ mọi quyền hạn truy được về một vị trí",
      },
    ],
  },
  {
    slug: "mau-heritage-hub",
    highlights: [
      {
        en: "Pay follows evidence: a face and location check-in decides who worked, and no-shows, covers and late arrivals are worked out from the records, never marked by hand.",
        vi: "Tiền lương dựa trên bằng chứng: chấm công bằng khuôn mặt và vị trí cho biết ai đã đi làm; vắng ca, làm thay và đi muộn được xác định từ dữ liệu chứ không đánh dấu thủ công.",
        src: "goals (Words; Guarantees)",
      },
      {
        en: "Cash control at every shift change: whoever leaves counts the safe without seeing the expected amount, and someone else confirms.",
        vi: "Kiểm soát tiền mặt khi bàn giao ca: người rời ca đếm két khi chưa biết số dự kiến, người khác xác nhận.",
        src: "goals (Handover; Guarantees)",
      },
      {
        en: `Lawful pay as settings the owner changes: no fines, bonus cuts never below zero, compensation capped at ${n(md.compensationCap.percent, "en")}% of pay after insurance and tax, corrections paid as arrears.`,
        vi: `Lương đúng luật qua thiết lập chủ cửa hàng tự điều chỉnh: không phạt tiền, giảm thưởng không vượt số thưởng, bồi thường tối đa ${n(md.compensationCap.percent, "vi")}% lương sau bảo hiểm và thuế, chỉnh sửa được truy lĩnh kỳ sau.`,
        src: "goals (Guarantees); roadmap B6.4, B6.9",
      },
      {
        en: "One owner account; everyone else opens their profile by face, or code and PIN, on their phone. A face is stored only with recorded consent, and no role acts on its own holder's record.",
        vi: "Chỉ chủ cửa hàng có tài khoản; mọi người khác mở hồ sơ bằng khuôn mặt, hoặc mã kèm PIN, trên điện thoại. Khuôn mặt chỉ được lưu khi đã ghi nhận sự đồng ý, và không vai trò nào thao tác trên hồ sơ của chính người nắm giữ.",
        src: "goals (Words; Rules; Guarantees); roadmap B1.4, B1.5, B1.6",
      },
    ],
    name: "Mau Heritage Hub",
    tagline: {
      en: "Scheduling, face check-in, cash handovers and lawful payroll for a store chain, run by its owner alone.",
      vi: "Xếp lịch, chấm công bằng khuôn mặt, bàn giao tiền mặt và tính lương đúng luật cho chuỗi cửa hàng do một chủ sở hữu điều hành.",
    },
    status: {
      en: "My product, rented by Mau Heritage; in production",
      vi: "Sản phẩm của tôi, Mau Heritage đang thuê sử dụng; đang vận hành thực tế",
    },
    problem: {
      en: "The owner could not see in one place who was scheduled, who actually worked, where, for how long, or whether each store's cash matched its sales; pay was assembled by hand each month, and a dispute had nothing recorded to settle it.",
      vi: "Chủ cửa hàng không thể xem tại một nơi ai được xếp lịch, ai thực sự đi làm, ở cửa hàng nào, trong bao lâu, hay tiền mặt từng cửa hàng có khớp doanh thu không; tiền lương được tổng hợp thủ công mỗi tháng, và khi có tranh chấp thì không có dữ liệu ghi nhận để đối chiếu.",
      src: "goals (The problem)",
    },
    idea: {
      en: "One place the owner runs the stores' people from, where every business rule is a setting the owner changes in the app, never code: who should work, who did, where the cash stands and what each person is paid. A setting never changes a month already approved.",
      vi: "Một nơi duy nhất để chủ cửa hàng quản lý nhân sự các cửa hàng, trong đó mọi quy tắc kinh doanh là một thiết lập chủ cửa hàng tự thay đổi trong ứng dụng, không cần sửa mã: ai cần đi làm, ai đã đi làm, tiền mặt ở đâu và mỗi người được trả bao nhiêu. Thiết lập không làm thay đổi tháng lương đã duyệt.",
      src: "goals (What it is; Rules)",
    },
    decisions: [
      {
        label: {
          en: "One account; everyone else is a profile",
          vi: "Một tài khoản; mọi người khác là hồ sơ",
        },
        text: {
          en: "The owner holds the only account. Everyone else is a profile opened by face, or code and PIN, on their phone. A role can be allowed to manage people at its own stores, but never acts on its holder's own record and never grants more than it holds.",
          vi: "Chủ cửa hàng nắm tài khoản duy nhất. Mọi người khác là một hồ sơ, mở bằng khuôn mặt hoặc mã kèm PIN trên điện thoại. Một vai trò có thể được phép quản lý nhân sự tại cửa hàng của mình, nhưng không thao tác trên hồ sơ của chính người nắm giữ và không cấp quyền vượt quá quyền mình có.",
          src: "goals (Words; Rules)",
        },
      },
      {
        label: { en: "Pay follows evidence", vi: "Tiền lương theo bằng chứng" },
        text: {
          en: "A sign-up says who should work; a face and location check-in says who did, and pay follows check-ins only. A store's headcount is a hard cap on both shift slots and simultaneous check-ins; no-shows, covers and late arrivals are worked out from the records, never marked by hand.",
          vi: "Đăng ký ca cho biết ai cần đi làm; chấm công bằng khuôn mặt và vị trí cho biết ai đã đi làm, và tiền lương chỉ tính theo chấm công. Định biên cửa hàng là giới hạn cứng cho cả số chỗ trong ca lẫn số người chấm công cùng lúc; vắng ca, làm thay và đi muộn được xác định từ dữ liệu, không đánh dấu thủ công.",
          src: "goals (Words; Guarantees)",
        },
      },
      {
        label: {
          en: "A blind cash handover",
          vi: "Bàn giao tiền mặt không xem trước",
        },
        text: {
          en: "Cash is handed over per stretch of one crew: whoever leaves records the takings, the cash paid out and the safe count without seeing the expected amount, and someone else confirms; only a confirmed log counts toward pay rules and the safe balance.",
          vi: "Tiền mặt được bàn giao theo từng đợt làm việc của một nhóm: người rời ca ghi doanh thu, khoản chi và số tiền đếm trong két mà không xem trước số dự kiến, và một người khác xác nhận; chỉ sổ đã xác nhận mới được tính vào quy tắc lương và số dư két.",
          src: "goals (Handover; Guarantees)",
        },
      },
      {
        label: { en: "Lawful pay", vi: "Tiền lương đúng luật" },
        text: {
          en: `Pay rules use a closed list of recorded facts and print as the published bonus regulation. There are no fines: a bonus reduction never goes below zero or touches base pay, compensation for a loss is capped at ${n(md.compensationCap.percent, "en")}% of pay after insurance and tax, and an overpayment is shown, never deducted. A correction is a new record; a fact about an approved month is paid as arrears.`,
          vi: `Quy tắc lương chỉ dùng một danh sách dữ kiện đã ghi nhận và được in thành quy chế thưởng công bố. Không có tiền phạt: khoản giảm thưởng không làm thưởng âm và không chạm vào lương cơ bản, bồi thường thiệt hại tối đa ${n(md.compensationCap.percent, "vi")}% tiền lương sau bảo hiểm và thuế, và khoản trả thừa chỉ hiển thị, không khấu trừ. Mỗi chỉnh sửa là một bản ghi mới; dữ kiện thuộc tháng đã duyệt được truy lĩnh ở kỳ sau.`,
          src: "goals (Guarantees); roadmap B6.4, B6.9",
        },
      },
      {
        label: { en: "Consent first", vi: "Đồng ý trước tiên" },
        text: {
          en: "A face is stored only after the person's consent is recorded and is deleted when they leave or withdraw; anyone who declines checks in another way. No video is stored and no camera streams anywhere.",
          vi: "Dữ liệu khuôn mặt chỉ được lưu sau khi ghi nhận sự đồng ý của người đó, và bị xóa khi họ nghỉ việc hoặc rút lại đồng ý; người không đồng ý có cách chấm công khác. Không lưu video, không camera nào truyền hình ảnh đi.",
          src: "goals (What it is not; Guarantees)",
        },
      },
    ],
    built: [
      {
        en: "Identity and delegation, face enrolment and check-in with location checks, the weekly schedule and its cap, the blind handover, the pay-rule engine and the monthly pay run with arrears; an installable web app in Vietnamese and English; daily database backups on Supabase Pro.",
        vi: "Danh tính và ủy quyền, đăng ký khuôn mặt và chấm công có kiểm tra vị trí, lịch tuần và giới hạn định biên, bàn giao không xem trước, bộ quy tắc lương và kỳ lương hằng tháng có truy lĩnh; ứng dụng web cài đặt được, song ngữ Việt - Anh; sao lưu cơ sở dữ liệu hằng ngày trên Supabase Pro.",
        src: "roadmap B1.1–B1.8, B2.1–B2.3, B3.1–B3.4, B4–B5, B6.1–B6.30, B6.32–B6.39, B7.1–B7.2, B8",
      },
    ],
    proof: [
      {
        en: "Database tests replay every migration on an empty Postgres and check the guarantees: nothing recorded is edited, a face is stored only with consent, and pay is reduced only by a lawful route.",
        vi: "Bộ kiểm thử cơ sở dữ liệu chạy lại mọi migration trên một Postgres trống và kiểm tra các bảo đảm: dữ liệu đã ghi nhận không bị chỉnh sửa, dữ liệu khuôn mặt chỉ được lưu khi có sự đồng ý, và tiền lương chỉ bị giảm theo đúng quy định.",
        src: "roadmap B7.1; goals (Guarantees)",
      },
    ],
    notYet: {
      en: "Not built yet: a health report that checks the backups and the site, and letting a role other than the owner set up stores, rules, pay and roles.",
      vi: "Chưa xây dựng: báo cáo tình trạng kiểm tra bản sao lưu và trang web, và cho phép vai trò khác ngoài chủ cửa hàng thiết lập cửa hàng, quy tắc, tiền lương và vai trò.",
      src: "roadmap B7.3, B1.9, B1.10, B2.4, B3.5, B6.40",
    },
    tags: ["Supabase", "Postgres", "Cloudflare", "PWA", "Playwright", "i18n"],
    discuss: [
      {
        en: "The pay-rule engine: facts, rules, lawful reductions and arrears",
        vi: "Bộ quy tắc lương: dữ kiện, quy tắc, giảm thưởng đúng luật, truy lĩnh",
      },
      {
        en: "How a non-technical owner configures everything in the app",
        vi: "Cách chủ cửa hàng không chuyên kỹ thuật tự cấu hình mọi thứ trong ứng dụng",
      },
    ],
  },
  {
    slug: "kwook-career",
    highlights: [
      {
        en: "From a short brief in Telegram, it drafts the post, publishes it to the company's Facebook Page through Make, answers comments from the approved FAQ, and reads CVs as PDF, Word or a phone photo.",
        vi: "Từ một mô tả ngắn trên Telegram, bot soạn bài, đăng lên Fanpage của công ty qua Make, trả lời bình luận theo bộ câu hỏi đã duyệt, và đọc CV dạng PDF, Word hoặc ảnh chụp.",
        src: "goals (What it is); roadmap B4.2, B3.5, B3.2, B6.1, B5.1, B4.8",
      },
      {
        en: "The AI quotes the CV's evidence for each checklist line and fixed rules decide the lane; a CV is never rejected just for not mentioning something, and a re-sent CV gets the same result.",
        vi: "AI trích dẫn bằng chứng trong CV cho từng tiêu chí, còn quy tắc cố định quyết định kết quả; CV không bị loại chỉ vì chưa đề cập, và CV gửi lại luôn cho cùng kết quả.",
        src: "goals (Rules); roadmap B5.5, B5.12 (a re-sent file reuses its check)",
      },
      {
        en: `Company Word forms become fill-in tables; contracts are filled by code in the company's layout, pay split by its salary regulation, legal floors enforced (probation pay at least ${n(kd.probationPay.percent, "en")}%).`,
        vi: `Biểu mẫu Word được chuyển thành bảng điền; hợp đồng được điền tự động theo bố cục của công ty, lương theo quy chế, bảo đảm mức tối thiểu theo luật (lương thử việc tối thiểu ${n(kd.probationPay.percent, "vi")}%).`,
        src: "goals (Rules); roadmap B7.2, B7.5, B7.6",
      },
      {
        en: "Owners approve each post, candidate email and reply outside the approved FAQ with one tap; it runs on free tiers, and the AI provider swaps by changing three settings.",
        vi: "Người tuyển dụng duyệt từng bài đăng, email gửi ứng viên và câu trả lời ngoài bộ câu hỏi đã duyệt chỉ với một lần chạm; hệ thống chạy trên gói miễn phí và đổi nhà cung cấp AI bằng ba thiết lập.",
        src: "goals (Rules); roadmap B6.2 (provider settings: README)",
      },
    ],
    name: "Kwook-career",
    tagline: {
      en: "Recruiting run from a Telegram bot: from a one-line brief to a published post, ranked CVs and a filled contract.",
      vi: "Tuyển dụng vận hành qua bot Telegram: từ một dòng mô tả đến bài đăng, CV đã xếp hạng và hợp đồng đã điền.",
    },
    status: {
      en: "Built for Kwook; ran its hiring while I worked there",
      vi: "Xây dựng cho Kwook; đã vận hành công tác tuyển dụng khi tôi công tác tại đây",
    },
    problem: {
      en: "One founder hired by hand: writing and publishing every post, answering every comment, reading every CV, then typing every contract into Word and splitting the pay with a calculator. Recruiting software ranks CVs but cannot be driven from Telegram or answer Facebook comments.",
      vi: "Nhà sáng lập tự tuyển dụng thủ công: viết và đăng từng tin, trả lời từng bình luận, đọc từng CV, rồi gõ từng hợp đồng vào Word và tự tính cơ cấu lương. Phần mềm tuyển dụng có thể xếp hạng CV nhưng không điều khiển được qua Telegram và không trả lời bình luận trên Facebook.",
      src: "goals (The problem)",
    },
    idea: {
      en: "A Telegram bot that does the legwork while the owners keep every decision: it drafts the post, publishes it to the Facebook Page, answers comments, collects CVs through a web form, ranks them, and fills the company's own contracts.",
      vi: "Một bot Telegram đảm nhận phần việc thủ công, người tuyển dụng giữ mọi quyết định: soạn bài, đăng lên Fanpage, trả lời bình luận, nhận CV qua biểu mẫu web, xếp hạng CV và điền hợp đồng theo mẫu của công ty.",
      src: "goals (What it is)",
    },
    decisions: [
      {
        label: {
          en: "The AI reports evidence; fixed rules decide",
          vi: "AI chỉ báo bằng chứng; quy tắc cố định quyết định",
        },
        text: {
          en: "For each checklist line the AI marks shown, contradicted or not stated, quoting the CV, and a quote not found in the CV counts as not stated. Fixed rules place the CV in Nên gọi, Cân nhắc or Loại; the same file against the same checklist always gives the same result.",
          vi: "Với từng tiêu chí, AI chỉ đánh dấu có thể hiện, mâu thuẫn hoặc không đề cập, kèm trích dẫn nguyên văn từ CV; trích dẫn không có trong CV được xem là không đề cập. Quy tắc cố định xếp CV vào Nên gọi, Cân nhắc hoặc Loại; cùng một tệp với cùng bộ tiêu chí luôn cho cùng kết quả.",
          src: "goals (Rules); roadmap B5.5",
        },
      },
      {
        label: {
          en: "Silence never rejects",
          vi: "Không đề cập không phải lý do loại",
        },
        text: {
          en: `Only a contradicted must-have or a shown deal-breaker rejects; a silent one is marked to ask on the call. The owner's call is kept apart from the AI's result, so no re-check undoes it, and a line behind ${n(kd.blockingLine.percent, "en")}% or more of at least ten checked CVs is flagged as possibly too strict.`,
          vi: `Chỉ tiêu chí bắt buộc bị mâu thuẫn hoặc điểm loại trừ được thể hiện mới dẫn đến loại; tiêu chí không được đề cập được đánh dấu để hỏi khi gọi. Quyết định của người tuyển dụng được lưu riêng với kết quả của AI nên không lần kiểm tra lại nào ghi đè được, và tiêu chí là lý do của từ ${n(kd.blockingLine.percent, "vi")}% trong ít nhất mười CV trở lên được báo là có thể quá chặt.`,
          src: "goals (Rules); roadmap B5.12, B5.13, B5.9",
        },
      },
      {
        label: { en: "Forms filled by code", vi: "Biểu mẫu được điền bằng mã" },
        text: {
          en: "Code finds every blank in the company's own Word file; the AI only names the blanks, once; the owner approves; filling never calls the AI, so the same table always gives the same document in the company's own layout.",
          vi: "Mã nguồn tìm mọi chỗ trống trong tệp Word của công ty; AI chỉ đặt tên cho các chỗ trống, một lần duy nhất; người tuyển dụng phê duyệt; việc điền không gọi AI, nên cùng một bảng dữ liệu luôn cho cùng một văn bản theo đúng định dạng của công ty.",
          src: "goals (Rules); roadmap B7.2",
        },
      },
      {
        label: {
          en: "Pay by the regulation, within the law",
          vi: "Lương theo quy chế, trong khuôn khổ pháp luật",
        },
        text: {
          en: `The company's pay regulation runs as code in both directions, from take-home pay to its parts, and a contract that breaks a legal floor (regional minimum wage, the probation limit, probation pay of at least ${n(kd.probationPay.percent, "en")}%) is not produced.`,
          vi: `Quy chế tiền lương của công ty được chuyển thành mã và tính theo cả hai chiều, từ lương thực nhận ra từng khoản; hợp đồng vi phạm mức sàn pháp lý (lương tối thiểu vùng, thời hạn thử việc, lương thử việc ít nhất ${n(kd.probationPay.percent, "vi")}%) sẽ không được tạo.`,
          src: "goals (Rules); roadmap B7.5, B7.6",
        },
      },
      {
        label: {
          en: "Owners approve; costs stay near zero",
          vi: "Người tuyển dụng phê duyệt; chi phí gần như bằng không",
        },
        text: {
          en: "Every post, unusual reply and email goes out only after an owner's tap. The AI provider is three secrets and replaceable; free tiers by design: comment checks back off when a post is quiet, and ranking pauses at the daily token limit and resumes by itself.",
          vi: "Mọi bài đăng, câu trả lời ngoài phạm vi và email chỉ được gửi sau khi người tuyển dụng xác nhận. Nhà cung cấp AI được cấu hình bằng ba khóa bí mật và có thể thay thế; thiết kế dùng gói miễn phí: tần suất kiểm tra bình luận giãn ra khi bài đăng ít tương tác, và việc xếp hạng tạm dừng khi hết hạn mức token trong ngày rồi tự tiếp tục.",
          src: "goals (Rules); roadmap B6.2, B5.11, B1.4",
        },
      },
    ],
    built: [
      {
        en: `CVs are personal data: consent on the form, a rejected CV's file deleted after ${n(kd.rejectedCvKept.days, "en")} days, and a closed job's CVs after ${n(kd.closedJobCvKept.months, "en")} months.`,
        vi: `CV là dữ liệu cá nhân: có xác nhận đồng ý trên biểu mẫu, tệp CV bị loại được xóa sau ${n(kd.rejectedCvKept.days, "vi")} ngày, CV của vị trí đã đóng được xóa sau ${n(kd.closedJobCvKept.months, "vi")} tháng.`,
        src: "goals (Rules); roadmap B1.2, B1.3",
      },
    ],
    proof: [
      {
        en: "Every step on its roadmap is built, and it ran Kwook's hiring while I worked there.",
        vi: "Mọi hạng mục trong lộ trình đã được xây dựng, và hệ thống đã vận hành công tác tuyển dụng của Kwook trong thời gian tôi làm việc tại đây.",
        src: "roadmap (all steps ticked)",
      },
    ],
    notYet: {
      en: "Deliberately not built, each for an outside reason: Messenger replies, Facebook Groups posting, Zalo messages.",
      vi: "Chủ định chưa xây dựng, mỗi mục vì một giới hạn bên ngoài: trả lời qua Messenger, đăng bài vào nhóm Facebook, gửi tin nhắn Zalo.",
      src: "roadmap (Not now)",
    },
    tags: [
      "Telegram Bot API",
      "Supabase Edge Functions",
      "LLM",
      "Make",
      "Cloudflare Pages",
    ],
    discuss: [
      {
        en: "How CV ranking stays consistent and explainable when an AI reads the CV",
        vi: "Cách giữ việc xếp hạng CV nhất quán, giải thích được khi AI đọc CV",
      },
      {
        en: "A walkthrough of the bot, from a brief to a filled contract",
        vi: "Trình diễn bot, từ một dòng mô tả đến hợp đồng đã điền",
      },
    ],
  },
];

// Public projects: one list for the CV (line, in both languages) and the site
// (desc). Each links its source; `url` is its live address, left out until
// known, since a guessed link that 404s is worse than none.
export interface Project {
  title: string;
  line: T;
  desc: string;
  tags: string[];
  url?: string;
  source: string;
}

export const projects: Project[] = [
  {
    title: "Dinh Ngoc Edu",
    line: {
      en: "AI turns course materials into Duolingo-style lessons and mock tests.",
      vi: "AI biến tài liệu học thành bài học kiểu Duolingo và đề thi thử.",
    },
    desc: "Upload a subject's materials once and AI builds a Duolingo-style course: chapters, lesson nodes and verified questions that also feed mock tests. Private by default, shareable when public, with a pet companion that grows as you learn.",
    tags: ["React", "TypeScript", "Supabase", "Edge Functions", "RLS", "AI"],
    url: "https://dinhngocedu.vercel.app",
    source: "https://github.com/nguyendinhngoc23052006/Dinh-Ngoc-Edu",
  },
  {
    title: "Face recognition in the browser",
    line: {
      en: "In-tab, serverless; tuned on 123 people across six ethnic groups.",
      vi: "Chạy trong trình duyệt; hiệu chỉnh trên 123 người, sáu dân tộc.",
    },
    desc: "Face detection and recognition that runs entirely in one browser tab with OpenCV's YuNet and SFace models. Match thresholds were tuned on 123 people across six ethnic groups and set by the group with the weakest results rather than the average; it refuses duplicate enrolments and impostors claiming a known name.",
    tags: ["OpenCV", "YuNet", "SFace", "WebAssembly", "Computer vision"],
    source:
      "https://github.com/nguyendinhngoc23052006/demo-computer-vision-nhom-10",
  },
  {
    title: "saasmath",
    line: {
      en: "SaaS founder calculators: runway, LTV/CAC, dilution.",
      vi: "Công cụ tính cho nhà sáng lập SaaS: runway, LTV/CAC, pha loãng.",
    },
    desc: "Free calculators and explainers for SaaS founders — runway, burn multiple, LTV/CAC, MRR/ARR growth, Rule of 40, cap-table dilution, option value, seed sizing, bridge notes. State lives in the URL so results are shareable; each calculator lists the sources it draws on.",
    tags: [
      "Astro",
      "React islands",
      "Tailwind",
      "URL state",
      "Cloudflare Pages",
    ],
    url: "https://saasmath.pages.dev",
    source: "https://github.com/nguyendinhngoc23052006/saasmath",
  },
  {
    title: "Browser tools",
    line: {
      en: "PDF merger, format converter, regex tester; files never leave the tab.",
      vi: "Gộp PDF, chuyển đổi định dạng, kiểm tra regex; dữ liệu không rời trình duyệt.",
    },
    desc: "Three small tools where nothing leaves the tab: merge and slice PDFs under a strict CSP (pdf-merger), convert JSON/YAML/TOML in live editors (format-converter), and test regexes in a single HTML file (regex-tester); the converter and the tester keep state in the URL, so a link reproduces the exact view.",
    tags: ["Preact", "Svelte 5", "CodeMirror 6", "pdf-lib", "Vanilla JS"],
    url: "https://pdf-merger-c6h.pages.dev",
    source: "https://github.com/nguyendinhngoc23052006/pdf-merger",
  },
  {
    title: "Nguyễn Ngọc Anh — portfolio",
    line: {
      en: "Bilingual scrollytelling site; GSAP, Lenis, Web Audio.",
      vi: "Portfolio song ngữ kể chuyện; GSAP, Lenis, Web Audio.",
    },
    desc: "Bilingual scrollytelling portfolio where one silk thread is drawn live through every chapter: cocoon, journey route, globe, supply-chain network, guitar strings, contact knot. GSAP DrawSVG/MotionPath with Lenis, synthesised sound, hidden easter eggs, and every animation off for readers who prefer reduced motion.",
    tags: ["React", "TypeScript", "GSAP", "Lenis", "i18n", "Web Audio"],
    source: "https://github.com/nguyendinhngoc23052006/Portfolio-for-Ngoc-Anh",
  },
  {
    title: "Nguyễn Lê Khánh — portfolio",
    line: {
      en: "Bilingual scrollytelling site; GSAP ScrollTrigger, i18n.",
      vi: "Portfolio song ngữ kể chuyện; GSAP ScrollTrigger, i18n.",
    },
    desc: "Bilingual (Vietnamese / English) scrollytelling portfolio for a content and media candidate applying to an environmental conservation project. Ten narrative sections driven by GSAP ScrollTrigger with Lenis smooth-scroll, i18n via react-i18next with the copy kept out of JSX.",
    tags: [
      "React",
      "TypeScript",
      "GSAP ScrollTrigger",
      "Lenis",
      "i18n",
      "Cloudflare Pages",
    ],
    url: "https://nguyen-le-khanh-portfolio.pages.dev",
    source:
      "https://github.com/nguyendinhngoc23052006/nguyen-le-khanh-portfolio",
  },
];

// Designs in progress, shown on the site only; details on request.
export const inTheWorks: { title: T; line: T }[] = [
  {
    title: { en: "AI visor", vi: "Kính đeo đầu tích hợp AI" },
    line: {
      en: "A head-worn visor that labels what is in view, gives step-by-step guidance on a captured photo, and translates a two-person conversation, with the owner's own AI providers. Hardware, firmware and app designed together.",
      vi: "Kính đeo đầu nhận biết và gắn nhãn các đối tượng trong tầm nhìn, hướng dẫn từng bước dựa trên ảnh chụp và dịch hội thoại giữa hai người, sử dụng nhà cung cấp AI do chính chủ sở hữu thiết bị lựa chọn. Phần cứng, firmware và ứng dụng được thiết kế đồng bộ.",
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

// Skills shown on the CV, grouped by what a hiring team looks for. Only what
// the systems and projects above actually use.
export const cvSkills: { group: T; items: string[] }[] = [
  {
    group: { en: "Frontend", vi: "Frontend" },
    items: [
      "TypeScript",
      "React",
      "TanStack Query",
      "Astro",
      "Svelte",
      "Tailwind CSS",
      "PWA",
      "GSAP",
    ],
  },
  {
    group: { en: "Backend & data", vi: "Backend & dữ liệu" },
    items: [
      "Supabase",
      "PostgreSQL",
      "Row-level security",
      "Deno",
      "pg_cron",
      "Python",
    ],
  },
  {
    group: { en: "Integrations", vi: "Tích hợp" },
    items: [
      "Telegram Bot API",
      "Facebook via Make",
      "Gmail SMTP",
      "Excel/DOCX/PDF",
    ],
  },
  {
    group: { en: "AI & vision", vi: "AI & thị giác máy tính" },
    items: [
      "Claude Code",
      "MCP",
      "LLM & vision APIs",
      "ONNX Runtime",
      "MediaPipe",
      "OpenCV",
    ],
  },
  {
    group: { en: "Cloud & quality", vi: "Cloud & chất lượng" },
    items: [
      "Cloudflare Workers & Pages",
      "GitHub Actions",
      "Playwright",
      "Vitest",
      "Biome",
    ],
  },
  {
    group: { en: "Business domain", vi: "Nghiệp vụ" },
    items: [
      "HR & payroll",
      "Labour Code 2019",
      "Social insurance & PIT",
      "Cash control",
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
      vi: "Mọi agent nạp cùng một bộ quy tắc khi bắt đầu phiên: phạm vi, quy ước, việc cần tôi phê duyệt và tiêu chí hoàn thành.",
    },
  },
  {
    label: { en: "Plan before code", vi: "Lập kế hoạch trước khi viết mã" },
    text: {
      en: "Each change starts as a written plan with acceptance criteria. Building starts only after I approve it.",
      vi: "Mỗi thay đổi bắt đầu bằng kế hoạch có tiêu chí nghiệm thu; chỉ triển khai sau khi tôi phê duyệt.",
    },
  },
  {
    label: { en: "Hooks that enforce it", vi: "Hook bảo đảm quy trình" },
    text: {
      en: "Hooks hold that order: until a plan is approved, an agent may read and plan, and its edits and commands are blocked.",
      vi: "Hook giữ đúng trình tự đó: khi kế hoạch chưa được duyệt, agent chỉ được đọc và lập kế hoạch; chỉnh sửa và chạy lệnh đều bị chặn.",
    },
  },
  {
    label: { en: "Specialist reviewers", vi: "Agent rà soát chuyên trách" },
    text: {
      en: "Review agents check each change for security, code quality and scale; a readiness check refuses to ask for a pull request until their verdicts pass.",
      vi: "Các agent rà soát kiểm tra từng thay đổi về bảo mật, chất lượng mã và khả năng mở rộng; bước kiểm tra sẵn sàng chỉ cho phép đề nghị mở pull request khi các agent đã thông qua.",
    },
  },
  {
    label: {
      en: "Evidence before a pull request",
      vi: "Mở pull request khi đã có bằng chứng",
    },
    text: {
      en: "Scripts hold back a pull request until the evidence exists: test results, step-by-step screenshots and a report I read myself.",
      vi: "Script chỉ cho mở pull request khi đủ bằng chứng: kết quả kiểm thử, ảnh chụp từng bước và báo cáo do tôi trực tiếp xem xét.",
    },
  },
  {
    label: {
      en: "A human merges",
      vi: "Con người là người quyết định cuối cùng",
    },
    text: {
      en: "CI is the last gate, and nothing merges without my explicit approval of that pull request, apart from routine dependency updates once CI passes. Agents never deploy.",
      vi: "CI là bước kiểm tra cuối, và không thay đổi nào được gộp khi chưa có sự phê duyệt rõ ràng của tôi cho pull request đó, ngoại trừ các bản cập nhật thư viện định kỳ sau khi CI đạt. Agent không bao giờ tự triển khai.",
    },
  },
];

export const howIVerify: T[] = [
  {
    en: "On Mau Heritage Hub, every pull request replays all migrations on an empty Postgres, then checks the guarantees: append-only history, face consent, lawful pay.",
    vi: "Tại Mau Heritage Hub, mỗi pull request chạy lại toàn bộ migration trên một Postgres trống, sau đó kiểm tra các bảo đảm: lịch sử chỉ được ghi thêm, sự đồng ý sử dụng dữ liệu khuôn mặt, tiền lương đúng quy định pháp luật.",
  },
  {
    en: "Mau Heritage Hub's flows walked through in a real browser with Playwright, a screenshot at every step, collected into a report; Ops Platform has scripted browser walkthroughs.",
    vi: "Các luồng của Mau Heritage Hub được chạy thử trên trình duyệt thật bằng Playwright, chụp ảnh ở từng bước và tổng hợp thành báo cáo; Ops Platform có các kịch bản chạy thử trên trình duyệt.",
  },
  {
    en: "I check the artefact, not the agent's summary: the diff, the test output, the running preview.",
    vi: "Tôi kiểm tra trực tiếp sản phẩm thực tế chứ không chỉ dựa vào bản tóm tắt của agent: phần mã thay đổi (diff), kết quả kiểm thử và bản xem trước đang chạy.",
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
        vi: "Mỗi thay đổi đi từ nhánh làm việc qua pull request vào staging, rồi qua pull request thứ hai vào main. Mỗi pull request có bản xem trước riêng: nhánh cơ sở dữ liệu độc lập đã áp dụng migration, kèm đường dẫn riêng.",
      },
      {
        en: "Staging deploys on merge; production sits behind a gate check, with rollback, scale-test and nightly-backup workflows (backup not yet switched on). Production is not live yet.",
        vi: "Staging tự triển khai khi gộp mã; production có bước kiểm tra cổng (gate check), cùng các workflow hoàn tác, kiểm thử tải và sao lưu hằng đêm (sao lưu chưa được bật). Production chưa vận hành.",
      },
    ],
  },
  {
    system: "Mau Heritage Hub",
    lines: [
      {
        en: "Live for a retail chain. Each pull request gets a preview link that says on every screen it uses the live database, since database branching is not bought.",
        vi: "Đang vận hành cho một chuỗi bán lẻ. Mỗi pull request có bản xem trước, ghi rõ trên mọi màn hình là đang dùng cơ sở dữ liệu thật vì chưa mua tính năng phân nhánh.",
      },
      {
        en: "Merging runs the migration workflow. Main is protected: lint, typecheck, tests, the database suite and the site build must all pass before a merge.",
        vi: "Khi gộp mã, workflow migration tự chạy. Nhánh main được bảo vệ: lint, typecheck, kiểm thử, bộ kiểm thử cơ sở dữ liệu và bản dựng trang web đều phải đạt trước khi gộp.",
      },
      {
        en: "Daily database backups kept for seven days on Supabase Pro, and a written restore procedure that re-applies any face withdrawn after the backup was taken.",
        vi: "Sao lưu cơ sở dữ liệu hằng ngày, giữ bảy ngày trên Supabase Pro; quy trình khôi phục bằng văn bản áp dụng lại các yêu cầu rút dữ liệu khuôn mặt sau thời điểm sao lưu.",
      },
    ],
  },
  {
    system: "Kwook-career",
    lines: [
      {
        en: "Merging to main deploys the database and the site. Undoing a change means reverting its pull request; migrations only move forward.",
        vi: "Khi gộp vào main, cơ sở dữ liệu và trang web tự triển khai. Hoàn tác bằng cách revert pull request tương ứng; migration chỉ đi theo một chiều.",
      },
    ],
  },
];

export const shipRules: T[] = [
  {
    en: "Schema changes only as migration files, and an applied migration is never edited.",
    vi: "Mọi thay đổi cấu trúc dữ liệu chỉ qua tệp migration; migration đã áp dụng không được sửa.",
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
    label: "Solo-developed and run by real companies",
  },
  {
    number: `${n(od.faceMatch.people, "en")} people`,
    label: `Face matched in under ${n(od.faceMatch.ms, "en")} ms on Ops Platform`,
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

export const contactInfo = {
  // Shown on the site and the CV only when filled in.
  phone: "+84 339 497 255",
  email: "nguyendinhngoc23052006@gmail.com",
  github: "https://github.com/nguyendinhngoc23052006",
  location: "Hanoi, Vietnam",
};

// Shown under the CV header and on the site's contact section.
export const availability: T = {
  en: "Available for full-time and remote roles; flexible hours.",
  vi: "Sẵn sàng làm việc toàn thời gian và từ xa; linh hoạt thời gian.",
};

export const languages: T = {
  en: "Vietnamese (native) · English (fluent, IELTS 8.0, April 2023)",
  vi: "Tiếng Việt (bản ngữ) · Tiếng Anh (thành thạo, IELTS 8.0, 04/2023)",
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
        en: "Solo-developed Ops Platform and Kwook-career (below): HR ran employee records, QR-tagged asset tracking and face attendance on Ops Platform, and the company hired through Kwook-career.",
        vi: "Phát triển độc lập Ops Platform và Kwook-career (xem bên dưới): nhân sự quản lý hồ sơ, tài sản gắn mã QR và chấm công khuôn mặt trên Ops Platform; công ty tuyển dụng qua Kwook-career.",
      },
      {
        en: "Standardised company procedures into written rules and tools: the salary regulation and payroll method checked to the đồng, the meal-allowance rule, asset handover and HR records.",
        vi: "Chuẩn hóa quy trình công ty thành quy chế và công cụ: quy chế lương và cách tính lương được đối chiếu chính xác đến từng đồng, quy định ăn ca, bàn giao tài sản và hồ sơ nhân sự.",
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
        en: "Ran the stores and standardised how they work: shifts, attendance, daily cash and the monthly pay run.",
        vi: "Điều hành các cửa hàng và chuẩn hóa quy trình làm việc: ca làm, chấm công, tiền mặt hằng ngày và kỳ trả lương hằng tháng.",
      },
      {
        en: "Solo-developed Mau Heritage Hub (below), which the stores run on for shifts, attendance, cash and pay; Mau Heritage now rents it from me.",
        vi: "Phát triển độc lập Mau Heritage Hub (xem bên dưới) để các cửa hàng quản lý ca làm, chấm công, tiền mặt và tiền lương; hiện Mau Heritage đang thuê sử dụng hệ thống này.",
      },
    ],
  },
];
