import type { Metadata } from "next";
import { PostList } from "@/components/posts/post-list";
import { getPublishedPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Stories",
  description: "Read Talez stories, serialized fiction, and premium chapters."
};

export default async function StoriesPage() {
  const stories = await getPublishedPosts("STORY");

  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="mb-10 max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-ember">Stories</p>
        <h1 className="mt-3 font-serif text-5xl font-semibold text-ink">Fiction for slow evenings and bright mornings.</h1>
        <p className="mt-4 text-lg leading-8 text-muted">Short stories, serialized chapters, collections, and premium fiction are grouped here for easy browsing.</p>
      </div>
      <PostList posts={stories} />
    </section>
  );
}
