import sanitizeHtml from "sanitize-html";
import { demoPosts, demoSeries } from "@/lib/data";
import { prisma } from "@/lib/prisma";
import { estimateReadingTime, withHeadingIds, wordCount } from "@/lib/reading";
import type { ContentType, SeriesSummary, TalezPost } from "@/types/content";

const allowedHtml = {
  allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img", "h2", "h3", "pre", "code"]),
  allowedAttributes: {
    ...sanitizeHtml.defaults.allowedAttributes,
    a: ["href", "name", "target", "rel"],
    img: ["src", "alt", "width", "height", "loading"],
    h2: ["id"],
    h3: ["id"],
    code: ["class"]
  }
};

export function sanitizeContent(content: string) {
  return withHeadingIds(sanitizeHtml(content, allowedHtml));
}

export function preparePostContent(content: string) {
  const clean = sanitizeContent(content);
  return {
    content: clean,
    readingTime: estimateReadingTime(clean),
    wordCount: wordCount(clean)
  };
}

function shouldUseDatabase() {
  return Boolean(process.env.DATABASE_URL);
}

function mapDemoPost(post: TalezPost): TalezPost {
  return {
    ...post,
    content: sanitizeContent(post.content)
  };
}

type DbPost = {
  id: string;
  title: string;
  slug: string;
  type: ContentType;
  status: TalezPost["status"];
  accessLevel: TalezPost["accessLevel"];
  coverImage: string | null;
  excerpt: string;
  content: string;
  writerNote: string | null;
  metaTitle: string | null;
  metaDescription: string | null;
  canonicalUrl: string | null;
  ogImage: string | null;
  readingTime: number;
  wordCount: number;
  publishDate: Date | null;
  createdAt: Date;
  featured: boolean;
  appreciationCount: number;
  viewCount: number;
  tags?: Array<{ name: string }>;
  category?: { name: string } | null;
  author?: { name: string | null; image: string | null; bio: string | null } | null;
  seriesLinks?: Array<{ order: number; series: { title: string; slug: string } }>;
};

function mapPost(post: DbPost): TalezPost {
  return {
    id: post.id,
    title: post.title,
    slug: post.slug,
    type: post.type,
    status: post.status,
    accessLevel: post.accessLevel,
    coverImage: post.coverImage ?? undefined,
    excerpt: post.excerpt,
    content: sanitizeContent(post.content),
    writerNote: post.writerNote ?? undefined,
    tags: post.tags?.map((tag: { name: string }) => tag.name) ?? [],
    category: post.category?.name ?? "Uncategorized",
    publishDate: (post.publishDate ?? post.createdAt).toISOString(),
    readingTime: post.readingTime,
    wordCount: post.wordCount,
    featured: post.featured,
    appreciationCount: post.appreciationCount,
    viewCount: post.viewCount,
    author: {
      name: post.author?.name ?? "Talez",
      image: post.author?.image ?? "/images/author-portrait.png",
      bio: post.author?.bio ?? undefined
    },
    seo: {
      title: post.metaTitle ?? `${post.title} | Talez`,
      description: post.metaDescription ?? post.excerpt,
      canonicalUrl: post.canonicalUrl ?? undefined,
      ogImage: post.ogImage ?? post.coverImage ?? "/og-image.png"
    },
    series: post.seriesLinks?.[0]
      ? {
          title: post.seriesLinks[0].series.title,
          slug: post.seriesLinks[0].series.slug,
          order: post.seriesLinks[0].order
        }
      : undefined
  };
}

const includePostRelations = {
  tags: true,
  category: true,
  author: true,
  seriesLinks: {
    include: {
      series: true
    }
  }
};

export async function getPublishedPosts(type?: ContentType): Promise<TalezPost[]> {
  if (!shouldUseDatabase()) {
    return demoPosts
      .filter((post) => post.status === "PUBLISHED" && (!type || post.type === type))
      .map(mapDemoPost)
      .sort((a, b) => +new Date(b.publishDate) - +new Date(a.publishDate));
  }

  try {
    const posts = await prisma.post.findMany({
      where: {
        status: "PUBLISHED",
        ...(type ? { type } : {}),
        OR: [{ publishDate: null }, { publishDate: { lte: new Date() } }]
      },
      include: includePostRelations,
      orderBy: [{ featured: "desc" }, { publishDate: "desc" }]
    });
    return posts.map(mapPost);
  } catch (error) {
    console.error("Falling back to demo posts:", error);
    return demoPosts
      .filter((post) => post.status === "PUBLISHED" && (!type || post.type === type))
      .map(mapDemoPost)
      .sort((a, b) => +new Date(b.publishDate) - +new Date(a.publishDate));
  }
}

