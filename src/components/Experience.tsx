"use client";

import { motion, useScroll, useSpring } from "motion/react";
import { useRef } from "react";
import { SectionLabel } from "./SectionLabel";
import { Sparkle } from "./ui/Decor";
import { SplitReveal } from "./ui/Reveal";
import { HotGroup } from "./ui/useTouchHot";
import { experience } from "@/data/portfolio";

export function Experience() {
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 75%", "end 55%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });

  return (
    <section id="experience" className="relative overflow-hidden bg-cocoa px-5 py-24 text-ivory md:px-10 md:py-40">
      <div aria-hidden className="pointer-events-none absolute -right-40 top-20 size-[520px] rounded-full bg-rose/20 blur-3xl" />
      <div className="relative mx-auto grid max-w-[1400px] gap-16 lg:grid-cols-12">
        <div className="lg:sticky lg:top-32 lg:col-span-5 lg:self-start">
          <SectionLabel index="03" light>
            Experience
          </SectionLabel>
          <h2 className="mt-8 font-display text-6xl leading-[0.9] md:text-7xl xl:text-8xl">
            <SplitReveal text="Where the" />
            <br />
            <SplitReveal text="stories happen." italic={["stories"]} italicClass="text-peach" delay={0.1} />
          </h2>
          <p className="mt-8 max-w-sm text-lg leading-relaxed text-blush">
            1+ year across two marketing agencies and freelance work — managing accounts, building strategies and planning
            creative content for brands in different industries.
          </p>
        </div>

        <ol ref={listRef} className="relative lg:col-span-7">
          {/* Track + animated progress line */}
          <span aria-hidden className="absolute bottom-0 left-[11px] top-2 w-px bg-ivory/15 md:left-[15px]" />
          <motion.span
            aria-hidden
            className="absolute left-[11px] top-2 w-px origin-top bg-peach md:left-[15px]"
            style={{ scaleY: progress, bottom: 0 }}
          />

          {experience.map((job, i) => (
            <motion.li
              key={job.company}
              className="relative pb-16 pl-12 last:pb-0 md:pl-20"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -15% 0px" }}
              transition={{ duration: 1 }}
            >
              <motion.span
                aria-hidden
                className={`absolute left-0 top-1.5 flex size-6 items-center justify-center rounded-full md:size-8 ${
                  job.current ? "bg-peach text-cocoa" : "border border-ivory/30 bg-cocoa text-blush"
                }`}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", bounce: 0.5, delay: 0.2 }}
              >
                <Sparkle className="size-2.5 md:size-3" />
              </motion.span>

              <HotGroup className="rounded-[28px] border border-ivory/10 bg-ivory/[0.03] p-7 transition-colors duration-500 hot:border-ivory/25 hot:bg-ivory/[0.06] md:p-10">
                <div className="flex flex-wrap items-center gap-3 text-sm">
                  <span className="rounded-full border border-ivory/20 px-3 py-1 text-blush">{job.period}</span>
                  {job.current && (
                    <span className="flex items-center gap-2 rounded-full bg-peach px-3 py-1 text-cocoa">
                      <span className="size-1.5 animate-pulse rounded-full bg-cocoa" />
                      Current
                    </span>
                  )}
                </div>
                <h3 className="mt-6 font-display text-4xl leading-tight md:text-6xl">
                  {job.company === "Freelance" ? <span className="italic">Freelance</span> : job.company}
                </h3>
                <p className="mt-2 font-serif text-xl italic text-blush md:text-2xl">{job.role}</p>
                <ul className="mt-6 space-y-3">
                  {job.points.map((p) => (
                    <li key={p} className="flex gap-3 text-ivory/85">
                      <span aria-hidden className="mt-2.5 h-px w-5 shrink-0 bg-peach transition-all duration-500 group-hot:w-8" />
                      {p}
                    </li>
                  ))}
                </ul>
              </HotGroup>
              <span className="sr-only">Position {i + 1} of {experience.length}</span>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
