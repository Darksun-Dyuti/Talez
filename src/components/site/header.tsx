"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, Search, User, X, PenSquare } from "lucide-react";
import { useState } from "react";
import { ThemeToggle } from "@/components/site/theme-toggle";
import { cn } from "@/lib/utils";

const nav = [
  { label: "Home", href: "/" },
  { label: "Stories", href: "/stories" },
  { label: "Blogs", href: "/blogs" },
  { label: "Premium", href: "/subscribe" },
];

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-paper/95 backdrop-blur-sm border-b border-line/40 shadow-sm">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Logo and Nav Links */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-3" aria-label="Talez home">
            <Image
              src="/brand/talez-logo-256.png"
              alt="Talez logo"
              width={36}
              height={36}
              priority
              className="rounded-lg object-cover"
            />
            <div className="leading-none hidden sm:block">
              <span className="block font-serif text-2xl font-semibold text-ink tracking-tight">Talez</span>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
            {nav.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "inline-flex h-10 items-center px-3 text-[15px] font-medium transition-colors rounded-full",
                    active ? "bg-surface text-ink font-semibold" : "text-muted hover:text-ink hover:bg-surface/50"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Search Bar */}
        <div className="hidden flex-1 max-w-md px-8 md:block">
          <form onSubmit={handleSearch} className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-[18px] w-[18px] text-muted group-focus-within:text-gold transition-colors" />
            </div>
            <input
              type="text"
              placeholder="Search stories, authors, or genres..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full rounded-full border border-line/60 bg-surface/50 py-2 pl-10 pr-4 text-[15px] text-ink placeholder:text-muted focus:border-gold focus:bg-paper focus:outline-none focus:ring-1 focus:ring-gold transition-all"
            />
          </form>
        </div>

        {/* Right Actions */}
        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/admin/posts/new"
            className="hidden lg:inline-flex h-9 items-center gap-1.5 rounded-full bg-gold/10 px-4 text-[14px] font-medium text-gold transition hover:bg-gold hover:text-ink"
          >
            <PenSquare className="h-[15px] w-[15px]" aria-hidden="true" />
            Write
          </Link>
          
          <div className="flex items-center gap-1 border-l border-line/40 pl-3 ml-1">
            <ThemeToggle />
            <Link
              href="/sign-in"
              className="grid h-10 w-10 place-items-center rounded-full text-muted transition-all hover:bg-gold/10 hover:text-gold"
              title="Sign in"
              aria-label="Sign in"
            >
              <User className="h-[20px] w-[20px]" aria-hidden="true" />
            </Link>
          </div>
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <Link href="/search" className="grid h-10 w-10 place-items-center rounded-full text-ink hover:bg-surface">
             <Search className="h-[18px] w-[18px]" />
          </Link>
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-full text-ink hover:bg-surface"
            onClick={() => setOpen((value) => !value)}
            aria-label="Open navigation"
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {open ? (
        <div className="border-t border-line/40 bg-paper px-4 py-4 md:hidden shadow-sm">
          <nav className="mx-auto grid gap-2" aria-label="Mobile primary">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-4 py-3 text-[15px] font-medium text-muted transition hover:bg-surface hover:text-ink"
              >
                {item.label}
              </Link>
            ))}
            <Link
                href="/admin/posts/new"
                onClick={() => setOpen(false)}
                className="rounded-lg px-4 py-3 text-[15px] font-medium text-gold transition hover:bg-gold/10"
              >
                Write a Story
            </Link>
            <div className="px-4 pt-4 border-t border-line/40 mt-2">
              <Link href="/sign-in" onClick={() => setOpen(false)} className="flex w-full items-center justify-center rounded-full bg-ink px-5 py-2.5 text-[15px] font-medium text-paper hover:opacity-90">
                Sign in / Register
              </Link>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
