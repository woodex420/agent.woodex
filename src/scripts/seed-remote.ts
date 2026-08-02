/**
 * One-shot script: seeds the remote Vercel deployment with 9 starter pages
 * after Sanity is connected.
 *
 *   SEED_URL=https://agent-woodex.vercel.app PREVIEW_SECRET=xxx npx tsx src/scripts/seed-remote.ts
 */
const SEED_URL = process.env.SEED_URL ?? "https://agent-woodex.vercel.app";
const PREVIEW_SECRET = process.env.PREVIEW_SECRET!;

if (!PREVIEW_SECRET) {
  console.error("Set PREVIEW_SECRET env var (same as Vercel)");
  process.exit(1);
}

(async () => {
  console.log(`POST ${SEED_URL}/api/seed-builder …`);
  const res = await fetch(`${SEED_URL}/api/seed-builder`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${PREVIEW_SECRET}`,
      "Content-Type": "application/json",
    },
  });
  const json = await res.json();
  console.log(JSON.stringify(json, null, 2));
  if (!res.ok) process.exit(1);
  console.log("\n✓ Seeded. Visit Studio → Pages to see the pages.");
})();
