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
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import { getPublishedListing } from "@/lib/listingsServer";
import { formatPrice } from "@/lib/listings";
import { cldUrl } from "@/lib/image";
import { business, whatsappLink } from "@/lib/constants";

export const dynamic = "force-dynamic";

type Props = { params: { id: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const l = await getPublishedListing(params.id);
  if (!l) return { title: "Listing not found" };
  const title = `${l.title} — ${formatPrice(l)} | Winnie Wong`;
  const description = `${l.listingType}: ${l.propertyType} in ${l.area}. ${l.description.slice(0, 140)}`;
  return {
    title,
    description,
    openGraph: { title, description, images: l.photos[0] ? [cldUrl(l.photos[0].url, 1200)] : [] },
  };
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
      <Link href="/listings" className="inline-flex items-center gap-2 text-sm text-body hover:text-ink">
        <ArrowLeft size={16} strokeWidth={1.5} />
        All listings
      </Link>

      <div className="mt-6">
        <Gallery photos={l.photos} title={l.title} />
      </div>

      <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_340px]">
        <div>
          <div className="flex flex-wrap gap-2">
            <span className="rounded bg-ink px-2.5 py-1 text-xs text-white">{l.listingType}</span>
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
