import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Users } from "lucide-react";
import { getSeriesSummaries } from "@/lib/posts";
import { formatNumber } from "@/lib/utils";

export const metadata = {
  title: "Series",
  description: "Read Talez story series and collections in order."
};

export default async function SeriesPage() {
  const series = await getSeriesSummaries();

  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="mb-10 max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-ember">Series</p>
        <h1 className="mt-3 font-serif text-5xl font-semibold text-ink">Collections with a reading order.</h1>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        {series.map((item) => (
          <article key={item.slug} className="overflow-hidden rounded-lg border border-line bg-surface shadow-sm">
            <div className="relative aspect-[16/9]">
              <Image src={item.coverImage} alt={item.title} fill className="object-cover" />
            </div>
            <div className="p-6">
              <div className="flex items-center gap-3 text-sm text-muted">
                <Users className="h-4 w-4" />
                {formatNumber(item.followerCount)} followers
              </div>
              <h2 className="mt-3 font-serif text-3xl font-semibold text-ink">{item.title}</h2>
              <p className="mt-3 text-sm leading-7 text-muted">{item.description}</p>
              <Link href={`/series/${item.slug}`} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-ember">
                Read in order <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
