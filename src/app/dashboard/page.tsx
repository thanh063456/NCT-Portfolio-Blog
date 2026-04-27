import Link from "next/link";
import { redirect } from "next/navigation";

import { DeletePostButton } from "@/components/dashboard/delete-post-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";
import type { Post } from "@/types/database";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: posts } = await supabase
    .from("posts")
    .select("*")
    .eq("author_id", user.id)
    .order("created_at", { ascending: false })
    .returns<Post[]>();

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Trang quản trị</h1>
        <Button render={<Link href="/dashboard/new" />}>+ Bài viết mới</Button>
      </div>

      <div className="overflow-x-auto rounded-xl border bg-card">
        <table className="w-full min-w-[680px] text-sm">
          <thead>
            <tr className="border-b text-left">
              <th className="px-4 py-3">Tiêu đề</th>
              <th className="px-4 py-3">Trạng thái</th>
              <th className="px-4 py-3">Ngày tạo</th>
              <th className="px-4 py-3">Sửa</th>
              <th className="px-4 py-3">Xóa</th>
            </tr>
          </thead>
          <tbody>
            {(posts ?? []).map((post) => (
              <tr key={post.id} className="border-b last:border-0">
                <td className="px-4 py-3">{post.title}</td>
                <td className="px-4 py-3">
                  <Badge variant={post.status === "published" ? "default" : "outline"}>
                    {post.status === "published" ? "Đã xuất bản" : "Bản nháp"}
                  </Badge>
                </td>
                <td className="px-4 py-3">{new Date(post.created_at).toLocaleDateString("vi-VN")}</td>
                <td className="px-4 py-3">
                  <Button variant="outline" render={<Link href={`/dashboard/edit/${post.id}`} />}>
                    Sửa
                  </Button>
                </td>
                <td className="px-4 py-3">
                  <DeletePostButton id={post.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
