"use client";

import { Check, Copy, Facebook, Linkedin, Share2, Twitter } from "lucide-react";
import { useState } from "react";
import type { TalezPost } from "@/types/content";

export function ShareRow({ post }: { post: TalezPost }) {
  const [copied, setCopied] = useState(false);

  const url = typeof window === "undefined" ? "" : `${window.location.origin}/posts/${post.slug}`;
  const encodedUrl = encodeURIComponent(url);
  const text = encodeURIComponent(post.title);

  async function copy() {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="inline-flex items-center gap-2 pr-2 text-sm font-medium text-muted">
        <Share2 className="h-4 w-4" aria-hidden="true" />
        Share
      </span>
      <a className="share-button" href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${text}`} target="_blank" rel="noreferrer" aria-label="Share on X">
        <Twitter className="h-4 w-4" />
      </a>
      <a className="share-button" href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`} target="_blank" rel="noreferrer" aria-label="Share on Facebook">
        <Facebook className="h-4 w-4" />
      </a>
      <a className="share-button" href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`} target="_blank" rel="noreferrer" aria-label="Share on LinkedIn">
        <Linkedin className="h-4 w-4" />
      </a>
      <button type="button" className="share-button" onClick={copy} aria-label="Copy link">
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      </button>
    </div>
  );
}
