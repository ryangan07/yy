import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Stats from "@/components/sections/Stats";
import Services from "@/components/sections/Services";
import Listings from "@/components/sections/Listings";
import C2R2 from "@/components/sections/C2R2";
import WhyChooseMe from "@/components/sections/WhyChooseMe";
import Testimonials from "@/components/sections/Testimonials";
import Faq from "@/components/sections/Faq";
import Contact from "@/components/sections/Contact";
import CursorGrid from "@/components/effects/CursorGrid";
import SectionNav from "@/components/layout/SectionNav";
import { business, siteUrl } from "@/lib/constants";

// Listings come from Firestore — render per request so edits show up immediately.
export const dynamic = "force-dynamic";

const agentJsonLd = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: business.name,
  description: `${business.title} — residential, commercial and investment consultation.`,
  url: siteUrl,
  image: `${siteUrl}/images/winnie-portrait.webp`,
  telephone: "+60162688885",
  email: business.email,
  identifier: { "@type": "PropertyValue", name: "REN", value: business.ren.replace("REN ", "") },
  address: {
    "@type": "PostalAddress",
    streetAddress: "25-1 Jalan OP 1/6, Pusat Perdagangan One Puchong",
    postalCode: "47160",
    addressLocality: "Puchong",
    addressRegion: "Selangor",
    addressCountry: "MY",
  },
  areaServed: business.areasServed.map((name) => ({ "@type": "City", name })),
  parentOrganization: {
    "@type": "RealEstateAgent",
    name: business.agency,
    url: business.agencySite,
    identifier: business.licence,
  },
};

export default function Home() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(agentJsonLd) }}
      />
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
        <Stats />
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
