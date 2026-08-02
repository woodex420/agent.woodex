/**
 * Sprint E5 — Studio route uses a bare layout so Nav/Footer/ChatWidget don't
 * mount over the Sanity UI. Metadata is intentionally minimal.
 */
export const metadata = {
  title: "Woodex Studio",
  robots: { index: false, follow: false },
};

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
