"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { Expand } from "lucide-react";
import { useRef } from "react";
import { MaskImage } from "./MaskImage";
import { ViewProjectLink } from "./ViewProjectLink";
import { categories, featuredCopy, type Project } from "@/data/portfolio";

function FeaturedItem({
  project,
  index,
  total,
  onPreview,
}: {
  project: Project;
  index: number;
  total: number;
  onPreview: (p: Project) => void;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const colA = useTransform(scrollYProgress, [0, 1], [16, -16]);
  const colB = useTransform(scrollYProgress, [0, 1], [48, -24]);
  const flip = index % 2 === 1;
  const copy = featuredCopy[project.id];
  const cat = categories.find((c) => c.id === project.category)!;
  const [a, b, c, d] = project.artwork;

  return (
    <article ref={ref} className="relative border-t border-cocoa/15 py-16 md:py-28" aria-labelledby={`feat-${project.id}`}>
      <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
        <div className={`lg:col-span-5 ${flip ? "lg:order-2 lg:col-start-8" : ""}`}>
          <div className="flex items-center gap-4">
            <span className="font-serif text-lg italic text-rose-deep">
              {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
            <span className="h-px flex-1 bg-cocoa/15" />
            <span
              className="flex size-14 items-center justify-center overflow-hidden rounded-full border border-cocoa/10 shadow-sm"
              style={{ background: project.tone }}
            >
              <Image src={project.logo.src} alt={project.logo.alt} width={56} height={56} className="size-full object-cover" />
            </span>
          </div>
          <p className="mt-8 text-xs uppercase tracking-[0.25em] text-cocoa-soft">{copy?.kicker ?? cat.label}</p>
          <h3 id={`feat-${project.id}`} className="mt-3 font-display text-6xl leading-[0.9] md:text-8xl">
            {project.brand}
          </h3>
          {copy && <p className="mt-5 max-w-md font-serif text-2xl italic leading-snug text-cocoa-soft md:text-3xl">{copy.line}</p>}
          <dl className="mt-8 grid max-w-md grid-cols-2 gap-4 border-y border-cocoa/10 py-5 text-sm">
            <div>
              <dt className="text-cocoa-soft">Category</dt>
              <dd className="mt-1 text-cocoa">{cat.label}</dd>
            </div>
            <div>
              <dt className="text-cocoa-soft">Sector</dt>
              <dd className="mt-1 text-cocoa">{project.sector}</dd>
            </div>
          </dl>
          <div className="mt-8 flex flex-wrap gap-3">
            <ViewProjectLink project={project} />
            <button
              type="button"
              onClick={() => onPreview(project)}
              className="inline-flex items-center gap-2 rounded-full border border-cocoa/25 px-5 py-3 text-sm text-cocoa transition-colors hover:border-cocoa hover:bg-blush/40"
            >
              <Expand className="size-4" aria-hidden /> Quick preview
            </button>
          </div>
        </div>

        <div
          className={`grid grid-cols-2 gap-3 md:gap-5 lg:col-span-7 ${flip ? "lg:order-1 lg:col-start-1" : ""}`}
          data-cursor="Preview"
          onClick={() => onPreview(project)}
          role="presentation"
        >
          <motion.div style={{ y: colA }} className="space-y-3 md:space-y-5">
            {a && <MaskImage art={a} sizes="(min-width:1024px) 28vw, 48vw" />}
            {c && <MaskImage art={c} delay={0.15} sizes="(min-width:1024px) 28vw, 48vw" />}
          </motion.div>
          <motion.div style={{ y: colB }} className="space-y-3 pt-10 md:space-y-5 md:pt-16">
            {b && <MaskImage art={b} delay={0.08} sizes="(min-width:1024px) 28vw, 48vw" />}
            {d && <MaskImage art={d} delay={0.22} sizes="(min-width:1024px) 28vw, 48vw" />}
          </motion.div>
        </div>
      </div>
    </article>
  );
}

export function Featured({ items, onPreview }: { items: Project[]; onPreview: (p: Project) => void }) {
  return (
    <div className="relative isolate">
      {items.map((p, i) => (
        <FeaturedItem key={p.id} project={p} index={i} total={items.length} onPreview={onPreview} />
      ))}
    </div>
  );
}
