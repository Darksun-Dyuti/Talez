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
  const canReadPremium = post.accessLevel === "FREE" || session?.user.role === "ADMIN";
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
      <article>
        <header className="border-b border-line bg-surface">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:px-8">
            <div className="flex flex-col justify-center">
              <Link href={post.type === "STORY" ? "/stories" : "/blogs"} className="mb-6 inline-flex w-fit items-center gap-2 text-sm font-semibold text-muted transition hover:text-ink">
                <ArrowLeft className="h-4 w-4" />
                {post.type === "STORY" ? "Stories" : "Blogs"}
              </Link>
              <div className="flex flex-wrap items-center gap-3">
                <TypeBadge type={post.type} accessLevel={post.accessLevel} />
                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">{post.category}</span>
              </div>
              <h1 className="mt-5 font-serif text-4xl font-semibold leading-tight text-ink sm:text-5xl lg:text-6xl">
                {post.title}
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-muted">{post.excerpt}</p>
              <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-muted">
                <span>{formatDate(post.publishDate)}</span>
                <span>{post.readingTime} min read</span>
                <span className="inline-flex items-center gap-1">
                  <Eye className="h-4 w-4" />
                  {formatNumber(post.viewCount)} reads
                </span>
              </div>
            </div>
            <div className="relative aspect-[16/11] overflow-hidden rounded-lg border border-line bg-ink shadow-soft">
              <Image src={post.coverImage ?? "/og-image.png"} alt={post.title} fill priority className="object-cover" />
            </div>
          </div>
        </header>

        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[minmax(0,1fr)_260px] lg:px-8">
          <div className="mx-auto w-full max-w-reading">
            <div className="mb-8 flex flex-wrap items-center gap-3">
              <AppreciationButton postId={post.id} initialCount={post.appreciationCount} />
              <BookmarkButton postId={post.id} />
              <ShareRow post={post} />
            </div>

            <div className="prose-talez max-w-none" dangerouslySetInnerHTML={{ __html: previewContent }} />

            {!canReadPremium ? (
              <div className="my-10 rounded-lg border border-gold/35 bg-gold/10 p-6">
                <div className="flex items-center gap-3">
                  <Lock className="h-5 w-5 text-ember" />
                  <h2 className="font-serif text-3xl font-semibold text-ink">Premium chapter</h2>
                </div>
                <p className="mt-3 text-sm leading-7 text-muted">
                  This piece is available to premium members and patrons with early access, exclusive stories, and ad-free reading.
                </p>
                <Link href="/subscribe#membership" className="mt-5 inline-flex h-11 items-center gap-2 rounded-full bg-ink px-5 text-sm font-semibold text-paper">
                  <Crown className="h-4 w-4" />
                  View membership
                </Link>
              </div>
            ) : null}

            {post.writerNote && canReadPremium ? (
              <section className="mt-12 rounded-lg border border-line bg-surface p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-ember">Writer&apos;s note</p>
                <p className="mt-3 leading-8 text-muted">{post.writerNote}</p>
              </section>
            ) : null}

            {series ? (
              <nav className="mt-10 grid gap-3 border-y border-line py-6 sm:grid-cols-2" aria-label="Series navigation">
                {previous ? (
                  <Link href={`/posts/${previous.slug}`} className="rounded-lg border border-line bg-surface p-4">
                    <span className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">Previous</span>
                    <span className="mt-1 block font-serif text-xl font-semibold text-ink">{previous.title}</span>
                  </Link>
                ) : <div />}
                {next ? (
                  <Link href={`/posts/${next.slug}`} className="rounded-lg border border-line bg-surface p-4 text-right">
                    <span className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">Next</span>
                    <span className="mt-1 block font-serif text-xl font-semibold text-ink">{next.title}</span>
                  </Link>
                ) : null}
              </nav>
            ) : null}

            <section className="mt-12">
              <DonationForm postId={post.id} />
            </section>

            <Comments postId={post.id} />
          </div>

          <div className="space-y-5">
            {post.type === "BLOG" ? <TableOfContents items={toc} /> : null}
            {series ? (
              <aside className="rounded-lg border border-line bg-surface p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">Series</p>
                <Link href={`/series/${series.slug}`} className="mt-2 block font-serif text-xl font-semibold text-ink">
                  {series.title}
                </Link>
                <div className="mt-4 h-2 overflow-hidden rounded-full bg-line">
                  <div
                    className="h-full rounded-full bg-gold"
                    style={{ width: `${Math.max(10, ((currentSeriesIndex + 1) / series.posts.length) * 100)}%` }}
                  />
                </div>
                <p className="mt-2 text-sm text-muted">
                  Chapter {currentSeriesIndex + 1} of {series.posts.length}
                </p>
              </aside>
            ) : null}
          </div>
        </div>
      </article>

      <section className="border-t border-line bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="font-serif text-3xl font-semibold text-ink">Related posts</h2>
            <Link href="/search" className="inline-flex items-center gap-2 text-sm font-semibold text-ember">
              More <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {related.map((item) => (
              <Link key={item.slug} href={`/posts/${item.slug}`} className="rounded-lg border border-line bg-paper p-5 transition hover:shadow-soft">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">{item.type}</p>
                <h3 className="mt-2 font-serif text-2xl font-semibold text-ink">{item.title}</h3>
                <p className="mt-3 line-clamp-3 text-sm leading-7 text-muted">{item.excerpt}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
