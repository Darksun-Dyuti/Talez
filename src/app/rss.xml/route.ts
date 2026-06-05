import { getPublishedPosts } from "@/lib/posts";
import { absoluteUrl } from "@/lib/utils";

export async function GET() {
  const posts = await getPublishedPosts();
  const items = posts
    .map(
      (post) => `
        <item>
          <title><![CDATA[${post.title}]]></title>
          <link>${absoluteUrl(`/posts/${post.slug}`)}</link>
          <guid>${absoluteUrl(`/posts/${post.slug}`)}</guid>
          <description><![CDATA[${post.excerpt}]]></description>
          <pubDate>${new Date(post.publishDate).toUTCString()}</pubDate>
        </item>`
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
    <rss version="2.0">
      <channel>
        <title>Talez</title>
        <link>${absoluteUrl("/")}</link>
        <description>Tales, Thoughts, and Beyond</description>
        ${items}
      </channel>
    </rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8"
    }
  });
}
