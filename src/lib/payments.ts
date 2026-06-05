import Razorpay from "razorpay";
import Stripe from "stripe";
import { absoluteUrl } from "@/lib/utils";

const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2025-02-24.acacia" })
  : null;

const razorpay =
  process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET
    ? new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET
      })
    : null;

export async function createStripeCheckout(options: {
  amountCents: number;
  currency: string;
  label: string;
  successPath: string;
  cancelPath: string;
  metadata?: Record<string, string>;
}) {
  if (!stripe) {
    return {
      provider: "STRIPE",
      demo: true,
      url: `${absoluteUrl(options.successPath)}?demo=1`
    };
  }

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    success_url: absoluteUrl(options.successPath),
    cancel_url: absoluteUrl(options.cancelPath),
    metadata: options.metadata,
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: options.currency.toLowerCase(),
          unit_amount: options.amountCents,
          product_data: {
            name: options.label
          }
        }
      }
    ]
  });

  return { provider: "STRIPE", url: session.url };
}

export async function createRazorpayOrder(options: {
  amountCents: number;
  currency: string;
  receipt: string;
  notes?: Record<string, string>;
}) {
  if (!razorpay) {
    return {
      provider: "RAZORPAY",
      demo: true,
      id: "demo_razorpay_order",
      amount: options.amountCents,
      currency: options.currency
    };
  }

  return razorpay.orders.create({
    amount: options.amountCents,
    currency: options.currency,
    receipt: options.receipt,
    notes: options.notes
  });
}
