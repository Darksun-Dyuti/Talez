import { NextResponse, type NextRequest } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  const { postId, progress = 0, completed = false } = await request.json();
  if (!postId) {
    return NextResponse.json({ message: "Missing post." }, { status: 400 });
  }

  if (!process.env.DATABASE_URL) {
    return NextResponse.json({ message: "Reading history updated in demo mode." });
  }

  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ message: "Anonymous history skipped." });
  }

  await prisma.readingHistory.upsert({
    where: { userId_postId: { userId: session.user.id, postId } },
    update: {
      progress,
      completedAt: completed ? new Date() : undefined,
      lastReadAt: new Date()
    },
    create: {
      userId: session.user.id,
      postId,
      progress,
      completedAt: completed ? new Date() : undefined
    }
  });

  return NextResponse.json({ message: "Reading history updated." });
}
