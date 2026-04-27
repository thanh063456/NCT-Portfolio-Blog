import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/server";
import type { PostWithAuthor } from "@/types/database";

export default async function HomePage() {
  const supabase = await createClient();
  const { data: posts } = await supabase
    .from("posts")
    .select("*, profiles(display_name,email,avatar_url)")
    .eq("status", "published")
    .order("created_at", { ascending: false })
    .limit(6)
    .returns<PostWithAuthor[]>();

  return (
    <section className="space-y-12">
      <div className="relative overflow-hidden rounded-3xl border border-border/80 bg-card/90 p-8 shadow-[0_20px_60px_-30px_oklch(0.5_0.15_233/.35)] sm:p-10 animate-float-in">
        <div className="absolute -top-12 -right-8 h-44 w-44 rounded-full bg-accent/35 blur-3xl" />
        <div className="absolute -bottom-16 left-16 h-36 w-36 rounded-full bg-primary/20 blur-3xl" />
        <div className="relative grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div className="space-y-4">
            <Badge variant="secondary" className="rounded-full px-3 py-1">
              Portfolio + Blog cá nhân
            </Badge>
            <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">Xin chào, tôi là Ngô Công Thành</h1>
            <p className="max-w-2xl text-base text-muted-foreground">
              MSSV 2212461. Mình xây dựng không gian này để ghi lại hành trình học CNTT, chia sẻ dự án thực tế và tài liệu hữu ích cho sinh viên.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Button render={<Link href="/blog" />}>Khám phá blog</Button>
              <Button variant="outline" render={<Link href="/projects" />}>
                Xem dự án
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-2xl border bg-background/75 p-4">
              <p className="text-muted-foreground">Công nghệ</p>
              <p className="mt-1 text-2xl font-semibold">Next.js 15</p>
            </div>
            <div className="rounded-2xl border bg-background/75 p-4">
              <p className="text-muted-foreground">Xác thực</p>
              <p className="mt-1 text-2xl font-semibold">Supabase</p>
            </div>
            <div className="rounded-2xl border bg-background/75 p-4">
              <p className="text-muted-foreground">Kiểu dữ liệu</p>
              <p className="mt-1 text-2xl font-semibold">TypeScript</p>
            </div>
            <div className="rounded-2xl border bg-background/75 p-4">
              <p className="text-muted-foreground">Giao diện</p>
              <p className="mt-1 text-2xl font-semibold">Tailwind v4</p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Bài viết mới nhất</h2>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {(posts ?? []).map((post) => (
            <Card key={post.id} className="transition-transform duration-200 hover:-translate-y-1">
              <CardHeader>
                <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                <CardDescription>{post.profiles?.display_name ?? "Tác giả ẩn danh"}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="line-clamp-3 text-sm text-muted-foreground">{post.excerpt ?? post.content}</p>
                <Link href={`/posts/${post.slug}`} className="text-sm text-primary hover:underline">
                  Đọc tiếp
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
