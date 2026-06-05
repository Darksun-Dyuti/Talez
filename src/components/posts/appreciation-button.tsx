"use client";

import { Heart } from "lucide-react";
import { useState } from "react";
import { formatNumber } from "@/lib/utils";

export function AppreciationButton({ postId, initialCount }: { postId: string; initialCount: number }) {
  const [count, setCount] = useState(initialCount);
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(false);

  async function appreciate() {
    if (loading || liked) return;
    setLoading(true);
    const response = await fetch("/api/appreciations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ postId })
    });
    if (response.ok) {
      const data = await response.json();
      setCount(data.count ?? count + 1);
      setLiked(true);
    }
    setLoading(false);
  }

  return (
    <button
      type="button"
      onClick={appreciate}
      disabled={loading || liked}
      className="inline-flex h-11 items-center gap-2 rounded-full border border-line bg-surface px-4 text-sm font-semibold text-ink transition hover:border-ember/40 hover:text-ember disabled:opacity-70"
    >
      <Heart className={liked ? "h-4 w-4 fill-ember text-ember" : "h-4 w-4"} aria-hidden="true" />
      Appreciate
      <span className="text-muted">{formatNumber(count)}</span>
    </button>
  );
}
