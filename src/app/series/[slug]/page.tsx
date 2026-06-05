import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, BookOpen, Users } from "lucide-react";
import { getSeriesBySlug } from "@/lib/posts";
import { formatNumber } from "@/lib/utils";

export default async function SeriesDetailPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const series = await getSeriesBySlug(slug);
  if (!series) notFound();

  return (
    <section>
      <div className="border-b border-line bg-surface">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[0.8fr_1fr] lg:px-8">
          <div className="relative aspect-[16/11] overflow-hidden rounded-lg border border-line">
            <Image src={series.coverImage} alt={series.title} fill className="object-cover" />
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-ember">Series</p>
            <h1 className="mt-3 font-serif text-5xl font-semibold leading-tight text-ink">{series.title}</h1>
            <p className="mt-4 text-lg leading-8 text-muted">{series.description}</p>
            <div className="mt-6 flex flex-wrap gap-4 text-sm text-muted">
              <span className="inline-flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                {series.posts.length} chapters
              </span>
              <span className="inline-flex items-center gap-2">
                <Users className="h-4 w-4" />
                {formatNumber(series.followerCount)} followers
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-4">
          {series.posts.map((post, index) => (
            <Link key={post.slug} href={`/posts/${post.slug}`} className="grid grid-cols-[auto_1fr_auto] items-center gap-4 rounded-lg border border-line bg-surface p-5 transition hover:shadow-soft">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-paper font-serif text-xl text-ember">{index + 1}</span>
              <div>
                <h2 className="font-serif text-2xl font-semibold text-ink">{post.title}</h2>
                <p className="mt-1 text-sm text-muted">{post.excerpt}</p>
              </div>
              <ArrowRight className="h-5 w-5 text-muted" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
