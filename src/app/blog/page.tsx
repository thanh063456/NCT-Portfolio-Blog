import Link from "next/link";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { JsonPost } from "@/types";

export const revalidate = 3600;

async function getPosts(): Promise<JsonPost[]> {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=10", {
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error("Cannot fetch posts");
  }

  return response.json();
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Blog thực hành với JSONPlaceholder</h1>
      <div className="grid gap-4 sm:grid-cols-2">
        {posts.map((post) => (
          <Card key={post.id} className="transition duration-200 hover:-translate-y-1 hover:shadow-lg">
            <CardHeader>
              <CardTitle className="line-clamp-2">{post.title}</CardTitle>
              <CardDescription>Bài viết #{post.id}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-3 line-clamp-3 text-sm text-muted-foreground">{post.body}</p>
              <Link href={`/blog/${post.id}`} className="text-sm text-primary hover:underline">
                Đọc chi tiết
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
