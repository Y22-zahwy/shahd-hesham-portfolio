"use client";

import { useInView } from "motion/react";
import { useEffect, useRef, useState, type ComponentPropsWithoutRef, type ElementType, type RefObject } from "react";

const TOUCH_QUERY = "(hover: none), (pointer: coarse)";

/** True on touch-first devices (phones, tablets). */
export function useIsTouch() {
  const [touch, setTouch] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(TOUCH_QUERY);
    const update = () => setTouch(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return touch;
}

/**
 * On touch devices, reports when the element sits in the middle band of the screen,
 * so it can show its hover state while the user scrolls past it.
 * Returns props to spread on the element: `data-hot` is present while active.
 */
export function useTouchHot<T extends Element>(ref: RefObject<T | null>, margin = "-35% 0px -35% 0px") {
  const touch = useIsTouch();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const inView = useInView(ref, { margin: margin as any });
  return { "data-hot": touch && inView ? "" : undefined };
}

/** A `.group` wrapper whose `group-hot:` / `hot:` styles also play on touch scroll. */
export function HotGroup<E extends ElementType = "div">({
  as,
  className = "",
  ...rest
}: { as?: E; className?: string } & Omit<ComponentPropsWithoutRef<E>, "as" | "className">) {
  const Tag = (as ?? "div") as ElementType;
  const ref = useRef<HTMLElement>(null);
  const hot = useTouchHot(ref);
  return <Tag ref={ref} className={`group ${className}`} {...hot} {...rest} />;
}
