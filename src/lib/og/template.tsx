import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 } as const;

export interface OgTemplateProps {
  eyebrow?: string;
  title: string;
  italicAccent?: string;
  sub?: string;
}

export async function woodexOg(
  { eyebrow = "Woodex Interior - Lahore", title, italicAccent, sub }: OgTemplateProps,
) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background:
            "radial-gradient(1200px 600px at 80% 20%, rgba(166,128,74,0.22), transparent 60%), radial-gradient(900px 700px at 10% 100%, rgba(80,50,20,0.35), transparent 55%), #0d0c0a",
          color: "#f6f0e3",
          display: "flex",
          flexDirection: "column",
          padding: "72px 80px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "repeating-linear-gradient(180deg, rgba(255,255,255,0.015) 0 1px, transparent 1px 3px)",
            pointerEvents: "none",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 96 }}>
          <div style={{ width: 48, height: 2, background: "#c9a26a" }} />
          <div
            style={{
              fontSize: 24,
              letterSpacing: 8,
              textTransform: "uppercase",
              color: "#c9a26a",
            }}
          >
            {eyebrow}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 104,
            lineHeight: 1.02,
            letterSpacing: -2,
            fontWeight: 500,
            maxWidth: 1000,
          }}
        >
          <div style={{ color: "#f6f0e3" }}>{title}</div>
          {italicAccent && (
            <div style={{ color: "#c9a26a", fontStyle: "italic", fontWeight: 400 }}>
              {italicAccent}
            </div>
          )}
        </div>

        <div style={{ flex: 1 }} />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(201,162,106,0.35)",
            paddingTop: 28,
          }}
        >
          <div
            style={{
              fontSize: 24,
              color: "rgba(246,240,227,0.8)",
              lineHeight: 1.3,
              maxWidth: 760,
            }}
          >
            {sub ?? "Approve it in 3D. Get exactly that. On the date we said."}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              fontSize: 22,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "#c9a26a",
            }}
          >
            <div style={{ width: 28, height: 2, background: "#c9a26a" }} />
            woodex.com.pk
          </div>
        </div>
      </div>
    ),
    { ...OG_SIZE },
  );
}
