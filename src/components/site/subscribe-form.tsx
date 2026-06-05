"use client";

import { useState } from "react";
import { MailCheck } from "lucide-react";

export function SubscribeForm({ compact = false }: { compact?: boolean }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");
    const response = await fetch("/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, name, source: compact ? "inline" : "subscribe-page", website: "" })
    });
    const data = await response.json();
    setStatus(response.ok ? "success" : "error");
    setMessage(data.message ?? (response.ok ? "Check your inbox to confirm." : "Something went wrong."));
    if (response.ok) {
      setEmail("");
      setName("");
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-3">
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />
      {!compact ? (
        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Name"
          className="h-12 rounded-xl border border-line bg-paper px-4 text-sm text-ink outline-none transition focus:border-gold"
        />
      ) : null}
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com"
          className="h-12 min-w-0 flex-1 rounded-xl border border-line bg-paper px-4 text-sm text-ink outline-none transition focus:border-gold"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-ink px-5 text-sm font-semibold text-paper transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
        >
          <MailCheck className="h-4 w-4" aria-hidden="true" />
          {status === "loading" ? "Subscribing" : "Subscribe"}
        </button>
      </div>
      {message ? <p className={status === "error" ? "text-sm text-red-600" : "text-sm text-muted"}>{message}</p> : null}
    </form>
  );
}
