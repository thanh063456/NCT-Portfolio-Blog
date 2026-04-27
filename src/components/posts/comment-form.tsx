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
    <form onSubmit={onSubmit} className="space-y-3 rounded-2xl border bg-card/95 p-4 shadow-sm">
      <Textarea
        value={content}
        onChange={(event) => setContent(event.target.value)}
        placeholder="Viết bình luận của bạn"
      />
      {error ? <p className="text-sm text-destructive">{error}</p> : null}
      <Button type="submit" disabled={pending}>
        {pending ? "Đang gửi..." : "Gửi bình luận"}
      </Button>
    </form>
  );
}
