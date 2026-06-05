import crypto from "crypto";
import { NextResponse, type NextRequest } from "next/server";
import { sendEmail } from "@/lib/email";
import { prisma } from "@/lib/prisma";
import { absoluteUrl } from "@/lib/utils";
import { emailSchema } from "@/lib/validation";

export async function POST(request: NextRequest) {
  const { email } = await request.json();
  const parsed = emailSchema.safeParse(email);
  if (!parsed.success) {
    return NextResponse.json({ message: "Invalid email." }, { status: 400 });
  }

  if (!process.env.DATABASE_URL) {
    return NextResponse.json({ message: "Password reset email queued in demo mode." });
  }

  const user = await prisma.user.findUnique({ where: { email: parsed.data.toLowerCase() } });
  if (user) {
    const token = crypto.randomBytes(32).toString("hex");
    await prisma.passwordResetToken.create({
      data: {
        token,
        userId: user.id,
        expiresAt: new Date(Date.now() + 1000 * 60 * 30)
      }
    });
    await sendEmail({
      to: parsed.data,
      subject: "Reset your Talez password",
      html: `<p>Reset your password:</p><p><a href="${absoluteUrl(`/sign-in?reset=${token}`)}">${absoluteUrl(`/sign-in?reset=${token}`)}</a></p>`
    });
  }

  return NextResponse.json({ message: "If the account exists, a reset email has been sent." });
}
