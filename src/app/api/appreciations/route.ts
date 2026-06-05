import { NextResponse, type NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { clientFingerprint, rateLimit } from "@/lib/security";

export async function POST(request: NextRequest) {
  const fingerprint = clientFingerprint(request);
  const limited = rateLimit(`appreciate:${fingerprint}`, 20, 60_000);
  if (!limited.ok) {
    return NextResponse.json({ message: "Too many appreciations." }, { status: 429 });
  }

  const { postId } = await request.json();
  if (!postId) {
    return NextResponse.json({ message: "Missing post." }, { status: 400 });
  }

  if (!process.env.DATABASE_URL) {
    return NextResponse.json({ count: 1, message: "Appreciated in demo mode." });
  }

  const post = await prisma.post.update({
    where: { id: postId },
    data: {
      appreciationCount: { increment: 1 },
      appreciations: {
        create: {
          visitorHash: fingerprint
        }
      }
    }
  });

  return NextResponse.json({ count: post.appreciationCount });
}
