"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { Sparkle } from "./ui/Decor";

const word = "Shahd".split("");

export function Preloader({ onDone }: { onDone: () => void }) {
  const reduce = useReducedMotion();
  const [show, setShow] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShow(false), reduce ? 0 : 1700);
    document.documentElement.style.overflow = "hidden";
    return () => clearTimeout(t);
  }, [reduce]);

  return (
    <AnimatePresence
      onExitComplete={() => {
        document.documentElement.style.overflow = "";
        onDone();
      }}
    >
      {show && (
        <motion.div
          key="preloader"
          aria-hidden
          className="fixed inset-0 z-[90] flex items-center justify-center bg-cocoa text-ivory"
          initial={{ clipPath: "inset(0% 0% 0% 0%)" }}
          exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="relative flex items-end overflow-hidden">
            {word.map((l, i) => (
              <motion.span
                key={i}
                className="font-display inline-block text-[22vw] italic leading-[1] md:text-[11rem]"
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ delay: 0.1 + i * 0.07, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              >
                {l}
              </motion.span>
            ))}
            <motion.span
              className="absolute -right-8 top-4 text-peach md:-right-12"
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.7, duration: 0.8, type: "spring", bounce: 0.5 }}
            >
              <Sparkle className="size-8 md:size-12" />
            </motion.span>
          </div>
          <motion.p
            className="absolute bottom-10 left-0 right-0 text-center text-xs uppercase tracking-[0.4em] text-blush"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Portfolio · 2026
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
