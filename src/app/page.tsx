import Image from "next/image";
import Link from "next/link";

import { MotionSection } from "@/components/site/motion-section";
import { PostCard } from "@/components/posts/post-card";
import { Carousel } from "@/components/site/carousel";
import { SubscribeForm } from "@/components/site/subscribe-form";
import { getFeaturedPost, getPopularPosts, getRecentPosts, getPublishedPosts } from "@/lib/posts";

export default async function HomePage() {
  const [featuredStory, popularPosts, recentPosts, stories, blogs] = await Promise.all([
    getFeaturedPost("STORY"),
    getPopularPosts(10),
    getRecentPosts(10),
    getPublishedPosts("STORY"),
    getPublishedPosts("BLOG")
  ]);

  return (
    <>
      {/* Hero Banner (Featured Story) */}
      {featuredStory && (
        <section className="relative w-full aspect-[16/9] md:aspect-[21/9] lg:aspect-[24/9] overflow-hidden bg-ink">
          {featuredStory.coverImage && (
            <Image
              src={featuredStory.coverImage}
              alt={featuredStory.title}
              fill
              className="object-cover opacity-60"
              priority
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
          <div className="absolute inset-0 flex items-end">
            <div className="mx-auto w-full max-w-[1400px] px-4 pb-12 sm:px-6 lg:px-8">
              <div className="max-w-2xl">
                <span className="inline-block rounded-full bg-gold/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-gold mb-4 backdrop-blur-sm">
                  Featured {featuredStory.type}
                </span>
                <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight text-paper mb-4">
                  {featuredStory.title}
                </h1>
                <p className="line-clamp-2 text-[15px] sm:text-[17px] text-paper/80 mb-6">
                  {featuredStory.excerpt}
                </p>
                <Link
                  href={`/posts/${featuredStory.slug}`}
                  className="inline-flex h-11 items-center gap-2 rounded-full bg-gold px-8 text-[15px] font-semibold text-ink shadow-sm transition hover:scale-105 hover:bg-paper"
                >
                  Start Reading
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Main Carousels */}
      <MotionSection className="py-8">
        {popularPosts.length > 0 && (
          <Carousel title="Trending Now">
            {popularPosts.map((post) => (
              <PostCard key={post.id} post={post} variant="vertical" />
            ))}
          </Carousel>
        )}

        {recentPosts.length > 0 && (
          <Carousel title="Recently Published">
            {recentPosts.map((post) => (
              <PostCard key={post.id} post={post} variant="vertical" />
            ))}
          </Carousel>
        )}

        {stories.length > 0 && (
          <Carousel title="Top Stories" viewAllHref="/stories">
            {stories.slice(0, 10).map((post) => (
              <PostCard key={post.id} post={post} variant="vertical" />
            ))}
          </Carousel>
        )}

        {blogs.length > 0 && (
          <Carousel title="Editor's Choice Blogs" viewAllHref="/blogs">
            {blogs.slice(0, 10).map((post) => (
              <PostCard key={post.id} post={post} variant="vertical" />
            ))}
          </Carousel>
        )}
      </MotionSection>

      {/* Subscribe Section */}
      <section className="mx-auto max-w-3xl px-4 py-24 sm:px-6 lg:px-8 text-center border-t border-line/40">
        <h2 className="font-serif text-3xl font-medium text-ink">Subscribe to Premium</h2>
        <p className="mt-4 text-muted mb-8 text-[15px]">
          Unlock exclusive stories and ad-free reading experience by subscribing to Talez Premium.
        </p>
        <div className="max-w-md mx-auto">
          <SubscribeForm compact />
        </div>
      </section>
    </>
  );
}
