import bcrypt from "bcryptjs";
import { NextResponse, type NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { assertSameOrigin, clientFingerprint, rateLimit } from "@/lib/security";
import { registerSchema } from "@/lib/validation";

export async function POST(request: NextRequest) {
  if (!assertSameOrigin(request)) {
    return NextResponse.json({ message: "Invalid origin." }, { status: 403 });
  }

  const limited = rateLimit(`register:${clientFingerprint(request)}`, 4, 60_000);
  if (!limited.ok) {
    return NextResponse.json({ message: "Too many attempts." }, { status: 429 });
  }

  const parsed = registerSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ message: "Invalid registration details." }, { status: 400 });
  }

  if (!process.env.DATABASE_URL) {
    return NextResponse.json({ message: "Demo account created. Configure DATABASE_URL to persist users." });
  }

  const { email, password, name, username } = parsed.data;
  const exists = await prisma.user.findFirst({
    where: {
      OR: [{ email: email.toLowerCase() }, { username }]
    }
  });
  if (exists) {
    return NextResponse.json({ message: "Email or username already exists." }, { status: 409 });
  }

  const passwordHash = await bcrypt.hash(password, 12);
  await prisma.user.create({
    data: {
      email: email.toLowerCase(),
      name,
      username,
      passwordHash
    }
  });

  return NextResponse.json({ message: "Account created. Please verify your email." }, { status: 201 });
}
