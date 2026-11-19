import { About } from "@/components/About";
import { BrandMarquee } from "@/components/BrandMarquee";
import { Contact } from "@/components/Contact";
import { Experience } from "@/components/Experience";
import { Hero } from "@/components/Hero";
import { Nav } from "@/components/Nav";
import { Process } from "@/components/Process";
import { Services } from "@/components/Services";
import { Work } from "@/components/work/Work";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <BrandMarquee />
        <About />
        <Services />
        <Experience />
        <Work />
        <Process />
        <Contact />
      </main>
    </>
  );
}
