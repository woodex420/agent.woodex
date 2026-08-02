import Button from "@/components/ui/Button";
import Link from "next/link";

export default function PlaceholderPage({
  eyebrow,
  title,
  description,
  accent,
  comingSoon = false,
}: {
  eyebrow: string;
  title: string;
  description: string;
  accent?: string;
  comingSoon?: boolean;
}) {
  return (
    <main className="pt-[var(--nav-h)]">
      <section className="section-pad min-h-[80vh] flex items-center">
        <div className="container-x grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-[var(--fg-muted)] mb-6">
              <span className="w-8 h-px bg-[var(--oak-500)]" />
              {eyebrow}
            </div>
            <h1 className="font-display text-[var(--fs-h1)] leading-[1.05] mb-6">
              {title}{" "}
              {accent && <span className="italic-serif text-[var(--oak-600)]">{accent}</span>}
            </h1>
            <p className="text-lg text-[var(--fg-muted)] max-w-xl leading-relaxed mb-8">
              {description}
            </p>
            {comingSoon && (
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[var(--fg-subtle)] border border-[var(--border)] px-3 py-1.5 rounded-full mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--warning)] animate-pulse" />
                Page in build — Sprint 2-3
              </div>
            )}
            <div className="flex flex-wrap items-center gap-4">
              <Button href="/consultation" variant="liquid" magnetic>
                Book a consultation
              </Button>
              <Link href="/" className="text-sm uppercase tracking-widest font-medium hover:text-[var(--oak-600)]">
                ← Back to home
              </Link>
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="aspect-[4/5] rounded-sm relative overflow-hidden noise"
                 style={{ background: "linear-gradient(135deg,var(--oak-200),var(--oak-500),var(--oak-800))" }}>
              <div className="absolute inset-0 mix-blend-overlay opacity-40"
                   style={{ backgroundImage: "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.5), transparent 50%)" }} />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <div className="font-display text-2xl italic-serif">Approve it in 3D. Get exactly that.</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
