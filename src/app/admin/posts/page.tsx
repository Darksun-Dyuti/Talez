import Image from "next/image";
import Link from "next/link";
import { Edit, Plus, Trash2 } from "lucide-react";
import { getPublishedPosts } from "@/lib/posts";
import { formatDate } from "@/lib/utils";

export const metadata = {
  title: "Manage Posts"
};

export default async function AdminPostsPage() {
  const posts = await getPublishedPosts();

  return (
    <div>
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-ember">Content</p>
          <h1 className="mt-2 font-serif text-5xl font-semibold text-ink">Posts</h1>
        </div>
        <Link href="/admin/posts/new" className="inline-flex h-11 items-center gap-2 rounded-full bg-ink px-5 text-sm font-semibold text-paper">
          <Plus className="h-4 w-4" />
          Create post
        </Link>
      </div>
      <div className="overflow-hidden rounded-lg border border-line bg-paper">
        <div className="grid gap-0">
          {posts.map((post) => (
            <div key={post.slug} className="grid gap-4 border-b border-line p-4 last:border-0 md:grid-cols-[80px_1fr_auto] md:items-center">
              <Image src={post.coverImage ?? "/og-image.png"} alt="" width={80} height={56} className="h-14 w-20 rounded-md object-cover" />
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-surface px-2.5 py-1 text-xs font-semibold text-muted">{post.type}</span>
                  <span className="rounded-full bg-surface px-2.5 py-1 text-xs font-semibold text-muted">{post.accessLevel}</span>
                </div>
                <h2 className="mt-2 font-serif text-2xl font-semibold text-ink">{post.title}</h2>
                <p className="mt-1 text-sm text-muted">{formatDate(post.publishDate)} · {post.readingTime} min</p>
              </div>
              <div className="flex gap-2">
                <Link href={`/posts/${post.slug}`} className="grid h-10 w-10 place-items-center rounded-full border border-line bg-surface text-muted" aria-label="Edit">
                  <Edit className="h-4 w-4" />
                </Link>
                <button className="grid h-10 w-10 place-items-center rounded-full border border-line bg-surface text-muted" aria-label="Delete">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
