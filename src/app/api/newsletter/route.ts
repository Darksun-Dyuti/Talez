import { NextResponse, type NextRequest } from "next/server";
import { getAdminAccess } from "@/lib/access";
import { sendEmail } from "@/lib/email";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  const access = await getAdminAccess();
  if (!access.allowed) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  const body = await request.json();
  const subject = String(body.subject ?? "Talez Newsletter");
  const html = String(body.html ?? body.body ?? "<p>New from Talez.</p>");
  const scheduledFor = body.scheduledFor ? new Date(body.scheduledFor) : null;

  if (!process.env.DATABASE_URL) {
    return NextResponse.json({ message: scheduledFor ? "Newsletter scheduled in demo mode." : "Newsletter sent in demo mode." });
  }

  const newsletter = await prisma.newsletter.create({
    data: {
      subject,
      title: String(body.title ?? subject),
      body: html,
      template: String(body.template ?? "Special Announcement"),
      audience: body.audience ?? "ALL",
      status: scheduledFor ? "SCHEDULED" : "SENT",
      scheduledFor,
      sentAt: scheduledFor ? null : new Date()
    }
  });

  if (!scheduledFor) {
    const subscribers = await prisma.subscriber.findMany({
      where: { verifiedAt: { not: null }, unsubscribedAt: null }
    });
    await Promise.all(
      subscribers.map((subscriber: { email: string }) =>
        sendEmail({
          to: subscriber.email,
          subject,
          html
        })
      )
    );
  }

  return NextResponse.json({ message: "Newsletter saved.", newsletter });
}
