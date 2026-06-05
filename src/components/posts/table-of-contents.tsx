import type { TocItem } from "@/lib/reading";
import { cn } from "@/lib/utils";

export function TableOfContents({ items }: { items: TocItem[] }) {
  if (!items.length) return null;

  return (
    <aside className="sticky top-24 hidden max-h-[calc(100vh-8rem)] overflow-auto rounded-lg border border-line bg-surface p-4 lg:block">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">Contents</p>
      <nav className="mt-3 grid gap-2">
        {items.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={cn("text-sm leading-6 text-muted transition hover:text-ink", item.level === 3 && "pl-4 text-xs")}
          >
            {item.text}
          </a>
        ))}
      </nav>
    </aside>
  );
}
