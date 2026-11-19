"use client";

import { motion, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
import { SectionLabel } from "./SectionLabel";
import { SplitReveal } from "./ui/Reveal";
import { process } from "@/data/portfolio";

function Step({
  item,
  i,
  progress,
}: {
  item: (typeof process)[number];
  i: number;
  progress: MotionValue<number>;
}) {
  const n = process.length;
  const start = i / n;
  const lit = useTransform(progress, [start - 0.02, start + 0.12], [0, 1]);
  const opacity = useTransform(lit, [0, 1], [0.4, 1]);
  const scale = useTransform(lit, [0, 1], [0.85, 1]);
  const bg = useTransform(lit, (v) => (v > 0.5 ? "#45302C" : "#FFFCF7"));
  const fg = useTransform(lit, (v) => (v > 0.5 ? "#FAF6F0" : "#45302C"));

  return (
    <motion.li style={{ opacity }} className="relative flex gap-6 lg:block">
      <motion.span
        style={{ scale, backgroundColor: bg, color: fg }}
        className="relative z-10 flex size-14 shrink-0 items-center justify-center rounded-full border border-cocoa/20 font-serif text-xl italic lg:mx-auto lg:size-16"
        aria-hidden
      >
        0{i + 1}
      </motion.span>
      <div className="pb-12 lg:mt-10 lg:pb-0 lg:text-center">
        <h3 className="font-display text-4xl md:text-5xl">
          {item.step}
          <span className="text-rose">.</span>
        </h3>
        <p className="mt-3 text-cocoa-soft lg:mx-auto lg:max-w-[16rem]">{item.text}</p>
        <ul className="mt-4 flex flex-wrap gap-1.5 lg:justify-center" aria-label="Related skills">
          {item.skills.map((s) => (
            <li key={s} className="rounded-full bg-blush/50 px-3 py-1 text-xs text-cocoa">
              {s}
            </li>
          ))}
        </ul>
      </div>
    </motion.li>
  );
}

export function Process() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 55%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 80, damping: 22 });

  return (
    <section id="process" className="relative overflow-hidden bg-paper px-5 py-24 md:px-10 md:py-40">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <SectionLabel index="05">My creative process</SectionLabel>
            <h2 className="mt-8 font-display text-6xl leading-[0.9] md:text-7xl xl:text-8xl">
              <SplitReveal text="From a spark" />
              <br />
              <SplitReveal text="to a story." italic={["story."]} delay={0.1} />
            </h2>
          </div>
          <p className="text-lg leading-relaxed text-cocoa-soft lg:col-span-4 lg:col-start-9">
            A simple, flexible workflow built from the skills I use every day — adapted to each brand, its audience and its
            goals.
          </p>
        </div>

        <ol ref={ref} className="relative mt-16 grid lg:mt-28 lg:grid-cols-5 lg:gap-6">
          {/* Desktop: wavy connector drawn as you scroll */}
          <svg
            aria-hidden
            viewBox="0 0 1000 64"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-x-0 top-0 hidden h-16 w-full lg:block"
          >
            <path
              d="M100 32 C150 2 250 62 300 32 S450 2 500 32 S650 62 700 32 S850 2 900 32"
              fill="none"
              stroke="var(--color-taupe)"
              strokeWidth="1.5"
              strokeDasharray="4 8"
              vectorEffect="non-scaling-stroke"
            />
            <motion.path
              d="M100 32 C150 2 250 62 300 32 S450 2 500 32 S650 62 700 32 S850 2 900 32"
              fill="none"
              stroke="var(--color-rose-deep)"
              strokeWidth="2"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              style={{ pathLength: progress }}
            />
          </svg>
          {/* Mobile: vertical line */}
          <span aria-hidden className="absolute bottom-12 left-7 top-2 w-px bg-taupe/50 lg:hidden" />
          <motion.span
            aria-hidden
            className="absolute bottom-12 left-7 top-2 w-px origin-top bg-rose-deep lg:hidden"
            style={{ scaleY: progress }}
          />

          {process.map((item, i) => (
            <Step key={item.step} item={item} i={i} progress={progress} />
          ))}
        </ol>
        <p className="mt-16 text-center text-sm text-cocoa-soft lg:mt-24">
          Discover <span className="text-rose">→</span> Research <span className="text-rose">→</span> Ideate{" "}
          <span className="text-rose">→</span> Create <span className="text-rose">→</span> Publish
        </p>
      </div>
    </section>
  );
}
