import { Bell, Check, Crown, MailOpen } from "lucide-react";
import { SubscribeForm } from "@/components/site/subscribe-form";
import { membershipPlans } from "@/lib/data";

export const metadata = {
  title: "Subscribe",
  description: "Subscribe to the Talez newsletter and become a premium member."
};

export default function SubscribePage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-[0.85fr_1fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-ember">Subscribe</p>
          <h1 className="mt-3 font-serif text-5xl font-semibold leading-tight text-ink">New pages, sent gently.</h1>
          <p className="mt-4 text-lg leading-8 text-muted">
            Receive new stories, blogs, monthly roundups, special announcements, and member-only updates.
          </p>
          <div className="mt-8 grid gap-4">
            {[
              ["New Story", "Title, thumbnail, excerpt, and read-more link."],
              ["New Blog", "Essays and technical notes with clean email templates."],
              ["Monthly Roundup", "A warm digest of the best recent reading."],
              ["Special Announcement", "Launches, milestones, and membership updates."]
            ].map(([title, text]) => (
              <div key={title} className="flex gap-3 rounded-lg border border-line bg-surface p-4">
                <MailOpen className="mt-1 h-5 w-5 shrink-0 text-gold" />
                <div>
                  <h2 className="font-semibold text-ink">{title}</h2>
                  <p className="mt-1 text-sm text-muted">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-lg border border-line bg-surface p-6 shadow-soft">
          <SubscribeForm />
          <div className="mt-8 rounded-lg bg-paper p-5">
            <Bell className="h-5 w-5 text-ember" />
            <p className="mt-3 text-sm leading-7 text-muted">
              Subscribers can unsubscribe at any time. Premium-only sends are supported through the newsletter audience tools.
            </p>
          </div>
        </div>
      </div>

      <div id="membership" className="mt-16 scroll-mt-24">
        <div className="mb-8 max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-ember">Membership</p>
          <h2 className="mt-2 font-serif text-4xl font-semibold text-ink">Premium reading plans</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {membershipPlans.map((plan) => (
            <article key={plan.slug} className="rounded-lg border border-line bg-surface p-6 shadow-sm">
              <div className="flex items-center justify-between gap-3">
                <Crown className="h-6 w-6 text-gold" />
                {plan.highlighted ? <span className="rounded-full bg-gold/15 px-3 py-1 text-xs font-semibold text-ember">Popular</span> : null}
              </div>
              <h3 className="mt-5 font-serif text-3xl font-semibold text-ink">{plan.name}</h3>
              <p className="mt-2 text-muted">{plan.description}</p>
              <p className="mt-5 font-serif text-4xl font-semibold text-ink">
                {plan.price} <span className="font-sans text-sm font-medium text-muted">/{plan.interval}</span>
              </p>
              <ul className="mt-6 grid gap-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-muted">
                    <Check className="h-4 w-4 text-sage" />
                    {feature}
                  </li>
                ))}
              </ul>
              <button className="mt-6 h-11 w-full rounded-xl bg-ink text-sm font-semibold text-paper">Choose {plan.name}</button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
