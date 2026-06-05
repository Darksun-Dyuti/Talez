import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, Search } from "lucide-react";
import { MotionSection } from "@/components/site/motion-section";
import { PostCard } from "@/components/posts/post-card";
import { SubscribeForm } from "@/components/site/subscribe-form";
import { authorProfile } from "@/lib/data";
import { getFeaturedPost, getPopularPosts, getRecentPosts } from "@/lib/posts";

export default async function HomePage() {
  const [featuredStory, featuredBlog, popularPosts, recentPosts] = await Promise.all([
    getFeaturedPost("STORY"),
    getFeaturedPost("BLOG"),
    getPopularPosts(3),
    getRecentPosts(4)
  ]);

  return (
    <>
      <section className="relative overflow-hidden pt-16 pb-24 sm:pt-24 sm:pb-32 bg-gradient-to-b from-gold/5 to-transparent">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="font-serif text-5xl font-semibold leading-[1.1] text-ink sm:text-6xl lg:text-7xl">
              Talez
            </h1>
            <p className="mt-6 text-xl leading-relaxed text-muted">
              A minimalist space for storytelling, essays, and quiet reading. Welcome to the archive.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/stories" className="inline-flex h-11 items-center gap-2 rounded-full bg-ink px-6 text-sm font-semibold text-paper shadow-sm transition hover:scale-105 hover:bg-gold hover:text-ink">
                Read stories
              </Link>
              <Link href="/search" className="inline-flex h-11 items-center gap-2 rounded-full border border-line bg-surface px-6 text-sm font-medium text-ink transition hover:scale-105 hover:border-gold">
                <Search className="h-[15px] w-[15px]" aria-hidden="true" />
                Explore archive
              </Link>
            </div>
          </div>
        </div>
      </section>

      <MotionSection className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="font-serif text-3xl font-medium text-ink">Featured Writing</h2>
          <Link href="/subscribe" className="inline-flex items-center gap-1.5 text-sm font-medium text-muted hover:text-ink transition">
            Subscribe <ArrowRight className="h-[14px] w-[14px]" />
          </Link>
        </div>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8">
          {featuredStory ? <PostCard post={featuredStory} feature /> : null}
          {featuredBlog ? <PostCard post={featuredBlog} /> : null}
        </div>
      </MotionSection>

      <MotionSection className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-[1fr_300px] lg:gap-12">
          <div>
            <h2 className="font-serif text-3xl font-medium text-ink mb-10">Recently Published</h2>
            <div className="grid gap-8">
              {recentPosts.map((post) => (
                <Link key={post.slug} href={`/posts/${post.slug}`} className="group flex flex-col sm:flex-row gap-5">
                  {post.coverImage && (
                    <Image src={post.coverImage} alt="" width={160} height={100} className="w-full sm:w-40 sm:h-28 object-cover transition duration-300 group-hover:opacity-80" />
                  )}
                  <div className="flex-1">
                    <p className="text-[11px] font-medium uppercase tracking-widest text-muted mb-2">{post.type}</p>
                    <h3 className="font-serif text-xl font-medium text-ink group-hover:underline underline-offset-4 decoration-1">{post.title}</h3>
                    <p className="mt-2 text-sm text-muted">{post.readingTime} min read</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          
          <div className="pt-2 border-t border-line/40 lg:border-t-0 lg:border-l lg:pl-8">
            <h2 className="font-serif text-2xl font-medium text-ink mb-6">Popular</h2>
            <div className="grid gap-6">
              {popularPosts.map((post, index) => (
                <Link key={post.slug} href={`/posts/${post.slug}`} className="group flex gap-4">
                  <span className="font-serif text-lg text-muted mt-0.5">{index + 1}.</span>
                  <div>
                    <h3 className="font-serif text-[17px] font-medium text-ink group-hover:underline underline-offset-2 decoration-1">{post.title}</h3>
                    <p className="mt-1 text-[13px] text-muted">{post.category}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </MotionSection>

      <section className="mx-auto max-w-3xl px-4 py-24 sm:px-6 lg:px-8 text-center">
        <h2 className="font-serif text-3xl font-medium text-ink">Subscribe to Talez</h2>
        <p className="mt-4 text-muted mb-8 text-[15px]">
          New stories, thoughtful essays, and occasional notes directly to your inbox. No spam.
        </p>
        <div className="max-w-md mx-auto">
          <SubscribeForm compact />
        </div>
      </section>
    </>
  );
}
