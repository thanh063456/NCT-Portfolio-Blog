import Link from "next/link";

import { projects } from "@/data/projects";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const statusClass: Record<(typeof projects)[number]["status"], string> = {
  "Hoan thanh": "bg-emerald-100 text-emerald-700",
  "Dang lam": "bg-amber-100 text-amber-700",
  "Y tuong": "bg-slate-200 text-slate-700",
};

export default function ProjectsPage() {
  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Du an</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project) => (
          <Card key={project.id} className="h-full">
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
                Xem source code
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
