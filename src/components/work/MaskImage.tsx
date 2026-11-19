"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useRef } from "react";
import { useTouchHot } from "../ui/useTouchHot";
import type { Artwork } from "@/data/portfolio";

/** Artwork that unveils with a clip-path wipe and settles from a slight zoom. */
export function MaskImage({
  art,
  delay = 0,
  sizes,
  className = "",
  rounded = "rounded-[18px]",
}: {
  art: Artwork;
  delay?: number;
  sizes: string;
  className?: string;
  rounded?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const hot = useTouchHot(ref);
  return (
    <motion.div
      ref={ref}
      {...hot}
      className={`group relative overflow-hidden bg-blush/40 ${rounded} ${className}`}
      style={{ aspectRatio: `${art.width} / ${art.height}` }}
      initial={{ clipPath: "inset(100% 0% 0% 0% round 18px)" }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0% round 18px)" }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 1.3, delay, ease: [0.76, 0, 0.24, 1] }}
    >
      <motion.div
        className="h-full w-full"
        initial={{ scale: 1.25 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
        transition={{ duration: 1.6, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        <Image
          src={art.src}
          alt={art.alt}
          width={art.width}
          height={art.height}
          sizes={sizes}
          quality={90}
          className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out-expo group-hot:scale-[1.05]"
        />
      </motion.div>
    </motion.div>
  );
}
