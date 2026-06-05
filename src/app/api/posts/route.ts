import { NextResponse, type NextRequest } from "next/server";
import { getAdminAccess } from "@/lib/access";
import { preparePostContent } from "@/lib/posts";
import { prisma } from "@/lib/prisma";
import { postInputSchema } from "@/lib/validation";

export async function GET() {
  const posts = process.env.DATABASE_URL
    ? await prisma.post.findMany({ orderBy: { createdAt: "desc" }, take: 50 })
    : [];
  return NextResponse.json({ posts });
}

export async function POST(request: NextRequest) {
  const access = await getAdminAccess();
  if (!access.allowed) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  const parsed = postInputSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ message: "Invalid post input.", issues: parsed.error.flatten() }, { status: 400 });
  }

  const prepared = preparePostContent(parsed.data.content);

  if (!process.env.DATABASE_URL) {
    return NextResponse.json({
      message: "Post saved in demo mode. Configure DATABASE_URL to persist content.",
      post: { ...parsed.data, ...prepared }
    });
  }

  const category = await prisma.category.upsert({
    where: { slug: parsed.data.category.toLowerCase().replace(/[^a-z0-9]+/g, "-") },
    update: { name: parsed.data.category, type: parsed.data.type },
    create: {
      name: parsed.data.category,
      slug: parsed.data.category.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      type: parsed.data.type
    }
  });

  const postData = {
    title: parsed.data.title,
    slug: parsed.data.slug,
    type: parsed.data.type,
    status: parsed.data.status,
    accessLevel: parsed.data.accessLevel,
    coverImage: parsed.data.coverImage || null,
    excerpt: parsed.data.excerpt,
    writerNote: parsed.data.writerNote || null,
    categoryId: category.id,
    publishDate: parsed.data.publishDate ? new Date(parsed.data.publishDate) : undefined,
    scheduledFor: parsed.data.scheduledFor ? new Date(parsed.data.scheduledFor) : null,
    featured: parsed.data.featured,
    content: prepared.content,
    readingTime: prepared.readingTime,
    wordCount: prepared.wordCount
  };

  const tagWrites = parsed.data.tags.map((tag) => ({
    where: { slug: tag.toLowerCase().replace(/[^a-z0-9]+/g, "-") },
    create: { name: tag, slug: tag.toLowerCase().replace(/[^a-z0-9]+/g, "-") }
  }));

  const post = await prisma.post.upsert({
    where: { slug: parsed.data.slug },
    update: {
      ...postData,
      tags: {
        set: [],
        connectOrCreate: tagWrites
      }
    },
    create: {
      ...postData,
      tags: {
        connectOrCreate: tagWrites
      }
    }
  });

  return NextResponse.json({ message: "Post saved.", post });
}
