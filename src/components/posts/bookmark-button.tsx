"use client";

import { Bookmark } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function BookmarkButton({ postId }: { postId: string }) {
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  async function toggle() {
    setLoading(true);
    const response = await fetch("/api/bookmarks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ postId })
    });
    if (response.ok) {
      const data = await response.json();
      setSaved(Boolean(data.saved));
    }
    setLoading(false);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      disabled={loading}
      className={cn(
        "inline-flex h-11 items-center gap-2 rounded-full border border-line bg-surface px-4 text-sm font-semibold text-ink transition hover:border-gold",
        saved && "border-gold text-ember"
      )}
    >
      <Bookmark className={cn("h-4 w-4", saved && "fill-ember")} aria-hidden="true" />
      {saved ? "Bookmarked" : "Bookmark"}
    </button>
  );
}
