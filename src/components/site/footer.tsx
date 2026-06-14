import Link from "next/link";
import { ArrowRight, Mail, Rss, Github, Twitter } from "lucide-react";

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
      { label: "Support the Creator", href: "/donate" },
      { label: "Supporter Wall", href: "/supporters" },
      { label: "Reader Dashboard", href: "/dashboard" }
    ]
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" }
    ]
  }
];

export function Footer() {
  return (
    <footer className="relative mt-32 overflow-hidden border-t border-line/40 bg-surface/30">
      {/* Decorative large text background */}
      <div className="pointer-events-none absolute -bottom-10 left-0 right-0 flex justify-center opacity-[0.03] dark:opacity-[0.02]">
        <h2 className="text-[25vw] font-bold tracking-tighter text-ink/20">TaleZ.</h2>
      </div>

      <div className="relative mx-auto max-w-[1400px] px-6 py-20 lg:px-12">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-8">
          
          {/* Left section: Newsletter & Intro */}
          <div className="flex flex-col justify-between">
            <div className="max-w-md">
              <h3 className="font-serif text-4xl leading-tight text-ink">
                Let's stay connected.
              </h3>
              <p className="mt-4 text-base text-muted">
                Join the inner circle. Get stories, updates, and personal thoughts delivered directly to your inbox. No spam, just good reading.
              </p>
              
              <form className="mt-8 relative max-w-sm">
                <input 
                  type="email" 
                  placeholder="name@example.com" 
                  className="w-full rounded-full border border-line/60 bg-paper py-3 pl-6 pr-12 text-sm transition-colors focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
                  required
                />
                <button 
                  type="submit" 
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-brand p-1.5 text-paper transition-transform hover:scale-110"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            </div>
            
            <div className="mt-16 flex gap-4">
              <Link href="https://twitter.com" className="group rounded-full border border-line/40 bg-paper p-3 text-muted transition hover:border-brand hover:text-brand hover:shadow-glow">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="https://github.com" className="group rounded-full border border-line/40 bg-paper p-3 text-muted transition hover:border-brand hover:text-brand hover:shadow-glow">
                <Github className="h-5 w-5" />
              </Link>
              <Link href="/rss.xml" className="group rounded-full border border-line/40 bg-paper p-3 text-muted transition hover:border-brand hover:text-brand hover:shadow-glow">
                <Rss className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Right section: Links */}
          <div className="grid gap-12 sm:grid-cols-3">
            {columns.map((column) => (
              <div key={column.title} className="flex flex-col gap-6">
                <h4 className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-ink">
                  {column.title}
                </h4>
                <ul className="flex flex-col gap-4">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link 
                        href={link.href} 
                        className="group relative inline-block text-sm text-muted transition-colors hover:text-ink"
                      >
                        {link.label}
                        <span className="absolute -bottom-1 left-0 h-[1px] w-0 bg-brand transition-all duration-300 group-hover:w-full" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

        </div>

        {/* Bottom Banner */}
        <div className="mt-32 flex flex-col items-center justify-between gap-4 border-t border-line/40 pt-8 sm:flex-row">
          <p className="font-mono text-xs tracking-wider text-muted">
            © {new Date().getFullYear()} TALEZ. ALL RIGHTS RESERVED.
          </p>
          <p className="font-mono text-xs tracking-wider text-muted">
            A PERSONAL PUBLISHING PLATFORM.
          </p>
        </div>
      </div>
    </footer>
  );
}
