import Image from "next/image";
import Link from "next/link";
import { Clock, Heart, Eye } from "lucide-react";
import { TypeBadge } from "@/components/posts/type-badge";
import { cn, formatDate, formatNumber } from "@/lib/utils";
import type { TalezPost } from "@/types/content";

export function PostCard({ 
  post, 
  variant = "vertical" 
}: { 
  post: TalezPost; 
  variant?: "vertical" | "horizontal" | "feature" 
}) {
  if (variant === "vertical") {
    return (
      <article className="group flex flex-col w-[140px] sm:w-[160px] md:w-[180px] shrink-0 snap-start">
        <Link 
          href={`/posts/${post.slug}`} 
          className="relative block w-full aspect-[2/3] overflow-hidden rounded-md bg-surface shadow-sm transition-transform duration-300 group-hover:-translate-y-1 group-hover:shadow-md"
        >
          {post.coverImage ? (
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              sizes="(max-width: 640px) 140px, (max-width: 768px) 160px, 180px"
              className="object-cover transition duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gold/10 text-gold/40">
              <span className="font-serif text-2xl font-bold">T</span>
            </div>
          )}
          <div className="absolute top-2 left-2 z-10 scale-90 origin-top-left">
            <TypeBadge type={post.type} accessLevel={post.accessLevel} />
          </div>
        </Link>
        <div className="mt-3 flex flex-col">
          <h3 className="font-serif text-[15px] font-medium leading-tight text-ink line-clamp-2 group-hover:text-gold transition-colors">
            <Link href={`/posts/${post.slug}`} title={post.title}>
              {post.title}
            </Link>
          </h3>
          <p className="mt-1 text-[13px] text-muted line-clamp-1">{post.author?.name || "Talez Writer"}</p>
          <div className="mt-1.5 flex items-center gap-3 text-[11px] text-muted font-medium">
            <span className="inline-flex items-center gap-1">
              <Eye className="h-3 w-3" aria-hidden="true" />
              {formatNumber(post.viewCount || 0)}
            </span>
            <span className="inline-flex items-center gap-1">
              <Heart className="h-3 w-3" aria-hidden="true" />
              {formatNumber(post.appreciationCount)}
            </span>
          </div>
        </div>
      </article>
    );
  }

  // Original horizontal or feature layout
  return (
    <article
      className={cn(
        "group flex flex-col gap-6",
        variant === "feature" && "md:flex-row md:items-center md:gap-10"
      )}
    >
      <Link href={`/posts/${post.slug}`} className={cn("relative block overflow-hidden rounded-lg bg-surface", variant === "feature" ? "aspect-[16/10] md:w-1/2" : "aspect-[16/10]")}>
        {post.coverImage ? (
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            sizes={variant === "feature" ? "(min-width: 768px) 48vw, 100vw" : "(min-width: 1024px) 33vw, 100vw"}
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        ) : null}
      </Link>
      <div className={cn("flex flex-col", variant === "feature" && "md:w-1/2")}>
        <div className="flex flex-wrap items-center gap-3">
          <TypeBadge type={post.type} accessLevel={post.accessLevel} />
          <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted">{post.category}</span>
        </div>
        <h2 className={cn("mt-4 font-serif font-medium leading-tight text-ink", variant === "feature" ? "text-3xl lg:text-4xl" : "text-2xl")}>
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
