import type { Project } from "@/types";

export const projects: Project[] = [
  {
    id: 1,
    name: "NCT Portfolio Blog",
    description:
      "Website portfolio + blog cá nhân xây dựng với Next.js App Router và Supabase Auth.",
    tech: ["Next.js", "TypeScript", "Supabase", "Tailwind"],
    status: "Đang làm",
    url: "https://github.com/thanh063/CNMTPTPM",
  },
  {
    id: 2,
    name: "TaskFlow Campus",
    description:
      "Ứng dụng quản lý công việc cho nhóm sinh viên với board Kanban và lịch học tập.",
    tech: ["React", "Node.js", "PostgreSQL"],
    status: "Hoàn thành",
    url: "https://github.com/thanh063/CNMTPTPM",
  },
  {
    id: 3,
    name: "DLU Event Hub",
    description:
      "Cổng thông tin sự kiện khoa CNTT với tìm kiếm, đăng ký và thông báo theo email.",
    tech: ["Next.js", "Prisma", "MySQL"],
    status: "Ý tưởng",
    url: "https://github.com/thanh063/CNMTPTPM",
  },
  {
    id: 4,
    name: "StudyNotes API",
    description:
      "REST API cho hệ thống ghi chú học tập, có phân quyền JWT và tài liệu Swagger.",
    tech: ["Express", "TypeScript", "Redis"],
    status: "Hoàn thành",
    url: "https://github.com/thanh063/CNMTPTPM",
  },
];
