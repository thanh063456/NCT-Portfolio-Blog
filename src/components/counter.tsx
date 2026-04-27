"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";

export function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className="mt-6 rounded-xl border bg-card p-4">
      <p className="mb-3 text-sm text-muted-foreground">Demo BT2 - Bộ đếm dùng useState</p>
      <div className="flex items-center gap-3">
        <Button variant="outline" onClick={() => setCount((prev) => prev - 1)}>
          -
        </Button>
        <span className="min-w-8 text-center text-xl font-semibold">{count}</span>
        <Button onClick={() => setCount((prev) => prev + 1)}>+</Button>
      </div>
    </div>
  );
}
