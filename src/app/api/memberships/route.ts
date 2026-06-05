import { NextResponse, type NextRequest } from "next/server";
import { getAdminAccess } from "@/lib/access";
import { membershipPlans } from "@/lib/data";
import { prisma } from "@/lib/prisma";

export async function GET() {
  if (!process.env.DATABASE_URL) {
    return NextResponse.json({ plans: membershipPlans });
  }

  const plans = await prisma.membershipPlan.findMany({ where: { active: true }, orderBy: { priceCents: "asc" } });
  return NextResponse.json({ plans });
}

export async function POST(request: NextRequest) {
  const access = await getAdminAccess();
  if (!access.allowed) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  const body = await request.json();
  if (!process.env.DATABASE_URL) {
    return NextResponse.json({ message: "Plan saved in demo mode.", plan: body });
  }

  const plan = await prisma.membershipPlan.upsert({
    where: { slug: body.slug },
    update: body,
    create: body
  });

  return NextResponse.json({ message: "Plan saved.", plan });
}
