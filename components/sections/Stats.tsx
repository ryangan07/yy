import Reveal from "@/components/ui/Reveal";
import CountUp from "@/components/ui/CountUp";

const stats = [
  { value: 100, label: "Properties Transacted" },
  { value: 4, label: "Spoken Languages" },
  { value: 100, label: "Happy clients" },
  { value: 6, label: "Area" },
];

export default function Stats() {
  return (
    <section aria-label="Winnie Wong in numbers" className="border-y border-line bg-surface">
      {/* The 1px gap over a line-coloured background draws the dividers: 2×2 on phones, one row from md. */}
      <Reveal className="mx-auto grid max-w-content grid-cols-2 gap-px bg-line md:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="flex flex-col items-center bg-surface px-4 py-10 text-center md:py-14">
            <p className="font-display text-stat font-light text-camel">
              <CountUp to={s.value} />+
            </p>
            <p className="mt-2 text-xs uppercase tracking-[0.16em] text-muted">{s.label}</p>
          </div>
        ))}
      </Reveal>
    </section>
  );
}
