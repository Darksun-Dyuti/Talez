"use client";

import { Coffee, HeartHandshake } from "lucide-react";
import { useState } from "react";

const quickAmounts = [500, 1000, 2500, 5000];

export function DonationForm({ postId }: { postId?: string }) {
  const [amount, setAmount] = useState(1000);
  const [custom, setCustom] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("Preparing checkout...");
    const amountCents = custom ? Math.round(Number(custom) * 100) : amount;
    const endpoint = postId ? "/api/payments/tip" : "/api/payments/donation";
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        postId,
        amountCents,
        currency: "USD",
        provider: "STRIPE",
        name,
        message,
        visibility: "PUBLIC",
        returnPath: postId ? window.location.pathname : undefined
      })
    });
    const data = await response.json();
    if (response.ok && data.url) {
      window.location.href = data.url;
      return;
    }
    setStatus(data.message ?? "Thank you. Demo checkout is ready once payment keys are configured.");
  }

  return (
    <form onSubmit={submit} className="grid gap-4 rounded-lg border border-line bg-surface p-5 shadow-sm">
      <div className="flex items-center gap-3">
        {postId ? <Coffee className="h-5 w-5 text-ember" /> : <HeartHandshake className="h-5 w-5 text-ember" />}
        <h2 className="font-serif text-2xl font-semibold text-ink">{postId ? "Leave a tip" : "Support Talez"}</h2>
      </div>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {quickAmounts.map((value) => (
          <button
            key={value}
            type="button"
            onClick={() => {
              setAmount(value);
              setCustom("");
            }}
            className="h-11 rounded-xl border border-line bg-paper text-sm font-semibold text-ink transition hover:border-gold"
          >
            ${(value / 100).toFixed(0)}
          </button>
        ))}
      </div>
      <input
        type="number"
        min="1"
        step="1"
        value={custom}
        onChange={(event) => setCustom(event.target.value)}
        placeholder="Custom amount"
        className="h-12 rounded-xl border border-line bg-paper px-4 text-sm outline-none focus:border-gold"
      />
      <input
        value={name}
        onChange={(event) => setName(event.target.value)}
        placeholder="Name"
        className="h-12 rounded-xl border border-line bg-paper px-4 text-sm outline-none focus:border-gold"
      />
      <textarea
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        placeholder="Message"
        className="min-h-24 rounded-xl border border-line bg-paper p-4 text-sm outline-none focus:border-gold"
      />
      <button type="submit" className="h-12 rounded-xl bg-ink px-5 text-sm font-semibold text-paper">
        {postId ? "Buy a coffee" : "Donate"}
      </button>
      {status ? <p className="text-sm text-muted">{status}</p> : null}
    </form>
  );
}
