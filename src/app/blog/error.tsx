"use client";

import { Button } from "@/components/ui/button";

export default function BlogError({ reset }: { reset: () => void }) {
  return (
    <div className="rounded-xl border bg-card p-6 text-center">
      <h2 className="mb-2 text-xl font-semibold">Có lỗi xảy ra khi tải blog</h2>
      <p className="mb-4 text-sm text-muted-foreground">Vui lòng thử lại sau ít phút.</p>
      <Button onClick={reset}>Thử lại</Button>
    </div>
  );
}
