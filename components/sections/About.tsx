import Image from "next/image";
import Link from "next/link";
import { business } from "@/lib/constants";
import Reveal from "@/components/ui/Reveal";

export default function About() {
  return (
    <section
      id="about"
      className="mx-auto flex min-h-screen max-w-content flex-col items-center justify-center gap-12 px-6 py-section-mobile md:flex-row md:py-section"
    >
      <Reveal className="w-full max-w-xs shrink-0 md:max-w-sm">
        <div className="relative aspect-[3/4] overflow-hidden rounded bg-surface">
          <Image
            src="/images/winnie-portrait.webp"
            alt={business.name}
            fill
            sizes="(min-width: 768px) 384px, 320px"
            className="object-cover"
          />
        </div>
      </Reveal>

      <Reveal className="flex-1">
        <p className="text-xs uppercase tracking-[0.16em] text-muted">About</p>
        <h2 className="mt-3 text-h2 text-ink">A negotiator who follows through</h2>
        <div className="mt-6 max-w-measure space-y-4 text-base leading-relaxed text-body">
          <p>
            With more than two decades of property experience, {business.name} ({business.ren}) has
            built her career around helping clients make confident property decisions across the Klang
            Valley, Putrajaya, Cyberjaya, Seri Kembangan and Puchong.
          </p>
          <p>
            Having successfully closed over 100 property transactions, Winnie has also received Monthly
            and Quarterly recognition for Top Sales, Top Cases and Top Rising Star at The Roof Realty Sdn.
            Bhd. ({business.agencyZh}).
          </p>
          <p>
            At the heart of her professional journey are four enduring values: Hard Work, Honesty,
            Humility and Trustworthiness. For Winnie, every transaction is more than a deal — it is an
            opportunity to build trust, nurture relationships and create lasting value. Her commitment to
            these principles has resulted in strong client relationships and continued referrals.
          </p>
          <p>
            Guided by her C²R² philosophy — Client-Focused, Community-Driven, Relationship-Based,
            Results-Oriented, Winnie remains dedicated to delivering a refined and dependable property
            experience for every client.
          </p>
        </div>

        <div className="mt-6">
          <p className="text-xs uppercase tracking-[0.16em] text-muted">Areas I Serve</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {business.areasServed.map((area) => (
              <Link
                key={area}
                href={`/listings?area=${encodeURIComponent(area)}`}
                className="rounded-full border border-camel/60 px-4 py-1.5 text-sm text-ink transition-colors duration-200 hover:border-camel hover:bg-camel/10"
              >
                {area}
              </Link>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
