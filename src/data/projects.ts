import type { Project } from "@/types";

export const projects: Project[] = [
  {
    id: 1,
    name: "NCT Portfolio Blog",
    description:
      "Website portfolio + blog ca nhan xay dung voi Next.js App Router va Supabase Auth.",
    tech: ["Next.js", "TypeScript", "Supabase", "Tailwind"],
    status: "Dang lam",
    url: "https://github.com/thanh063/CNMTPTPM",
  },
  {
    id: 2,
    name: "TaskFlow Campus",
    description:
      "Ung dung quan ly cong viec cho nhom sinh vien voi board Kanban va lich hoc tap.",
    tech: ["React", "Node.js", "PostgreSQL"],
    status: "Hoan thanh",
    url: "https://github.com/thanh063/CNMTPTPM",
  },
  {
    id: 3,
    name: "DLU Event Hub",
    description:
      "Cong thong tin su kien khoa CNTT voi tim kiem, dang ky va thong bao theo email.",
    tech: ["Next.js", "Prisma", "MySQL"],
    status: "Y tuong",
    url: "https://github.com/thanh063/CNMTPTPM",
  },
  {
    id: 4,
    name: "StudyNotes API",
    description:
      "REST API cho he thong ghi chu hoc tap, co phan quyen JWT va tai lieu Swagger.",
    tech: ["Express", "TypeScript", "Redis"],
    status: "Hoan thanh",
    url: "https://github.com/thanh063/CNMTPTPM",
  },
];
