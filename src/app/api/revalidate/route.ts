/**
 * Sprint E3/E6 — Sanity webhook endpoint for on-demand ISR.
 *
 * POST /api/revalidate
 *   Headers: x-webhook-secret: <SANITY_REVALIDATE_SECRET>
 *   Body:    { _type: "service"|"project"|"post"|..., slug: { current: "..." }, _id: "..." }
 *
 * We revalidate the generic type tag and (when we can infer it) the specific
 * document tag, plus the home/listing routes that display collections.
 */
import { NextResponse, type NextRequest } from "next/server";
import { revalidateTag, revalidatePath } from "next/cache";
import { revalidateSecret } from "@/sanity/env";
import { bumpTag } from "@/lib/revalidate-state";
import { rateLimit, clientIp } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const TYPE_TO_TAGS: Record<string, { tags: string[]; paths: string[] }> = {
  service:       { tags: ["service"], paths: ["/services", "/", "/consultation"] },
  project:       { tags: ["project"], paths: ["/portfolio", "/"] },
  post:          { tags: ["post"],    paths: ["/blog"] },
  fitoutService: { tags: ["fitout"],  paths: ["/services"] },
  location:      { tags: ["location"], paths: ["/"] },
  teamMember:    { tags: ["team"],    paths: ["/about"] },
  siteSettings:  { tags: ["site"],    paths: ["/"] },
};

const REVALIDATE_RL = { max: 30, windowSec: 60 };

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    // Phase 6: throttle webhook calls (Sanity may retry aggressively).
    const rl = rateLimit(`revalidate:${clientIp(req)}`, REVALIDATE_RL);
    if (!rl.ok) {
      return NextResponse.json(
        { error: `Rate limited. Retry after ${rl.retryAfterSec}s.` },
        { status: 429, headers: { "Retry-After": String(rl.retryAfterSec) } },
      );
    }

    const secret = req.headers.get("x-webhook-secret");
    if (revalidateSecret && secret !== revalidateSecret) {
      return NextResponse.json({ error: "Invalid secret." }, { status: 401 });
    }

    let body: any;
    try { body = await req.json(); } catch { return NextResponse.json({ error: "Invalid JSON." }, { status: 400 }); }

    const _type: string | undefined = body?._type;
    const slug = body?.slug?.current;
    if (!_type) return NextResponse.json({ error: "Missing _type" }, { status: 400 });

    const cfg = TYPE_TO_TAGS[_type];
    const tags = [...(cfg?.tags ?? [_type])];
    const paths = [...(cfg?.paths ?? [])];

    if (slug) {
      tags.push(`${_type}:${slug}`);
      // Type-specific path revalidation
      switch (_type) {
        case "service": paths.push(`/services/${slug}`); break;
        case "project": paths.push(`/portfolio/${slug}`); break;
        case "post":
          // We don't know the category without a lookup; tag revalidation is
          // enough for now, plus the blog hub.
          paths.push(`/blog`);
          break;
        case "fitoutService": paths.push(`/services/${slug}`); break;
        case "location": paths.push(`/locations/${slug}`); break;
      }
    }

    for (const t of tags) {
      revalidateTag(t, "default");
      bumpTag(t);
    }
    // Bump wildcard so any client polling receives a signal regardless of tag.
    bumpTag("*");
    for (const p of new Set(paths)) revalidatePath(p);

    return NextResponse.json({ ok: true, revalidated: { tags, paths: [...new Set(paths)] } });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("[api/revalidate] error", err);
    return NextResponse.json({ error: "Revalidation failed." }, { status: 500 });
  }
}

/** Manual revalidation via GET (requires secret) */
export async function GET(req: NextRequest): Promise<NextResponse> {
  const secret = req.nextUrl.searchParams.get("secret");
  if (revalidateSecret && secret !== revalidateSecret) {
    return NextResponse.json({ error: "Invalid secret." }, { status: 401 });
  }
  // Full-site tag sweep
  const allTags = ["service", "project", "post", "fitout", "location", "team", "site"];
  for (const t of allTags) revalidateTag(t, "default");
  return NextResponse.json({ ok: true, revalidated: "all" });
}
