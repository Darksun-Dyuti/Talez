"use client";

import { BellPlus } from "lucide-react";
import { useState } from "react";

export function FollowAuthorButton() {
  const [followed, setFollowed] = useState(false);
  const [message, setMessage] = useState("");

  async function follow() {
    const response = await fetch("/api/follow", { method: "POST" });
    const data = await response.json();
    setFollowed(response.ok);
    setMessage(data.message ?? "Followed.");
  }

  return (
    <div>
      <button
        type="button"
        onClick={follow}
        className="inline-flex h-11 items-center gap-2 rounded-full border border-line bg-surface px-5 text-sm font-semibold text-ink"
      >
        <BellPlus className="h-4 w-4" />
        {followed ? "Following" : "Follow author"}
      </button>
      {message ? <p className="mt-2 text-sm text-muted">{message}</p> : null}
    </div>
  );
}
