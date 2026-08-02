import { ImageResponse } from "next/og";
import { woodexOg } from "@/lib/og/template";

export const alt = "Woodex Interior - Lahore";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
  return woodexOg({
    eyebrow: "Interior design & build",
    title: "Approve it in 3D.",
    italicAccent: "Get exactly that.",
    sub: "240+ interiors delivered in Lahore. Fixed date. Fixed price.",
  });
}
