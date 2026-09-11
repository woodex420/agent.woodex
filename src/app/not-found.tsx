import Button from "@/components/ui/Button";
import Link from "next/link";

export const metadata = { title: "404 — Page not found" };

// Most-visited pages (per launch assumption; swap analytics data in after launch).
const POPULAR = [
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/3d-studio", label: "3D Studio" },
  { href: "/consultation", label: "Book a walkthrough" },
];

export default function NotFound() {
  return (
    <main className="pt-[var(--nav-h)]">
      <section className="section-pad min-h-[85vh] flex items-center bg-[var(--bg)]">
        <div className="container-x grid lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-7">
            <div className="font-mono text-sm text-[var(--oak-600)] tracking-[0.3em] uppercase mb-4">
              Error 404
            </div>
            <h1 className="font-display text-[var(--fs-h1)] leading-[1.02] mb-6">
              That page<br />
              <span className="italic-serif text-[var(--oak-600)]">isn't here.</span>
            </h1>
            <p className="text-lg text-[var(--fg-muted)] max-w-xl leading-relaxed mb-10">
              You probably typed a URL that doesn't exist yet, or a page we're still
              shipping sprint-by-sprint. Here are the places most people land:
            </p>

            <nav aria-label="Popular pages">
              <ul className="grid sm:grid-cols-2 gap-3 max-w-lg">
                {POPULAR.map((p) => (
                  <li key={p.href}>
                    <Link
                      href={p.href}
                      className="group flex items-center justify-between gap-4 border border-[var(--border-strong)] px-5 py-4 rounded-sm hover:border-[var(--oak-500)] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--oak-500)]"
                    >
                      <span className="font-medium">{p.label}</span>
                      <span className="text-[var(--oak-600)] opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition" aria-hidden>→</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-3">
              <Button href="/" variant="liquid" magnetic>Back to home</Button>
              <Link href={`tel:+923224000768`} className="text-sm uppercase tracking-widest font-medium hover:text-[var(--oak-600)]">
                Call directly →
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="border border-[var(--border)] p-8 md:p-10 bg-[var(--surface-1)]">
              <div className="text-xs uppercase tracking-[0.3em] text-[var(--oak-600)] mb-3">
                Need help now?
              </div>
              <p className="text-lg leading-relaxed mb-6">
                We reply to WhatsApp within 15 minutes during business hours
                (Mon–Sat, 10am–7).
              </p>
              <Link
                href="https://wa.me/923224000768"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-medium tracking-wide uppercase px-6 py-3 text-sm rounded-full border border-[var(--fg)] hover:bg-[var(--oak-500)] hover:text-white hover:border-[var(--oak-500)] transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--oak-500)]"
              >
                WhatsApp us →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
