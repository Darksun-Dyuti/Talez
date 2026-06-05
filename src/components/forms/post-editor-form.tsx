"use client";

import { Save, Send } from "lucide-react";
import { useMemo, useState } from "react";
import { RichTextEditor } from "@/components/forms/rich-text-editor";
import { slugify } from "@/lib/utils";

export function PostEditorForm() {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("<p>Start writing...</p>");
  const [message, setMessage] = useState("");
  const [form, setForm] = useState({
    type: "STORY",
    status: "DRAFT",
    accessLevel: "FREE",
    category: "Short Fiction",
    excerpt: "",
    coverImage: "",
    tags: "",
    featured: false,
    scheduledFor: ""
  });

  const finalSlug = useMemo(() => slug || slugify(title), [slug, title]);

  async function save(status: "DRAFT" | "PUBLISHED" | "SCHEDULED") {
    setMessage("Saving...");
    const response = await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        slug: finalSlug,
        content,
        status,
        type: form.type,
        accessLevel: form.accessLevel,
        category: form.category,
        excerpt: form.excerpt,
        coverImage: form.coverImage,
        tags: form.tags.split(",").map((tag) => tag.trim()).filter(Boolean),
        featured: form.featured,
        scheduledFor: form.scheduledFor ? new Date(form.scheduledFor).toISOString() : undefined,
        publishDate: status === "PUBLISHED" ? new Date().toISOString() : undefined
      })
    });
    const data = await response.json();
    setMessage(response.ok ? "Saved." : data.message ?? "Unable to save.");
  }

  return (
    <div className="grid gap-5">
      <div className="grid gap-4 rounded-lg border border-line bg-surface p-5">
        <input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Title"
          className="h-14 rounded-xl border border-line bg-paper px-4 font-serif text-2xl outline-none focus:border-gold"
        />
        <input
          value={slug || finalSlug}
          onChange={(event) => setSlug(event.target.value)}
          placeholder="slug"
          className="h-11 rounded-xl border border-line bg-paper px-4 text-sm outline-none focus:border-gold"
        />
        <textarea
          value={form.excerpt}
          onChange={(event) => setForm((current) => ({ ...current, excerpt: event.target.value }))}
          placeholder="Short excerpt"
          className="min-h-24 rounded-xl border border-line bg-paper p-4 text-sm outline-none focus:border-gold"
        />
        <div className="grid gap-3 md:grid-cols-4">
          <select value={form.type} onChange={(event) => setForm((current) => ({ ...current, type: event.target.value }))} className="h-11 rounded-xl border border-line bg-paper px-3 text-sm">
            <option value="STORY">Story</option>
            <option value="BLOG">Blog</option>
          </select>
          <select value={form.accessLevel} onChange={(event) => setForm((current) => ({ ...current, accessLevel: event.target.value }))} className="h-11 rounded-xl border border-line bg-paper px-3 text-sm">
            <option value="FREE">Free</option>
            <option value="PREMIUM">Premium</option>
          </select>
          <select value={form.status} onChange={(event) => setForm((current) => ({ ...current, status: event.target.value }))} className="h-11 rounded-xl border border-line bg-paper px-3 text-sm">
            <option value="DRAFT">Draft</option>
            <option value="PUBLISHED">Published</option>
            <option value="SCHEDULED">Scheduled</option>
          </select>
          <input
            type="datetime-local"
            value={form.scheduledFor}
            onChange={(event) => setForm((current) => ({ ...current, scheduledFor: event.target.value }))}
            className="h-11 rounded-xl border border-line bg-paper px-3 text-sm"
          />
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          <input value={form.category} onChange={(event) => setForm((current) => ({ ...current, category: event.target.value }))} placeholder="Category" className="h-11 rounded-xl border border-line bg-paper px-3 text-sm" />
          <input value={form.tags} onChange={(event) => setForm((current) => ({ ...current, tags: event.target.value }))} placeholder="Tags, comma separated" className="h-11 rounded-xl border border-line bg-paper px-3 text-sm" />
          <input value={form.coverImage} onChange={(event) => setForm((current) => ({ ...current, coverImage: event.target.value }))} placeholder="Thumbnail URL" className="h-11 rounded-xl border border-line bg-paper px-3 text-sm" />
        </div>
        <label className="flex items-center gap-2 text-sm text-muted">
          <input
            type="checkbox"
            checked={form.featured}
            onChange={(event) => setForm((current) => ({ ...current, featured: event.target.checked }))}
          />
          Featured
        </label>
      </div>

      <RichTextEditor value={content} onChange={setContent} />

      <div className="flex flex-wrap items-center gap-3">
        <button type="button" onClick={() => save("DRAFT")} className="inline-flex h-11 items-center gap-2 rounded-full border border-line bg-surface px-5 text-sm font-semibold text-ink">
          <Save className="h-4 w-4" />
          Save draft
        </button>
        <button type="button" onClick={() => save(form.status as "DRAFT" | "PUBLISHED" | "SCHEDULED")} className="inline-flex h-11 items-center gap-2 rounded-full bg-ink px-5 text-sm font-semibold text-paper">
          <Send className="h-4 w-4" />
          Publish
        </button>
        {message ? <p className="text-sm text-muted">{message}</p> : null}
      </div>
    </div>
  );
}
