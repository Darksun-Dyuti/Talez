import { CalendarClock, MailPlus, Send } from "lucide-react";

const templates = ["New Story", "New Blog", "Monthly Roundup", "Special Announcement"];

export const metadata = {
  title: "Newsletters"
};

export default function AdminNewslettersPage() {
  return (
    <div>
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-ember">Newsletter</p>
        <h1 className="mt-2 font-serif text-5xl font-semibold text-ink">Campaigns</h1>
      </div>
      <div className="grid gap-6 lg:grid-cols-[0.8fr_1fr]">
        <section className="rounded-lg border border-line bg-paper p-6">
          <MailPlus className="h-6 w-6 text-ember" />
          <h2 className="mt-4 font-serif text-3xl font-semibold text-ink">Compose update</h2>
          <div className="mt-5 grid gap-3">
            <input placeholder="Subject" className="h-11 rounded-xl border border-line bg-surface px-3 text-sm outline-none focus:border-gold" />
            <select className="h-11 rounded-xl border border-line bg-surface px-3 text-sm">
              <option>All subscribers</option>
              <option>Premium members only</option>
              <option>Followers</option>
            </select>
            <textarea placeholder="Newsletter body" className="min-h-40 rounded-xl border border-line bg-surface p-3 text-sm outline-none focus:border-gold" />
            <div className="flex flex-wrap gap-2">
              <button className="inline-flex h-11 items-center gap-2 rounded-full bg-ink px-5 text-sm font-semibold text-paper">
                <Send className="h-4 w-4" />
                Send
              </button>
              <button className="inline-flex h-11 items-center gap-2 rounded-full border border-line bg-surface px-5 text-sm font-semibold text-ink">
                <CalendarClock className="h-4 w-4" />
                Schedule
              </button>
            </div>
          </div>
        </section>
        <section className="rounded-lg border border-line bg-paper p-6">
          <h2 className="font-serif text-3xl font-semibold text-ink">Templates</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {templates.map((template) => (
              <article key={template} className="rounded-lg border border-line bg-surface p-4">
                <p className="font-semibold text-ink">{template}</p>
                <p className="mt-2 text-sm text-muted">Reusable branded email layout with logo, thumbnail, excerpt, and CTA.</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
