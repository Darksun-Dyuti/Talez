"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Search, User, X } from "lucide-react";
import { useState } from "react";
import { ThemeToggle } from "@/components/site/theme-toggle";
import { cn } from "@/lib/utils";

const nav = [
  { label: "Home", href: "/" },
  { label: "Stories", href: "/stories" },
  { label: "Blogs", href: "/blogs" },
  { label: "About", href: "/about" },
  { label: "Subscribe", href: "/subscribe" },
  { label: "Search", href: "/search", icon: Search }
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-paper/95 backdrop-blur-sm border-b border-line/40">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3" aria-label="Talez home">
          <Image
            src="/brand/talez-logo-256.png"
            alt="Talez logo"
            width={36}
            height={36}
            priority
            className="rounded-lg object-cover"
          />
          <div className="leading-none">
            <span className="block font-serif text-2xl font-semibold text-ink tracking-tight">Talez</span>
          </div>
        </Link>

        <nav className="hidden items-center gap-4 lg:flex" aria-label="Primary">
          {nav.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "inline-flex h-10 items-center gap-1.5 px-2 text-sm font-medium text-muted transition-colors hover:text-gold",
                  active && "text-ink font-semibold"
                )}
              >
                {Icon ? <Icon className="h-[15px] w-[15px]" aria-hidden="true" /> : null}
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <ThemeToggle />
          <Link
            href="/sign-in"
            className="grid h-10 w-10 place-items-center rounded-full text-muted transition-all hover:bg-gold/10 hover:text-gold"
            title="Sign in"
            aria-label="Sign in"
          >
            <User className="h-[18px] w-[18px]" aria-hidden="true" />
          </Link>
        </div>

        <button
          type="button"
          className="grid h-10 w-10 place-items-center rounded-full text-ink lg:hidden hover:bg-surface"
          onClick={() => setOpen((value) => !value)}
          aria-label="Open navigation"
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-line/40 bg-paper px-4 py-4 lg:hidden shadow-sm">
          <nav className="mx-auto grid max-w-5xl gap-2" aria-label="Mobile primary">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-4 py-3 text-sm font-medium text-muted transition hover:bg-surface hover:text-ink"
              >
                {item.label}
              </Link>
            ))}
            <div className="flex items-center justify-between px-4 pt-4 border-t border-line/40 mt-2">
              <ThemeToggle />
              <Link href="/sign-in" onClick={() => setOpen(false)} className="rounded-full bg-ink px-5 py-2 text-sm font-medium text-paper">
                Sign in
              </Link>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
