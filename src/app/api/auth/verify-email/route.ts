import { NextResponse, type NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  const { token } = await request.json();
  if (!token || !process.env.DATABASE_URL) {
    return NextResponse.json({ message: "Verification accepted in demo mode." });
  }

  const record = await prisma.emailVerificationToken.findUnique({ where: { token } });
  if (!record || record.usedAt || record.expiresAt < new Date()) {
    return NextResponse.json({ message: "Invalid or expired token." }, { status: 400 });
  }

  await prisma.$transaction([
    prisma.emailVerificationToken.update({ where: { id: record.id }, data: { usedAt: new Date() } }),
    prisma.user.update({ where: { id: record.userId }, data: { emailVerified: new Date() } })
  ]);

  return NextResponse.json({ message: "Email verified." });
}
