import { Gift, HeartHandshake, Sparkles } from "lucide-react";
import { DonationForm } from "@/components/forms/donation-form";

export const metadata = {
  title: "Support Talez",
  description: "Support the author with one-time donations, memberships, and tips."
};

export default function DonatePage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-[0.85fr_1fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-ember">Support</p>
          <h1 className="mt-3 font-serif text-5xl font-semibold leading-tight text-ink">Help keep the lamp lit.</h1>
          <p className="mt-4 text-lg leading-8 text-muted">
            Donations support new stories, thoughtful essays, better reader features, and a publishing home that can stay independent.
          </p>
          <div className="mt-8 grid gap-4">
            {[
              [HeartHandshake, "One-time support", "Send a custom donation with a thank-you message after checkout."],
              [Gift, "Supporter benefits", "Premium access, early releases, and recognition when you choose public support."],
              [Sparkles, "Future-ready", "Stripe, Razorpay, and PayPal-ready architecture for global support."]
            ].map(([Icon, title, text]) => (
              <div key={String(title)} className="flex gap-3 rounded-lg border border-line bg-surface p-4">
                <Icon className="mt-1 h-5 w-5 shrink-0 text-gold" />
                <div>
                  <h2 className="font-semibold text-ink">{String(title)}</h2>
                  <p className="mt-1 text-sm text-muted">{String(text)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <DonationForm />
      </div>
    </section>
  );
}
