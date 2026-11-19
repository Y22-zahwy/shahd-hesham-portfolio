"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { FileText } from "lucide-react";
import { Pin } from "../ui/Decor";
import { ViewProjectLink } from "./ViewProjectLink";
import { categories, type Project } from "@/data/portfolio";

function StrategyCover({ project }: { project: Project }) {
  return (
    <div className="relative flex aspect-[4/5] items-center justify-center overflow-hidden bg-blush/50">
      {/* Stacked "document" sheets behind the pinned logo */}
      <span className="absolute h-[64%] w-[62%] translate-x-6 translate-y-5 rotate-6 rounded-md bg-paper/70 shadow-sm transition-transform duration-700 ease-out-expo group-hover:translate-x-10 group-hover:rotate-[10deg]" />
      <span className="absolute h-[64%] w-[62%] translate-x-3 translate-y-2 rotate-2 rounded-md bg-paper/90 shadow-sm transition-transform duration-700 ease-out-expo group-hover:translate-x-5 group-hover:rotate-[5deg]" />
      <div className="relative flex h-[64%] w-[62%] -rotate-2 flex-col rounded-md bg-paper p-4 shadow-[0_24px_40px_-20px_rgba(69,48,44,0.45)] transition-transform duration-700 ease-out-expo group-hover:-rotate-4 group-hover:scale-[1.03]">
        <Pin className="absolute -top-7 left-1/2 h-11 w-8 -translate-x-1/2" />
        <div className="flex flex-1 items-center justify-center overflow-hidden rounded-sm" style={{ background: project.tone }}>
          <Image
            src={project.logo.src}
            alt={project.logo.alt}
            width={project.logo.width}
            height={project.logo.height}
            sizes="200px"
            quality={90}
            className="h-full w-full object-contain"
          />
        </div>
        <div className="mt-3 space-y-1.5" aria-hidden>
          <span className="block h-1.5 w-4/5 rounded bg-cocoa/10" />
          <span className="block h-1.5 w-3/5 rounded bg-cocoa/10" />
        </div>
      </div>
      <span className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-ivory/90 px-3 py-1 text-xs text-cocoa">
        <FileText className="size-3.5" aria-hidden /> Strategy deck
      </span>
    </div>
  );
}

function IdeasCover({ project }: { project: Project }) {
  const [first, second] = project.artwork;
  return (
    <div className="relative aspect-[4/5] overflow-hidden bg-blush/40">
      <Image
        src={first.src}
        alt={first.alt}
        fill
        sizes="(min-width:1024px) 30vw, (min-width:640px) 45vw, 92vw"
        quality={90}
        className="object-cover transition-transform duration-[1.2s] ease-out-expo group-hover:scale-[1.06]"
      />
      {second && (
        <Image
          src={second.src}
          alt=""
          aria-hidden
          fill
          sizes="(min-width:1024px) 30vw, (min-width:640px) 45vw, 92vw"
          quality={90}
          className="object-cover opacity-0 transition-[opacity,transform] duration-700 ease-out-expo [clip-path:circle(0%_at_50%_100%)] group-hover:opacity-100 group-hover:[clip-path:circle(150%_at_50%_100%)] scale-105 group-hover:scale-100"
          style={{ transitionProperty: "opacity, transform, clip-path" }}
        />
      )}
      <span
        className="absolute bottom-4 left-4 flex size-12 items-center justify-center overflow-hidden rounded-full border-2 border-ivory shadow-md"
        style={{ background: project.tone }}
      >
        <Image src={project.logo.src} alt="" aria-hidden width={48} height={48} className="size-full object-cover" />
      </span>
      <span className="absolute right-4 top-4 rounded-full bg-ivory/90 px-3 py-1 text-xs text-cocoa">
        {project.artwork.length} posts
      </span>
    </div>
  );
}

export function ProjectCard({
  project,
  index,
  onPreview,
}: {
  project: Project;
  index: number;
  onPreview: (p: Project) => void;
}) {
  const cat = categories.find((c) => c.id === project.category)!;
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.3 } }}
      transition={{ duration: 0.8, delay: Math.min(index, 8) * 0.05, ease: [0.16, 1, 0.3, 1] }}
      className="group"
      aria-labelledby={`card-${project.id}`}
    >
      <button
        type="button"
        onClick={() => onPreview(project)}
        data-cursor="Preview"
        className="block w-full overflow-hidden rounded-[22px] text-left shadow-[0_1px_0_rgba(69,48,44,0.06)] transition-shadow duration-500 group-hover:shadow-[0_30px_60px_-30px_rgba(69,48,44,0.45)]"
        aria-label={`Preview ${project.brand} — ${cat.label}`}
      >
        {project.category === "strategy" ? <StrategyCover project={project} /> : <IdeasCover project={project} />}
      </button>
      <div className="mt-5 px-1">
        <p className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-cocoa-soft">
          <span className="font-serif text-sm normal-case italic tracking-normal text-rose-deep">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="h-px w-6 bg-cocoa/20" />
          {cat.short}
        </p>
        <h3 id={`card-${project.id}`} className="mt-2 font-display text-3xl leading-[1.05] md:text-[2.3rem]">
          {project.brand}
        </h3>
        <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
          <p className="font-serif text-lg italic text-cocoa-soft">{project.sector}</p>
          <ViewProjectLink project={project} variant="ghost" className="!px-4 !py-2.5" />
        </div>
      </div>
    </motion.article>
  );
}
