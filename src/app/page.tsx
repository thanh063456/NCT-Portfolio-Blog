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
    <section className="space-y-10">
      <div className="relative overflow-hidden rounded-2xl border bg-card p-8 shadow-sm sm:p-10">
        <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-accent/25 blur-2xl" />
        <div className="space-y-3">
          <Badge variant="secondary">Portfolio + Blog</Badge>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Xin chao, toi la Ngo Cong Thanh</h1>
          <p className="max-w-2xl text-muted-foreground">
            MSSV 2212461 - Chao mung den voi portfolio blog duoc xay dung bang Next.js 15, Supabase va TypeScript strict.
          </p>
          <div className="pt-2">
            <Button render={<Link href="/blog" />}>Kham pha blog</Button>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Bai viet moi nhat</h2>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {(posts ?? []).map((post) => (
            <Card key={post.id}>
              <CardHeader>
                <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                <CardDescription>{post.profiles?.display_name ?? "Unknown author"}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="line-clamp-3 text-sm text-muted-foreground">{post.excerpt ?? post.content}</p>
                <Link href={`/posts/${post.slug}`} className="text-sm text-primary hover:underline">
                  Doc tiep
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
