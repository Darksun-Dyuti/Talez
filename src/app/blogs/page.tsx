import type { Metadata } from "next";
import { PostList } from "@/components/posts/post-list";
import { getPublishedPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blogs",
  description: "Read Talez essays, technical notes, writing process posts, and creator updates."
};

export default async function BlogsPage() {
  const blogs = await getPublishedPosts("BLOG");

  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="mb-10 max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sage">Blogs</p>
        <h1 className="mt-3 font-serif text-5xl font-semibold text-ink">Essays, notes, and practical reflections.</h1>
        <p className="mt-4 text-lg leading-8 text-muted">Professional blogging, technical writing, personal process notes, and updates from the author.</p>
      </div>
      <PostList posts={blogs} />
    </section>
  );
}
