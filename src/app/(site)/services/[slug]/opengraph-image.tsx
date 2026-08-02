import { ImageResponse } from "next/og";
import { woodexOg } from "@/lib/og/template";
import { SERVICES } from "@/lib/content/services";

export const alt = "Woodex Interior service";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Og({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const svc = SERVICES[slug];
  if (!svc) {
    return new ImageResponse(
      <div style={{ background: "#0d0c0a", color: "#fff", padding: 80, fontSize: 64 }}>
        Not found
      </div>,
      { ...size },
    );
  }
  return woodexOg({
    eyebrow: svc.eyebrow,
    title: svc.title,
    italicAccent: svc.italicLine.replace(/\.$/, ""),
    sub: svc.heroSub.length > 140 ? svc.heroSub.slice(0, 138) + "…" : svc.heroSub,
  });
}
