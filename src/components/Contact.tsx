"use client";

import { AnimatePresence, motion } from "motion/react";
import { ArrowUp, ArrowUpRight, Check, Copy, Mail, Phone } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { SectionLabel } from "./SectionLabel";
import { Sparkle, WaveLines } from "./ui/Decor";
import { Magnetic } from "./ui/Magnetic";
import { Marquee } from "./ui/Marquee";
import { Reveal, SplitReveal } from "./ui/Reveal";
import { profile } from "@/data/portfolio";
import { HotGroup } from "./ui/useTouchHot";

function CopyEmail() {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
    } catch {
      // Fallback for browsers without async clipboard access.
      const t = document.createElement("textarea");
      t.value = profile.email;
      document.body.appendChild(t);
      t.select();
      document.execCommand("copy");
      t.remove();
    }
    setCopied(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 2200);
  };

  return (
    <button
      type="button"
      onClick={copy}
      className="relative inline-flex h-12 items-center gap-2 overflow-hidden rounded-full border border-cocoa/25 px-5 text-sm text-cocoa transition-colors hover:border-cocoa hover:bg-paper"
      aria-label={copied ? "Email copied" : "Copy email address"}
    >
      <AnimatePresence mode="wait" initial={false}>
        {copied ? (
          <motion.span key="ok" className="flex items-center gap-2" initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -16, opacity: 0 }}>
            <Check className="size-4 text-rose-deep" aria-hidden /> Copied!
          </motion.span>
        ) : (
          <motion.span key="copy" className="flex items-center gap-2" initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -16, opacity: 0 }}>
            <Copy className="size-4" aria-hidden /> Copy email
          </motion.span>
        )}
      </AnimatePresence>
      <span role="status" className="sr-only">
        {copied ? "Email address copied to clipboard" : ""}
      </span>
    </button>
  );
}

export function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden px-5 pt-24 md:px-10 md:pt-40">
      <WaveLines aria-hidden className="pointer-events-none absolute -right-10 top-10 w-48 text-blush md:w-72" />
      <div aria-hidden className="pointer-events-none absolute -left-40 top-1/3 size-[480px] rounded-full bg-blush/50 blur-3xl" />

      <div className="relative mx-auto max-w-[1400px]">
        <SectionLabel index="06">Contact</SectionLabel>

        <h2 className="mt-10 font-display text-[15vw] leading-[0.86] md:text-[9.5vw] xl:text-[9rem]">
          <SplitReveal text="Let’s create" />
          <br />
          <SplitReveal text="something" delay={0.1} className="lg:pl-[18%]" />
          <br />
          <SplitReveal text="unforgettable." italic={["unforgettable"]} delay={0.2} />
        </h2>

        <div className="mt-12 grid gap-12 lg:mt-16 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <p className="font-serif text-2xl italic leading-snug text-cocoa-soft md:text-3xl">
              Have a brand, a story, or an idea? Let’s bring it to life.
            </p>
            <p className="mt-6 flex items-center gap-3 text-sm text-cocoa-soft">
              <span className="relative flex size-2.5">
                <span className="absolute inset-0 animate-pulse-ring rounded-full bg-peach" />
                <span className="relative size-2.5 rounded-full bg-[#d9785b]" />
              </span>
              Available for creative collaborations
            </p>
          </Reveal>

          <Reveal delay={0.1} className="space-y-4 lg:col-span-7">
            {/* Email */}
            <HotGroup className="rounded-[28px] border border-cocoa/15 bg-paper/80 p-6 backdrop-blur transition-colors hot:border-cocoa/40 md:p-8">
              <p className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-cocoa-soft">
                <Mail className="size-3.5" aria-hidden /> Email
              </p>
              <a
                href={`mailto:${profile.email}`}
                className="mt-3 block font-display text-[6.2vw] leading-tight text-cocoa transition-colors [overflow-wrap:anywhere] hover:text-rose-deep sm:text-4xl lg:text-[2.6rem] xl:text-5xl"
              >
                {profile.email}
              </a>
              <div className="mt-6 flex flex-wrap gap-3">
                <Magnetic strength={0.2}>
                  <a
                    href={`mailto:${profile.email}`}
                    className="group/btn inline-flex h-12 items-center gap-2 rounded-full bg-cocoa px-6 text-sm text-ivory transition-colors hover:bg-rose-deep"
                  >
                    Write to me
                    <ArrowUpRight className="size-4 transition-transform duration-500 group-hover/btn:rotate-45" aria-hidden />
                  </a>
                </Magnetic>
                <CopyEmail />
              </div>
            </HotGroup>

            {/* Phone */}
            <HotGroup
              as="a"
              href={profile.phoneHref}
              className="flex items-center justify-between gap-4 rounded-[28px] border border-cocoa/15 bg-paper/80 p-6 backdrop-blur transition-colors hot:border-cocoa/40 hot:bg-blush/40 md:p-8"
            >
              <span>
                <span className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-cocoa-soft">
                  <Phone className="size-3.5" aria-hidden /> Phone
                </span>
                <span className="mt-3 block font-display text-[1.9rem] leading-tight sm:text-4xl md:text-5xl">
                  {profile.phoneDisplay}
                </span>
              </span>
              <span className="flex size-14 shrink-0 items-center justify-center rounded-full bg-peach text-cocoa transition-transform duration-500 group-hot:-rotate-12 group-hot:scale-110">
                <Phone className="size-5" aria-hidden />
              </span>
            </HotGroup>
          </Reveal>
        </div>
      </div>

      {/* Closing */}
      <footer className="relative -mx-5 mt-28 md:-mx-10 md:mt-40">
        <div aria-hidden className="border-y border-cocoa/10 py-4">
          <Marquee duration={30}>
            {Array.from({ length: 4 }).map((_, i) => (
              <span key={i} className="flex items-center">
                <span className="px-6 font-display text-[18vw] italic leading-none md:text-[11rem]">Thank you</span>
                <Sparkle className="size-8 text-rose md:size-14" />
                <span className="text-outline px-6 font-display text-[18vw] leading-none md:text-[11rem]">Thank you</span>
                <Sparkle className="size-8 text-peach md:size-14" />
              </span>
            ))}
          </Marquee>
        </div>
        <div className="mx-auto flex max-w-[1400px] flex-col items-start justify-between gap-6 px-5 py-8 text-sm text-cocoa-soft md:flex-row md:items-center md:px-10">
          <p>
            <span className="font-display text-xl text-cocoa">{profile.name}</span>
            <span className="mx-2 text-rose">·</span>
            {profile.role}
          </p>
          <p>Portfolio © 2026</p>
          <a
            href="#top"
            className="group inline-flex items-center gap-2 rounded-full border border-cocoa/20 px-4 py-2 text-cocoa transition-colors hover:bg-cocoa hover:text-ivory"
          >
            Back to top <ArrowUp className="size-4 transition-transform group-hover:-translate-y-0.5" aria-hidden />
          </a>
        </div>
      </footer>
    </section>
  );
}
