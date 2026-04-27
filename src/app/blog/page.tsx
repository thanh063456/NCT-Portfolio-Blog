import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { blogPosts } from "@/data/blog-posts";

export const revalidate = 3600;

export default async function BlogPage() {
  const featured = blogPosts.find((post) => post.featured) ?? blogPosts[0];
  const restPosts = blogPosts.filter((post) => post.id !== featured.id);
  const heroPosts = restPosts.slice(0, 2);
  const gridPosts = restPosts.slice(2);

  return (
    <section className="space-y-7">
      <header className="space-y-3">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Góc chia sẻ công nghệ và học tập</h1>
        <p className="max-w-3xl text-muted-foreground">
          Các bài viết đều là kinh nghiệm thực tế trong quá trình học và xây dựng sản phẩm với Next.js, Supabase và TypeScript.
        </p>
      </header>

      <div className="grid gap-4 lg:grid-cols-12">
        <Card className="relative overflow-hidden border-border/80 bg-card/95 lg:col-span-7 animate-slide-up-soft">
          <div className="absolute -top-16 -right-8 h-44 w-44 rounded-full bg-primary/20 blur-3xl" />
          <CardHeader className="relative space-y-3 pb-3">
            <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
              <Badge variant="secondary">Bài nổi bật</Badge>
              <span>{featured.category}</span>
              <span>•</span>
              <span>{new Date(featured.publishedAt).toLocaleDateString("vi-VN")}</span>
              <span>•</span>
              <span>{featured.readMinutes} phút đọc</span>
            </div>
            <CardTitle className="text-2xl leading-snug sm:text-3xl">{featured.title}</CardTitle>
            <CardDescription className="text-sm sm:text-base">{featured.excerpt}</CardDescription>
          </CardHeader>
          <CardContent>
            <Link
              href={`/blog/${featured.id}`}
              className="inline-flex rounded-full border border-border/80 px-4 py-2 text-sm font-medium text-foreground transition hover:-translate-y-0.5 hover:bg-muted"
            >
              Đọc bài nổi bật
            </Link>
          </CardContent>
        </Card>

        {heroPosts.map((post, index) => (
          <Card
            key={post.id}
            className="border-border/80 bg-card/95 lg:col-span-5 animate-slide-up-soft"
            style={{ animationDelay: `${(index + 1) * 80}ms` }}
          >
            <CardHeader className="space-y-2 pb-2">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Badge variant="outline">{post.category}</Badge>
                <span>{post.readMinutes} phút đọc</span>
              </div>
              <CardTitle className="line-clamp-2 text-xl">{post.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 line-clamp-3 text-sm text-muted-foreground">{post.excerpt}</p>
              <Link href={`/blog/${post.id}`} className="text-sm font-medium text-primary hover:underline">
                Đọc chi tiết
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {gridPosts.map((post, index) => (
          <Card
            key={post.id}
            className="border-border/80 bg-card/95 transition duration-200 hover:-translate-y-1 hover:shadow-xl animate-slide-up-soft"
            style={{ animationDelay: `${(index + 2) * 70}ms` }}
          >
            <CardHeader className="space-y-2">
              <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                <Badge variant="outline">{post.category}</Badge>
                <span>{new Date(post.publishedAt).toLocaleDateString("vi-VN")}</span>
              </div>
              <CardTitle className="line-clamp-2">{post.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-3 line-clamp-3 text-sm text-muted-foreground">{post.excerpt}</p>
              <Link href={`/blog/${post.id}`} className="text-sm font-medium text-primary hover:underline">
                Đọc chi tiết
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
