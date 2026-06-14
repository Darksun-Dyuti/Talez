import Image from "next/image";
import Link from "next/link";
import { BarChart3, FilePenLine, LayoutDashboard, Mail, MessageSquare, Users, WalletCards } from "lucide-react";
import { requireAdmin } from "@/lib/auth-utils";

const adminNav = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Posts", href: "/admin/posts", icon: FilePenLine },
  { label: "Subscribers", href: "/admin/subscribers", icon: Users },
  { label: "Comments", href: "/admin/comments", icon: MessageSquare },
  { label: "Newsletters", href: "/admin/newsletters", icon: Mail },
  { label: "Plans", href: "/admin/memberships", icon: WalletCards },
  { label: "Analytics", href: "/admin/analytics", icon: BarChart3 }
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await requireAdmin();

  return (
    <section className="border-t border-line bg-surface min-h-[calc(100vh-80px)]">
      <div className="mx-auto grid max-w-[1400px] gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[250px_1fr] lg:px-8">
        <aside className="h-fit rounded-xl border border-line bg-paper p-4 shadow-sm lg:sticky lg:top-24">
          <div className="flex items-center gap-3 border-b border-line pb-4 mb-4">
            <Image src="/brand/logo.png" alt="Talez" width={42} height={42} className="rounded-lg bg-ink" />
            <div>
              <p className="font-serif text-lg font-semibold text-ink">Admin Studio</p>
              <p className="text-xs text-muted font-mono">{session.user.email}</p>
            </div>
          </div>
          <nav className="grid gap-1">
            {adminNav.map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.href} href={item.href} className="inline-flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted transition hover:bg-surface hover:text-ink">
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </aside>
        <div className="min-w-0">
          <div className="rounded-xl border border-line bg-paper shadow-sm min-h-[600px]">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
