import Image from "next/image";
import { Home, Building2, TrendingUp } from "lucide-react";
import Reveal from "@/components/ui/Reveal";

const services = [
  {
    icon: Home,
    image: "/images/accent-1.webp",
    title: "Residential Sales",
    description:
      "Buying, selling or finding the right home — from first viewing to signed paperwork, handled with clear communication at every step.",
  },
  {
    icon: Building2,
    image: "/images/accent-2.webp",
    title: "Commercial",
    description:
      "Retail, office and industrial premises for businesses that need a negotiator who understands commercial terms, not just square footage.",
  },
  {
    icon: TrendingUp,
    image: "/images/accent-3.webp",
    title: "Investment Consultation",
    description:
      "Guidance on acquisition strategy and market positioning for investors building or growing a property portfolio.",
  },
];

export default function Services() {
  return (
    <section
      id="services"
      className="flex min-h-screen items-center bg-surface py-section-mobile md:py-section"
    >
      <div className="mx-auto max-w-content px-6">
        <Reveal className="mx-auto max-w-measure text-center">
          <p className="text-xs uppercase tracking-[0.16em] text-muted">Services</p>
          <h2 className="mt-3 text-h2 text-ink">Three ways I can help</h2>
        </Reveal>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {services.map((service, i) => (
            <Reveal key={service.title} delay={i * 0.12}>
              <div className="group overflow-hidden rounded border border-line transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={service.image}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <service.icon
                    strokeWidth={1.5}
                    size={28}
                    className="text-camel transition-transform duration-300 group-hover:scale-110"
                  />
                  <h3 className="mt-4 text-lg font-medium text-ink">{service.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-body">
                    {service.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
