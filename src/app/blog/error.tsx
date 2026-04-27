"use client";

import { Button } from "@/components/ui/button";

export default function BlogError({ reset }: { reset: () => void }) {
  return (
    <div className="rounded-xl border bg-card p-6 text-center">
      <h2 className="mb-2 text-xl font-semibold">Co loi xay ra khi tai blog</h2>
      <p className="mb-4 text-sm text-muted-foreground">Vui long thu lai sau it phut.</p>
      <Button onClick={reset}>Thu lai</Button>
    </div>
  );
}
