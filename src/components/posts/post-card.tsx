import Image from "next/image";
import Link from "next/link";
import { Clock, Heart } from "lucide-react";
import { TypeBadge } from "@/components/posts/type-badge";
import { cn, formatDate, formatNumber } from "@/lib/utils";
import type { TalezPost } from "@/types/content";

export function PostCard({ post, feature = false }: { post: TalezPost; feature?: boolean }) {
  return (
    <article
      className={cn(
        "group flex flex-col gap-6",
        feature && "md:flex-row md:items-center md:gap-10"
      )}
    >
      <Link href={`/posts/${post.slug}`} className={cn("relative block overflow-hidden bg-surface", feature ? "aspect-[16/10] md:w-1/2" : "aspect-[16/10]")}>
        {post.coverImage ? (
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            sizes={feature ? "(min-width: 768px) 48vw, 100vw" : "(min-width: 1024px) 33vw, 100vw"}
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        ) : null}
      </Link>
      <div className={cn("flex flex-col", feature && "md:w-1/2")}>
        <div className="flex flex-wrap items-center gap-3">
          <TypeBadge type={post.type} accessLevel={post.accessLevel} />
          <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted">{post.category}</span>
        </div>
        <h2 className={cn("mt-4 font-serif font-medium leading-tight text-ink", feature ? "text-3xl lg:text-4xl" : "text-2xl")}>
          <Link href={`/posts/${post.slug}`} className="group-hover:underline underline-offset-4 decoration-1 transition">
            {post.title}
          </Link>
        </h2>
        <p className="mt-4 line-clamp-3 text-[15px] leading-relaxed text-muted">{post.excerpt}</p>
        <div className="mt-6 flex flex-wrap items-center gap-4 text-[13px] text-muted">
          <span>{formatDate(post.publishDate)}</span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" aria-hidden="true" />
            {post.readingTime} min
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Heart className="h-3.5 w-3.5" aria-hidden="true" />
            {formatNumber(post.appreciationCount)}
          </span>
        </div>
      </div>
    </article>
  );
}
