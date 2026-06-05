import Image from "next/image";
import Link from "next/link";
import { Mail, Rss } from "lucide-react";

const columns = [
  {
    title: "Read",
    links: [
      { label: "Stories", href: "/stories" },
      { label: "Blogs", href: "/blogs" },
      { label: "Series", href: "/series" },
      { label: "Search", href: "/search" }
    ]
  },
  {
    title: "Community",
    links: [
      { label: "Subscribe", href: "/subscribe" },
      { label: "Support", href: "/donate" },
      { label: "Supporter Wall", href: "/supporters" },
      { label: "Reader Dashboard", href: "/dashboard" }
    ]
  },
  {
    title: "Creator",
    links: [
      { label: "About", href: "/about" },
      { label: "Admin", href: "/admin" },
      { label: "Newsletter", href: "/admin/newsletters" }
    ]
  }
];

export function Footer() {
  return (
    <footer className="border-t border-line bg-surface">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.4fr_2fr] lg:px-8">
        <div>
          <div className="flex items-center gap-3">
            <Image src="/brand/talez-logo-256.png" alt="Talez logo" width={48} height={48} className="rounded-xl border border-line bg-ink" />
            <div>
              <p className="font-serif text-2xl font-semibold text-ink">Talez</p>
              <p className="text-sm text-muted">Tales, Thoughts, and Beyond</p>
            </div>
          </div>
          <p className="mt-5 max-w-md text-sm leading-7 text-muted">
            A calm publishing home for stories, essays, newsletters, memberships, and reader community.
          </p>
          <div className="mt-6 flex gap-3">
            <Link href="/subscribe" className="grid h-10 w-10 place-items-center rounded-full border border-line bg-paper text-muted transition hover:text-ink" aria-label="Subscribe">
              <Mail className="h-4 w-4" />
            </Link>
            <Link href="/rss.xml" className="grid h-10 w-10 place-items-center rounded-full border border-line bg-paper text-muted transition hover:text-ink" aria-label="RSS">
              <Rss className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="grid gap-8 sm:grid-cols-3">
          {columns.map((column) => (
            <div key={column.title}>
              <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-ink">{column.title}</h2>
              <ul className="mt-4 space-y-3">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-muted transition hover:text-ink">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-line py-5 text-center text-xs text-muted">
        © {new Date().getFullYear()} Talez. Built for generous reading.
      </div>
    </footer>
  );
}
