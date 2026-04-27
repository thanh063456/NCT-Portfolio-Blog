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
        if (!window.confirm("Ban co chac chan muon xoa bai viet nay?")) {
          return;
        }

        startTransition(async () => {
          await deletePost(id);
        });
      }}
    >
      {pending ? "Dang xoa..." : "Xoa"}
    </Button>
  );
}
