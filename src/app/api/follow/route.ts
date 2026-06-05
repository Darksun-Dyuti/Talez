import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function POST() {
  if (!process.env.DATABASE_URL) {
    return NextResponse.json({ message: "Author followed in demo mode.", followers: 684 });
  }

  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ message: "Sign in to follow the author." }, { status: 401 });
  }

  await prisma.authorFollower.upsert({
    where: { userId: session.user.id },
    update: {},
    create: { userId: session.user.id }
  });

  const followers = await prisma.authorFollower.count();
  return NextResponse.json({ message: "You will receive new content alerts.", followers });
}
