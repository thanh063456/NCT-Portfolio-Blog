"use client";

import { useTransition } from "react";

import { deletePost } from "@/app/actions/posts";
import { Button } from "@/components/ui/button";

export function DeletePostButton({ id }: { id: string }) {
  const [pending, startTransition] = useTransition();

  return (
    <Button
      variant="outline"
      disabled={pending}
      onClick={() => {
        if (!window.confirm("Bạn có chắc chắn muốn xóa bài viết này?")) {
          return;
        }

        startTransition(async () => {
          await deletePost(id);
        });
      }}
    >
      {pending ? "Đang xóa..." : "Xóa"}
    </Button>
  );
}
