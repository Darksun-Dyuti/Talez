import { Crown, Heart, Shield } from "lucide-react";

const supporters = [
  { name: "Aarav", type: "Patron", note: "For quiet stories and careful essays." },
  { name: "Mira", type: "Supporter", note: "Early reader and newsletter champion." },
  { name: "Anonymous", type: "Donor", note: "Prefers the page to speak for itself." }
];

export const metadata = {
  title: "Supporter Wall",
  description: "Top supporters, patrons, donors, and long-time subscribers for Talez."
};

export default function SupportersPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-ember">Supporter wall</p>
        <h1 className="mt-3 font-serif text-5xl font-semibold leading-tight text-ink">Readers who help Talez grow.</h1>
        <p className="mt-4 text-lg leading-8 text-muted">
          Supporters can choose public recognition or anonymous support. Admin tools can moderate visibility and export records.
        </p>
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {supporters.map((supporter) => (
          <article key={supporter.name} className="rounded-lg border border-line bg-surface p-6 shadow-sm">
            {supporter.type === "Patron" ? <Crown className="h-6 w-6 text-gold" /> : supporter.name === "Anonymous" ? <Shield className="h-6 w-6 text-sage" /> : <Heart className="h-6 w-6 text-ember" />}
            <h2 className="mt-5 font-serif text-3xl font-semibold text-ink">{supporter.name}</h2>
            <p className="mt-1 text-sm font-semibold uppercase tracking-[0.16em] text-muted">{supporter.type}</p>
            <p className="mt-4 text-sm leading-7 text-muted">{supporter.note}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
