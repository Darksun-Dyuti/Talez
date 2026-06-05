"use client";

import { MessageCircle, Send } from "lucide-react";
import { useState } from "react";

type CommentView = {
  id: string;
  authorName: string;
  content: string;
  createdAt: string;
  replies?: CommentView[];
};

export function Comments({ postId, initialComments = [] }: { postId: string; initialComments?: CommentView[] }) {
  const [comments, setComments] = useState(initialComments);
  const [content, setContent] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [authorEmail, setAuthorEmail] = useState("");
  const [message, setMessage] = useState("");

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    const response = await fetch("/api/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ postId, content, authorName, authorEmail, website: "" })
    });
    const data = await response.json();
    if (response.ok) {
      setContent("");
      setMessage(data.message ?? "Comment submitted for moderation.");
      setComments((items) => [
        {
          id: `pending-${Date.now()}`,
          authorName: authorName || "Reader",
          content,
          createdAt: new Date().toISOString()
        },
        ...items
      ]);
    } else {
      setMessage(data.message ?? "Unable to submit comment.");
    }
  }

  return (
    <section className="mt-14 border-t border-line pt-10">
      <div className="flex items-center gap-3">
        <MessageCircle className="h-5 w-5 text-ember" aria-hidden="true" />
        <h2 className="font-serif text-3xl font-semibold text-ink">Discussion</h2>
      </div>

      <form onSubmit={submit} className="mt-6 grid gap-3 rounded-lg border border-line bg-surface p-4">
        <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
        <div className="grid gap-3 sm:grid-cols-2">
          <input
            value={authorName}
            onChange={(event) => setAuthorName(event.target.value)}
            placeholder="Name"
            className="h-11 rounded-xl border border-line bg-paper px-3 text-sm outline-none focus:border-gold"
          />
          <input
            type="email"
            value={authorEmail}
            onChange={(event) => setAuthorEmail(event.target.value)}
            placeholder="Email"
            className="h-11 rounded-xl border border-line bg-paper px-3 text-sm outline-none focus:border-gold"
          />
        </div>
        <textarea
          required
          value={content}
          onChange={(event) => setContent(event.target.value)}
          placeholder="Join the conversation"
          className="min-h-32 rounded-xl border border-line bg-paper p-3 text-sm outline-none focus:border-gold"
        />
        <button type="submit" className="inline-flex h-11 w-fit items-center gap-2 rounded-full bg-ink px-5 text-sm font-semibold text-paper">
          <Send className="h-4 w-4" aria-hidden="true" />
          Comment
        </button>
        {message ? <p className="text-sm text-muted">{message}</p> : null}
      </form>

      <div className="mt-6 grid gap-4">
        {comments.length ? (
          comments.map((comment) => (
            <article key={comment.id} className="rounded-lg border border-line bg-surface p-4">
              <div className="flex items-center justify-between gap-3">
                <p className="font-semibold text-ink">{comment.authorName}</p>
                <time className="text-xs text-muted">{new Date(comment.createdAt).toLocaleDateString()}</time>
              </div>
              <p className="mt-2 text-sm leading-7 text-muted">{comment.content}</p>
            </article>
          ))
        ) : (
          <p className="rounded-lg border border-dashed border-line p-6 text-sm text-muted">No approved comments yet.</p>
        )}
      </div>
    </section>
  );
}
