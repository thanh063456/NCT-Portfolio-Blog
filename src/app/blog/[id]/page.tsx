import { notFound } from "next/navigation";

import { LikeButton } from "@/components/like-button";
import type { JsonPost, JsonUser } from "@/types";

type BlogDetailProps = {
  params: Promise<{ id: string }>;
};

async function getPost(id: string): Promise<JsonPost | null> {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    return null;
  }

  return response.json();
}

async function getUser(id: number): Promise<JsonUser | null> {
  const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    return null;
  }

  return response.json();
}

async function getUsers(): Promise<JsonUser[]> {
  const response = await fetch("https://jsonplaceholder.typicode.com/users", {
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    return [];
  }

  return response.json();
}

export default async function BlogDetailPage({ params }: BlogDetailProps) {
  const { id } = await params;

  const [resolvedPost, users] = await Promise.all([getPost(id), getUsers()]);

  if (!resolvedPost) {
    notFound();
  }

  const user = users.find((item) => item.id === resolvedPost.userId) ?? (await getUser(resolvedPost.userId));

  return (
    <article className="mx-auto max-w-3xl space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">{resolvedPost.title}</h1>
        {user ? (
          <p className="text-sm text-muted-foreground">
            Tác giả: {user.name} ({user.email})
          </p>
        ) : null}
      </header>

      <p className="whitespace-pre-line text-base leading-7 text-foreground/90">{resolvedPost.body}</p>

      <LikeButton />
    </article>
  );
}
