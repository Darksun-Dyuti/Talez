import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Talez - Tales, Thoughts, and Beyond",
    short_name: "Talez",
    description: "A modern storytelling, blogging, membership, and reader community platform.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#f8f5ee",
    theme_color: "#cd8f2d",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png"
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png"
      }
    ]
  };
}
