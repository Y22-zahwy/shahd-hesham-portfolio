import { Sparkle } from "./ui/Decor";

export function SectionLabel({ index, children, light = false }: { index: string; children: string; light?: boolean }) {
  return (
    <p
      className={`flex items-center gap-3 text-[13px] font-medium uppercase tracking-[0.28em] ${light ? "text-blush" : "text-cocoa"}`}
    >
      <span className={`font-serif text-lg normal-case italic tracking-normal ${light ? "text-peach" : "text-rose-deep"}`}>({index})</span>
      <span className={`h-px w-10 ${light ? "bg-blush/50" : "bg-cocoa/25"}`} />
      {children}
      <Sparkle className={`size-2.5 ${light ? "text-peach" : "text-rose"}`} />
    </p>
  );
}
