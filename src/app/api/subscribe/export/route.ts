import { NextResponse } from "next/server";
import { getAdminAccess } from "@/lib/access";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const access = await getAdminAccess();
  if (!access.allowed) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  const rows = process.env.DATABASE_URL
    ? await prisma.subscriber.findMany({ orderBy: { createdAt: "desc" } })
    : [
        { email: "reader@talez.example", name: "Reader One", verifiedAt: new Date(), unsubscribedAt: null, createdAt: new Date() },
        { email: "patron@talez.example", name: "Patron Two", verifiedAt: new Date(), unsubscribedAt: null, createdAt: new Date() }
      ];

  const csv = [
    "email,name,verifiedAt,unsubscribedAt,createdAt",
    ...rows.map((row: { email: string; name?: string | null; verifiedAt?: Date | null; unsubscribedAt?: Date | null; createdAt: Date }) =>
      [row.email, row.name ?? "", row.verifiedAt?.toISOString() ?? "", row.unsubscribedAt?.toISOString() ?? "", row.createdAt.toISOString()]
        .map((value) => `"${String(value).replace(/"/g, '""')}"`)
        .join(",")
    )
  ].join("\n");

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": "attachment; filename=talez-subscribers.csv"
    }
  });
}
