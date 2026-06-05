import type { Metadata, Viewport } from "next";
import { BackToTop } from "@/components/site/back-to-top";
import { Footer } from "@/components/site/footer";
import { Header } from "@/components/site/header";
import { PwaRegister } from "@/components/site/pwa-register";
import { ThemeProvider } from "@/components/site/theme-provider";
import { baseMetadata } from "@/lib/seo";
import "./globals.css";

export const metadata: Metadata = baseMetadata();

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8f5ee" },
    { media: "(prefers-color-scheme: dark)", color: "#151412" }
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
    <html lang="en" suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <ThemeProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <BackToTop />
          <PwaRegister />
        </ThemeProvider>
      </body>
    </html>
  );
}
