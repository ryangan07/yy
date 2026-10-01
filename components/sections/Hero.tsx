import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { business } from "@/lib/constants";
import Reveal from "@/components/ui/Reveal";
import RippleDistortion from "@/components/effects/RippleDistortion";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black"
    >
      <div className="absolute inset-0">
        <RippleDistortion
          src="/images/accent-2.webp"
          grayscale
          tint="#FAF8F5"
          tintAmount={0.5}
          highlightColor="#FAF8F5"
          glint={0.15}
          brushSize={185}
          spacing={30}
          rings={2}
          fade={2}
          quality="medium"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-black/50" />

      <div className="pointer-events-none relative mx-auto flex w-full max-w-content flex-col items-center px-6 pt-20 text-center">
        <Reveal className="flex flex-col items-center">
          <p className="text-xs uppercase tracking-[0.16em] text-bg [text-shadow:0_1px_4px_rgba(0,0,0,0.6)]">
            {business.ren} · {business.agency}
          </p>
          <h1 className="mt-4 max-w-3xl text-hero text-bg">
            Property decisions,
            <br />
            negotiated with care.
          </h1>
          <p className="mt-6 max-w-measure text-lg leading-relaxed text-bg/80">
            Client-Focused. Community-Driven. Relationship-Based. Results-Oriented.
            <br />
            Residential, commercial and investment guidance across {business.areasServedText} —
            from a negotiator who answers quickly and follows through.
          </p>
          <div className="pointer-events-auto mt-8">
            <Link
              href="/listings"
              className="group flex items-center gap-2 rounded bg-bg px-8 py-3.5 text-sm text-ink shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
            >
              View Listings
              <ArrowRight strokeWidth={1.5} size={18} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </Reveal>
      </div>

      <a
        href="#about"
        aria-label="Scroll to next section"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-bg/70 transition-colors hover:text-camel"
      >
        <ChevronDown strokeWidth={1.5} size={28} />
      </a>
    </section>
  );
}
