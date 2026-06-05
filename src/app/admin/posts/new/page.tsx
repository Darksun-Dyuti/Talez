import { PostEditorForm } from "@/components/forms/post-editor-form";

export const metadata = {
  title: "Create Post"
};

export default function NewPostPage() {
  return (
    <div>
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-ember">Create</p>
        <h1 className="mt-2 font-serif text-5xl font-semibold text-ink">New post</h1>
      </div>
      <PostEditorForm />
    </div>
  );
}
