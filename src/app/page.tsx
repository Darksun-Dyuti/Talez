import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Bookmark } from "lucide-react";

import { MotionSection } from "@/components/site/motion-section";
import { getFeaturedPost, getRecentPosts, getPublishedPosts } from "@/lib/posts";
import { cn } from "@/lib/utils";

// Helper component for smooth reveal
const RevealText = ({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => (
  <div className="overflow-hidden">
    <div className={cn("animate-fade-in-up", className)} style={{ animationDelay: `${delay}s`, animationFillMode: "both" }}>
      {children}
    </div>
  </div>
);

export default async function HomePage() {
  const [featuredStory, recentPosts] = await Promise.all([
    getFeaturedPost("STORY"),
    getRecentPosts(10),
    getPublishedPosts("STORY"),
    getPublishedPosts("BLOG")
  ]);

  return (
    <div className="flex flex-col gap-32 pb-32">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center pt-24">
        <div className="mx-auto w-full max-w-[1400px] px-6 lg:px-12 grid lg:grid-cols-[1.2fr_1fr] gap-16 items-center">
          
          <div className="relative z-10">
            <RevealText delay={0.1}>
              <span className="font-mono text-xs font-semibold tracking-[0.3em] uppercase text-brand mb-8 block">
                The Creative Archive
              </span>
            </RevealText>
            
            <RevealText delay={0.2}>
              <h1 className="font-serif text-[clamp(3rem,8vw,6rem)] font-medium leading-[1.05] tracking-tight text-ink mb-8">
                Generous <br/>
                <span className="italic text-muted">reading for</span> <br/>
                curious minds.
              </h1>
            </RevealText>

            <RevealText delay={0.4}>
              <p className="max-w-md text-lg leading-relaxed text-muted mb-10">
                A personal publishing platform dedicated to long-form storytelling, thoughtful essays, and in-depth tutorials.
              </p>
            </RevealText>
            
            <RevealText delay={0.5}>
              <div className="flex items-center gap-6">
                <Link 
                  href="/stories" 
                  className="group relative inline-flex h-14 items-center justify-center gap-3 overflow-hidden rounded-full bg-ink px-8 text-sm font-medium text-paper transition-all hover:bg-brand"
                >
                  <span className="relative z-10">Explore Stories</span>
                  <ArrowRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                <Link 
                  href="/subscribe" 
                  className="group inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-ink"
                >
                  Join the Inner Circle
                  <span className="block h-[1px] w-0 bg-ink transition-all duration-300 group-hover:w-4" />
                </Link>
              </div>
            </RevealText>
          </div>

          {/* Featured Image Right side */}
          {featuredStory && (
            <MotionSection delay={0.6} className="relative h-full min-h-[500px] w-full hidden lg:block rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-brand/5 mix-blend-overlay z-10" />
              {featuredStory.coverImage ? (
                <Image
                  src={featuredStory.coverImage}
                  alt={featuredStory.title}
                  fill
                  className="object-cover transition-transform duration-1000 hover:scale-105"
                  priority
                />
              ) : (
                <div className="w-full h-full bg-surface" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent z-20" />
              
              <div className="absolute bottom-0 left-0 w-full p-10 z-30">
                <span className="inline-block px-3 py-1 bg-paper/20 backdrop-blur-md rounded-full text-xs font-mono tracking-wider text-paper mb-4">
                  FEATURED
                </span>
                <h2 className="font-serif text-3xl font-medium text-paper mb-3">
                  {featuredStory.title}
                </h2>
                <Link href={`/posts/${featuredStory.slug}`} className="text-sm font-medium text-brand-light flex items-center gap-2 hover:underline underline-offset-4">
                  Read Article <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </MotionSection>
          )}

        </div>
      </section>

      {/* Latest Content Asymmetrical Grid */}
      <section className="mx-auto w-full max-w-[1400px] px-6 lg:px-12">
        <MotionSection>
          <div className="flex items-end justify-between mb-16 border-b border-line/40 pb-6">
            <div>
              <span className="font-mono text-xs font-semibold tracking-[0.2em] text-muted uppercase">Latest Releases</span>
              <h2 className="font-serif text-4xl mt-4 text-ink">Selected Writings</h2>
            </div>
            <Link href="/stories" className="group hidden md:flex items-center gap-2 text-sm font-medium text-muted hover:text-ink transition-colors">
              View the archive <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </MotionSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {recentPosts.slice(0, 6).map((post, i) => (
            <MotionSection key={post.id} delay={0.1 * i} className="group flex flex-col">
              <Link href={`/posts/${post.slug}`} className="block relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-surface mb-6">
                {post.coverImage && (
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                )}
                <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/10 transition-colors duration-500" />
              </Link>
              <div className="flex flex-col flex-grow">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-[10px] tracking-widest text-brand uppercase">
                    {post.type}
                  </span>
                  <span className="text-xs text-muted font-medium">
                    {post.readingTime} min read
                  </span>
                </div>
                <h3 className="font-serif text-xl font-medium leading-snug text-ink mb-3 group-hover:text-brand transition-colors line-clamp-2">
                  <Link href={`/posts/${post.slug}`}>
                    {post.title}
                  </Link>
                </h3>
                <p className="text-sm text-muted line-clamp-3 mb-6">
                  {post.excerpt}
                </p>
                <div className="mt-auto flex items-center justify-between border-t border-line/40 pt-4">
                  <span className="text-[11px] font-mono text-muted uppercase">
                    {post.publishDate ? new Date(post.publishDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "Draft"}
                  </span>
                  <button className="text-muted hover:text-ink transition-colors">
                    <Bookmark className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </MotionSection>
          ))}
        </div>
      </section>

      {/* Support Section */}
      <MotionSection className="relative mx-auto w-full max-w-[1400px] px-6 lg:px-12">
        <div className="rounded-3xl bg-surface/50 border border-line/40 p-10 md:p-20 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand/5 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />
          
          <span className="inline-block rounded-full bg-brand/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-brand mb-8">
            Support the Creator
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium text-ink mb-6 max-w-3xl mx-auto">
            Independent writing relies on readers like you.
          </h2>
          <p className="text-lg text-muted max-w-2xl mx-auto mb-10">
            If you enjoy the stories and tutorials published here, consider joining the premium membership or making a one-time donation to keep this archive alive and ad-free.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/subscribe" className="w-full sm:w-auto rounded-full bg-ink px-8 py-4 text-sm font-medium text-paper transition-all hover:bg-brand">
              Become a Member
            </Link>
            <Link href="/donate" className="w-full sm:w-auto rounded-full bg-paper border border-line px-8 py-4 text-sm font-medium text-ink transition-all hover:border-ink">
              Make a Donation
            </Link>
          </div>
        </div>
      </MotionSection>
    </div>
  );
}
