import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getProject, PROJECTS } from "@/lib/content/projects";
import BeforeAfter from "@/components/portfolio/BeforeAfter";
import ClipGallery from "@/components/portfolio/ClipGallery";
import Button from "@/components/ui/Button";

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return { title: "Project not found" };
  return {
    title: `${p.title} — ${p.category} · Woodex Interior`,
    description: `${p.area} · ${p.location} · ${p.year}. ${p.brief.slice(0, 120)}…`,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const idx = PROJECTS.findIndex((p) => p.slug === slug);
  const prev = PROJECTS[(idx - 1 + PROJECTS.length) % PROJECTS.length];
  const next = PROJECTS[(idx + 1) % PROJECTS.length];

  return (
    <main className="pt-[var(--nav-h)]">
      {/* Hero */}
      <section className="relative h-[80vh] min-h-[560px] text-white overflow-hidden noise">
        <div className="absolute inset-0 bg-cover bg-center" style={{ background: project.heroImg }} />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/25 to-black/80" />
        <div className="container-x relative h-full flex flex-col justify-end pb-14">
          <nav className="mb-6 text-xs uppercase tracking-widest text-white/60 flex items-center gap-2">
            <Link href="/" className="hover:text-white">Home</Link>
            <span>/</span>
            <Link href="/portfolio" className="hover:text-white">Portfolio</Link>
            <span>/</span>
            <span className="text-white">{project.category}</span>
          </nav>
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-[var(--oak-300)] mb-5">
            <span className="w-10 h-px bg-[var(--oak-400)]" />
            {project.category} · {project.year}
          </div>
          <h1 className="font-display text-[var(--fs-h1)] leading-[0.98] max-w-4xl">
            {project.title}
          </h1>
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-sm max-w-3xl">
            <div><div className="text-white/50 text-xs uppercase tracking-widest mb-1">Location</div><div>{project.location}</div></div>
            <div><div className="text-white/50 text-xs uppercase tracking-widest mb-1">Area</div><div>{project.area}</div></div>
            <div><div className="text-white/50 text-xs uppercase tracking-widest mb-1">Year</div><div>{project.year}</div></div>
            <div><div className="text-white/50 text-xs uppercase tracking-widest mb-1">Tags</div><div className="text-xs">{project.tags.join(" · ")}</div></div>
          </div>
        </div>
      </section>

      {/* Stats band */}
      <section className="bg-[var(--oak-500)] text-[var(--graphite-900)] py-10">
        <div className="container-x grid grid-cols-2 md:grid-cols-4 gap-6">
          {project.stats.map((s) => (
            <div key={s.label}>
              <div className="font-display text-4xl md:text-5xl leading-none">{s.value}</div>
              <div className="text-xs uppercase tracking-widest mt-2 opacity-80">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Gallery */}
      <section className="section-pad bg-[var(--bg)]">
        <div className="container-x">
          <ClipGallery images={project.gallery.concat([project.heroImg])} title={project.title} />
        </div>
      </section>

      {/* 4-beat story */}
      <section className="section-pad bg-[var(--bg-subtle)]">
        <div className="container-x max-w-3xl">
          <StoryBeat num="01" label="The brief" heading="What they came to us with" body={project.brief} />
          <StoryBeat num="02" label="The hard part" heading="Where most projects lose the plot" body={project.hardPart} />
          <StoryBeat num="03" label="The build" heading="How we delivered it" body={project.build} />

          <div className="pt-12 md:pt-16 border-t border-[var(--border)]">
            <div className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-[var(--oak-600)] mb-5">
              <span className="w-8 h-px bg-[var(--oak-500)]" />
              04 · In their words
            </div>
            <blockquote className="font-display text-2xl md:text-3xl leading-snug text-[var(--fg)] mb-6 italic-serif">
              "{project.quote.text}"
            </blockquote>
            <div>
              <div className="font-medium">{project.quote.name}</div>
              <div className="text-sm text-[var(--fg-muted)]">{project.quote.role}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Before/After */}
      {project.beforeAfter && (
        <section className="section-pad bg-[var(--bg)]">
          <div className="container-x">
            <div className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-[var(--fg-muted)] mb-5">
              <span className="w-8 h-px bg-[var(--oak-500)]" />
              Before / After
            </div>
            <h2 className="font-display text-[var(--fs-h2)] leading-[1.05] mb-8 max-w-2xl">
              Drag the handle.<br />
              <span className="italic-serif text-[var(--oak-600)]">That's the same space.</span>
            </h2>
            <div className="max-w-4xl">
              <BeforeAfter before={project.beforeAfter.before} after={project.beforeAfter.after} caption={project.beforeAfter.caption} />
            </div>
          </div>
        </section>
      )}

      {/* Prev/Next */}
      <section className="border-t border-[var(--border)]">
        <div className="container-x py-10 grid md:grid-cols-2 gap-6">
          <Link href={`/portfolio/${prev.slug}`} className="group">
            <div className="text-xs uppercase tracking-widest text-[var(--fg-subtle)] mb-2 flex items-center gap-2">
              <span>← Previous</span>
            </div>
            <div className="font-display text-2xl md:text-3xl leading-tight group-hover:text-[var(--oak-600)] transition-colors">{prev.title}</div>
            <div className="text-sm text-[var(--fg-muted)] mt-1">{prev.category} · {prev.area}</div>
          </Link>
          <Link href={`/portfolio/${next.slug}`} className="group md:text-right">
            <div className="text-xs uppercase tracking-widest text-[var(--fg-subtle)] mb-2 flex md:justify-end items-center gap-2">
              <span>Next →</span>
            </div>
            <div className="font-display text-2xl md:text-3xl leading-tight group-hover:text-[var(--oak-600)] transition-colors">{next.title}</div>
            <div className="text-sm text-[var(--fg-muted)] mt-1">{next.category} · {next.area}</div>
          </Link>
        </div>
        <div className="container-x pb-14 flex justify-center">
          <Button href="/consultation" variant="liquid" magnetic>
            Start your project →
          </Button>
        </div>
      </section>
    </main>
  );
}

function StoryBeat({ num, label, heading, body }: { num: string; label: string; heading: string; body: string }) {
  return (
    <div className="py-8 md:py-12 border-b border-[var(--border)] last:border-b-0 grid md:grid-cols-12 gap-4 md:gap-6">
      <div className="md:col-span-3 flex md:block items-center gap-3">
        <div className="font-mono text-xs tracking-[0.25em] text-[var(--oak-600)]">{num}</div>
        <div className="text-[10px] md:text-xs uppercase tracking-widest text-[var(--fg-subtle)] mt-0 md:mt-1">{label}</div>
      </div>
      <div className="md:col-span-9">
        <h2 className="font-display text-xl md:text-2xl lg:text-3xl leading-tight mb-3 md:mb-4">{heading}</h2>
        <p className="text-base md:text-lg text-[var(--fg-muted)] leading-relaxed">{body}</p>
      </div>
    </div>
  );
}
