import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display, JetBrains_Mono } from "next/font/google";
import { BackToTop } from "@/components/site/back-to-top";
import { Footer } from "@/components/site/footer";
import { Header } from "@/components/site/header";
import { PwaRegister } from "@/components/site/pwa-register";
import { ThemeProvider } from "@/components/site/theme-provider";
import { AmbientLight } from "@/components/ui/ambient-light";
import { VerticalTimeStrip } from "@/components/ui/vertical-time-strip";
import { baseMetadata } from "@/lib/seo";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = baseMetadata();

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" }
  ]
};

const themeScript = `
(() => {
  try {
    const stored = localStorage.getItem("talez-theme") || "system";
    const dark = stored === "dark" || (stored === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);
    document.documentElement.classList.toggle("dark", dark);
    document.documentElement.style.colorScheme = dark ? "dark" : "light";
  } catch {}
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${playfair.variable} ${jetbrainsMono.variable}`}>
      <body className="antialiased selection:bg-brand/20 dark:selection:bg-brand/30">
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <ThemeProvider>
          <AmbientLight />
          <VerticalTimeStrip />
          <div className="relative z-10 flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <BackToTop />
          <PwaRegister />
        </ThemeProvider>
      </body>
    </html>
  );
}
