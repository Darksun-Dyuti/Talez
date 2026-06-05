import { Ban, Pencil, Plus } from "lucide-react";
import { membershipPlans } from "@/lib/data";

export const metadata = {
  title: "Membership Plans"
};

export default function AdminMembershipsPage() {
  return (
    <div>
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-ember">Memberships</p>
          <h1 className="mt-2 font-serif text-5xl font-semibold text-ink">Plans</h1>
        </div>
        <button className="inline-flex h-11 items-center gap-2 rounded-full bg-ink px-5 text-sm font-semibold text-paper">
          <Plus className="h-4 w-4" />
          New plan
        </button>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {membershipPlans.map((plan) => (
          <article key={plan.slug} className="rounded-lg border border-line bg-paper p-6">
            <h2 className="font-serif text-3xl font-semibold text-ink">{plan.name}</h2>
            <p className="mt-2 text-muted">{plan.description}</p>
            <p className="mt-4 font-serif text-4xl font-semibold text-ink">{plan.price}</p>
            <div className="mt-5 flex gap-2">
              <button className="grid h-10 w-10 place-items-center rounded-full border border-line bg-surface text-muted" aria-label="Modify plan">
                <Pencil className="h-4 w-4" />
              </button>
              <button className="grid h-10 w-10 place-items-center rounded-full border border-line bg-surface text-muted" aria-label="Disable plan">
                <Ban className="h-4 w-4" />
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
