import { notFound } from "next/navigation";

import { LikeButton } from "@/components/like-button";
import { Badge } from "@/components/ui/badge";
import { blogPosts } from "@/data/blog-posts";

type BlogDetailProps = {
  params: Promise<{ id: string }>;
};

export default async function BlogDetailPage({ params }: BlogDetailProps) {
  const { id } = await params;

  const resolvedPost = blogPosts.find((post) => post.id === id);

  if (!resolvedPost) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-4xl space-y-7 animate-slide-up-soft">
      <header className="space-y-4 rounded-3xl border border-border/80 bg-card/90 p-6 sm:p-8">
        <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          <Badge variant="secondary">{resolvedPost.category}</Badge>
          <span>{new Date(resolvedPost.publishedAt).toLocaleDateString("vi-VN")}</span>
          <span>•</span>
          <span>{resolvedPost.readMinutes} phút đọc</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{resolvedPost.title}</h1>
        <p className="max-w-3xl text-muted-foreground">{resolvedPost.excerpt}</p>
      </header>

      <div className="space-y-5 leading-8">
        {resolvedPost.content.split("\n\n").map((paragraph, index) => (
          <p key={index} className="text-base text-foreground/90">
            {paragraph}
          </p>
        ))}
      </div>

      <LikeButton />
    </article>
  );
}
