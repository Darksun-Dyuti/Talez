import { NextResponse, type NextRequest } from "next/server";
import { createRazorpayOrder, createStripeCheckout } from "@/lib/payments";
import { prisma } from "@/lib/prisma";
import { donationSchema } from "@/lib/validation";

export async function POST(request: NextRequest) {
  const parsed = donationSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ message: "Invalid donation." }, { status: 400 });
  }

  const data = parsed.data;
  let donationId = "demo-donation";
  if (process.env.DATABASE_URL) {
    const donation = await prisma.donation.create({
      data: {
        amountCents: data.amountCents,
        currency: data.currency,
        provider: data.provider,
        name: data.name,
        email: data.email,
        message: data.message,
        visibility: data.visibility
      }
    });
    donationId = donation.id;
  }

  if (data.provider === "RAZORPAY") {
    const order = await createRazorpayOrder({
      amountCents: data.amountCents,
      currency: data.currency,
      receipt: donationId,
      notes: { type: "donation" }
    });
    return NextResponse.json(order);
  }

  const checkout = await createStripeCheckout({
    amountCents: data.amountCents,
    currency: data.currency,
    label: "Talez donation",
    successPath: "/donate?thanks=1",
    cancelPath: "/donate?canceled=1",
    metadata: { donationId }
  });
  return NextResponse.json(checkout);
}
