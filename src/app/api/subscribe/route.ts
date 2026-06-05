import crypto from "crypto";
import { NextResponse, type NextRequest } from "next/server";
import { sendSubscriberConfirmation } from "@/lib/email";
import { prisma } from "@/lib/prisma";
import { assertSameOrigin, clientFingerprint, isSpamTrapFilled, rateLimit } from "@/lib/security";
import { subscribeSchema } from "@/lib/validation";

export async function POST(request: NextRequest) {
  if (!assertSameOrigin(request)) {
    return NextResponse.json({ message: "Invalid origin." }, { status: 403 });
  }

  const limited = rateLimit(`subscribe:${clientFingerprint(request)}`, 6, 60_000);
  if (!limited.ok) {
    return NextResponse.json({ message: "Too many subscription attempts." }, { status: 429 });
  }

  const parsed = subscribeSchema.safeParse(await request.json());
  if (!parsed.success || isSpamTrapFilled(parsed.data.website)) {
    return NextResponse.json({ message: "Invalid subscription." }, { status: 400 });
  }

  const verificationToken = crypto.randomBytes(24).toString("hex");
  const unsubscribeToken = crypto.randomBytes(24).toString("hex");

  if (process.env.DATABASE_URL) {
    await prisma.subscriber.upsert({
      where: { email: parsed.data.email.toLowerCase() },
      update: {
        name: parsed.data.name,
        unsubscribedAt: null,
        verificationToken
      },
      create: {
        email: parsed.data.email.toLowerCase(),
        name: parsed.data.name,
        source: parsed.data.source,
        verificationToken,
        unsubscribeToken
      }
    });
  }

  await sendSubscriberConfirmation(parsed.data.email, verificationToken);
  return NextResponse.json({ message: "Check your inbox to confirm your subscription." });
}

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("confirm");
  if (!token || !process.env.DATABASE_URL) {
    return NextResponse.json({ message: "Subscription endpoint ready." });
  }

  const subscriber = await prisma.subscriber.findUnique({ where: { verificationToken: token } });
  if (!subscriber) {
    return NextResponse.json({ message: "Invalid confirmation token." }, { status: 400 });
  }

  await prisma.subscriber.update({
    where: { id: subscriber.id },
    data: {
      verifiedAt: new Date(),
      verificationToken: null
    }
  });

  return NextResponse.json({ message: "Subscription confirmed." });
}
