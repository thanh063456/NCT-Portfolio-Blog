import { notFound } from "next/navigation";

import { PostForm } from "@/components/dashboard/post-form";
import { createClient } from "@/lib/supabase/server";
import type { Post } from "@/types/database";

type EditPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditPostPage({ params }: EditPageProps) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: post } = await supabase.from("posts").select("*").eq("id", id).single<Post>();

  if (!post) {
    notFound();
  }

  return (
    <section className="mx-auto max-w-3xl space-y-4">
      <h1 className="text-3xl font-bold tracking-tight">Chinh sua bai viet</h1>
      <PostForm initialData={post} />
    </section>
  );
}
