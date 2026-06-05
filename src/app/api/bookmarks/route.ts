import { NextResponse, type NextRequest } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  const { postId } = await request.json();
  if (!postId) {
    return NextResponse.json({ message: "Missing post." }, { status: 400 });
  }

  if (!process.env.DATABASE_URL) {
    return NextResponse.json({ saved: true, message: "Bookmark saved in demo mode." });
  }

  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ message: "Sign in to bookmark posts." }, { status: 401 });
  }

  const existing = await prisma.bookmark.findUnique({
    where: { userId_postId: { userId: session.user.id, postId } }
  });

  if (existing) {
    await prisma.bookmark.delete({ where: { id: existing.id } });
    return NextResponse.json({ saved: false });
  }

  await prisma.bookmark.create({ data: { userId: session.user.id, postId } });
  return NextResponse.json({ saved: true });
}
