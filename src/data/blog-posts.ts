export type BlogCategory = "Học tập" | "Kinh nghiệm" | "Dự án" | "Công nghệ";

export type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: BlogCategory;
  publishedAt: string;
  readMinutes: number;
  featured?: boolean;
};

export const blogPosts: BlogPost[] = [
  {
    id: "nextjs-15-cho-sinh-vien",
    title: "Next.js 15 cho sinh viên: bắt đầu đúng để đỡ nản",
    excerpt:
      "Lộ trình 4 tuần để nắm App Router, Server Component, fetch và deploy thực tế cho dự án học tập.",
    category: "Học tập",
    publishedAt: "2026-04-10",
    readMinutes: 8,
    featured: true,
    content:
      "Nhiều bạn bắt đầu Next.js bằng cách xem quá nhiều video nhưng thiếu thực hành có mục tiêu. Mình đi theo hướng ngược lại: học đến đâu làm mini project đến đó.\n\nTuần 1: nắm file-based routing, layout, loading, error.\nTuần 2: hiểu rõ Server Component và Client Component, biết khi nào dùng use client.\nTuần 3: làm form với server action và validate bằng Zod.\nTuần 4: thêm auth, database, rồi deploy lên Vercel.\n\nĐiểm quan trọng nhất là giữ scope nhỏ. Một trang chạy mượt, có trạng thái loading và xử lý lỗi tốt luôn giá trị hơn một app quá to nhưng dang dở."
  },
  {
    id: "thiet-ke-ui-de-doc",
    title: "Thiết kế UI dễ đọc: ít màu nhưng giàu nhịp điệu",
    excerpt:
      "Không cần dùng quá nhiều hiệu ứng, chỉ cần hệ thống spacing và typography nhất quán là giao diện đã chuyên nghiệp hơn.",
    category: "Kinh nghiệm",
    publishedAt: "2026-04-08",
    readMinutes: 6,
    content:
      "UI đẹp chưa chắc dùng tốt, nhưng UI dễ đọc thì gần như luôn được đánh giá cao.\n\nMình thường bắt đầu bằng 3 tầng chữ: heading, body, caption. Sau đó cố định khoảng cách theo thang 4-8-12-16-24. Khi tất cả section cùng nhịp, trang trông gọn ngay cả khi nội dung nhiều.\n\nCuối cùng, chỉ chọn 1 màu nhấn chính. Dùng màu nhấn cho CTA và trạng thái quan trọng, không dùng tràn lan."
  },
  {
    id: "supabase-auth-thuc-te",
    title: "Supabase Auth trong dự án thật: 5 lỗi mình từng gặp",
    excerpt:
      "Tổng hợp các lỗi phổ biến khi dùng auth với middleware, callback URL và session trên môi trường production.",
    category: "Công nghệ",
    publishedAt: "2026-04-05",
    readMinutes: 9,
    content:
      "Lỗi phổ biến nhất là callback URL chưa đúng môi trường. Local chạy ổn nhưng production login thất bại vì thiếu domain Vercel trong danh sách redirect.\n\nLỗi thứ hai là middleware dùng logic cookie không chuẩn khiến route bị redirect sai.\n\nLỗi thứ ba là quên set biến môi trường đồng bộ giữa Preview và Production.\n\nMẹo của mình: sau mỗi lần sửa auth, luôn test 3 bước: đăng ký, đăng nhập, vào route protected. Nếu một bước sai thì kiểm tra lại URL cấu hình trước khi nghi ngờ code."
  },
  {
    id: "toi-uu-dashboard-sinh-vien",
    title: "Tối ưu dashboard sinh viên: gọn, rõ, thao tác nhanh",
    excerpt:
      "Cách thiết kế bảng quản trị bài viết để người mới vẫn thao tác nhanh mà không bị rối thông tin.",
    category: "Dự án",
    publishedAt: "2026-04-01",
    readMinutes: 7,
    content:
      "Dashboard tốt không phải dashboard nhiều chức năng, mà là dashboard giúp hoàn thành việc nhanh hơn.\n\nMình ưu tiên 3 thao tác chính đặt ở vị trí dễ thấy: tạo mới, chỉnh sửa, xóa. Các thông tin phụ như slug, metadata để ở trang chi tiết để tránh nhiễu.\n\nBảng dữ liệu cần có cột trạng thái rõ ràng và ngày cập nhật theo locale người dùng. Chỉ một thay đổi nhỏ này cũng giúp giảm lỗi thao tác đáng kể."
  },
  {
    id: "viet-blog-cong-nghe-hieu-qua",
    title: "Viết blog công nghệ hiệu quả khi đang đi học",
    excerpt:
      "Khung bài 5 phần giúp viết nhanh hơn: bối cảnh, vấn đề, cách làm, kết quả, bài học rút ra.",
    category: "Học tập",
    publishedAt: "2026-03-28",
    readMinutes: 5,
    content:
      "Nhiều bạn nghĩ viết blog tốn thời gian, nhưng thật ra blog là cách ôn bài tốt nhất.\n\nMỗi khi hoàn thành một tính năng, mình ghi lại ngay 5 phần: mục tiêu, cách triển khai, lỗi gặp phải, cách sửa và điểm cần cải tiến.\n\nSau 2-3 tháng, bạn sẽ có một kho tài liệu cá nhân cực kỳ hữu ích cho phỏng vấn và làm đồ án."
  },
  {
    id: "khi-nao-can-refactor",
    title: "Khi nào nên refactor thay vì thêm tính năng mới",
    excerpt:
      "Dấu hiệu nhận biết code bắt đầu khó bảo trì và cách refactor theo từng bước nhỏ để không làm gãy hệ thống.",
    category: "Kinh nghiệm",
    publishedAt: "2026-03-24",
    readMinutes: 8,
    content:
      "Refactor không phải để code 'đẹp hơn', mà để đội dự án làm việc nhanh hơn ở các sprint sau.\n\nNếu một thay đổi nhỏ phải sửa quá nhiều file, hoặc đọc code mất quá nhiều thời gian mới hiểu luồng dữ liệu, đó là lúc nên dọn cấu trúc.\n\nNguyên tắc của mình: refactor từng phần nhỏ, luôn có test hoặc ít nhất có checklist kiểm thử thủ công trước khi merge."
  },
  {
    id: "quan-ly-thoi-gian-lam-do-an",
    title: "Quản lý thời gian làm đồ án mà vẫn giữ sức bền",
    excerpt:
      "Chia sprint cá nhân theo tuần, đặt KPI nhỏ và dành slot riêng cho việc sửa lỗi để tránh trễ tiến độ.",
    category: "Học tập",
    publishedAt: "2026-03-20",
    readMinutes: 6,
    content:
      "Thói quen giúp mình giữ tiến độ là chia tuần thành 3 chặng: xây tính năng, sửa lỗi, hoàn thiện demo.\n\nKhông gom tất cả bug vào cuối kỳ vì lúc đó áp lực rất cao. Mỗi tuần nên có 1 buổi chỉ để dọn bug và refactor.\n\nNgoài ra, luôn giữ phiên bản demo chạy được. Dự án 'chưa đẹp nhưng chạy ổn' luôn tốt hơn dự án nhiều ý tưởng nhưng không có bản trình diễn."
  },
  {
    id: "kiem-thu-truoc-khi-deploy",
    title: "Checklist kiểm thử trước khi deploy cho người dùng thật",
    excerpt:
      "Một checklist ngắn gọn nhưng đủ dùng để giảm rủi ro: auth, form, route bảo vệ, log lỗi và tốc độ tải trang.",
    category: "Công nghệ",
    publishedAt: "2026-03-16",
    readMinutes: 7,
    content:
      "Trước khi deploy, mình luôn chạy checklist: đăng nhập/đăng xuất, submit form, chuyển route, và test trên mobile.\n\nSau đó kiểm tra log runtime để chắc chắn không còn lỗi nghiêm trọng.\n\nBước cuối là tự chạy lại các luồng quan trọng như một người dùng mới. Chỉ cần 10-15 phút kiểm thử đúng chỗ có thể tiết kiệm hàng giờ sửa lỗi sau khi lên production."
  }
];

export const blogCategories: BlogCategory[] = ["Học tập", "Kinh nghiệm", "Dự án", "Công nghệ"];
