import { Marquee } from "./ui/Marquee";
import { Sparkle } from "./ui/Decor";
import { projects } from "@/data/portfolio";

const brands = Array.from(new Set(projects.map((p) => p.brand)));

export function BrandMarquee() {
  return (
    <section aria-label="Brands Shahd has created content for" className="relative border-y border-cocoa/10 bg-cocoa py-6 text-ivory md:py-8">
      <h2 className="sr-only">Brands I’ve created content for</h2>
      <p className="sr-only">{brands.join(", ")}</p>
      <div aria-hidden>
        <Marquee duration={55}>
          {brands.map((b, i) => (
            <span key={b} className="flex items-center">
              <span className={`px-6 font-display text-4xl md:px-10 md:text-6xl ${i % 2 ? "italic text-blush" : ""}`}>{b}</span>
              <Sparkle className="size-4 text-peach md:size-5" />
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
