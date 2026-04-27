import Link from "next/link";

import { projects } from "@/data/projects";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const statusClass: Record<(typeof projects)[number]["status"], string> = {
  "Hoàn thành": "bg-emerald-100 text-emerald-700",
  "Đang làm": "bg-amber-100 text-amber-700",
  "Ý tưởng": "bg-slate-200 text-slate-700",
};

export default function ProjectsPage() {
  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Dự án</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project) => (
          <Card key={project.id} className="h-full transition duration-200 hover:-translate-y-1 hover:shadow-lg">
            <CardHeader>
              <CardTitle>{project.name}</CardTitle>
              <CardDescription>{project.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {project.tech.map((item) => (
                  <Badge key={item} variant="secondary">
                    {item}
                  </Badge>
                ))}
              </div>
              <Badge className={statusClass[project.status]}>{project.status}</Badge>
              <Link href={project.url} target="_blank" className="block text-sm text-primary hover:underline">
                Xem mã nguồn
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
