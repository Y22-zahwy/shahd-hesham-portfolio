"use client";

import Image from "next/image";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useAnimationFrame,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { useEffect, useRef } from "react";
import { useIsTouch } from "./ui/useTouchHot";
import { useIntroDone } from "./Providers";
import { BlobScribble, Pin, Sparkle, WaveLines } from "./ui/Decor";
import { Magnetic } from "./ui/Magnetic";
import { SplitReveal } from "./ui/Reveal";
import { profile } from "@/data/portfolio";

const collage = [
  { src: "/work/shams/02.webp", alt: "Shams social post", w: 512, h: 640, rot: -7, depth: 26, cls: "left-[2%] top-[14%] w-[44%]" },
  { src: "/work/quick-connect/01.webp", alt: "Quick Connect social post", w: 540, h: 675, rot: 5, depth: 46, cls: "right-[2%] top-[0%] w-[48%] z-10" },
  { src: "/work/elite/01.webp", alt: "Elite social post", w: 540, h: 675, rot: -2, depth: 64, cls: "left-[24%] top-[46%] w-[44%] z-20" },
];

function useLayer(mx: MotionValue<number>, my: MotionValue<number>, depth: number) {
  const x = useTransform(mx, (v) => v * depth);
  const y = useTransform(my, (v) => v * depth);
  return { x, y };
}

function CollageCard({
  item,
  i,
  mx,
  my,
  play,
}: {
  item: (typeof collage)[number];
  i: number;
  mx: MotionValue<number>;
  my: MotionValue<number>;
  play: boolean;
}) {
  const { x, y } = useLayer(mx, my, item.depth);
  return (
    <motion.figure className={`absolute ${item.cls}`} style={{ x, y }}>
      <motion.div
        initial={{ opacity: 0, y: 80, rotate: item.rot * 2, scale: 0.9 }}
        animate={play ? { opacity: 1, y: 0, rotate: item.rot, scale: 1 } : undefined}
        transition={{ delay: 0.5 + i * 0.15, duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ rotate: 0, scale: 1.04, transition: { duration: 0.5 } }}
        whileTap={{ rotate: 0, scale: 1.06, transition: { duration: 0.4 } }}
        className="relative rounded-[4px] bg-paper p-2 pb-8 shadow-[0_30px_60px_-25px_rgba(69,48,44,0.45)] md:p-3 md:pb-10"
      >
        <Pin className="absolute -top-6 left-1/2 z-10 h-10 w-7 -translate-x-1/2" />
        <Image
          src={item.src}
          alt={item.alt}
          width={item.w}
          height={item.h}
          sizes="(min-width: 1024px) 18vw, 30vw"
          quality={90}
          fetchPriority={i === 1 ? "high" : "auto"}
          className="h-auto w-full rounded-[2px]"
        />
      </motion.div>
    </motion.figure>
  );
}

