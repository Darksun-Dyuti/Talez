import Link from "next/link";
import { Download, Mail, Trash2 } from "lucide-react";

const subscribers = [
  { email: "reader@talez.example", name: "Reader One", status: "Verified", joined: "2026-05-12" },
  { email: "patron@talez.example", name: "Patron Two", status: "Premium", joined: "2026-05-22" },
  { email: "weekly@talez.example", name: "Weekly Reader", status: "Pending", joined: "2026-06-01" }
];

export const metadata = {
  title: "Subscribers"
};

export default function AdminSubscribersPage() {
  return (
    <div>
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-ember">Subscribers</p>
          <h1 className="mt-2 font-serif text-5xl font-semibold text-ink">Newsletter list</h1>
        </div>
        <Link href="/api/subscribe/export" className="inline-flex h-11 items-center gap-2 rounded-full bg-ink px-5 text-sm font-semibold text-paper">
          <Download className="h-4 w-4" />
          Export CSV
        </Link>
      </div>
      <div className="overflow-hidden rounded-lg border border-line bg-paper">
        {subscribers.map((subscriber) => (
          <div key={subscriber.email} className="grid gap-3 border-b border-line p-4 last:border-0 md:grid-cols-[1fr_auto_auto] md:items-center">
            <div>
              <h2 className="font-semibold text-ink">{subscriber.name}</h2>
              <p className="text-sm text-muted">{subscriber.email}</p>
            </div>
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-surface px-3 py-1 text-xs font-semibold text-muted">
              <Mail className="h-3.5 w-3.5" />
              {subscriber.status}
            </span>
            <button className="grid h-10 w-10 place-items-center rounded-full border border-line bg-surface text-muted" aria-label="Remove subscriber">
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
