import { notFound } from "next/navigation";

import { CommentForm } from "@/components/posts/comment-form";
import { CommentList } from "@/components/posts/comment-list";
import { createClient } from "@/lib/supabase/server";
import type { CommentWithAuthor, PostWithAuthor } from "@/types/database";

type PostPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function PostDetailPage({ params }: PostPageProps) {
  const { slug } = await params;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: post } = await supabase
    .from("posts")
    .select("*, profiles(display_name,email,avatar_url)")
    .eq("slug", slug)
    .eq("status", "published")
    .single<PostWithAuthor>();

  if (!post) {
    notFound();
  }

  const { data: comments } = await supabase
    .from("comments")
    .select("*, profiles(display_name,avatar_url)")
    .eq("post_id", post.id)
    .order("created_at", { ascending: false })
    .returns<CommentWithAuthor[]>();

  return (
    <article className="mx-auto max-w-3xl space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">{post.title}</h1>
        <p className="text-sm text-muted-foreground">Tác giả: {post.profiles?.display_name ?? "Ẩn danh"}</p>
      </header>

      <p className="whitespace-pre-line leading-7 text-foreground/90">{post.content}</p>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Bình luận</h2>
        {user ? <CommentForm postId={post.id} /> : <p className="text-sm text-muted-foreground">Đăng nhập để bình luận.</p>}
        <CommentList comments={comments ?? []} />
      </section>
    </article>
  );
}
