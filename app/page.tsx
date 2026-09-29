import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import C2R2 from "@/components/sections/C2R2";
import WhyChooseMe from "@/components/sections/WhyChooseMe";
import Testimonials from "@/components/sections/Testimonials";
import Faq from "@/components/sections/Faq";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Services />
      <C2R2 />
      <WhyChooseMe />
      <Testimonials />
      <Faq />
      <Contact />
    </main>
  );
}
