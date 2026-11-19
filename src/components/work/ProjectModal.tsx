"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useRef } from "react";
import { ViewProjectLink } from "./ViewProjectLink";
import { categories, type Project } from "@/data/portfolio";

export function ProjectModal({
  project,
  onClose,
  onStep,
}: {
  project: Project | null;
  onClose: () => void;
  onStep: (dir: 1 | -1) => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const open = !!project;

  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    document.documentElement.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onStep(1);
      if (e.key === "ArrowLeft") onStep(-1);
      if (e.key === "Tab" && panelRef.current) {
        const f = panelRef.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
      previous?.focus?.();
    };
  }, [open, onClose, onStep]);

  const cat = project ? categories.find((c) => c.id === project.category)! : null;

  return (
    <AnimatePresence>
      {project && cat && (
        <motion.div
          key="overlay"
          className="fixed inset-0 z-[80] flex items-end justify-center bg-cocoa/60 backdrop-blur-sm md:items-center md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            className="relative flex max-h-[92dvh] w-full max-w-6xl flex-col overflow-hidden rounded-t-[28px] bg-ivory md:rounded-[32px]"
            initial={{ y: 80, opacity: 0, scale: 0.97 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 60, opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <header className="flex items-start justify-between gap-4 border-b border-cocoa/10 p-5 md:p-8">
              <div className="flex items-center gap-4">
                <span
                  className="flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-cocoa/10 md:size-16"
                  style={{ background: project.tone }}
                >
                  <Image src={project.logo.src} alt={project.logo.alt} width={64} height={64} className="size-full object-contain" />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-cocoa-soft">{cat.label}</p>
                  <motion.h2
                    key={project.id}
                    id="modal-title"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="font-display text-3xl leading-tight md:text-5xl"
                  >
                    {project.brand}
                  </motion.h2>
                  <p className="font-serif text-lg italic text-cocoa-soft">{project.sector}</p>
                </div>
              </div>
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label="Close preview"
                className="flex size-11 shrink-0 items-center justify-center rounded-full border border-cocoa/20 transition-colors hover:bg-cocoa hover:text-ivory"
              >
                <X className="size-5" aria-hidden />
              </button>
            </header>

            <div className="flex-1 overflow-y-auto overscroll-contain">
              <AnimatePresence mode="wait">
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.4 }}
                  className="p-5 md:p-8"
                >
                  {project.artwork.length > 0 ? (
                    <ul className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 md:mx-0 md:grid md:grid-cols-4 md:overflow-visible md:px-0">
                      {project.artwork.map((art, i) => (
                        <motion.li
                          key={art.src}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 + i * 0.07 }}
                          className="w-[72vw] shrink-0 snap-center sm:w-[44vw] md:w-auto"
                        >
                          <Image
                            src={art.src}
                            alt={art.alt}
                            width={art.width}
                            height={art.height}
                            sizes="(min-width:768px) 25vw, 72vw"
                            quality={90}
                            className="h-auto w-full rounded-2xl shadow-[0_20px_40px_-25px_rgba(69,48,44,0.5)]"
                          />
                        </motion.li>
                      ))}
                    </ul>
                  ) : (
                    <div className="flex flex-col items-center gap-6 rounded-3xl bg-blush/40 px-6 py-12 text-center md:flex-row md:text-left">
                      <span
                        className="flex size-40 shrink-0 items-center justify-center overflow-hidden rounded-2xl shadow-lg"
                        style={{ background: project.tone }}
                      >
                        <Image
                          src={project.logo.src}
                          alt={project.logo.alt}
                          width={project.logo.width}
                          height={project.logo.height}
                          sizes="160px"
                          quality={90}
                          className="size-full object-contain"
                        />
                      </span>
                      <div>
                        <p className="font-display text-3xl md:text-4xl">A full content strategy</p>
                        <p className="mt-3 max-w-lg text-cocoa-soft">
                          The complete strategy document for {project.brand} is hosted on {project.linkLabel}. Open it to
                          read the full work.
                        </p>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-cocoa/10 p-5 md:px-8">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => onStep(-1)}
                  aria-label="Previous project"
                  className="flex size-11 items-center justify-center rounded-full border border-cocoa/20 transition-colors hover:bg-blush/50"
                >
                  <ChevronLeft className="size-5" aria-hidden />
                </button>
                <button
                  type="button"
                  onClick={() => onStep(1)}
                  aria-label="Next project"
                  className="flex size-11 items-center justify-center rounded-full border border-cocoa/20 transition-colors hover:bg-blush/50"
                >
                  <ChevronRight className="size-5" aria-hidden />
                </button>
              </div>
              <ViewProjectLink project={project} />
            </footer>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
