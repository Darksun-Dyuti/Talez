"use client";

import { useEffect, useRef } from "react";

export function ReadingHistoryTracker({
  postId,
  slug,
  title,
  coverImage
}: {
  postId: string;
  slug: string;
  title: string;
  coverImage?: string;
}) {
  const sent = useRef(false);

  useEffect(() => {
    const key = "talez-recently-viewed";
    const current = JSON.parse(window.localStorage.getItem(key) ?? "[]") as Array<{ slug: string }>;
    const next = [
      { postId, slug, title, coverImage, viewedAt: new Date().toISOString() },
      ...current.filter((item) => item.slug !== slug)
    ].slice(0, 12);
    window.localStorage.setItem(key, JSON.stringify(next));

    const onScroll = () => {
      if (sent.current) return;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const progress = height <= 0 ? 100 : Math.round((window.scrollY / height) * 100);
      if (progress > 55) {
        sent.current = true;
        navigator.sendBeacon?.(
          "/api/history",
          new Blob([JSON.stringify({ postId, progress, completed: progress > 88 })], { type: "application/json" })
        );
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [postId, slug, title, coverImage]);

  return null;
}
