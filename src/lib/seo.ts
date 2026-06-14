import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/utils";
import type { TalezPost } from "@/types/content";

const siteName = "Talez";
const defaultDescription = "Talez is a warm, modern storytelling and blogging platform for tales, thoughts, memberships, newsletters, and reader community.";

export function baseMetadata(overrides: Metadata = {}): Metadata {
  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"),
    title: {
      default: "Talez - Tales, Thoughts, and Beyond",
      template: "%s | Talez"
    },
    description: defaultDescription,
    applicationName: siteName,
    authors: [{ name: "Talez" }],
    keywords: ["stories", "blogs", "newsletter", "memberships", "fiction", "writing"],
    openGraph: {
      type: "website",
      siteName,
      title: "Talez - Tales, Thoughts, and Beyond",
      description: defaultDescription,
      images: [absoluteUrl("/og-image.png")]
    },
    twitter: {
      card: "summary_large_image",
      title: "Talez - Tales, Thoughts, and Beyond",
      description: defaultDescription,
      images: [absoluteUrl("/twitter-image.png")]
    },
    alternates: {
      canonical: absoluteUrl("/")
    },
    icons: {
      icon: [
        { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
        { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" }
      ],
      apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }]
    },
    ...overrides
  };
}

export function postMetadata(post: TalezPost): Metadata {
  const title = (post.seo?.title ?? post.title).replace(/\s+\|\s+Talez$/, "");
  const description = post.seo?.description ?? post.excerpt;
  const image = absoluteUrl(post.seo?.ogImage ?? post.coverImage ?? "/og-image.png");
  const url = absoluteUrl(`/posts/${post.slug}`);

  return {
    title,
    description,
    alternates: {
      canonical: post.seo?.canonicalUrl ?? url
    },
    openGraph: {
      type: "article",
      title,
      description,
      url,
      images: [image],
      publishedTime: post.publishDate,
      authors: [post.author.name],
      tags: post.tags
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image]
    }
  };
}

export function postJsonLd(post: TalezPost) {
  return {
    "@context": "https://schema.org",
    "@type": post.type === "BLOG" ? "BlogPosting" : "CreativeWork",
    headline: post.title,
    description: post.excerpt,
    image: absoluteUrl(post.coverImage ?? "/og-image.png"),
    datePublished: post.publishDate,
    author: {
      "@type": "Person",
      name: post.author.name
    },
    publisher: {
      "@type": "Organization",
      name: "Talez",
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/brand/logo.png")
      }
    },
    mainEntityOfPage: absoluteUrl(`/posts/${post.slug}`)
  };
}