export function Hero() {
  const play = useIntroDone();
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const mx = useSpring(rawX, { stiffness: 60, damping: 18 });
  const my = useSpring(rawY, { stiffness: 60, damping: 18 });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const headY = useTransform(scrollYProgress, [0, 1], ["0%", "-25%"]);
  const collageY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const decoA = useLayer(mx, my, -30);
  const decoB = useLayer(mx, my, 40);

  // Phones have no mouse: the collage drifts on its own, and follows the
  // phone's tilt where the browser exposes it without a permission prompt.
  const touch = useIsTouch();
  const tilt = useRef<{ x: number; y: number } | null>(null);
  useEffect(() => {
    if (!touch || reduce) return;
    const onTilt = (e: DeviceOrientationEvent) => {
      if (e.gamma == null || e.beta == null) return;
      tilt.current = {
        x: Math.max(-0.5, Math.min(0.5, e.gamma / 40)),
        y: Math.max(-0.5, Math.min(0.5, (e.beta - 45) / 50)),
      };
    };
    window.addEventListener("deviceorientation", onTilt);
    return () => window.removeEventListener("deviceorientation", onTilt);
  }, [touch, reduce]);
  useAnimationFrame((t) => {
    if (!touch || reduce) return;
    const driftX = Math.sin(t / 2600) * 0.32;
    const driftY = Math.cos(t / 3400) * 0.26;
    rawX.set(tilt.current ? tilt.current.x * 0.8 + driftX * 0.4 : driftX);
    rawY.set(tilt.current ? tilt.current.y * 0.8 + driftY * 0.4 : driftY);
  });

  const onMove = (e: React.PointerEvent) => {
    if (reduce || e.pointerType !== "mouse") return;
    rawX.set(e.clientX / window.innerWidth - 0.5);
    rawY.set(e.clientY / window.innerHeight - 0.5);
  };

  return (
    <section
      id="top"
      ref={ref}
      onPointerMove={onMove}
      className="relative isolate flex min-h-dvh flex-col overflow-hidden px-5 pb-10 pt-28 md:px-10 md:pt-32"
    >
      {/* Decorative layer */}
      <motion.div aria-hidden className="pointer-events-none absolute -left-24 top-10 -z-10 w-48 md:-left-28 md:top-14 md:w-72" style={decoA}>
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={play ? { opacity: 1, scale: 1 } : undefined} transition={{ duration: 1.4 }}>
          <BlobScribble className="w-full" />
        </motion.div>
      </motion.div>
      <motion.div aria-hidden className="pointer-events-none absolute -right-6 top-16 -z-10 w-40 text-taupe md:w-60" style={decoB}>
        <WaveLines className="w-full" />
      </motion.div>
      <div aria-hidden className="pointer-events-none absolute right-[8%] top-[44%] -z-10 hidden size-[38vw] rounded-full bg-blush/40 blur-3xl lg:block" />
      <Sparkle aria-hidden className="pointer-events-none absolute left-[46%] top-[22%] hidden size-5 animate-float md:block text-peach [--r:12deg]" />
      <Sparkle aria-hidden className="pointer-events-none absolute bottom-[8%] right-[46%] size-7 animate-float text-cocoa [animation-delay:-3s]" />
      <Sparkle aria-hidden className="pointer-events-none absolute right-[42%] bottom-[12%] hidden size-4 animate-float text-rose md:block [animation-delay:-1.5s]" />

      {/* Meta row */}
      <motion.div
        className="mx-auto flex w-full max-w-[1400px] flex-wrap items-center justify-between gap-3 text-xs uppercase tracking-[0.25em] text-cocoa-soft"
        initial={{ opacity: 0, y: -10 }}
        animate={play ? { opacity: 1, y: 0 } : undefined}
        transition={{ delay: 0.2, duration: 0.9 }}
      >
        <span>Portfolio — 2026</span>
        <span className="flex items-center gap-3 rounded-full border border-cocoa/15 bg-paper/70 px-4 py-2 normal-case tracking-normal text-cocoa backdrop-blur">
          <span className="relative flex size-2.5">
            <span className="absolute inset-0 animate-pulse-ring rounded-full bg-peach" />
            <span className="relative size-2.5 rounded-full bg-[#d9785b]" />
          </span>
          <span className="text-[13px]">Available for creative collaborations</span>
        </span>
      </motion.div>

      <div className="mx-auto grid w-full max-w-[1400px] flex-1 items-center gap-10 pt-8 lg:grid-cols-12 lg:gap-6 lg:pt-0">
        <motion.div className="relative lg:col-span-7" style={{ y: headY, opacity: fade }}>
          <h1 className="font-display text-[21vw] leading-[0.85] text-cocoa sm:text-[17vw] lg:text-[10.5vw] xl:text-[10rem]">
            <SplitReveal text="Hi, I’m Shahd." by="letter" italic={["Shahd"]} play={play} delay={0.15} />
          </h1>
          <div className="mt-6 max-w-2xl md:mt-8">
            <p className="font-serif text-[2.1rem] leading-[1.05] text-cocoa sm:text-5xl lg:text-[3.4rem]">
              <SplitReveal
                text="I turn ideas into stories worth sharing."
                italic={["stories"]}
                play={play}
                delay={0.85}
              />
            </p>
            <motion.div
              className="mt-1 w-56 text-rose md:w-72"
              initial={{ opacity: 0 }}
              animate={play ? { opacity: 1 } : undefined}
              transition={{ delay: 1.6 }}
            >
              <svg viewBox="0 0 400 20" className="h-3 w-full" aria-hidden>
                <motion.path
                  d="M3 12C80 5 180 4 260 7s110 5 137 3"
                  stroke="currentColor"
                  strokeWidth="5"
                  fill="none"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={play ? { pathLength: 1 } : undefined}
                  transition={{ delay: 1.6, duration: 1.2, ease: [0.65, 0, 0.35, 1] }}
                />
              </svg>
            </motion.div>
          </div>

          <motion.div
            className="mt-8 flex flex-col gap-8 md:mt-12 md:flex-row md:items-end md:gap-14"
            initial={{ opacity: 0, y: 20 }}
            animate={play ? { opacity: 1, y: 0 } : undefined}
            transition={{ delay: 1.35, duration: 1 }}
          >
            <div>
              <p className="font-display text-3xl text-cocoa">{profile.name}</p>
              <p className="mt-1 text-sm text-cocoa-soft">{profile.role}</p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Magnetic>
                <a
                  href="#work"
                  className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-cocoa py-4 pl-7 pr-4 text-ivory"
                >
                  <span className="absolute inset-0 origin-bottom scale-y-0 rounded-full bg-rose-deep transition-transform duration-500 ease-out-expo group-hover:scale-y-100" />
                  <span className="relative text-[15px]">Explore My Work</span>
                  <span className="relative flex size-9 items-center justify-center rounded-full bg-ivory text-cocoa transition-transform duration-500 group-hover:rotate-[-45deg]">
                    <ArrowDownRight className="size-4" />
                  </span>
                </a>
              </Magnetic>
              <Magnetic strength={0.25}>
                <a
                  href="#contact"
                  className="group inline-flex items-center gap-2 rounded-full border border-cocoa/30 px-6 py-4 text-[15px] text-cocoa transition-colors hover:border-cocoa hover:bg-blush/40"
                >
                  Let’s Collaborate
                  <ArrowUpRight className="size-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </Magnetic>
            </div>
          </motion.div>
        </motion.div>

        {/* Real work collage */}
        <motion.div
          className="relative mx-auto aspect-[1/1.05] w-full max-w-[420px] sm:max-w-[480px] lg:col-span-5 lg:max-w-none"
          style={{ y: collageY }}
          aria-label="A few pieces from Shahd’s portfolio"
          role="group"
        >
          {collage.map((item, i) => (
            <CollageCard key={item.src} item={item} i={i} mx={mx} my={my} play={play} />
          ))}
          <motion.div
            aria-hidden
            className="absolute -bottom-2 right-0 z-30 flex size-28 items-center justify-center md:size-32"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={play ? { opacity: 1, scale: 1 } : undefined}
            transition={{ delay: 1.4, type: "spring", bounce: 0.4 }}
          >
            <svg viewBox="0 0 100 100" className="absolute inset-0 animate-spin-slow text-cocoa">
              <defs>
                <path id="circlePath" d="M50 50m-38 0a38 38 0 1 1 76 0a38 38 0 1 1-76 0" />
              </defs>
              <text fontSize="9.5" letterSpacing="2.4" fill="currentColor" className="font-sans uppercase">
                <textPath href="#circlePath">Content · Strategy · Stories · </textPath>
              </text>
            </svg>
            <span className="flex size-12 items-center justify-center rounded-full bg-peach text-cocoa">
              <Sparkle className="size-5" />
            </span>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#about"
        aria-label="Scroll to About"
        className="mx-auto mt-10 hidden flex-col items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-cocoa-soft md:flex"
        initial={{ opacity: 0 }}
        animate={play ? { opacity: 1 } : undefined}
        transition={{ delay: 2 }}
      >
        Scroll
        <span className="relative h-12 w-px overflow-hidden bg-cocoa/15">
          <motion.span
            className="absolute inset-x-0 top-0 h-1/2 bg-cocoa"
            animate={{ y: ["-100%", "200%"] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: [0.65, 0, 0.35, 1] }}
          />
        </span>
      </motion.a>
    </section>
  );
}
