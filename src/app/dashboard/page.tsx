import Image from "next/image";
import Link from "next/link";
import { Bell, BookMarked, Crown, History, Medal, MessageSquare, Sparkles } from "lucide-react";
import { getReaderSession } from "@/lib/access";
import { readerHighlights } from "@/lib/data";
import { getRecentPosts } from "@/lib/posts";

export const metadata = {
  title: "Reader Dashboard"
};

export default async function DashboardPage() {
  const [session, recent] = await Promise.all([getReaderSession(), getRecentPosts(3)]);

  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-ember">Reader dashboard</p>
          <h1 className="mt-3 font-serif text-5xl font-semibold text-ink">
            {session?.user?.name ? `Welcome, ${session.user.name}` : "Your reading room"}
          </h1>
        </div>
        {!session ? (
          <Link href="/sign-in" className="inline-flex h-11 items-center rounded-full bg-ink px-5 text-sm font-semibold text-paper">
            Sign in
          </Link>
        ) : null}
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {readerHighlights.map((item) => (
          <article key={item.label} className="rounded-lg border border-line bg-surface p-5 shadow-sm">
            <p className="text-sm text-muted">{item.label}</p>
            <p className="mt-2 font-serif text-4xl font-semibold text-ink">{item.value}</p>
            <p className="mt-1 text-sm text-muted">{item.change}</p>
          </article>
        ))}
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_0.8fr]">
        <div className="rounded-lg border border-line bg-surface p-6">
          <div className="flex items-center gap-3">
            <History className="h-5 w-5 text-ember" />
            <h2 className="font-serif text-3xl font-semibold text-ink">Continue reading</h2>
          </div>
          <div className="mt-6 grid gap-4">
            {recent.map((post) => (
              <Link key={post.slug} href={`/posts/${post.slug}`} className="flex gap-4 rounded-lg border border-line bg-paper p-4">
                <Image src={post.coverImage ?? "/og-image.png"} alt="" width={120} height={82} className="h-20 w-28 rounded-md object-cover" />
                <div>
                  <h3 className="font-serif text-xl font-semibold text-ink">{post.title}</h3>
                  <p className="mt-1 text-sm text-muted">{post.readingTime} min read</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="grid gap-4">
          {[
            [BookMarked, "Bookmarks", "Saved stories, blogs, and premium chapters."],
            [Crown, "Membership", "Free Reader. Upgrade for premium access."],
            [Bell, "Notifications", "New posts, replies, and author announcements."],
            [MessageSquare, "Comments", "Your discussion history and replies."],
            [Medal, "Achievements", "Read First Story, Loyal Reader, Early Supporter."]
          ].map(([Icon, title, text]) => (
            <article key={String(title)} className="flex gap-3 rounded-lg border border-line bg-surface p-4">
              <Icon className="mt-1 h-5 w-5 shrink-0 text-gold" />
              <div>
                <h3 className="font-semibold text-ink">{String(title)}</h3>
                <p className="mt-1 text-sm text-muted">{String(text)}</p>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="mt-10 rounded-lg border border-line bg-surface p-6">
        <div className="flex items-center gap-3">
          <Sparkles className="h-5 w-5 text-ember" />
          <h2 className="font-serif text-3xl font-semibold text-ink">Recommended for you</h2>
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {recent.map((post) => (
            <Link key={post.slug} href={`/posts/${post.slug}`} className="rounded-lg bg-paper p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">Because you read {post.category}</p>
              <h3 className="mt-2 font-serif text-xl font-semibold text-ink">{post.title}</h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
