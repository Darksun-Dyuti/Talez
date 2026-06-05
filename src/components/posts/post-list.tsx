import { PostCard } from "@/components/posts/post-card";
import type { TalezPost } from "@/types/content";

export function PostList({ posts }: { posts: TalezPost[] }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {posts.map((post) => (
        <PostCard key={post.slug} post={post} />
      ))}
    </div>
  );
}
