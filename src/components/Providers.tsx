"use client";

import { MotionConfig } from "motion/react";
import { createContext, useContext, useState, type ReactNode } from "react";
import { CustomCursor } from "./CustomCursor";
import { Preloader } from "./Preloader";

const IntroContext = createContext(false);

/** True once the entry animation has finished and the hero may play. */
export const useIntroDone = () => useContext(IntroContext);

export function Providers({ children }: { children: ReactNode }) {
  const [done, setDone] = useState(false);
  return (
    <MotionConfig reducedMotion="user" transition={{ ease: [0.16, 1, 0.3, 1] }}>
      <IntroContext.Provider value={done}>
        <Preloader onDone={() => setDone(true)} />
        <CustomCursor />
        {children}
      </IntroContext.Provider>
    </MotionConfig>
  );
}
