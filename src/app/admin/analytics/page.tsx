import { BarChart3, Clock, DollarSign, Tags, TrendingUp, Users } from "lucide-react";

const metrics = [
  [Users, "Total visitors", "72.4k"],
  [TrendingUp, "Returning visitors", "38%"],
  [Clock, "Average reading time", "5m 42s"],
  [DollarSign, "Donation revenue", "$1.8k"],
  [Tags, "Popular tag", "writing"],
  [BarChart3, "Subscriber growth", "+12%"]
];

export const metadata = {
  title: "Analytics"
};

export default function AdminAnalyticsPage() {
  return (
    <div>
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-ember">Analytics</p>
        <h1 className="mt-2 font-serif text-5xl font-semibold text-ink">Growth and reading signals</h1>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {metrics.map(([Icon, label, value]) => (
          <article key={String(label)} className="rounded-lg border border-line bg-paper p-5">
            <Icon className="h-5 w-5 text-ember" />
            <p className="mt-4 text-sm text-muted">{String(label)}</p>
            <p className="mt-2 font-serif text-4xl font-semibold text-ink">{String(value)}</p>
          </article>
        ))}
      </div>
      <section className="mt-8 rounded-lg border border-line bg-paper p-6">
        <h2 className="font-serif text-3xl font-semibold text-ink">Revenue growth</h2>
        <div className="mt-6 flex h-64 items-end gap-3">
          {[28, 44, 38, 58, 64, 76, 88, 81, 94, 100, 92, 97].map((height, index) => (
            <div key={index} className="flex flex-1 flex-col items-center gap-2">
              <div className="w-full rounded-t-lg bg-gold" style={{ height: `${height}%` }} />
              <span className="text-xs text-muted">{index + 1}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
