"use client";

import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";
import { useState } from "react";
import { SectionLabel } from "./SectionLabel";
import { Sparkle } from "./ui/Decor";
import { Reveal, SplitReveal } from "./ui/Reveal";
import { services } from "@/data/portfolio";

export function Services() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="services" className="relative bg-paper px-5 py-24 md:px-10 md:py-40">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionLabel index="02">What I do</SectionLabel>
            <h2 className="mt-8 font-display text-6xl leading-[0.9] md:text-7xl xl:text-8xl">
              <SplitReveal text="Eight ways" />
              <br />
              <SplitReveal text="I make brands" delay={0.1} />
              <br />
              <SplitReveal text="talk better." italic={["talk"]} delay={0.2} />
            </h2>
          </div>
          <Reveal className="self-end lg:col-span-4 lg:col-start-9">
            <p className="text-lg leading-relaxed text-cocoa-soft">
              From the first round of research to the moment a post goes live — every step of the content journey, handled
              with care, curiosity and a clear voice.
            </p>
            {/* Floating keyword chips */}
            <div aria-hidden className="mt-8 flex flex-wrap gap-2">
              {["Strategy", "Ideas", "Scripts", "Captions", "Calendars", "Community"].map((k, i) => (
                <motion.span
                  key={k}
                  className="rounded-full border border-cocoa/15 bg-ivory px-4 py-1.5 text-sm text-cocoa"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 3 + (i % 3), repeat: Infinity, delay: i * 0.3, ease: "easeInOut" }}
                >
                  {k}
                </motion.span>
              ))}
            </div>
          </Reveal>
        </div>

        <ul className="mt-16 border-t border-cocoa/15 md:mt-24" onPointerLeave={(e) => e.pointerType === "mouse" && setActive(null)}>
          {services.map((s, i) => {
            const isOpen = active === i;
            return (
              <motion.li
                key={s.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -8% 0px" }}
                transition={{ duration: 0.9, delay: (i % 4) * 0.06 }}
                className="relative border-b border-cocoa/15"
                onPointerEnter={(e) => e.pointerType === "mouse" && setActive(i)}
              >
                {/* Hover fill */}
                <motion.span
                  aria-hidden
                  className="absolute inset-0 origin-top bg-blush/45"
                  initial={false}
                  animate={{ scaleY: isOpen ? 1 : 0 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                />
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`service-${i}`}
                  onClick={() => setActive(isOpen ? null : i)}
                  className="relative flex w-full items-center gap-4 py-6 text-left md:gap-10 md:px-4 md:py-8"
                >
                  <span className="w-10 shrink-0 font-serif text-lg italic text-rose-deep md:w-16 md:text-2xl">
                    0{i + 1}
                  </span>
                  <motion.span
                    className="flex-1 font-display text-[1.9rem] leading-[1] md:text-6xl"
                    animate={{ x: isOpen ? 16 : 0 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {s.title}
                  </motion.span>
                  <motion.span
                    className="flex size-10 shrink-0 items-center justify-center rounded-full border border-cocoa/25 md:size-14"
                    animate={{
                      rotate: isOpen ? 135 : 0,
                      backgroundColor: isOpen ? "#45302C" : "rgba(0,0,0,0)",
                      color: isOpen ? "#FAF6F0" : "#45302C",
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <Plus className="size-4 md:size-5" aria-hidden />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`service-${i}`}
                      key="body"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                      className="relative overflow-hidden"
                    >
                      <div className="flex flex-col gap-5 pb-8 pl-14 pr-4 md:flex-row md:items-center md:justify-between md:pl-[7.5rem] md:pr-20">
                        <p className="max-w-xl text-base leading-relaxed text-cocoa md:text-lg">{s.blurb}</p>
                        <ul className="flex flex-wrap gap-2" aria-label="Keywords">
                          {s.tags.map((t, ti) => (
                            <motion.li
                              key={t}
                              initial={{ opacity: 0, y: 10, scale: 0.9 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              transition={{ delay: 0.1 + ti * 0.06 }}
                              className="flex items-center gap-1.5 rounded-full bg-ivory px-3.5 py-1.5 text-sm text-cocoa"
                            >
                              <Sparkle className="size-2.5 text-rose" />
                              {t}
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
