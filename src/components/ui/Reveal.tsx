"use client";

import { motion, useInView, type HTMLMotionProps } from "motion/react";
import { useRef, type ElementType, type ReactNode } from "react";

const ease = [0.16, 1, 0.3, 1] as const;

/** Fades + lifts its children into view once. */
export function Reveal({
  children,
  delay = 0,
  y = 32,
  className,
  ...rest
}: { children: ReactNode; delay?: number; y?: number } & HTMLMotionProps<"div">) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -4% 0px" }}
      transition={{ duration: 0.8, delay, ease }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/**
 * Splits text into words (or letters) that slide up from a mask.
 * The full string stays available to screen readers via aria-label.
 */
export function SplitReveal({
  text,
  as: Tag = "span",
  by = "word",
  className,
  delay = 0,
  stagger,
  play,
  italic = [],
  italicClass = "text-rose-deep",
}: {
  text: string;
  as?: ElementType;
  by?: "word" | "letter";
  className?: string;
  delay?: number;
  stagger?: number;
  /** Controls playback explicitly; otherwise plays when scrolled into view. */
  play?: boolean;
  /** Words to render in italic accent style. */
  italic?: string[];
  italicClass?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -4% 0px" });
  const active = play ?? inView;
  const words = text.split(" ");
  const step = stagger ?? (by === "letter" ? 0.04 : 0.055);
  let index = 0;

  return (
    <Tag ref={ref} className={className} aria-label={text}>
      {words.map((word, wi) => {
        const isItalic = italic.includes(word.replace(/[.,!?]/g, ""));
        const parts = by === "letter" ? word.split("") : [word];
        return (
          <span key={wi} aria-hidden className="inline-block whitespace-nowrap">
            {parts.map((p, pi) => {
              const i = index++;
              return (
                <span key={pi} className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom">
                  <motion.span
                    className={`inline-block ${isItalic ? `italic ${italicClass}` : ""}`}
                    initial={{ y: "105%", rotate: by === "letter" ? 6 : 2 }}
                    animate={active ? { y: "0%", rotate: 0 } : undefined}
                    transition={{ duration: 0.85, delay: delay + i * step, ease }}
                  >
                    {p}
                  </motion.span>
                </span>
              );
            })}
            {wi < words.length - 1 && <span className="inline-block">&nbsp;</span>}
          </span>
        );
      })}
    </Tag>
  );
}

/** A highlighter stroke that paints behind a phrase when it scrolls into view. */
export function Highlight({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -20% 0px" });
  return (
    <span
      ref={ref}
      className={`mark ${inView ? "is-on" : ""}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </span>
  );
}
