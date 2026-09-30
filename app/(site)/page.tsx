import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import Listings from "@/components/sections/Listings";
import C2R2 from "@/components/sections/C2R2";
import WhyChooseMe from "@/components/sections/WhyChooseMe";
import Testimonials from "@/components/sections/Testimonials";
import Faq from "@/components/sections/Faq";
import Contact from "@/components/sections/Contact";
import CursorGrid from "@/components/effects/CursorGrid";
import SectionNav from "@/components/layout/SectionNav";

// Listings come from Firestore — render per request so edits show up immediately.
export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <main>
      <SectionNav />
      <Hero />

      <div className="relative">
        <div className="fixed inset-0 -z-10">
          <CursorGrid
            cellSize={44}
            color="#B08152"
            radius={180}
            falloff="smooth"
            holdTime={120}
            fadeDuration={900}
            lineWidth={1}
            maxOpacity={0.6}
            fillOpacity={0.15}
            gridOpacity={0.1}
            cellRadius={3}
          />
        </div>
        <About />
        <Services />
        <Listings />
        <C2R2 />
        <WhyChooseMe />
        <Testimonials />
        <Faq />
        <Contact />
      </div>
    </main>
  );
}
