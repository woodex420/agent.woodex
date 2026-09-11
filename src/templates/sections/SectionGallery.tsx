"use client";
import { motion } from "framer-motion";
import Image from "next/image";

/** SectionGallery — image grid (masonry-ish), accepts 2-6 images */
export default function SectionGallery({ images, dark = false }: { images: { src: string; alt?: string; }[]; dark?: boolean; }) {
  return (
    <section className={`section-pad ${dark ? "bg-[var(--navy)] text-[var(--cream)]" : "bg-[var(--bg)]"}`}>
      <div className="container-x">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {images.map((img, i) => (
            <motion.div key={img.src} initial={{ opacity:0, scale:0.96 }} whileInView={{ opacity:1, scale:1 }} viewport={{ once:true, margin:"-60px" }} transition={{ duration:0.7, delay:i*0.08, ease:[0.22,1,0.36,1] }}
              className={`relative overflow-hidden rounded-[var(--r-md)] ${i % 5 === 0 ? "md:row-span-2 aspect-[3/4] md:aspect-[3/5]" : "aspect-[4/5]"}`} data-tilt>
              <Image src={img.src} alt={img.alt || ""} fill sizes="(min-width:1024px) 33vw, 100vw" className="object-cover hover:scale-105 transition-transform duration-[1200ms]" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
