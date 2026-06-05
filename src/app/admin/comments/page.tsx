import { Check, ShieldAlert, Trash2, X } from "lucide-react";

const comments = [
  { author: "Mira", post: "The Lantern Road", content: "This felt soft and luminous.", status: "PENDING" },
  { author: "Dev Reader", post: "Notes on Deep Work", content: "The code ritual section was useful.", status: "APPROVED" },
  { author: "Anonymous", post: "Letters from the Hidden Room", content: "Potential spam report attached.", status: "REPORTED" }
];

export const metadata = {
  title: "Comment Moderation"
};

export default function AdminCommentsPage() {
  return (
    <div>
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-ember">Moderation</p>
        <h1 className="mt-2 font-serif text-5xl font-semibold text-ink">Comments</h1>
      </div>
      <div className="grid gap-4">
        {comments.map((comment) => (
          <article key={`${comment.author}-${comment.post}`} className="rounded-lg border border-line bg-paper p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="font-semibold text-ink">{comment.author}</h2>
                <p className="text-sm text-muted">{comment.post}</p>
              </div>
              <span className="inline-flex items-center gap-2 rounded-full bg-surface px-3 py-1 text-xs font-semibold text-muted">
                <ShieldAlert className="h-3.5 w-3.5" />
                {comment.status}
              </span>
            </div>
            <p className="mt-4 text-sm leading-7 text-muted">{comment.content}</p>
            <div className="mt-5 flex gap-2">
              <button className="grid h-10 w-10 place-items-center rounded-full border border-line bg-surface text-sage" aria-label="Approve">
                <Check className="h-4 w-4" />
              </button>
              <button className="grid h-10 w-10 place-items-center rounded-full border border-line bg-surface text-ember" aria-label="Reject">
                <X className="h-4 w-4" />
              </button>
              <button className="grid h-10 w-10 place-items-center rounded-full border border-line bg-surface text-muted" aria-label="Delete">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
