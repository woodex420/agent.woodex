import { ImageResponse } from "next/og";
import { woodexOg } from "@/lib/og/template";
import { PROJECTS } from "@/lib/content/projects";

export const alt = "Woodex project";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Og({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = PROJECTS.find((x) => x.slug === slug);
  if (!p)
    return new ImageResponse(
      <div style={{ background: "#0d0c0a", color: "#fff", padding: 80, fontSize: 64 }}>
        Not found
      </div>,
      { ...size },
    );
  return woodexOg({
    eyebrow: `${p.category} · ${p.location} · ${p.year}`,
    title: p.title,
    sub: `${p.area} · ${p.tags.slice(0, 3).join(" · ")}`,
  });
}
