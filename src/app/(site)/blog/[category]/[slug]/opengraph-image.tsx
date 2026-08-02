import { ImageResponse } from "next/og";
import { woodexOg } from "@/lib/og/template";
import { POSTS } from "@/lib/content/posts";

export const alt = "Woodex Journal";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Og({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = POSTS.find((p) => p.slug === slug);
  if (!post)
    return new ImageResponse(
      <div style={{ background: "#0d0c0a", color: "#fff", padding: 80, fontSize: 64 }}>
        Not found
      </div>,
      { ...size },
    );
  return woodexOg({
    eyebrow: `Woodex Journal · ${post.category}`,
    title: post.title.length > 72 ? post.title.slice(0, 70) + "…" : post.title,
    sub: post.deck.length > 140 ? post.deck.slice(0, 138) + "…" : post.deck,
  });
}
