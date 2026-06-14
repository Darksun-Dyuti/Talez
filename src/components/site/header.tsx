"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, Search, User, X } from "lucide-react";
import { useState, useEffect } from "react";
import { ThemeToggle } from "@/components/site/theme-toggle";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header 
      className={cn(
        "sticky top-0 z-50 transition-all duration-500 ease-out border-b",
        scrolled 
          ? "bg-paper/80 backdrop-blur-xl border-line/30 shadow-[0_4px_30px_rgb(0,0,0,0.02)] py-2" 
          : "bg-transparent border-transparent py-4"
      )}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 lg:px-12">
        
        {/* Logo */}
        <div className="flex items-center gap-8">
          <Link href="/" className="group flex items-center gap-4" aria-label="Talez home">
            <div className="relative overflow-hidden rounded-lg">
              <Image
                src="/brand/logo.png"
                alt="Talez logo"
                width={38}
                height={38}
                priority
                className="object-cover transition-transform duration-700 group-hover:scale-110 bg-ink"
              />
            </div>
            <div className="leading-none hidden sm:block overflow-hidden">
              <motion.span 
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="block font-serif text-[28px] font-semibold text-ink tracking-tight"
              >
                TaleZ.
              </motion.span>
            </div>
          </Link>
        </div>

        {/* Center Nav */}
        <nav className="hidden absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center gap-8 lg:flex" aria-label="Primary">
          {nav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative text-[13px] uppercase tracking-[0.1em] font-medium transition-colors duration-300",
                  active ? "text-ink" : "text-muted hover:text-ink"
                )}
              >
                {item.label}
                {active && (
                  <motion.div
                    layoutId="header-active-indicator"
                    className="absolute -bottom-2 left-1/2 h-[2px] w-4 -translate-x-1/2 bg-brand"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="hidden items-center gap-5 md:flex">
          <form onSubmit={handleSearch} className="relative group overflow-hidden rounded-full border border-line/40 bg-surface/30 backdrop-blur-md transition-all hover:border-line focus-within:border-brand focus-within:bg-paper">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-muted group-focus-within:text-brand transition-colors" />
            </div>
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-32 bg-transparent py-2 pl-9 pr-4 text-sm text-ink placeholder:text-muted transition-all focus:w-48 focus:outline-none"
            />
          </form>
          
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link
              href="/sign-in"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-line/40 bg-paper text-ink shadow-sm transition-all hover:border-brand hover:text-brand hover:shadow-glow"
              title="Sign in"
              aria-label="Sign in"
            >
              <User className="h-[18px] w-[18px]" aria-hidden="true" />
            </Link>
          </div>
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center gap-3 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-line/40 bg-paper text-ink shadow-sm"
            onClick={() => setOpen((value) => !value)}
            aria-label="Open navigation"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {open && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute inset-x-0 top-full border-b border-line/40 bg-paper/95 backdrop-blur-xl px-6 py-6 shadow-glow-lg md:hidden"
        >
          <nav className="grid gap-4 text-center">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="text-2xl font-serif text-muted transition hover:text-ink"
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-4 flex justify-center">
              <Link href="/sign-in" onClick={() => setOpen(false)} className="rounded-full bg-ink px-8 py-3 text-sm font-medium tracking-wide text-paper hover:bg-brand">
                Sign in
              </Link>
            </div>
          </nav>
        </motion.div>
      )}
    </header>
  );
}
