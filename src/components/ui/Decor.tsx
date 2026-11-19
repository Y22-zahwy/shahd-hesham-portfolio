import type { SVGProps } from "react";

/** Four-point star used throughout the original PDF. */
export function Sparkle(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M12 0c.6 6.4 5.6 11.4 12 12-6.4.6-11.4 5.6-12 12-.6-6.4-5.6-11.4-12-12C6.4 11.4 11.4 6.4 12 0Z" />
    </svg>
  );
}

/** Concentric wavy lines, echoing the PDF's corner ornament. */
export function WaveLines(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden {...props}>
      {[0, 14, 28, 42].map((o) => (
        <path
          key={o}
          d={`M${20 + o} 0c-20 30 30 45 10 80s40 50 30 80 30 35 50 40`}
          strokeLinecap="round"
        />
      ))}
    </svg>
  );
}

/** Organic blob with a wandering line — the PDF's top-left motif. */
export function BlobScribble(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 260 220" fill="none" aria-hidden {...props}>
      <path
        d="M0 0h210c20 30-8 55-30 70-26 17-24 52-54 64-30 12-36 50-70 72C34 220 10 200 0 180Z"
        fill="var(--color-blush)"
        opacity=".85"
      />
      <path
        d="M-10 120c40-10 60 30 95 5 30-22 5-60 45-80 34-17 58 10 80-12 14-14 12-30 20-40"
        stroke="var(--color-cocoa)"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Hand-drawn circle used to "circle" words. */
export function ScribbleCircle(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 300 120" fill="none" preserveAspectRatio="none" aria-hidden {...props}>
      <path
        d="M248 18C190 2 66 4 26 30-14 57 28 104 140 108c96 4 160-20 154-54-5-30-80-46-150-42"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        pathLength={1}
      />
    </svg>
  );
}

/** Push-pin from the PDF's "Client Portfolio" pages. */
export function Pin(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 40 60" aria-hidden {...props}>
      <path d="M19 30 13 58" stroke="#2b1f1c" strokeWidth="2" strokeLinecap="round" />
      <path
        d="M12 6c4-5 18-5 20 2 1 4-3 6-5 8l1 9c4 2 6 5 4 8-4 4-18 4-22-1-2-3 1-6 5-7l2-9c-3-2-7-6-5-10Z"
        fill="#f4ecd9"
        stroke="#2b1f1c"
        strokeWidth="1.6"
      />
    </svg>
  );
}

export function Underline(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 400 20" fill="none" preserveAspectRatio="none" aria-hidden {...props}>
      <path
        d="M3 12C80 5 180 4 260 7s110 5 137 3"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
        pathLength={1}
      />
    </svg>
  );
}
