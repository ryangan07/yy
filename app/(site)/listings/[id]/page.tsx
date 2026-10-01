import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Bath,
  BedDouble,
  Building2,
  CalendarDays,
  Car,
  Check,
  LandPlot,
  MapPin,
  Maximize2,
  Phone,
  ScrollText,
  Sofa,
} from "lucide-react";
import Gallery from "@/components/listings/Gallery";
import NapicData from "@/components/listings/NapicData";
import ListingTypeBadge from "@/components/listings/ListingTypeBadge";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import { getPublishedListing, type PublicListing } from "@/lib/listingsServer";
import { formatPrice } from "@/lib/listings";
import { photoUrl } from "@/lib/image";
import { business, siteUrl, whatsappLink } from "@/lib/constants";
import { clip, pageOpenGraph } from "@/lib/seo";

export const dynamic = "force-dynamic";

type Props = { params: { id: string } };

// "Clio 2 Residence | Condominium for Rent in Putrajaya" — skips the area when the name already has it.
function listingTitle(l: PublicListing) {
  const deal = l.listingType === "For Rent" ? "for Rent" : l.listingType === "For Sale" ? "for Sale" : "";
  const where = l.area && !l.title.toLowerCase().includes(l.area.toLowerCase()) ? ` in ${l.area}` : "";
  return `${l.title} | ${[l.propertyType, deal].filter(Boolean).join(" ")}${where}`;
}

// Price, size and the first line of the write-up, instead of raw description text with line breaks.
function listingDescription(l: PublicListing) {
  const facts = [
    l.bedrooms && `${l.bedrooms} bed`,
    l.bathrooms !== "" && `${l.bathrooms} bath`,
    l.builtUp !== "" && `${Number(l.builtUp).toLocaleString("en-MY")} sq ft`,
  ].filter(Boolean);
  const lead = `${l.propertyType} ${l.listingType.toLowerCase()} in ${l.area}, ${formatPrice(l)}.`;
  // First real line of the write-up, minus list bullets, ending in a full stop.
  const firstLine = l.description
    .split(/\n|(?<=[.!?])\s/)
    .map((s) => s.replace(/^[\s\-–•*]+/, "").trim())
    .find((s) => s.length > 10);
  const sentence = firstLine ? (/[.!?]$/.test(firstLine) ? firstLine : `${firstLine}.`) : "";
  return clip(
    [lead, facts.length ? `${facts.join(", ")}.` : "", sentence, `Contact Winnie Wong (${business.ren}).`]
      .filter(Boolean)
      .join(" ")
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const l = await getPublishedListing(params.id);
  if (!l) return { title: "Listing not found" };
  const title = listingTitle(l);
  const description = listingDescription(l);
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: `/listings/${params.id}` },
    openGraph: pageOpenGraph({
      path: `/listings/${params.id}`,
      title,
      description,
      images: l.photos[0] ? [{ url: photoUrl(l.photos[0], 1200), alt: l.title }] : undefined,
    }),
  };
}

function listingJsonLd(l: PublicListing) {
  const url = `${siteUrl}/listings/${l.id}`;
  return [
    {
      "@context": "https://schema.org",
      "@type": "RealEstateListing",
      name: l.title,
      url,
      description: clip(l.description || listingDescription(l), 500),
      image: l.photos.slice(0, 6).map((p) => photoUrl(p, 1200)),
      ...(l.updatedAtMs ? { dateModified: new Date(l.updatedAtMs).toISOString() } : {}),
      ...(l.price !== ""
        ? {
            offers: {
              "@type": "Offer",
              price: Number(l.price),
              priceCurrency: "MYR",
              businessFunction: l.listingType === "For Rent" ? "http://purl.org/goodrelations/v1#LeaseOut" : "http://purl.org/goodrelations/v1#Sell",
              availability: l.status === "Available" ? "https://schema.org/InStock" : "https://schema.org/SoldOut",
            },
          }
        : {}),
      address: { "@type": "PostalAddress", streetAddress: l.address || undefined, addressLocality: l.area, addressCountry: "MY" },
      provider: { "@type": "RealEstateAgent", name: business.name, url: siteUrl, telephone: "+60162688885" },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
        { "@type": "ListItem", position: 2, name: "Listings", item: `${siteUrl}/listings` },
        { "@type": "ListItem", position: 3, name: l.title, item: url },
      ],
    },
  ];
}

