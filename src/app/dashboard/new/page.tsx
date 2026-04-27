import { PostForm } from "@/components/dashboard/post-form";

export default function NewPostPage() {
  return (
    <section className="mx-auto max-w-3xl space-y-4">
      <h1 className="text-3xl font-bold tracking-tight">Bài viết mới</h1>
      <PostForm />
    </section>
  );
}
