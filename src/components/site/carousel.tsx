import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface CarouselProps {
  title?: string;
  viewAllHref?: string;
  children: React.ReactNode;
  className?: string;
}

export function Carousel({ title, viewAllHref, children, className }: CarouselProps) {
  return (
    <section className={cn("py-8", className)}>
      {(title || viewAllHref) && (
        <div className="mb-6 flex items-end justify-between px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto">
          {title && <h2 className="font-serif text-2xl font-medium text-ink">{title}</h2>}
          {viewAllHref && (
            <Link
              href={viewAllHref}
              className="inline-flex items-center gap-1.5 text-[13px] font-medium text-muted hover:text-ink transition-colors"
            >
              View all <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          )}
        </div>
      )}
      
      <div className="relative">
        <div className="flex w-full snap-x snap-mandatory overflow-x-auto pb-6 scrollbar-hide">
          <div className="flex gap-4 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto w-max">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
