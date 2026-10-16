import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, MapPin, Phone } from "lucide-react";
import ListingCard from "@/components/listings/ListingCard";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import { getPublishedListings } from "@/lib/listingsServer";
import { areaBySlug, areas } from "@/lib/areas";
import { business, siteUrl, whatsappLink } from "@/lib/constants";
import { clip, pageOpenGraph } from "@/lib/seo";

// Shows Winnie's current listings in the area, so it reads Firestore per request.
export const dynamic = "force-dynamic";

type Props = { params: { slug: string } };

export function generateMetadata({ params }: Props): Metadata {
  const area = areaBySlug(params.slug);
  if (!area) return { title: "Area not found" };
  const title = `Property Agent in ${area.name} | Winnie Wong, ${business.ren}`;
  const description = clip(
    `Property agent in ${area.name}: buy, sell or rent with Winnie Wong (${business.ren}). ${area.propertyTypes[0]} and more. WhatsApp 016-2688885.`
  );
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: `/areas/${area.slug}` },
    openGraph: pageOpenGraph({ path: `/areas/${area.slug}`, title, description }),
  };
}

export default async function AreaPage({ params }: Props) {
  const area = areaBySlug(params.slug);
  if (!area) notFound();

  const listings = (await getPublishedListings()).filter(
    (l) => l.area.trim().toLowerCase() === area.name.toLowerCase()
  );
  const url = `${siteUrl}/areas/${area.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
          { "@type": "ListItem", position: 2, name: `Property agent in ${area.name}`, item: url },
        ],
      },
      {
        "@type": "RealEstateAgent",
        "@id": `${siteUrl}/#agent`,
        name: business.name,
        url: siteUrl,
        telephone: "+60162688885",
        areaServed: { "@type": "Place", name: `${area.name}, ${area.region}` },
      },
      {
        "@type": "FAQPage",
        mainEntity: area.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      },
    ],
  };

  return (
    <main className="mx-auto max-w-content px-6 pb-section-mobile pt-32 md:pb-section md:pt-40">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      <p className="flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-muted">
        <MapPin size={14} strokeWidth={1.5} className="text-camel" />
        {area.region}
      </p>
      <h1 className="mt-3 text-h2 text-ink">Property Agent in {area.name}</h1>
      <p className="mt-2 text-sm text-muted">
        {business.name} · {business.ren} · {business.agency}
      </p>

      <div className="mt-8 grid gap-12 lg:grid-cols-[1fr_320px]">
        <div className="max-w-measure space-y-4 leading-relaxed text-body">
          {area.intro.map((p) => (
            <p key={p.slice(0, 20)}>{p}</p>
          ))}

          <h2 className="pt-4 font-display text-2xl font-light text-ink">What I help with in {area.name}</h2>
          <ul className="grid gap-x-6 gap-y-2 sm:grid-cols-2">
            {area.propertyTypes.map((t) => (
              <li key={t} className="flex items-start gap-2">
                <Check size={16} strokeWidth={1.5} className="mt-1 shrink-0 text-camel" />
                {t}
              </li>
            ))}
          </ul>
        </div>

        <aside className="self-start rounded border border-line bg-surface p-6">
          <p className="text-xs uppercase tracking-[0.16em] text-muted">Talk to Winnie</p>
          <p className="mt-2 text-sm text-body">Looking in {area.name}? Tell me your budget and timing.</p>
          <div className="mt-5 flex flex-col gap-3">
            <a
              href={whatsappLink(`Hi Winnie, I'm looking for property in ${area.name}.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded bg-[#25D366] px-5 py-3 text-sm text-white transition-opacity hover:opacity-90"
            >
              <WhatsAppIcon className="h-[18px] w-[18px]" />
              WhatsApp Winnie
            </a>
            <a
              href={business.phoneHref}
              className="flex items-center justify-center gap-2 rounded border border-ink px-5 py-3 text-sm text-ink transition-colors hover:bg-ink hover:text-white"
            >
              <Phone size={16} strokeWidth={1.5} />
              Call {business.phoneDisplay}
            </a>
          </div>
        </aside>
      </div>

      <section className="mt-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-display text-2xl font-light text-ink">
            Current listings in {area.name}
            {listings.length > 0 && <span className="ml-2 text-base text-muted">({listings.length})</span>}
          </h2>
          <Link href="/listings" className="group flex items-center gap-2 text-sm text-ink">
            All listings
            <ArrowRight size={16} strokeWidth={1.5} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        {listings.length > 0 ? (
          <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {listings.map((l) => (
              <ListingCard key={l.id} listing={l} />
            ))}
          </div>
        ) : (
          <p className="mt-6 text-body">
            No {area.name} listings are online right now — many units are offered privately, so WhatsApp Winnie for
            what is available.
          </p>
        )}
      </section>

      <section className="mt-16 max-w-measure">
        <h2 className="font-display text-2xl font-light text-ink">{area.name} property — common questions</h2>
        <dl className="mt-6 divide-y divide-line border-y border-line">
          {area.faqs.map((f) => (
            <div key={f.q} className="py-5">
              <dt className="font-medium text-ink">{f.q}</dt>
              <dd className="mt-2 leading-relaxed text-body">{f.a}</dd>
            </div>
          ))}
        </dl>
      </section>

      <nav aria-label="Other areas" className="mt-16 border-t border-line pt-8">
        <p className="text-xs uppercase tracking-[0.16em] text-muted">Other areas I serve</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {areas
            .filter((a) => a.slug !== area.slug)
            .map((a) => (
              <Link
                key={a.slug}
                href={`/areas/${a.slug}`}
                className="rounded-full border border-camel/60 px-4 py-1.5 text-sm text-ink transition-colors hover:border-camel hover:bg-camel/10"
              >
                {a.name}
              </Link>
            ))}
        </div>
      </nav>
    </main>
  );
}
