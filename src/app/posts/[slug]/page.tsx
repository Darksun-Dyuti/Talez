import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Crown, Eye, Lock } from "lucide-react";
import { AppreciationButton } from "@/components/posts/appreciation-button";
import { BookmarkButton } from "@/components/posts/bookmark-button";
import { Comments } from "@/components/posts/comments";
import { ReadingProgress } from "@/components/posts/reading-progress";
import { ReadingHistoryTracker } from "@/components/posts/reading-history-tracker";
import { ShareRow } from "@/components/posts/share-row";
import { TableOfContents } from "@/components/posts/table-of-contents";
import { TypeBadge } from "@/components/posts/type-badge";
import { DonationForm } from "@/components/forms/donation-form";
import { auth } from "@/auth";
import { getRelatedPosts, getPostBySlug, getPublishedPosts, getSeriesBySlug } from "@/lib/posts";
import { getTableOfContents } from "@/lib/reading";
import { postJsonLd, postMetadata } from "@/lib/seo";
import { formatDate, formatNumber } from "@/lib/utils";

export async function generateStaticParams() {
  const posts = await getPublishedPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return postMetadata(post);
}

export default async function PostPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const session = await auth();
  const canReadPremium = post.accessLevel === "FREE" || session?.user?.role === "ADMIN";
  const related = await getRelatedPosts(post);
  const toc = getTableOfContents(post.content);
  const series = post.series ? await getSeriesBySlug(post.series.slug) : null;
  const currentSeriesIndex = series?.posts.findIndex((item) => item.slug === post.slug) ?? -1;
  const previous = currentSeriesIndex > 0 ? series?.posts[currentSeriesIndex - 1] : null;
  const next = series && currentSeriesIndex >= 0 ? series.posts[currentSeriesIndex + 1] : null;
  const previewContent = canReadPremium ? post.content : post.content.split("</p>").slice(0, 1).join("</p>") + "</p>";

  return (
    <>
      <ReadingProgress />
      <ReadingHistoryTracker postId={post.id} slug={post.slug} title={post.title} coverImage={post.coverImage} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(postJsonLd(post)) }}
      />
      <article className="min-h-screen bg-paper pb-24">
        {/* Full-width Hero Image if available */}
        {post.coverImage && (
          <div className="relative w-full h-[60vh] md:h-[75vh] bg-surface">
            <Image 
              src={post.coverImage} 
              alt={post.title} 
              fill 
              priority 
              className="object-cover" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-paper via-transparent to-transparent" />
          </div>
        )}

        {/* Minimalist Header */}
        <header className="relative z-10 mx-auto max-w-[900px] px-6 lg:px-12 -mt-32 md:-mt-48">
          <div className="bg-paper p-8 md:p-16 shadow-[0_30px_60px_rgb(0,0,0,0.05)] rounded-2xl md:rounded-[2rem] border border-line/20">
            <div className="mb-10 text-center flex flex-col items-center">
              <div className="flex items-center gap-3 mb-6">
                <TypeBadge type={post.type} accessLevel={post.accessLevel} />
                <span className="text-xs font-mono tracking-[0.2em] uppercase text-brand">
                  {post.category}
                </span>
              </div>
              <h1 className="font-serif text-[clamp(2.5rem,5vw,4.5rem)] font-medium leading-[1.1] tracking-tight text-ink mb-6 max-w-4xl">
                {post.title}
              </h1>
              <p className="text-lg md:text-xl text-muted leading-relaxed max-w-2xl font-serif italic">
                {post.excerpt}
              </p>
            </div>

            <div className="flex items-center justify-center gap-6 text-sm text-muted font-mono uppercase tracking-widest pt-8 border-t border-line/40">
              <time dateTime={post.publishDate ? new Date(post.publishDate).toISOString() : undefined}>
                {formatDate(post.publishDate)}
              </time>
              <span>•</span>
              <span>{post.readingTime} MIN READ</span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Eye className="h-4 w-4" />
                {formatNumber(post.viewCount)}
              </span>
            </div>
          </div>
        </header>

        {/* Two-column layout for content and sidebar */}
        <div className="mx-auto grid max-w-[1400px] gap-16 px-6 py-20 lg:grid-cols-[1fr_minmax(280px,320px)] lg:px-12">
          
          {/* Main Content */}
          <div className="mx-auto w-full max-w-[760px] lg:mx-0">
            {/* Quick Actions */}
            <div className="mb-12 flex items-center justify-between border-b border-line/40 pb-6 sticky top-24 z-30 bg-paper/95 backdrop-blur py-4">
              <div className="flex items-center gap-4">
                <AppreciationButton postId={post.id} initialCount={post.appreciationCount} />
                <BookmarkButton postId={post.id} />
              </div>
              <ShareRow post={post} />
            </div>

            <div 
              className="prose-talez max-w-none prose-lg md:prose-xl font-serif text-ink/90 leading-loose" 
              dangerouslySetInnerHTML={{ __html: previewContent }} 
            />

            {!canReadPremium && (
              <div className="my-16 rounded-3xl border border-brand/20 bg-brand/5 p-10 text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand/10 blur-[60px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />
                <div className="mx-auto w-16 h-16 rounded-full bg-paper border border-brand/20 flex items-center justify-center mb-6">
                  <Lock className="h-6 w-6 text-brand" />
                </div>
                <h2 className="font-serif text-3xl font-medium text-ink mb-4">
                  Reserved for the Inner Circle
                </h2>
                <p className="text-lg text-muted mb-8 max-w-md mx-auto">
                  This piece is exclusively available to premium members. Join to unlock all stories and enjoy an ad-free reading experience.
                </p>
                <Link href="/subscribe#membership" className="inline-flex h-14 items-center justify-center gap-3 rounded-full bg-ink px-8 text-sm font-medium text-paper transition-all hover:bg-brand">
                  <Crown className="h-4 w-4" />
                  Become a Member
                </Link>
              </div>
            )}

            {post.writerNote && canReadPremium && (
              <section className="my-16 rounded-2xl border border-line bg-surface/50 p-8 italic font-serif">
                <div className="flex items-center gap-3 mb-4">
                  <span className="h-px w-8 bg-brand"></span>
                  <p className="text-xs font-mono font-semibold uppercase tracking-[0.2em] text-brand">Writer&apos;s Note</p>
                </div>
                <p className="text-lg leading-relaxed text-ink/80">{post.writerNote}</p>
              </section>
            )}

            <section className="mt-24 pt-16 border-t border-line/40">
              <DonationForm postId={post.id} />
            </section>

            <div className="mt-16">
              <Comments postId={post.id} />
            </div>
          </div>

          {/* Sidebar */}
          <aside className="hidden lg:block space-y-12 sticky top-32 h-fit">
            {post.type === "BLOG" && toc.length > 0 && (
              <div className="rounded-2xl border border-line bg-surface/30 p-6">
                <p className="text-xs font-mono font-semibold uppercase tracking-[0.2em] text-muted mb-6">Contents</p>
                <TableOfContents items={toc} />
              </div>
            )}

            {series && (
              <div className="rounded-2xl border border-line bg-surface/30 p-6">
                <p className="text-xs font-mono font-semibold uppercase tracking-[0.2em] text-brand mb-4">Series Overview</p>
                <Link href={`/series/${series.slug}`} className="block font-serif text-2xl font-medium text-ink hover:text-brand transition-colors mb-6">
                  {series.title}
                </Link>
                
                <div className="space-y-4">
                  {series.posts.map((sp, idx) => (
                    <Link 
                      key={sp.id} 
                      href={`/posts/${sp.slug}`}
                      className={`block text-sm ${sp.id === post.id ? 'font-semibold text-ink' : 'text-muted hover:text-ink transition-colors'}`}
                    >
                      <span className="font-mono text-xs opacity-50 mr-3">{String(idx + 1).padStart(2, '0')}.</span>
                      {sp.title}
                    </Link>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-line/40 flex items-center justify-between text-sm font-medium">
                  {previous ? (
                    <Link href={`/posts/${previous.slug}`} className="text-muted hover:text-ink transition flex items-center gap-2">
                      <ArrowLeft className="w-4 h-4" /> Prev
                    </Link>
                  ) : <span className="opacity-0">Prev</span>}
                  
                  {next ? (
                    <Link href={`/posts/${next.slug}`} className="text-muted hover:text-ink transition flex items-center gap-2">
                      Next <ArrowRight className="w-4 h-4" />
                    </Link>
                  ) : <span className="opacity-0">Next</span>}
                </div>
              </div>
            )}
          </aside>
        </div>
      </article>

      {/* Related Posts */}
      {related.length > 0 && (
        <section className="bg-surface/50 border-t border-line/40 py-24">
          <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
            <div className="mb-12 flex items-center justify-between border-b border-line/40 pb-6">
              <div>
                <span className="font-mono text-xs font-semibold tracking-[0.2em] text-muted uppercase">Continue Reading</span>
                <h2 className="font-serif text-3xl mt-4 text-ink">Related Works</h2>
              </div>
            </div>
            <div className="grid gap-x-8 gap-y-12 md:grid-cols-3">
              {related.map((item) => (
                <Link key={item.slug} href={`/posts/${item.slug}`} className="group flex flex-col">
                  {item.coverImage && (
                    <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-surface mb-6">
                      <Image
                        src={item.coverImage}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                  )}
                  <p className="text-[10px] font-mono tracking-widest uppercase text-brand mb-3">{item.type}</p>
                  <h3 className="font-serif text-xl font-medium text-ink group-hover:text-brand transition-colors line-clamp-2">{item.title}</h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