export default async function ListingDetailPage({ params }: Props) {
  const l = await getPublishedListing(params.id);
  if (!l) notFound();

  const host = headers().get("host") ?? "";
  const url = `${host.startsWith("localhost") ? "http" : "https"}://${host}/listings/${l.id}`;
  const waMessage = `Hi Winnie, I'm interested in ${l.title} (${formatPrice(l)}). ${url}`;

  const n = (v: number | "") => (v === "" ? null : Number(v).toLocaleString("en-MY"));
  const facts = [
    { icon: BedDouble, label: "Bedrooms", value: l.bedrooms || null },
    { icon: Bath, label: "Bathrooms", value: n(l.bathrooms) },
    { icon: Car, label: "Car parks", value: n(l.carParks) },
    { icon: Maximize2, label: "Built-up", value: n(l.builtUp) && `${n(l.builtUp)} SqFt` },
    { icon: LandPlot, label: "Land area", value: n(l.landArea) && `${n(l.landArea)} SqFt` },
    { icon: Building2, label: "Property type", value: l.propertyType },
    { icon: ScrollText, label: "Tenure", value: l.tenure },
    { icon: Sofa, label: "Furnishing", value: l.furnishing },
    { icon: CalendarDays, label: "Year built", value: l.yearBuilt === "" ? null : String(l.yearBuilt) },
  ].filter((f) => f.value);

  return (
    <main className="mx-auto max-w-content px-6 pb-section-mobile pt-28 md:pb-section md:pt-32">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(listingJsonLd(l)).replace(/</g, "\\u003c") }} />
      <Link href="/listings" className="inline-flex items-center gap-2 text-sm text-body hover:text-ink">
        <ArrowLeft size={16} strokeWidth={1.5} />
        All listings
      </Link>

      <div className="mt-6">
        <Gallery photos={l.photos} title={l.title} />
      </div>

      <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_340px]">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <ListingTypeBadge type={l.listingType} size="lg" />
            {l.status !== "Available" && (
              <span className="rounded bg-camel px-2.5 py-1 text-xs text-ink">{l.status}</span>
            )}
          </div>
          <h1 className="mt-4 font-display text-4xl font-light leading-tight text-ink md:text-5xl">{l.title}</h1>
          <p className="mt-3 flex items-start gap-2 text-body">
            <MapPin size={18} strokeWidth={1.5} className="mt-0.5 shrink-0 text-camel" />
            {l.address || l.area}
          </p>

          <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded border border-line bg-line sm:grid-cols-3">
            {facts.map((f) => (
              <div key={f.label} className="bg-surface p-4">
                <dt className="flex items-center gap-2 text-xs uppercase tracking-[0.12em] text-muted">
                  <f.icon size={15} strokeWidth={1.5} className="text-camel" />
                  {f.label}
                </dt>
                <dd className="mt-1.5 text-ink">{f.value}</dd>
              </div>
            ))}
          </dl>

          {l.description && (
            <section className="mt-10">
              <h2 className="font-display text-2xl font-light text-ink">About this property</h2>
              <p className="mt-4 max-w-measure whitespace-pre-line leading-relaxed text-body">{l.description}</p>
            </section>
          )}

          {l.amenities.length > 0 && (
            <section className="mt-10">
              <h2 className="font-display text-2xl font-light text-ink">Facilities &amp; amenities</h2>
              <ul className="mt-4 grid gap-x-6 gap-y-3 sm:grid-cols-2">
                {l.amenities.map((a) => (
                  <li key={a} className="flex items-center gap-2 text-body">
                    <Check size={16} strokeWidth={1.5} className="text-camel" />
                    {a}
                  </li>
                ))}
              </ul>
            </section>
          )}

          <NapicData area={l.area} />
        </div>

        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="rounded border border-line bg-surface p-6">
            <p className="text-xs uppercase tracking-[0.16em] text-muted">{l.listingType}</p>
            <p className="mt-2 font-display text-3xl font-light text-ink">{formatPrice(l)}</p>

            <div className="mt-6 flex items-center gap-3 border-t border-line pt-6">
              <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full">
                <Image src="/images/winnie-portrait.webp" alt={business.name} fill sizes="56px" className="object-cover object-top" />
              </div>
              <div>
                <p className="text-ink">{business.name}</p>
                <p className="text-xs text-muted">
                  {business.ren} · {business.agency}
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3">
              <a
                href={whatsappLink(waMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded bg-[#25D366] px-5 py-3 text-sm text-white transition-opacity hover:opacity-90"
              >
                <WhatsAppIcon className="h-[18px] w-[18px]" />
                WhatsApp about this property
              </a>
              <a
                href={business.phoneHref}
                className="flex items-center justify-center gap-2 rounded border border-ink px-5 py-3 text-sm text-ink transition-colors hover:bg-ink hover:text-white"
              >
                <Phone size={16} strokeWidth={1.5} />
                Call {business.phoneDisplay}
              </a>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
