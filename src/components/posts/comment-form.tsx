"use client";

import { useState } from "react";

import { addComment } from "@/app/actions/comments";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export function CommentForm({ postId }: { postId: string }) {
  const [content, setContent] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPending(true);
    setError(null);

    const result = await addComment(postId, content);

    if (result.error) {
      setError(result.error);
      setPending(false);
      return;
    }

    setContent("");
    setPending(false);
  };

  return (
    <form onSubmit={onSubmit} className="space-y-3 rounded-xl border bg-card p-4">
      <Textarea
        value={content}
        onChange={(event) => setContent(event.target.value)}
        placeholder="Viet binh luan cua ban"
      />
      {error ? <p className="text-sm text-destructive">{error}</p> : null}
      <Button type="submit" disabled={pending}>
        {pending ? "Dang gui..." : "Gui binh luan"}
      </Button>
    </form>
  );
}
