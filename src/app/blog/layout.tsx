import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { blogCategories, blogPosts } from "@/data/blog-posts";

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  const featuredCount = blogPosts.filter((post) => post.featured).length;

  return (
    <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
      <aside className="h-fit space-y-4 rounded-2xl border border-border/80 bg-card/90 p-4">
        <div className="rounded-xl border border-border/70 bg-background/70 p-4">
          <h2 className="mb-3 text-base font-semibold">Danh mục</h2>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {blogCategories.map((category) => (
              <li key={category}>
                <Link href="/blog" className="flex items-center justify-between rounded-lg px-2 py-1 transition hover:bg-muted hover:text-foreground">
                  <span>{category}</span>
                  <Badge variant="outline" className="text-[10px]">
                    {blogPosts.filter((post) => post.category === category).length}
                  </Badge>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl border border-border/70 bg-background/70 p-4 text-sm">
          <p className="text-muted-foreground">Tổng bài viết</p>
          <p className="mt-1 text-2xl font-semibold">{blogPosts.length}</p>
          <p className="mt-3 text-muted-foreground">Bài nổi bật</p>
          <p className="mt-1 text-2xl font-semibold">{featuredCount}</p>
        </div>
      </aside>
      <div>{children}</div>
    </div>
  );
}
