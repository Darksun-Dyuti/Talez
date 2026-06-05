import { NextResponse, type NextRequest } from "next/server";
import { createRazorpayOrder, createStripeCheckout } from "@/lib/payments";
import { prisma } from "@/lib/prisma";
import { tipSchema } from "@/lib/validation";

export async function POST(request: NextRequest) {
  const parsed = tipSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ message: "Invalid tip." }, { status: 400 });
  }

  const data = parsed.data;
  let tipId = "demo-tip";
  if (process.env.DATABASE_URL) {
    const tip = await prisma.tip.create({
      data: {
        postId: data.postId,
        amountCents: data.amountCents,
        currency: data.currency,
        provider: data.provider,
        name: data.name,
        email: data.email,
        visibility: data.visibility
      }
    });
    tipId = tip.id;
  }

  if (data.provider === "RAZORPAY") {
    const order = await createRazorpayOrder({
      amountCents: data.amountCents,
      currency: data.currency,
      receipt: tipId,
      notes: { type: "tip", postId: data.postId }
    });
    return NextResponse.json(order);
  }

  const checkout = await createStripeCheckout({
    amountCents: data.amountCents,
    currency: data.currency,
    label: "Talez tip",
    successPath: `${data.returnPath ?? "/donate"}?thanks=tip`,
    cancelPath: `${data.returnPath ?? "/donate"}?canceled=tip`,
    metadata: { tipId, postId: data.postId }
  });
  return NextResponse.json(checkout);
}
