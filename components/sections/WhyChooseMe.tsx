import { Zap, ShieldCheck, Heart } from "lucide-react";
import Reveal from "@/components/ui/Reveal";

const reasons = [
  {
    icon: Zap,
    title: "Quick Response Time",
    description: "Enquiries answered the same day — most within the hour.",
  },
  {
    icon: ShieldCheck,
    title: "Trustworthy & Honest",
    description: "Straight answers, even when they're not what you hoped to hear.",
  },
  {
    icon: Heart,
    title: "Passion to Find the Right Property",
    description: "Not just any listing — the one that actually fits what you need.",
  },
];

export default function WhyChooseMe() {
  return (
    <section
      id="why-choose-me"
      className="flex min-h-screen items-center bg-surface py-section-mobile md:py-section"
    >
      <div className="mx-auto max-w-content px-6">
        <Reveal className="mx-auto max-w-measure text-center">
          <p className="text-xs uppercase tracking-[0.16em] text-muted">Why Choose Me</p>
          <h2 className="mt-3 text-h2 text-ink">Reasons clients come back</h2>
        </Reveal>

        <div className="mt-12 grid gap-10 md:grid-cols-3">
          {reasons.map((reason, i) => (
            <Reveal key={reason.title} delay={i * 0.12} className="group text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-camel/60 transition-colors duration-300 group-hover:bg-camel">
                <reason.icon
                  strokeWidth={1.5}
                  size={24}
                  className="text-camel transition-colors duration-300 group-hover:text-white"
                />
              </div>
              <h3 className="mt-4 text-lg font-medium text-ink">{reason.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-body">{reason.description}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
