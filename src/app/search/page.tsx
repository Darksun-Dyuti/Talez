import Link from "next/link";
import { Filter, Search } from "lucide-react";
import { PostList } from "@/components/posts/post-list";
import { getAllTags, searchPosts } from "@/lib/posts";
import type { ContentType } from "@/types/content";

export default async function SearchPage({
  searchParams
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const q = typeof params.q === "string" ? params.q : "";
  const type = params.type === "STORY" || params.type === "BLOG" ? (params.type as ContentType) : undefined;
  const tag = typeof params.tag === "string" ? params.tag : undefined;
  const [posts, tags] = await Promise.all([searchPosts(q, type, tag), getAllTags()]);

  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="mb-8 max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-ember">Search</p>
        <h1 className="mt-3 font-serif text-5xl font-semibold text-ink">Find the next page.</h1>
      </div>

      <form className="grid gap-3 rounded-lg border border-line bg-surface p-4 md:grid-cols-[1fr_auto_auto]">
        <label className="relative block">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input name="q" defaultValue={q} placeholder="Search title, content, tags" className="h-12 w-full rounded-xl border border-line bg-paper pl-11 pr-4 text-sm outline-none focus:border-gold" />
        </label>
        <select name="type" defaultValue={type ?? ""} className="h-12 rounded-xl border border-line bg-paper px-4 text-sm text-ink outline-none">
          <option value="">All</option>
          <option value="STORY">Stories</option>
          <option value="BLOG">Blogs</option>
        </select>
        <button className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-ink px-5 text-sm font-semibold text-paper">
          <Filter className="h-4 w-4" />
          Filter
        </button>
      </form>

      <div className="mt-5 flex flex-wrap gap-2">
        {tags.map((item) => (
          <Link key={item} href={`/search?tag=${encodeURIComponent(item)}`} className="rounded-full border border-line bg-surface px-3 py-1.5 text-xs font-semibold text-muted transition hover:text-ink">
            {item}
          </Link>
        ))}
      </div>

      <div className="mt-10">
        <PostList posts={posts} />
      </div>
    </section>
  );
}
