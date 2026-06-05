import type { MetadataRoute } from "next";
import { getPublishedPosts, getSeriesSummaries } from "@/lib/posts";
import { absoluteUrl } from "@/lib/utils";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPublishedPosts();
  const series = await getSeriesSummaries();
  const staticRoutes = ["", "/stories", "/blogs", "/about", "/subscribe", "/search", "/donate", "/supporters", "/series"];

  return [
    ...staticRoutes.map((route) => ({
      url: absoluteUrl(route || "/"),
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: route === "" ? 1 : 0.7
    })),
    ...posts.map((post) => ({
      url: absoluteUrl(`/posts/${post.slug}`),
      lastModified: new Date(post.publishDate),
      changeFrequency: "weekly" as const,
      priority: post.featured ? 0.9 : 0.75
    })),
    ...series.map((item) => ({
      url: absoluteUrl(`/series/${item.slug}`),
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.72
    }))
  ];
}
