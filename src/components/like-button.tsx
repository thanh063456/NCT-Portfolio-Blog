"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";

export function LikeButton() {
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(12);

  const toggle = () => {
    setLiked((prev) => !prev);
    setCount((prev) => (liked ? prev - 1 : prev + 1));
  };

  return (
    <Button type="button" variant="outline" onClick={toggle} className="gap-2">
      <span>{liked ? "❤️" : "🤍"}</span>
      <span>{count}</span>
    </Button>
  );
}
