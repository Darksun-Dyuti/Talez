import sanitizeHtml from "sanitize-html";
import { NextResponse, type NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { assertSameOrigin, clientFingerprint, isSpamTrapFilled, rateLimit } from "@/lib/security";
import { commentSchema } from "@/lib/validation";

export async function POST(request: NextRequest) {
  if (!assertSameOrigin(request)) {
    return NextResponse.json({ message: "Invalid origin." }, { status: 403 });
  }

  const fingerprint = clientFingerprint(request);
  const limited = rateLimit(`comment:${fingerprint}`, 5, 60_000);
  if (!limited.ok) {
    return NextResponse.json({ message: "Please wait before commenting again." }, { status: 429 });
  }

  const parsed = commentSchema.safeParse(await request.json());
  if (!parsed.success || isSpamTrapFilled(parsed.data.website)) {
    return NextResponse.json({ message: "Invalid comment." }, { status: 400 });
  }

  const content = sanitizeHtml(parsed.data.content, { allowedTags: [], allowedAttributes: {} });

  if (process.env.DATABASE_URL) {
    await prisma.comment.create({
      data: {
        postId: parsed.data.postId,
        parentId: parsed.data.parentId,
        authorName: parsed.data.authorName,
        authorEmail: parsed.data.authorEmail,
        content,
        ipHash: fingerprint,
        status: "PENDING"
      }
    });
  }

  return NextResponse.json({ message: "Comment submitted for moderation." }, { status: 201 });
}

export async function GET(request: NextRequest) {
  const postId = request.nextUrl.searchParams.get("postId");
  if (!postId || !process.env.DATABASE_URL) {
    return NextResponse.json({ comments: [] });
  }

  const comments = await prisma.comment.findMany({
    where: { postId, status: "APPROVED", parentId: null },
    include: { replies: { where: { status: "APPROVED" } } },
    orderBy: { createdAt: "desc" }
  });

  return NextResponse.json({ comments });
}
