import { NextResponse, type NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  const expected = process.env.CRON_SECRET;
  const provided = request.headers.get("authorization")?.replace("Bearer ", "");
  if (expected && provided !== expected) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  if (!process.env.DATABASE_URL) {
    return NextResponse.json({ message: "Scheduled publishing checked in demo mode.", posts: 0, newsletters: 0 });
  }

  const now = new Date();
  const posts = await prisma.post.updateMany({
    where: {
      status: "SCHEDULED",
      scheduledFor: { lte: now }
    },
    data: {
      status: "PUBLISHED",
      publishDate: now
    }
  });

  const newsletters = await prisma.newsletter.updateMany({
    where: {
      status: "SCHEDULED",
      scheduledFor: { lte: now }
    },
    data: {
      status: "SENT",
      sentAt: now
    }
  });

  return NextResponse.json({ message: "Scheduled work processed.", posts: posts.count, newsletters: newsletters.count });
}
