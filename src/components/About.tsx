"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { GraduationCap } from "lucide-react";
import { useRef } from "react";
import { SectionLabel } from "./SectionLabel";
import { Sparkle, WaveLines } from "./ui/Decor";
import { Highlight, Reveal, SplitReveal } from "./ui/Reveal";
import { profile } from "@/data/portfolio";
import { HotGroup } from "./ui/useTouchHot";

const facts = [
  { big: "1+", unit: "year", text: "in content creation, social media marketing & account management" },
  { big: "2", unit: "agencies", text: "managing client accounts and planning creative content across industries" },
  { big: "&", unit: "freelance", text: "tailored content plans and marketing strategies for different brands" },
];

export function About() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const stickerY = useTransform(scrollYProgress, [0, 1], [24, -32]);
  const stickerR = useTransform(scrollYProgress, [0, 1], [-8, 4]);
  const noteY = useTransform(scrollYProgress, [0, 1], [-12, 24]);

  return (
    <section id="about" ref={ref} className="relative isolate overflow-hidden px-5 py-24 md:px-10 md:py-40">
      <WaveLines aria-hidden className="pointer-events-none absolute -left-20 bottom-10 -z-10 w-56 rotate-180 text-blush md:w-80" />
      <div className="mx-auto max-w-[1400px]">
        <SectionLabel index="01">About me</SectionLabel>

        <div className="mt-10 grid gap-14 lg:grid-cols-12 lg:gap-8">
          {/* Left — heading & stickers */}
          <div className="relative lg:col-span-5">
            <h2 className="font-display text-[19vw] leading-[0.82] sm:text-[14vw] lg:text-[7.4vw] 2xl:text-[8.5rem]">
              <SplitReveal text="Who’s" />
              <br />
              <SplitReveal text="Shahd?" italic={["Shahd?"]} delay={0.15} className="pl-[0.6em]" />
            </h2>

            <motion.div
              style={{ y: stickerY, rotate: stickerR }}
              className="absolute -top-6 right-2 flex size-32 flex-col items-center justify-center rounded-full bg-peach text-center text-cocoa shadow-[0_20px_40px_-20px_rgba(69,48,44,0.5)] sm:right-16 md:size-40 lg:-right-4 lg:top-auto lg:bottom-[-30px]"
            >
              <span aria-hidden className="absolute inset-2 rounded-full border border-dashed border-cocoa/30" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.3em] md:text-xs">GPA</span>
              <span className="mt-1 mb-2 font-serif text-5xl font-semibold leading-none [font-variant-numeric:lining-nums] md:text-6xl">
                {profile.education.gpa}
              </span>
              <span aria-hidden className="mb-1.5 h-px w-8 bg-cocoa/40" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] md:text-[11px]">Cairo Uni.</span>
            </motion.div>

            <motion.p
              style={{ y: noteY }}
              className="mt-14 hidden w-56 -rotate-3 bg-blush/70 p-5 font-serif text-xl italic leading-snug text-cocoa shadow-[6px_8px_0_rgba(69,48,44,0.08)] lg:block"
            >
              “Turning ideas into meaningful content.”
              <span className="mt-2 block text-right not-italic">
                <Sparkle className="inline size-3 text-cocoa" />
              </span>
            </motion.p>
          </div>

          {/* Right — bio */}
          <div className="lg:col-span-7 lg:pt-6">
            <Reveal>
              <p className="font-serif text-[1.65rem] leading-[1.3] text-cocoa md:text-[2.15rem] md:leading-[1.25]">
                <span className="float-left mr-3 mt-1 font-display text-[5.2rem] leading-[0.75] text-rose-deep md:text-[7rem]">I</span>
                ’m Shahd, a content creator passionate about{" "}
                <Highlight>storytelling, creative thinking, and marketing</Highlight>. My journey began at the Faculty of Mass
                Communication, where I majored in <Highlight delay={0.2}>Public Relations and Advertising</Highlight>.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-8 max-w-2xl text-lg leading-relaxed text-cocoa-soft md:ml-[12%]">
                Since then, I’ve been continuously developing my skills through hands-on experience, working across different
                industries and managing multiple accounts. I enjoy{" "}
                <span className="font-serif text-xl italic text-cocoa">turning ideas into meaningful content</span> that
                captures attention, connects with audiences, and helps brands communicate their value.
              </p>
            </Reveal>

            {/* Education */}
            <Reveal delay={0.15} className="mt-14 md:ml-[12%]">
              <HotGroup className="relative overflow-hidden rounded-[28px] border border-cocoa/15 bg-paper p-7 md:p-9">
                <div className="absolute inset-y-0 left-0 w-1.5 bg-rose transition-all duration-700 ease-out-expo group-hot:w-full group-hot:opacity-10" />
                <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-start gap-4">
                    <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-blush text-cocoa">
                      <GraduationCap className="size-5" aria-hidden />
                    </span>
                    <div>
                      <p className="text-xs uppercase tracking-[0.25em] text-cocoa-soft">Education</p>
                      <h3 className="mt-2 font-display text-3xl leading-tight md:text-4xl">{profile.education.degree}</h3>
                      <p className="mt-2 text-cocoa-soft">
                        {profile.education.major} <span className="text-rose">·</span> {profile.education.school}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-baseline gap-2 sm:flex-col sm:items-end sm:gap-0">
                    <span className="text-xs uppercase tracking-[0.25em] text-cocoa-soft">GPA</span>
                    <span className="font-display text-6xl italic text-rose-deep [font-variant-numeric:lining-nums]">{profile.education.gpa}</span>
                  </div>
                </div>
              </HotGroup>
            </Reveal>
          </div>
        </div>

        {/* Facts from the "Work Experience" page */}
        <ul className="mt-20 grid gap-px overflow-hidden rounded-[28px] border border-cocoa/10 bg-cocoa/10 md:mt-28 md:grid-cols-3">
          {facts.map((f, i) => (
            <li key={f.unit} className="bg-ivory">
              <Reveal delay={i * 0.1} className="h-full">
                <HotGroup className="h-full p-8 transition-colors duration-500 hot:bg-paper md:p-10">
                <p className="flex items-baseline gap-3">
                  <span className="font-display text-7xl text-cocoa transition-colors group-hot:text-rose-deep md:text-8xl">{f.big}</span>
                  <span className="font-serif text-2xl italic text-cocoa-soft">{f.unit}</span>
                </p>
                <p className="mt-4 max-w-xs text-cocoa-soft">{f.text}</p>
                </HotGroup>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
