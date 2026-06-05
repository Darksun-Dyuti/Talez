import Link from "next/link";
import { Activity, ArrowRight, BarChart3, Eye, Heart, Mail, MessageSquare } from "lucide-react";
import { adminMetrics } from "@/lib/data";
import { getPopularPosts, getRecentPosts } from "@/lib/posts";

export const metadata = {
  title: "Admin Dashboard"
};

export default async function AdminPage() {
  const [popular, recent] = await Promise.all([getPopularPosts(4), getRecentPosts(4)]);

  return (
    <div>
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-ember">Dashboard</p>
          <h1 className="mt-2 font-serif text-5xl font-semibold text-ink">Talez command room</h1>
        </div>
        <Link href="/admin/posts/new" className="inline-flex h-11 items-center gap-2 rounded-full bg-ink px-5 text-sm font-semibold text-paper">
          New post <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {adminMetrics.map((metric) => (
          <article key={metric.label} className="rounded-lg border border-line bg-paper p-5 shadow-sm">
            <p className="text-sm text-muted">{metric.label}</p>
            <p className="mt-2 font-serif text-4xl font-semibold text-ink">{metric.value}</p>
            <p className="mt-1 text-sm text-muted">{metric.change}</p>
          </article>
        ))}
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-[1fr_0.85fr]">
        <section className="rounded-lg border border-line bg-paper p-6">
          <div className="flex items-center gap-3">
            <BarChart3 className="h-5 w-5 text-ember" />
            <h2 className="font-serif text-3xl font-semibold text-ink">Monthly traffic</h2>
          </div>
          <div className="mt-6 grid gap-3">
            {[68, 74, 59, 86, 92, 78, 97].map((value, index) => (
              <div key={index} className="grid grid-cols-[44px_1fr_48px] items-center gap-3">
                <span className="text-xs text-muted">D{index + 1}</span>
                <div className="h-3 overflow-hidden rounded-full bg-line">
                  <div className="h-full rounded-full bg-gold" style={{ width: `${value}%` }} />
                </div>
                <span className="text-right text-xs text-muted">{value}%</span>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-lg border border-line bg-paper p-6">
          <div className="flex items-center gap-3">
            <Activity className="h-5 w-5 text-sage" />
            <h2 className="font-serif text-3xl font-semibold text-ink">Recent activity</h2>
          </div>
          <div className="mt-6 grid gap-4">
            {recent.map((post) => (
              <Link key={post.slug} href={`/posts/${post.slug}`} className="rounded-lg border border-line bg-surface p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">{post.type}</p>
                <h3 className="mt-1 font-serif text-xl font-semibold text-ink">{post.title}</h3>
              </Link>
            ))}
          </div>
        </section>
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-2">
        <section className="rounded-lg border border-line bg-paper p-6">
          <div className="flex items-center gap-3">
            <Eye className="h-5 w-5 text-ember" />
            <h2 className="font-serif text-3xl font-semibold text-ink">Most viewed</h2>
          </div>
          <div className="mt-5 grid gap-3">
            {popular.map((post) => (
              <div key={post.slug} className="flex items-center justify-between gap-4 border-b border-line py-3 last:border-0">
                <span className="font-medium text-ink">{post.title}</span>
                <span className="text-sm text-muted">{post.viewCount}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-lg border border-line bg-paper p-6">
          <h2 className="font-serif text-3xl font-semibold text-ink">Moderation queue</h2>
          <div className="mt-5 grid gap-3">
            {[
              [MessageSquare, "Comments pending", "12"],
              [Mail, "Scheduled newsletters", "3"],
              [Heart, "New appreciations", "246"]
            ].map(([Icon, label, value]) => (
              <div key={String(label)} className="flex items-center justify-between rounded-lg bg-surface p-4">
                <span className="inline-flex items-center gap-2 text-sm text-muted">
                  <Icon className="h-4 w-4" />
                  {String(label)}
                </span>
                <span className="font-serif text-2xl font-semibold text-ink">{String(value)}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
