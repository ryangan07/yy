import Image from "next/image";
import { business } from "@/lib/constants";
import Reveal from "@/components/ui/Reveal";

export default function About() {
  return (
    <section
      id="about"
      className="mx-auto flex min-h-screen max-w-content flex-col items-center justify-center gap-12 px-6 py-section-mobile md:flex-row md:py-section"
    >
      <Reveal className="w-full max-w-xs shrink-0 md:max-w-sm">
        <div className="relative aspect-square overflow-hidden rounded bg-surface">
          <Image
            src="/images/winnie-portrait.webp"
            alt={business.name}
            fill
            sizes="(min-width: 768px) 384px, 320px"
            className="object-cover object-top"
          />
        </div>
      </Reveal>

      <Reveal className="flex-1">
        <p className="text-xs uppercase tracking-[0.16em] text-muted">About</p>
        <h2 className="mt-3 text-h2 text-ink">A negotiator who follows through</h2>
        <div className="mt-6 max-w-measure space-y-4 text-base leading-relaxed text-body">
          <p>
            I&apos;m {business.name}, a Real Estate Negotiator ({business.ren}) with{" "}
            {business.agency} ({business.agencyZh}), serving buyers, agents, investors and
            businesses across {business.areasServedText}.
          </p>
          <p>
            Over {business.yearsExperience} years in the field, I&apos;ve closed {business.caseCount}{" "}
            cases — recognised with monthly Top Sales, Top Cases and Top Rising Star honours —
            built on a simple habit: reply fast, tell the truth, and stay with a client until the
            paperwork is done.
          </p>
          <p>
            My approach follows a framework I call C2R2 — Client-Focused, Community-Driven,
            Relationship-Based, Results-Oriented. It&apos;s less a slogan than a checklist I hold
            myself to on every deal.
          </p>
        </div>

        <div className="mt-6">
          <p className="text-xs uppercase tracking-[0.16em] text-muted">Areas I Serve</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {business.areasServed.map((area) => (
              <span
                key={area}
                className="rounded-full border border-camel/60 px-4 py-1.5 text-sm text-ink"
              >
                {area}
              </span>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
