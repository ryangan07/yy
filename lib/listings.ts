import type { Timestamp } from "firebase/firestore";
import { business } from "@/lib/constants";
import type { Photo } from "@/lib/image";

export type Listing = {
  title: string;
  listingType: string;
  status: string;
  propertyType: string;
  area: string;
  address: string;
  price: number | "";
  bedrooms: string;
  bathrooms: number | "";
  carParks: number | "";
  builtUp: number | "";
  landArea: number | "";
  tenure: string;
  furnishing: string;
  yearBuilt: number | "";
  amenities: string[];
  description: string;
  photos: Photo[];
  featured: boolean;
  published: boolean;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
};

export const emptyListing: Listing = {
  title: "",
  listingType: "For Sale",
  status: "Available",
  propertyType: "Condominium",
  area: business.areasServed[0],
  address: "",
  price: "",
  bedrooms: "",
  bathrooms: "",
  carParks: "",
  builtUp: "",
  landArea: "",
  tenure: "Freehold",
  furnishing: "Unfurnished",
  yearBuilt: "",
  amenities: [],
  description: "",
  photos: [],
  featured: false,
  published: false,
};

export const OPTION_FIELDS = ["listingType", "status", "propertyType", "area", "tenure", "furnishing", "amenities"] as const;
export type OptionField = (typeof OPTION_FIELDS)[number];
export type ListingOptions = Record<OptionField, string[]>;

export const DEFAULT_OPTIONS: ListingOptions = {
  listingType: ["For Sale", "For Rent"],
  status: ["Available", "Under Offer", "Sold", "Rented"],
  propertyType: [
    "Condominium",
    "Serviced Residence",
    "Apartment",
    "Flat",
    "Terrace House",
    "Townhouse",
    "Cluster House",
    "Semi-D",
    "Bungalow",
    "Shop Lot",
    "Office",
    "Retail Space",
    "Factory / Warehouse",
    "Land",
  ],
  area: [...business.areasServed],
  tenure: ["Freehold", "Leasehold", "Malay Reserve"],
  furnishing: ["Fully Furnished", "Partially Furnished", "Unfurnished"],
  amenities: [
    "Swimming Pool",
    "Gymnasium",
    "24-hour Security",
    "Covered Parking",
    "Playground",
    "BBQ",
    "Jogging Track",
    "Sauna",
    "Jacuzzi",
    "Multipurpose Hall",
    "Mini Market",
    "Near LRT / MRT",
  ],
};

// Firestore stores empty numeric inputs as null rather than "".
export function toFirestore(l: Listing) {
  const num = (v: number | "") => (v === "" ? null : Number(v));
  return {
    ...l,
    price: num(l.price),
    bathrooms: num(l.bathrooms),
    carParks: num(l.carParks),
    builtUp: num(l.builtUp),
    landArea: num(l.landArea),
    yearBuilt: num(l.yearBuilt),
  };
}

export function fromFirestore(data: Record<string, unknown>): Listing {
  const num = (v: unknown) => (v === null || v === undefined ? "" : Number(v));
  const d = data as Partial<Listing> & Record<string, unknown>;
  return {
    ...emptyListing,
    ...d,
    price: num(d.price),
    bathrooms: num(d.bathrooms),
    carParks: num(d.carParks),
    builtUp: num(d.builtUp),
    landArea: num(d.landArea),
    yearBuilt: num(d.yearBuilt),
    amenities: (d.amenities as string[]) ?? [],
    photos: (d.photos as Photo[]) ?? [],
  };
}

export function formatPrice(l: Pick<Listing, "price" | "listingType">) {
  if (l.price === "") return "Price on request";
  const rm = `RM ${Number(l.price).toLocaleString("en-MY")}`;
  return l.listingType === "For Rent" ? `${rm} /mo` : rm;
}
