// Slide decks: real screens of each project in use, with what the person
// does and what then happens. One entry per slide; the image's size, origin
// and capture date live in screens.json, written by scripts/import-screens.mjs.
// The three systems run on invented demo data (no real staff, applicants,
// faces or pay); the public projects are their live sites.
import type { T } from "./portfolio";

export interface Slide {
  /** `<deck>/<file>` — a key of screens.json and public/work/<deck>/<file>.webp */
  image: string;
  title: T;
  text: T;
  /** What the caption rests on: the screen itself and the step that produced it. */
  src: string;
}

export interface Deck {
  /** Shown above the slides: where the screens come from. */
  note: T;
  slides: Slide[];
}

const MAU = "mau-heritage-hub e2e/walkthrough.spec.ts";
const OPS = "ops-platform on its demo seed (supabase/seed.sql)";
const CAREER = "kwook-career web/ (app.js, rsvp.js)";

export const decks: Record<string, Deck> = {
  "mau-heritage-hub": {
    note: {
      en: "Screens from Mau Heritage Hub's own code, running against a local database with invented staff (Minh, Lan, Hai, Tuan) and two invented stores. The camera is replaced by a test camera, so no face appears.",
      vi: "Các màn hình được chụp từ chính mã nguồn của Mau Heritage Hub, chạy trên cơ sở dữ liệu cục bộ với nhân viên giả định (Minh, Lan, Hải, Tuấn) và hai cửa hàng giả định. Camera được thay bằng camera thử nghiệm nên không có khuôn mặt thật nào xuất hiện.",
    },
    slides: [
      {
        image: "mau-heritage-hub/04-owner-stores",
        title: {
          en: "The owner sets up the stores",
          vi: "Chủ cửa hàng thiết lập từng cửa hàng",
        },
        text: {
          en: "Each store carries its own rules: how many people work at a time, the radius a check-in must come from, whether a check-in from elsewhere is refused or only flagged, and the cash in the safe when the store started using the app. Everything later (rosters, check-ins, the daily cash check) reads these settings, so a new store is a form, not code.",
          vi: "Mỗi cửa hàng có quy định riêng: số người làm cùng lúc, bán kính hợp lệ khi chấm công, chấm công từ nơi khác bị từ chối hay chỉ được đánh dấu, và số tiền trong két khi cửa hàng bắt đầu dùng ứng dụng. Mọi chức năng phía sau (lịch ca, chấm công, đối soát tiền mặt hằng ngày) đều đọc các thiết lập này, nên mở thêm cửa hàng chỉ cần điền một biểu mẫu, không cần viết thêm mã.",
        },
        src: `${MAU}: "the owner sets up two stores"`,
      },
      {
        image: "mau-heritage-hub/07-owner-person-face-enrolled",
        title: {
          en: "A person's profile, with consent before the face",
          vi: "Hồ sơ nhân viên: có sự đồng ý trước khi lưu khuôn mặt",
        },
        text: {
          en: "The owner adds a person with an employee code, the stores they work at and an hourly rate that applies from a chosen day. A face is sensitive personal data, so it is enrolled only after consent is recorded; withdrawing consent deletes the face for good, and a person who declines can sign in with their code and a PIN instead.",
          vi: "Chủ cửa hàng thêm nhân viên với mã nhân viên, các cửa hàng người đó làm việc và mức lương theo giờ áp dụng từ ngày được chọn. Khuôn mặt là dữ liệu cá nhân nhạy cảm, nên chỉ được đăng ký sau khi ghi nhận sự đồng ý; khi rút lại sự đồng ý, dữ liệu khuôn mặt bị xoá vĩnh viễn, và người không muốn dùng khuôn mặt có thể đăng nhập bằng mã nhân viên và mã PIN.",
        },
        src: `${MAU}: "the owner adds people with employee codes, records consent and enrols faces"`,
      },
      {
        image: "mau-heritage-hub/10-staff-open-profile",
        title: {
          en: "Staff open their profile with their face",
          vi: "Nhân viên mở hồ sơ bằng khuôn mặt",
        },
        text: {
          en: "On a shared store phone or their own, a staff member scans their face to open their profile: no password to remember or share. In this demo the camera is a test camera that hands the app a stand-in face, which is why the frame is dark.",
          vi: "Trên điện thoại chung của cửa hàng hoặc điện thoại cá nhân, nhân viên quét khuôn mặt để mở hồ sơ, không cần nhớ hay chia sẻ mật khẩu. Trong bản trình diễn này, camera là camera thử nghiệm cung cấp dữ liệu khuôn mặt mẫu cho ứng dụng, vì vậy khung hình có màu tối.",
        },
        src: `${MAU}: "Lan opens her profile with her face"`,
      },
      {
        image: "mau-heritage-hub/12-staff-unknown-face-refused",
        title: {
          en: "A face nobody enrolled is refused",
          vi: "Khuôn mặt chưa đăng ký bị từ chối",
        },
        text: {
          en: "A face that matches no enrolled person opens nothing; the screen asks to try again facing the camera, and a PIN remains the fallback.",
          vi: "Khuôn mặt không khớp với bất kỳ người nào đã đăng ký sẽ không mở được hồ sơ; màn hình mời người dùng thử lại và nhìn thẳng vào camera, đồng thời vẫn có lựa chọn đăng nhập bằng mã PIN.",
        },
        src: `${MAU}: "a face nobody enrolled is refused"`,
      },
      {
        image: "mau-heritage-hub/14-staff-full-shift",
        title: {
          en: "Staff sign up for next week's shifts",
          vi: "Nhân viên đăng ký ca cho tuần sau",
        },
        text: {
          en: "Sign-up for next week opens on a schedule the owner sets. Each shift shows its places left, and a full shift takes nobody else, so the headcount each store asked for holds without a manager counting by hand. A colleague who cannot work a shift gives it away with a one-time code; whoever enters the code takes it once a manager approves.",
          vi: "Việc đăng ký ca tuần sau mở theo lịch do chủ cửa hàng đặt. Mỗi ca hiển thị số suất còn lại, và ca đã đủ người sẽ không nhận thêm, nhờ đó số lượng nhân sự mỗi cửa hàng yêu cầu luôn được đảm bảo mà quản lý không phải đếm thủ công. Khi không thể làm một ca, nhân viên có thể nhường ca bằng một mã dùng một lần; người nhập mã sẽ nhận ca sau khi quản lý phê duyệt.",
        },
        src: `${MAU}: "people sign up for next week; a full shift takes no more"`,
      },
      {
        image: "mau-heritage-hub/17-staff-refused-wrong-place",
        title: {
          en: "Check-in checks the face and the place",
          vi: "Chấm công kiểm tra cả khuôn mặt và địa điểm",
        },
        text: {
          en: "Checking in needs both the person's face and the phone's location. Here the phone is far from the Hoi An store, whose rule is to refuse check-ins from elsewhere, so the check-in is turned down with the distance shown.",
          vi: "Khi chấm công, hệ thống kiểm tra cả khuôn mặt của nhân viên và định vị của điện thoại. Trong ví dụ này, điện thoại ở xa cửa hàng Hội An, nơi được thiết lập từ chối chấm công từ nơi khác, nên lượt chấm công bị từ chối và màn hình hiển thị khoảng cách.",
        },
        src: `${MAU}: "check-in: face + location, and the headcount holds"`,
      },
      {
        image: "mau-heritage-hub/21-manager-confirmed-log-short",
        title: {
          en: "The daily cash handover, confirmed by someone else",
          vi: "Bàn giao tiền mặt cuối ngày, do người khác xác nhận",
        },
        text: {
          en: "At the end of a shift the staff member logs takings, card payments, cash paid out and what is left in the safe, without seeing what the safe should hold. Someone else with the right to confirm (here Minh, the manager) then confirms the handover; nobody confirms their own. Only then does the app compare it with what the safe should hold and show the difference, here a shortfall.",
          vi: "Cuối ca, nhân viên ghi lại doanh thu, các khoản thanh toán thẻ, tiền chi ra và số tiền còn trong két, khi chưa xem số tiền két cần có. Sau đó một người khác có quyền xác nhận (trong ví dụ này là quản lý Minh) xác nhận bản bàn giao; không ai tự xác nhận bản bàn giao của mình. Chỉ khi đó ứng dụng mới đối chiếu với số tiền két cần có và hiển thị chênh lệch, trong ví dụ này là khoản thiếu hụt.",
        },
        src: `${MAU}: "Lan logs the day blind; Minh confirms it and sees the safe is short"`,
      },
      {
        image: "mau-heritage-hub/28-owner-pay-draft",
        title: {
          en: "A month's pay, worked out and explained",
          vi: "Lương tháng được tính và giải thích rõ ràng",
        },
        text: {
          en: "The owner works out the month: hours come from check-ins and bonuses from the store's pay rules, and a cash shortfall the owner recorded as a written decision is deducted as compensation, capped by law. Every person's line opens into the day-by-day reasons, hours from forgotten check-outs wait until someone confirms them, and no payslip is released until the owner approves.",
          vi: "Chủ cửa hàng tính lương tháng: số giờ lấy từ dữ liệu chấm công, tiền thưởng theo quy chế thưởng của cửa hàng, và khoản thiếu hụt tiền mặt mà chủ cửa hàng đã ghi nhận bằng quyết định bằng văn bản được khấu trừ làm khoản bồi thường, trong giới hạn pháp luật cho phép. Mỗi dòng lương đều có thể mở ra để xem chi tiết từng ngày; giờ làm từ những lần quên chấm công ra được giữ lại cho đến khi có người xác nhận, và phiếu lương chỉ được gửi đến nhân viên sau khi chủ cửa hàng phê duyệt.",
        },
        src: `${MAU}: "the owner works out last month's pay, enters insurance, approves"`,
      },
      {
        image: "mau-heritage-hub/30-staff-payslip",
        title: {
          en: "Each person reads their own payslip",
          vi: "Mỗi người xem phiếu lương của chính mình",
        },
        text: {
          en: "Once approved, staff see their payslip on their phone: base pay by store, bonuses and how they were shared, any bonus reduction with its reason, insurance and tax, and net pay, followed by every shift worked and the bonus regulation it was paid under.",
          vi: "Sau khi được phê duyệt, nhân viên xem phiếu lương trên điện thoại: lương cơ bản theo từng cửa hàng, tiền thưởng và cách chia thưởng, các khoản giảm thưởng kèm lý do, bảo hiểm và thuế, cùng lương thực nhận; bên dưới là toàn bộ các ca đã làm và quy chế thưởng được áp dụng.",
        },
        src: `${MAU}: "Lan reads the bonus regulation, then last month's payslip"`,
      },
      {
        image: "mau-heritage-hub/35-staff-today-vietnamese",
        title: {
          en: "Every screen in Vietnamese, one tap away",
          vi: "Mọi màn hình đều có tiếng Việt chỉ với một chạm",
        },
        text: {
          en: "The VI / EN switch turns the whole app into Vietnamese for the staff who prefer it; a test fails if any English line has no Vietnamese.",
          vi: "Nút VI / EN đưa toàn bộ ứng dụng sang tiếng Việt cho những nhân viên có nhu cầu; bộ kiểm thử sẽ báo lỗi nếu bất kỳ dòng tiếng Anh nào chưa có bản tiếng Việt.",
        },
        src: `${MAU}: "the same screen reads in Vietnamese at one tap"; src/i18n`,
      },
    ],
  },

  "ops-platform": {
    note: {
      en: 'Screens from Ops Platform\'s own code, running against a local database with its demo seed: an invented food maker, Ví dụ Foods ("ví dụ" means "example"), with invented staff and two months of invented attendance. The units and job titles are in Vietnamese because the demo company is Vietnamese; the interface is shown in English except on the worker\'s phone.',
      vi: "Các màn hình được chụp từ chính mã nguồn của Ops Platform, chạy trên cơ sở dữ liệu cục bộ với dữ liệu mẫu: một công ty thực phẩm giả định tên Ví dụ Foods, với nhân viên giả định và dữ liệu chấm công giả định trong hai tháng. Tên đơn vị và chức danh bằng tiếng Việt vì công ty mẫu là doanh nghiệp Việt Nam; giao diện được hiển thị bằng tiếng Anh, trừ màn hình điện thoại của công nhân.",
    },
    slides: [
      {
        image: "ops-platform/02-owner-today",
        title: {
          en: "The owner's first screen: what needs doing",
          vi: "Màn hình đầu tiên của chủ doanh nghiệp: những việc cần làm",
        },
        text: {
          en: "Today gathers what needs the signed-in person, and for a new company it walks the owner through setup in order: unit types, units and seats, job titles, fields, people, working hours, privileges, a second administrator and door devices. Each step links to the page that does it.",
          vi: "Trang Hôm nay tập hợp những việc cần người đang đăng nhập xử lý; với doanh nghiệp mới, trang này hướng dẫn chủ doanh nghiệp thiết lập theo thứ tự: loại đơn vị, đơn vị và vị trí, chức danh, trường dữ liệu, nhân sự, giờ làm việc, quyền hạn, quản trị viên thứ hai và thiết bị chấm công. Mỗi bước đều dẫn đến trang thực hiện bước đó.",
        },
        src: `${OPS}: /org/today as the owner`,
      },
      {
        image: "ops-platform/03-org-chart",
        title: {
          en: "The company drawn as units and seats",
          vi: "Doanh nghiệp được thể hiện bằng đơn vị và vị trí",
        },
        text: {
          en: "The organisation chart is the company's structure: units hold seats, each seat has a job title and a person in it. Opening a box is where people are seated, working hours set and privileges given, so moving a person is changing a seat, not editing access by hand.",
          vi: "Sơ đồ tổ chức thể hiện cấu trúc doanh nghiệp: mỗi đơn vị có các vị trí, mỗi vị trí gắn với một chức danh và một người đảm nhiệm. Từ mỗi ô trên sơ đồ, người quản trị bố trí nhân sự vào vị trí, đặt giờ làm việc và phân quyền, nên khi điều chuyển nhân sự chỉ cần đổi vị trí, không cần chỉnh quyền truy cập thủ công.",
        },
        src: `${OPS}: /org/chart`,
      },
      {
        image: "ops-platform/05-person-fields",
        title: {
          en: "Fields the company chooses, protected by kind",
          vi: "Trường dữ liệu do doanh nghiệp chọn, được bảo vệ theo loại dữ liệu",
        },
        text: {
          en: "The company decides what every staff record holds and who fills each field. Each field is tagged by how its data is protected, personal or sensitive, and this page sets the fields without ever showing anyone's values.",
          vi: "Doanh nghiệp tự quyết định mỗi hồ sơ nhân viên gồm những thông tin nào và ai điền từng trường. Mỗi trường được gắn nhãn theo mức độ bảo vệ dữ liệu, dữ liệu cá nhân hoặc dữ liệu nhạy cảm, và trang này chỉ dùng để thiết lập các trường, không hiển thị giá trị của bất kỳ ai.",
        },
        src: `${OPS}: /org/fields?type=person`,
      },
      {
        image: "ops-platform/07-machine-fields",
        title: {
          en: "A new kind of record, set up without code",
          vi: "Một loại hồ sơ mới, thiết lập không cần viết mã",
        },
        text: {
          en: 'Beyond people, the company can keep records of anything it tracks. Here a "Packing machine" type was created in the app, then given a required serial number that no two machines may share, a last-serviced date and a line, all through the same forms.',
          vi: 'Ngoài hồ sơ nhân sự, doanh nghiệp có thể quản lý hồ sơ của bất kỳ đối tượng nào cần theo dõi. Trong ví dụ này, loại hồ sơ "Máy đóng gói" được tạo ngay trong ứng dụng, sau đó được thêm trường số sê-ri bắt buộc và không được trùng giữa các máy, ngày bảo trì gần nhất và dây chuyền, tất cả đều qua cùng một loại biểu mẫu.',
        },
        src: `${OPS}: record type and fields created through /org/record-kinds and /org/fields during capture`,
      },
      {
        image: "ops-platform/09b-machine-tag",
        title: {
          en: "A printed tag ties the machine to its record",
          vi: "Tem in liên kết máy với hồ sơ của nó",
        },
        text: {
          en: "Any record prints a QR tag to stick on the real thing. Scanning it with the app's Scan button opens the record, and only for people allowed to see it, so a machine on the floor can be traced to its record.",
          vi: "Mỗi hồ sơ đều in được tem QR để dán lên vật thể thực tế. Khi quét tem bằng nút Quét trong ứng dụng, hồ sơ sẽ mở ra, nhưng chỉ với những người có quyền xem, nhờ đó máy móc tại xưởng có thể được truy về hồ sơ của nó.",
        },
        src: `${OPS}: Print tag on a Packing machine record`,
      },
      {
        image: "ops-platform/06-privileges",
        title: {
          en: "Privileges, grouped and checked",
          vi: "Quyền hạn, theo nhóm và có kiểm soát",
        },
        text: {
          en: 'Every privilege says what it allows and who holds it, by privilege or by job title and seat. Some are marked "Needs a second person": given through a seat, each step waits for someone else to confirm. Admin pages ask the administrator to confirm with an authenticator app.',
          vi: 'Mỗi quyền đều nêu rõ cho phép làm gì và ai đang giữ, có thể xem theo quyền hoặc theo chức danh và vị trí. Một số quyền được đánh dấu "Cần người thứ hai": khi được giao qua vị trí, mỗi bước phải chờ người khác xác nhận. Các trang quản trị yêu cầu quản trị viên xác nhận bằng ứng dụng xác thực.',
        },
        src: `${OPS}: /org/privileges; /org/me/sign-in`,
      },
      {
        image: "ops-platform/11-manager-work",
        title: {
          en: "Work flows down through seats",
          vi: "Công việc được giao theo vị trí",
        },
        text: {
          en: "Work is given to a seat, not a name: the production director sends a job to the workshop foreman, who can in turn assign work to the seats below. Each item shows who sent it, to which seat, its due date and its discussion.",
          vi: "Công việc được giao cho vị trí, không giao cho cá nhân cụ thể: giám đốc sản xuất giao việc cho quản đốc xưởng, và quản đốc có thể tiếp tục giao việc cho các vị trí cấp dưới. Mỗi công việc hiển thị người giao, vị trí nhận, hạn hoàn thành và phần trao đổi.",
        },
        src: `${OPS}: /org/work as the workshop foreman (manager@vidu.test)`,
      },
      {
        image: "ops-platform/12b-unit-timesheet",
        title: {
          en: "The workshop's monthly timesheet for pay",
          vi: "Bảng công tháng của xưởng để tính lương",
        },
        text: {
          en: "Door punches become a monthly timesheet per unit, in the day codes the company already uses. The foreman approves waiting overtime, can show only the people who need review, and downloads the pay sheet.",
          vi: "Dữ liệu chấm công tại cửa được tổng hợp thành bảng công tháng cho từng đơn vị, theo đúng các ký hiệu ngày công doanh nghiệp đang dùng. Quản đốc phê duyệt giờ tăng ca đang chờ, có thể lọc riêng những người cần kiểm tra và tải bảng tổng hợp phục vụ tính lương.",
        },
        src: `${OPS}: /org/attendance/<Xưởng Sơ chế>, Monthly timesheet`,
      },
      {
        image: "ops-platform/13b-worker-attendance",
        title: {
          en: "A worker checks their own month",
          vi: "Công nhân tự xem bảng công tháng của mình",
        },
        text: {
          en: "On their phone, in Vietnamese, a worker sees their own pay period: days worked against the standard, lateness, missing punches and each day's times, so a mistake can be spotted while the pay period is still open.",
          vi: "Trên điện thoại, bằng tiếng Việt, công nhân xem kỳ công của chính mình: số ngày công so với ngày công chuẩn, số lần đi muộn, số lượt chấm công còn thiếu và giờ vào ra từng ngày, nhờ đó có thể phát hiện sai sót khi kỳ công vẫn còn mở.",
        },
        src: `${OPS}: /org/me/attendance as a worker (worker@vidu.test), phone width`,
      },
      {
        image: "ops-platform/10-postings",
        title: {
          en: "Hiring: post, share, score",
          vi: "Tuyển dụng: đăng tin, chia sẻ, chấm điểm",
        },
        text: {
          en: "HR creates a posting for a seat, publishes it and shares its link. Applications are scored automatically against the job description; the posting sets which scores go straight through and how many people to invite to interview slots.",
          vi: "Bộ phận nhân sự tạo tin tuyển dụng cho một vị trí, đăng tin và chia sẻ đường dẫn. Hồ sơ ứng tuyển được chấm điểm tự động dựa trên mô tả công việc; mỗi tin tuyển dụng quy định mức điểm được chuyển thẳng sang vòng sau và số người được mời phỏng vấn.",
        },
        src: `${OPS}: /org/postings; supabase/functions/score-application`,
      },
      {
        image: "ops-platform/01-careers",
        title: {
          en: "The public careers page",
          vi: "Trang tuyển dụng công khai",
        },
        text: {
          en: "Published postings appear on the company's public careers page, in Vietnamese or English, where candidates apply without an account.",
          vi: "Các tin đã đăng xuất hiện trên trang tuyển dụng công khai của doanh nghiệp, bằng tiếng Việt hoặc tiếng Anh, nơi ứng viên nộp hồ sơ mà không cần tạo tài khoản.",
        },
        src: `${OPS}: / (public careers page), English`,
      },
    ],
  },

  "kwook-career": {
    note: {
      en: 'The real candidate pages, served offline with invented jobs and the company renamed "Example Co.": no real job, applicant or company data, and nothing sent to the live system. The owner\'s side runs in a Telegram chat and is described in the case study rather than shown.',
      vi: 'Các trang dành cho ứng viên trong hệ thống thật, chạy ngoại tuyến với tin tuyển dụng giả định và tên công ty được đổi thành "Example Co.": không có dữ liệu thật về tin tuyển dụng, ứng viên hay doanh nghiệp, và không có dữ liệu nào được gửi tới hệ thống đang vận hành. Phần dành cho chủ doanh nghiệp vận hành trong Telegram và được mô tả trong phần nghiên cứu điển hình thay vì hiển thị ở đây.',
    },
    slides: [
      {
        image: "kwook-career/01-jobs",
        title: {
          en: "One link lists every open job",
          vi: "Một đường dẫn liệt kê mọi công việc đang tuyển",
        },
        text: {
          en: "Candidates usually arrive from a Facebook post on their phone. Without a job in the link, the page lists every open job, so one link in a page bio never goes stale.",
          vi: "Ứng viên thường truy cập từ bài đăng Facebook trên điện thoại. Khi đường dẫn không kèm mã công việc, trang sẽ liệt kê mọi công việc đang tuyển, nhờ đó một đường dẫn đặt ở phần giới thiệu trang luôn còn giá trị.",
        },
        src: `${CAREER}: loadJobs()`,
      },
      {
        image: "kwook-career/02-job",
        title: {
          en: "The job and a short application",
          vi: "Mô tả công việc và mẫu ứng tuyển ngắn gọn",
        },
        text: {
          en: "Each job page shows the description and a form short enough for a phone: name, phone, an optional email, the job's own yes / no questions and a CV photo or file (optional on jobs marked as needing no CV, as here), with consent that the CV is used only for this job and deleted six months after the hiring round ends.",
          vi: "Mỗi trang công việc hiển thị mô tả và một mẫu ứng tuyển đủ ngắn để điền trên điện thoại: họ tên, số điện thoại, email (không bắt buộc), các câu hỏi có / không riêng của công việc và CV dạng ảnh hoặc tệp (không bắt buộc với công việc được đánh dấu không cần CV, như trong ví dụ này), kèm phần đồng ý để CV chỉ được dùng cho công việc này và được xoá sau sáu tháng kể từ khi đợt tuyển dụng kết thúc.",
        },
        src: `${CAREER}: loadJob(), renderQuestions(); index.html`,
      },
      {
        image: "kwook-career/03-validation",
        title: {
          en: "The server checks every application",
          vi: "Máy chủ kiểm tra mọi hồ sơ",
        },
        text: {
          en: "Checks live on the server, not only in the page: the server returns a reason, and the page shows it in the candidate's language. Here the name is missing.",
          vi: "Việc kiểm tra được thực hiện trên máy chủ, không chỉ trên trang: máy chủ trả về lý do, và trang hiển thị lý do đó bằng ngôn ngữ của ứng viên. Trong ví dụ này là thiếu họ tên.",
        },
        src: `${CAREER}: submit handler; supabase/functions/apply`,
      },
      {
        image: "kwook-career/04-sent",
        title: {
          en: "Sent: the pipeline takes it from here",
          vi: "Đã gửi: quy trình tự động tiếp nhận",
        },
        text: {
          en: "After sending, the candidate is thanked and told they will be contacted if their profile fits. Behind this screen the CV is read, scored and sorted automatically into call, consider or rejected; the owner approves what goes public and every email to a candidate, and calls the shortlist.",
          vi: "Sau khi gửi, ứng viên nhận lời cảm ơn và được báo rằng sẽ có người liên hệ nếu hồ sơ phù hợp. Phía sau màn hình này, CV được đọc, chấm điểm và tự động xếp vào một trong ba nhóm: nên gọi, cân nhắc hoặc loại; chủ doanh nghiệp phê duyệt nội dung đăng công khai và mọi email gửi ứng viên, rồi liên hệ với các ứng viên trong danh sách rút gọn.",
        },
        src: `${CAREER}: show("done"); kwook-career goals.md (Hiring runs itself)`,
      },
      {
        image: "kwook-career/05-english",
        title: { en: "Vietnamese or English", vi: "Tiếng Việt hoặc tiếng Anh" },
        text: {
          en: "The VI / EN switch changes the page's own words and is remembered; the job description itself stays in the language it was written in.",
          vi: "Nút chuyển VI / EN thay đổi ngôn ngữ của giao diện trang và được ghi nhớ; riêng phần mô tả công việc giữ nguyên ngôn ngữ đã soạn.",
        },
        src: `${CAREER}: useLanguage(); header comment of app.js`,
      },
      {
        image: "kwook-career/06-rsvp-yes",
        title: {
          en: "Interview confirmed in one tap",
          vi: "Xác nhận phỏng vấn chỉ với một chạm",
        },
        text: {
          en: 'The interview email carries links; tapping "yes" confirms the time. The page sends the answer once and shows nothing about the interview or anyone else.',
          vi: 'Email mời phỏng vấn có sẵn các đường dẫn; chỉ cần chạm "có" để xác nhận thời gian. Trang chỉ gửi câu trả lời một lần và không hiển thị bất kỳ thông tin nào về buổi phỏng vấn hay người khác.',
        },
        src: `${CAREER}: rsvp.js`,
      },
      {
        image: "kwook-career/07-rsvp-move",
        title: { en: "Or ask to move it", vi: "Hoặc đề xuất đổi lịch" },
        text: {
          en: "A candidate who cannot come asks to move the interview from the same email, and the owner is told without a phone call.",
          vi: "Ứng viên chưa thể sắp xếp tham dự có thể đề xuất đổi lịch ngay từ email đó, và chủ doanh nghiệp được thông báo mà không cần gọi điện.",
        },
        src: `${CAREER}: rsvp.js (a=move)`,
      },
    ],
  },

  "dinh-ngoc-edu": {
    note: {
      en: "The live site's public pages.",
      vi: "Các trang công khai của trang web đang hoạt động.",
    },
    slides: [
      {
        image: "dinh-ngoc-edu/01-landing-top",
        title: {
          en: "Upload notes, get a course",
          vi: "Tải tài liệu lên, nhận một khoá học",
        },
        text: {
          en: "The home page starts the work at once: name a course, pick the language to study in, attach notes, slides or readings, and generate the course; a visitor who is not signed in is asked to after pressing Generate, and the form is kept.",
          vi: "Trang chủ cho phép bắt đầu ngay: đặt tên khoá học, chọn ngôn ngữ học, đính kèm ghi chép, bài giảng hoặc tài liệu đọc, rồi tạo khoá học; người chưa đăng nhập sẽ được mời đăng nhập sau khi bấm Tạo, và nội dung đã điền được giữ lại.",
        },
        src: "dinhngocedu.vercel.app, home page",
      },
      {
        image: "dinh-ngoc-edu/02-landing-scrolled-bottom",
        title: {
          en: "From notes to mock tests in four steps",
          vi: "Từ tài liệu đến đề thi thử qua bốn bước",
        },
        text: {
          en: "Upload the materials, pick the language, learn chapter by chapter and lesson by lesson, then build mock tests from any chapters.",
          vi: "Tải tài liệu lên, chọn ngôn ngữ, học lần lượt từng chương và từng bài, sau đó tạo đề thi thử từ bất kỳ chương nào.",
        },
        src: "dinhngocedu.vercel.app, home page (steps)",
      },
      {
        image: "dinh-ngoc-edu/03-login-screen",
        title: {
          en: "Courses are private to their owner",
          vi: "Khoá học được giữ riêng cho người tạo",
        },
        text: {
          en: "Creating courses and the dashboard need an account; a course stays private unless its owner shares it.",
          vi: "Việc tạo khoá học và bảng điều khiển cần có tài khoản; khoá học được giữ riêng tư trừ khi người tạo chia sẻ.",
        },
        src: "dinhngocedu.vercel.app/login; README (private by default, shareable when public)",
      },
    ],
  },

  "face-demo": {
    note: {
      en: "The live demo in a browser with a simulated camera, so no real face is shown.",
      vi: "Bản trình diễn đang hoạt động, chạy trong trình duyệt với camera giả lập nên không có khuôn mặt thật nào được hiển thị.",
    },
    slides: [
      {
        image: "face-demo/01-start-screen",
        title: {
          en: "Add a face, then point the camera",
          vi: "Thêm khuôn mặt, rồi hướng camera vào người cần nhận diện",
        },
        text: {
          en: "Everything runs in this one browser tab: add a person with a name and a photo, then switch to the camera to recognise them.",
          vi: "Mọi thứ chạy ngay trong một thẻ trình duyệt: thêm một người với tên và ảnh, sau đó chuyển sang camera để nhận diện.",
        },
        src: "demo-computer-vision-nhom-10.pages.dev",
      },
      {
        image: "face-demo/04-add-face-form",
        title: {
          en: "Enrol from a photo or the camera",
          vi: "Đăng ký từ ảnh hoặc camera",
        },
        text: {
          en: "A face can be enrolled from a photo or straight from the camera. A face that matches someone enrolled under another name is refused, as is a new face under a name already enrolled; a matching photo of the same person is kept as an extra photo.",
          vi: "Khuôn mặt có thể được đăng ký từ ảnh hoặc trực tiếp từ camera. Hệ thống từ chối khuôn mặt trùng với người đã đăng ký dưới tên khác, cũng như khuôn mặt mới dưới một tên đã được đăng ký; ảnh khớp của cùng một người được lưu thêm.",
        },
        src: "demo-computer-vision-nhom-10.pages.dev; project README",
      },
      {
        image: "face-demo/02-camera-tab-idle",
        title: {
          en: "Recognised, not sure, unknown",
          vi: "Nhận ra, chưa chắc chắn, không xác định",
        },
        text: {
          en: "Recognition answers in three states rather than guessing. The match thresholds were tuned on 123 people across six ethnic groups and set by the group with the weakest results, not the average.",
          vi: "Kết quả nhận diện có ba trạng thái thay vì phỏng đoán. Ngưỡng so khớp được hiệu chỉnh trên 123 người thuộc sáu nhóm dân tộc và được đặt theo nhóm có kết quả thấp nhất chứ không theo mức trung bình.",
        },
        src: "demo-computer-vision-nhom-10.pages.dev; project README",
      },
      {
        image: "face-demo/03-camera-running",
        title: {
          en: "The camera stays in the tab",
          vi: "Hình ảnh từ camera không rời khỏi thẻ trình duyệt",
        },
        text: {
          en: "With the camera on, detection and recognition run on the device with OpenCV's YuNet and SFace models compiled for the browser; no frame is sent to a server. This capture used a simulated camera.",
          vi: "Khi bật camera, việc phát hiện và nhận diện chạy ngay trên thiết bị bằng các mô hình YuNet và SFace của OpenCV được biên dịch cho trình duyệt; không khung hình nào được gửi lên máy chủ. Ảnh chụp này dùng camera giả lập.",
        },
        src: "demo-computer-vision-nhom-10.pages.dev; project README",
      },
    ],
  },

  saasmath: {
    note: {
      en: "The live site with example values typed in.",
      vi: "Trang web đang hoạt động, với các giá trị mẫu được nhập vào.",
    },
    slides: [
      {
        image: "saasmath/01-home",
        title: {
          en: "Calculators for SaaS founders",
          vi: "Công cụ tính cho nhà sáng lập SaaS",
        },
        text: {
          en: "Free calculators and explainers for the numbers founders get asked about: runway, LTV / CAC, dilution, growth and more.",
          vi: "Các công cụ tính và bài giải thích miễn phí cho những chỉ số nhà sáng lập thường được hỏi: runway, LTV / CAC, mức pha loãng, tăng trưởng và các chỉ số khác.",
        },
        src: "saasmath.pages.dev",
      },
      {
        image: "saasmath/02-runway-filled",
        title: {
          en: "Runway, with the date cash runs out",
          vi: "Runway, kèm ngày hết tiền",
        },
        text: {
          en: "Enter cash, burn and revenue to get net burn, months of runway and the date cash reaches zero. The values live in the URL, so a link reproduces the exact result.",
          vi: "Nhập tiền mặt, chi phí và doanh thu để biết mức tiêu hao ròng, số tháng runway và ngày tiền mặt cạn. Các giá trị được lưu trong đường dẫn, nên chia sẻ đường dẫn sẽ cho ra đúng kết quả đó.",
        },
        src: "saasmath.pages.dev/runway",
      },
      {
        image: "saasmath/03-ltv-cac-filled",
        title: {
          en: "LTV / CAC and payback",
          vi: "LTV / CAC và thời gian hoàn vốn",
        },
        text: {
          en: "Lifetime value from revenue per user, margin and churn, set against acquisition cost, with the payback period.",
          vi: "Giá trị vòng đời khách hàng tính từ doanh thu mỗi người dùng, biên lợi nhuận và tỷ lệ rời bỏ, so với chi phí thu hút khách hàng, kèm thời gian hoàn vốn.",
        },
        src: "saasmath.pages.dev/ltv-cac",
      },
      {
        image: "saasmath/05-rule-of-40-filled",
        title: {
          en: "Rule of 40, with a verdict",
          vi: "Quy tắc 40, kèm kết luận",
        },
        text: {
          en: "Growth plus margin, scored and judged. Each calculator lists the sources its formula draws on.",
          vi: "Tổng tốc độ tăng trưởng và biên lợi nhuận, được tính điểm và đưa ra kết luận. Mỗi công cụ tính đều liệt kê nguồn tham khảo cho công thức của mình.",
        },
        src: "saasmath.pages.dev/rule-of-40",
      },
    ],
  },

  "browser-tools": {
    note: {
      en: "The live tools with sample files and text.",
      vi: "Các công cụ đang hoạt động, với tệp và văn bản mẫu.",
    },
    slides: [
      {
        image: "browser-tools/01-pdf-merger-empty",
        title: {
          en: "Merge PDFs without uploading them",
          vi: "Gộp PDF mà không tải lên máy chủ",
        },
        text: {
          en: "No server, no account, no tracking: the page's security policy forbids it from connecting anywhere, so the files stay on the device.",
          vi: "Không cần máy chủ hay tài khoản, không theo dõi người dùng: chính sách bảo mật nội dung (CSP) của trang không cho phép kết nối tới nơi nào khác, nên tệp luôn nằm trên thiết bị.",
        },
        src: "pdf-merger-c6h.pages.dev",
      },
      {
        image: "browser-tools/02-pdf-merger-two-files",
        title: {
          en: "Stack, order and pick pages",
          vi: "Sắp xếp và chọn trang",
        },
        text: {
          en: "Drop files into a stack, choose which pages of each to keep, and merge.",
          vi: "Thả tệp vào danh sách, chọn các trang cần giữ của từng tệp, rồi gộp lại.",
        },
        src: "pdf-merger-c6h.pages.dev (two sample PDFs)",
      },
      {
        image: "browser-tools/03-regex-email-matches",
        title: {
          en: "A regex tester in one HTML file",
          vi: "Công cụ kiểm tra regex trong một tệp HTML",
        },
        text: {
          en: "Matches are highlighted and listed as you type, and the state lives in the URL, so a link reproduces the exact view.",
          vi: "Các kết quả khớp được làm nổi bật và liệt kê ngay khi gõ; trạng thái được lưu trong đường dẫn, nên chia sẻ đường dẫn sẽ hiển thị đúng như vậy.",
        },
        src: "regex-tester-6dz.pages.dev",
      },
      {
        image: "browser-tools/04-regex-invalid-pattern",
        title: { en: "Errors in plain words", vi: "Thông báo lỗi dễ hiểu" },
        text: {
          en: "A broken pattern says what is wrong instead of failing silently.",
          vi: "Khi biểu thức bị lỗi, công cụ nêu rõ lỗi thay vì không báo gì.",
        },
        src: "regex-tester-6dz.pages.dev",
      },
    ],
  },

  "ngoc-anh": {
    note: {
      en: "The live site, as its owner publishes it.",
      vi: "Trang web đang hoạt động, do chính chủ sở hữu công bố.",
    },
    slides: [
      {
        image: "ngoc-anh/01-hero",
        title: {
          en: "A portfolio told as one thread",
          vi: "Portfolio kể chuyện bằng một sợi chỉ",
        },
        text: {
          en: "A bilingual scrollytelling portfolio where one silk thread is drawn live through every chapter, with synthesised sound that starts after the visitor's first click and can be switched off from the header.",
          vi: "Portfolio song ngữ kể chuyện theo cuộn trang, trong đó một sợi chỉ tơ được vẽ trực tiếp qua từng chương, kèm âm thanh tổng hợp bắt đầu sau lần nhấp đầu tiên của người xem và có thể tắt ngay trên thanh tiêu đề.",
        },
        src: "portfolio-for-ngoc-anh.pages.dev; project README",
      },
      {
        image: "ngoc-anh/02-about",
        title: {
          en: "Chapters that reveal as you scroll",
          vi: "Các chương hiện ra theo cuộn trang",
        },
        text: {
          en: "Each chapter is numbered and reveals as the reader reaches it; every animation is off for readers who ask for reduced motion.",
          vi: "Mỗi chương được đánh số và hiện ra khi người đọc cuộn tới; mọi hiệu ứng chuyển động đều được tắt đối với người đọc đã chọn chế độ giảm chuyển động.",
        },
        src: "portfolio-for-ngoc-anh.pages.dev",
      },
      {
        image: "ngoc-anh/03-journey",
        title: {
          en: "The journey, pinned in place",
          vi: "Hành trình, cố định khi cuộn",
        },
        text: {
          en: "The journey chapter pins while the timeline moves past it, one role at a time.",
          vi: "Chương hành trình được cố định trong khi dòng thời gian chạy qua, lần lượt từng vai trò.",
        },
        src: "portfolio-for-ngoc-anh.pages.dev",
      },
      {
        image: "ngoc-anh/04-principles",
        title: { en: "How Ngọc Anh works", vi: "Cách Ngọc Anh làm việc" },
        text: {
          en: "Working principles, each on its own card, stitched together by the thread.",
          vi: "Các nguyên tắc làm việc, mỗi nguyên tắc trên một thẻ riêng, được nối với nhau bằng sợi chỉ.",
        },
        src: "portfolio-for-ngoc-anh.pages.dev",
      },
      {
        image: "ngoc-anh/05-projects",
        title: { en: "Projects and products", vi: "Dự án và sản phẩm" },
        text: {
          en: "Ngọc Anh's work, numbered, each with a short description.",
          vi: "Các dự án của Ngọc Anh được đánh số, mỗi dự án kèm mô tả ngắn.",
        },
        src: "portfolio-for-ngoc-anh.pages.dev",
      },
      {
        image: "ngoc-anh/06-english-hero",
        title: {
          en: "The same story in English",
          vi: "Cùng câu chuyện bằng tiếng Anh",
        },
        text: {
          en: "Every chapter is written in Vietnamese and English, switched from the header.",
          vi: "Mọi chương đều có tiếng Việt và tiếng Anh, chuyển đổi ngay trên thanh tiêu đề.",
        },
        src: "portfolio-for-ngoc-anh.pages.dev/en",
      },
    ],
  },

  "le-khanh": {
    note: {
      en: "The live site, as its owner publishes it.",
      vi: "Trang web đang hoạt động, do chính chủ sở hữu công bố.",
    },
    slides: [
      {
        image: "le-khanh/02-belief",
        title: {
          en: "Ten chapters, one per screen",
          vi: "Mười chương, mỗi chương một màn hình",
        },
        text: {
          en: "A bilingual scrollytelling portfolio for a content and media candidate applying to an environmental conservation project; each chapter fills the screen with its own illustration and colour.",
          vi: "Portfolio song ngữ kể chuyện theo cuộn trang cho một ứng viên mảng nội dung và truyền thông ứng tuyển vào dự án bảo tồn môi trường; mỗi chương chiếm trọn màn hình với hình minh hoạ và màu sắc riêng.",
        },
        src: "nguyen-le-khanh-portfolio.pages.dev; project README",
      },
      {
        image: "le-khanh/03-work-events",
        title: {
          en: "Work, told as scenes",
          vi: "Kinh nghiệm, kể thành từng cảnh",
        },
        text: {
          en: "Past work arrives as scenes driven by the scroll, with a counter showing where the reader is in the story.",
          vi: "Kinh nghiệm làm việc hiện ra thành từng cảnh theo cuộn trang, kèm bộ đếm cho biết người đọc đang ở đâu trong câu chuyện.",
        },
        src: "nguyen-le-khanh-portfolio.pages.dev",
      },
      {
        image: "le-khanh/04-community",
        title: {
          en: "Illustration carries the chapter",
          vi: "Hình minh hoạ dẫn dắt chương",
        },
        text: {
          en: "Some chapters let the illustration speak first; the words follow as the reader scrolls.",
          vi: "Một số chương để hình minh hoạ dẫn dắt trước; phần chữ hiện ra khi người đọc cuộn tiếp.",
        },
        src: "nguyen-le-khanh-portfolio.pages.dev",
      },
      {
        image: "le-khanh/05-contact",
        title: {
          en: "Ending on a clear ask",
          vi: "Kết thúc bằng một đề nghị rõ ràng",
        },
        text: {
          en: "The last chapter says what Lê Khanh wants to do next and how to get in touch. The copy lives outside the code, in Vietnamese and English.",
          vi: "Chương cuối nêu rõ điều Lê Khanh mong muốn làm tiếp theo và cách liên hệ. Nội dung được tách khỏi mã nguồn, có cả tiếng Việt và tiếng Anh.",
        },
        src: "nguyen-le-khanh-portfolio.pages.dev; project README (react-i18next, copy kept out of JSX)",
      },
    ],
  },
};
