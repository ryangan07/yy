import Reveal from "@/components/ui/Reveal";

const pillars = [
  {
    index: "C",
    title: "Client-Focused",
    description: "Your goals set the pace of every conversation, not a sales quota.",
  },
  {
    index: "2",
    title: "Community-Driven",
    description: "Local knowledge of KL, Putrajaya, Cyberjaya, Seri Kembangan and Puchong, put to work for you.",
  },
  {
    index: "R",
    title: "Relationship-Based",
    description: "The work doesn't stop at signing — most clients come back, or send someone who does.",
  },
  {
    index: "2",
    title: "Results-Oriented",
    description: "Clear outcomes, tracked from first enquiry to closed deal.",
  },
];

export default function C2R2() {
  return (
    <section id="c2r2" className="flex min-h-screen items-center py-section-mobile md:py-section">
      <div className="mx-auto max-w-content px-6">
        <Reveal className="mx-auto max-w-measure text-center">
          <p className="text-xs uppercase tracking-[0.16em] text-muted">My framework</p>
          <h2 className="mt-3 text-h2 text-ink">C2R2</h2>
          <p className="mt-4 text-body">
            Four commitments that shape how I work with every client, every time.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-10 border-t border-line pt-14 md:grid-cols-4">
          {pillars.map((pillar, i) => (
            <Reveal key={pillar.title + i} delay={i * 0.12} className="group cursor-default">
              <span className="inline-block font-display text-stat font-light text-camel transition-transform duration-300 group-hover:scale-110">
                {pillar.index}
              </span>
              <h3 className="mt-2 text-lg font-medium text-ink">{pillar.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-body">{pillar.description}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
