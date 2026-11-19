"use client";

import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { useCallback, useMemo, useState } from "react";
import { SectionLabel } from "../SectionLabel";
import { Reveal, SplitReveal } from "../ui/Reveal";
import { Featured } from "./Featured";
import { ProjectCard } from "./ProjectCard";
import { ProjectModal } from "./ProjectModal";
import { categories, featuredIds, projects, type CategoryId, type Project } from "@/data/portfolio";

type Filter = "all" | CategoryId;

const filters: { id: Filter; label: string }[] = [
  { id: "all", label: "All work" },
  ...categories.map((c) => ({ id: c.id as Filter, label: c.label })),
];

export function Work() {
  const [filter, setFilter] = useState<Filter>("all");
  const [openId, setOpenId] = useState<string | null>(null);

  const featured = useMemo(
    () => featuredIds.map((id) => projects.find((p) => p.id === id)).filter(Boolean) as Project[],
    [],
  );
  const visible = useMemo(
    () => (filter === "all" ? projects : projects.filter((p) => p.category === filter)),
    [filter],
  );
  const brandCount = new Set(projects.map((p) => p.brand)).size;

  // The modal steps through whatever list the user is browsing.
  const openProject = projects.find((p) => p.id === openId) ?? null;
  const onPreview = useCallback((p: Project) => setOpenId(p.id), []);
  const onClose = useCallback(() => setOpenId(null), []);
  const onStep = useCallback(
    (dir: 1 | -1) =>
      setOpenId((id) => {
        const list = visible.some((p) => p.id === id) ? visible : projects;
        const i = list.findIndex((p) => p.id === id);
        return list[(i + dir + list.length) % list.length].id;
      }),
    [visible],
  );

  return (
    <section id="work" className="relative overflow-x-clip px-5 py-24 md:px-10 md:py-40" aria-labelledby="work-title">
      <div className="mx-auto max-w-[1400px]">
        <SectionLabel index="04">Selected work</SectionLabel>
        <div className="mt-8 grid items-end gap-8 lg:grid-cols-12">
          <h2 id="work-title" className="font-display text-[17vw] leading-[0.82] lg:col-span-8 lg:text-[11rem]">
            <SplitReveal text="Selected" />
            <br />
            <span className="relative inline-block pl-[8%]">
              <SplitReveal text="work." italic={["work"]} delay={0.12} />
              <motion.span
                aria-hidden
                className="absolute -inset-x-[12%] -inset-y-[8%] text-rose"
                initial="off"
                whileInView="on"
                viewport={{ once: true, amount: 0.6 }}
              >
                <svg viewBox="0 0 300 120" fill="none" preserveAspectRatio="none" className="size-full">
                  <motion.path
                    d="M248 18C190 2 66 4 26 30-14 57 28 104 140 108c96 4 160-20 154-54-5-30-80-46-150-42"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    variants={{ off: { pathLength: 0, opacity: 0 }, on: { pathLength: 1, opacity: 1 } }}
                    transition={{ duration: 1.4, delay: 0.6, ease: [0.65, 0, 0.35, 1] }}
                  />
                </svg>
              </motion.span>
            </span>
          </h2>
          <Reveal className="lg:col-span-4">
            <p className="text-lg leading-relaxed text-cocoa-soft">
              Real content strategies, ideas and writing for {brandCount} brands — from dental clinics and delivery
              companies to cafés and baby care. Every project opens the original work.
            </p>
          </Reveal>
        </div>

        {/* Cinematic previews */}
        <div className="mt-20 md:mt-28">
          <Featured items={featured} onPreview={onPreview} />
        </div>

        {/* Full gallery */}
        <div className="mt-10 border-t border-cocoa/15 pt-16 md:pt-24">
          <div className="flex flex-col gap-8 xl:flex-row xl:items-end xl:justify-between">
            <h3 className="font-display text-5xl leading-none md:text-7xl">
              The full <span className="italic text-rose-deep">archive</span>
            </h3>
            <LayoutGroup id="filters">
              <div
                role="tablist"
                aria-label="Filter projects by category"
                className="no-scrollbar -mx-5 flex gap-1 overflow-x-auto px-5 md:mx-0 md:w-fit md:rounded-full md:border md:border-cocoa/15 md:bg-paper md:p-1.5"
              >
                {filters.map((f) => {
                  const active = filter === f.id;
                  const count = f.id === "all" ? projects.length : projects.filter((p) => p.category === f.id).length;
                  return (
                    <button
                      key={f.id}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      aria-controls="project-grid"
                      onClick={() => setFilter(f.id)}
                      className={`relative shrink-0 rounded-full px-5 py-2.5 text-sm transition-colors ${
                        active ? "text-ivory" : "border border-cocoa/15 text-cocoa hover:text-rose-deep md:border-0"
                      }`}
                    >
                      {active && (
                        <motion.span
                          layoutId="filter-pill"
                          className="absolute inset-0 rounded-full bg-cocoa"
                          transition={{ type: "spring", stiffness: 380, damping: 32 }}
                        />
                      )}
                      <span className="relative">
                        {f.label} <sup className="text-[10px] opacity-70">{count}</sup>
                      </span>
                    </button>
                  );
                })}
              </div>
            </LayoutGroup>
          </div>

          <motion.div
            id="project-grid"
            role="tabpanel"
            layout
            className="mt-12 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 lg:[&>*:nth-child(3n+2)]:translate-y-16"
          >
            <AnimatePresence mode="popLayout">
              {visible.map((p, i) => (
                <ProjectCard key={p.id} project={p} index={i} onPreview={onPreview} />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      <ProjectModal project={openProject} onClose={onClose} onStep={onStep} />
    </section>
  );
}