export async function getPostBySlug(slug: string): Promise<TalezPost | null> {
  if (!shouldUseDatabase()) {
    const post = demoPosts.find((item) => item.slug === slug);
    return post ? mapDemoPost(post) : null;
  }

  try {
    const post = await prisma.post.findUnique({
      where: { slug },
      include: includePostRelations
    });
    return post ? mapPost(post) : null;
  } catch (error) {
    console.error("Falling back to demo post:", error);
    const post = demoPosts.find((item) => item.slug === slug);
    return post ? mapDemoPost(post) : null;
  }
}

export async function getFeaturedPost(type: ContentType): Promise<TalezPost | null> {
  const posts = await getPublishedPosts(type);
  return posts.find((post) => post.featured) ?? posts[0] ?? null;
}

export async function getPopularPosts(limit = 4): Promise<TalezPost[]> {
  const posts = await getPublishedPosts();
  return posts.sort((a, b) => b.viewCount + b.appreciationCount - (a.viewCount + a.appreciationCount)).slice(0, limit);
}

export async function getRecentPosts(limit = 4): Promise<TalezPost[]> {
  const posts = await getPublishedPosts();
  return posts.sort((a, b) => +new Date(b.publishDate) - +new Date(a.publishDate)).slice(0, limit);
}

export async function getRelatedPosts(post: TalezPost, limit = 3): Promise<TalezPost[]> {
  const posts = await getPublishedPosts();
  return posts
    .filter((candidate) => candidate.slug !== post.slug)
    .map((candidate) => ({
      post: candidate,
      score:
        candidate.tags.filter((tag) => post.tags.includes(tag)).length * 3 +
        (candidate.type === post.type ? 1 : 0) +
        (candidate.category === post.category ? 1 : 0)
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.post);
}

export async function searchPosts(query = "", type?: ContentType, tag?: string): Promise<TalezPost[]> {
  const normalized = query.trim().toLowerCase();
  const posts = await getPublishedPosts(type);
  return posts.filter((post) => {
    const matchesQuery =
      !normalized ||
      `${post.title} ${post.excerpt} ${post.content} ${post.tags.join(" ")}`
        .toLowerCase()
        .includes(normalized);
    const matchesTag = !tag || post.tags.map((value) => value.toLowerCase()).includes(tag.toLowerCase());
    return matchesQuery && matchesTag;
  });
}

export async function getAllTags(): Promise<string[]> {
  const posts = await getPublishedPosts();
  return Array.from(new Set(posts.flatMap((post) => post.tags))).sort((a, b) => a.localeCompare(b));
}

export async function getSeriesSummaries(): Promise<SeriesSummary[]> {
  if (!shouldUseDatabase()) {
    return demoSeries.map((series) => ({
      ...series,
      posts: series.posts.map(mapDemoPost)
    }));
  }

  try {
    const series = await prisma.series.findMany({
      include: {
        posts: {
          include: {
            post: {
              include: includePostRelations
            }
          },
          orderBy: { order: "asc" }
        },
        followers: true
      },
      orderBy: { updatedAt: "desc" }
    });
    return series.map((item) => ({
      title: item.title,
      slug: item.slug,
      description: item.description ?? "",
      coverImage: item.coverImage ?? "/images/series-cover.png",
      followerCount: item.followers.length,
      posts: item.posts.map((link) => mapPost({ ...link.post, seriesLinks: [{ ...link, series: item }] }))
    }));
  } catch (error) {
    console.error("Falling back to demo series:", error);
    return demoSeries;
  }
}

export async function getSeriesBySlug(slug: string): Promise<SeriesSummary | null> {
  const series = await getSeriesSummaries();
  return series.find((item) => item.slug === slug) ?? null;
}
