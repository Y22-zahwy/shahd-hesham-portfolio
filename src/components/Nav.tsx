"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Sparkle } from "./ui/Decor";
import { profile } from "@/data/portfolio";

const links = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#experience", label: "Experience" },
  { href: "#work", label: "Work" },
  { href: "#process", label: "Process" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  const menuButton = useRef<HTMLButtonElement>(null);
  const firstLink = useRef<HTMLAnchorElement>(null);

  useMotionValueEvent(scrollY, "change", (v) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(v > 40);
    setHidden(v > prev && v > 240 && !open);
  });

  useEffect(() => {
    if (!open) return;
    const button = menuButton.current;
    document.documentElement.style.overflow = "hidden";
    firstLink.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      button?.focus();
    };
  }, [open]);

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-[70]"
        animate={{ y: hidden ? "-110%" : "0%" }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <nav
          aria-label="Main"
          className={`mx-auto mt-3 flex max-w-[1400px] items-center justify-between rounded-full px-5 py-3 transition-all duration-500 md:mx-6 md:px-6 lg:mx-auto ${
            scrolled && !open ? "mx-3 bg-ivory/80 shadow-[0_8px_30px_-12px_rgba(69,48,44,0.25)] backdrop-blur-md" : "mx-3"
          }`}
        >
          <a href="#top" className="group relative z-[70] flex items-center gap-2" aria-label="Shahd Hesham — back to top">
            <span className={`font-display text-2xl italic transition-colors ${open ? "text-ivory" : "text-cocoa"}`}>
              {profile.firstName}
            </span>
            <Sparkle className={`size-3 transition-transform duration-700 group-hover:rotate-180 ${open ? "text-peach" : "text-rose"}`} />
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="group relative block overflow-hidden px-3 py-2 text-sm text-cocoa"
                >
                  <span className="block transition-transform duration-500 ease-out-expo group-hover:-translate-y-full">
                    {l.label}
                  </span>
                  <span aria-hidden className="absolute inset-0 block translate-y-full px-3 py-2 font-serif text-base italic leading-5 text-rose-deep transition-transform duration-500 ease-out-expo group-hover:translate-y-0">
                    {l.label}
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <a
            href="#contact"
            className="hidden rounded-full bg-cocoa px-5 py-2.5 text-sm text-ivory transition-colors hover:bg-rose-deep md:inline-block"
          >
            Let’s talk
          </a>

          <button
            ref={menuButton}
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="relative z-[70] flex size-11 items-center justify-center rounded-full md:hidden"
          >
            <span className="relative block h-3 w-6">
              <motion.span
                className={`absolute left-0 top-0 h-[1.5px] w-full ${open ? "bg-ivory" : "bg-cocoa"}`}
                animate={open ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
              />
              <motion.span
                className={`absolute bottom-0 left-0 h-[1.5px] ${open ? "bg-ivory" : "bg-cocoa"}`}
                animate={open ? { rotate: -45, y: -5.5, width: "100%" } : { rotate: 0, y: 0, width: "65%" }}
              />
            </span>
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-0 z-[60] flex flex-col justify-between bg-cocoa px-6 pb-10 pt-28 text-ivory md:hidden"
            initial={{ clipPath: "circle(0% at calc(100% - 40px) 40px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 40px) 40px)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 40px) 40px)" }}
            transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
          >
            <ul className="space-y-1">
              {[...links, { href: "#contact", label: "Contact" }].map((l, i) => (
                <li key={l.href} className="overflow-hidden">
                  <motion.a
                    ref={i === 0 ? firstLink : undefined}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline gap-4 py-1 font-display text-[14vw] leading-[1.08]"
                    initial={{ y: "100%" }}
                    animate={{ y: "0%" }}
                    exit={{ y: "100%" }}
                    transition={{ delay: 0.15 + i * 0.06, duration: 0.7 }}
                  >
                    <span className="font-sans text-xs tracking-widest text-blush">0{i + 1}</span>
                    <span className={i % 2 ? "italic" : ""}>{l.label}</span>
                  </motion.a>
                </li>
              ))}
            </ul>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
              className="space-y-1 text-sm text-blush"
            >
              <a href={`mailto:${profile.email}`} className="block underline-offset-4 hover:underline">
                {profile.email}
              </a>
              <a href={profile.phoneHref} className="block underline-offset-4 hover:underline">
                {profile.phoneDisplay}
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
