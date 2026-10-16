// One landing page per area Winnie serves (/areas/[slug]). Each targets "property agent <area>"
// searches with its own copy, her live listings there and an FAQ — not a templated doorway page.
// Keep facts general and verifiable; Winnie can refine the wording.

export type Area = {
  slug: string;
  name: string; // must match the "Area" value used on listings in the admin
  region: string;
  intro: string[];
  propertyTypes: string[];
  faqs: { q: string; a: string }[];
};

export const areas: Area[] = [
  {
    slug: "puchong",
    name: "Puchong",
    region: "Petaling, Selangor",
    intro: [
      "Puchong is Winnie's home base — her office is at Pusat Perdagangan One Puchong. It is one of the Klang Valley's most established townships, linked by the LDP highway and the LRT Sri Petaling line, with mature neighbourhoods, schools and commercial centres.",
      "Buyers look to Puchong for landed homes and family-sized condominiums at prices below Kuala Lumpur, while its shop offices and industrial parks draw business owners and investors.",
    ],
    propertyTypes: ["Terrace and semi-detached homes", "Condominiums and serviced residences", "Shop offices", "Factories and warehouses"],
    faqs: [
      {
        q: "Do you handle both sales and rentals in Puchong?",
        a: "Yes — residential and commercial sales and rentals across Puchong, plus industrial units and investment consultation. Puchong is where Winnie's office is based.",
      },
      {
        q: "Can you help me sell or rent out my property in Puchong?",
        a: "Yes. Winnie handles pricing, marketing, viewings and negotiation through to signed paperwork. WhatsApp 016-2688885 to list with her.",
      },
    ],
  },
  {
    slug: "seri-kembangan",
    name: "Seri Kembangan",
    region: "Petaling, Selangor",
    intro: [
      "Seri Kembangan sits between Puchong, Serdang and Kuala Lumpur, served by the MRT Putrajaya line and major highways. Newer integrated developments around Taman Equine and the surrounding townships make it popular with young families and working professionals.",
      "Winnie lists and rents out condominiums and serviced residences here, and helps owners find reliable tenants quickly.",
    ],
    propertyTypes: ["Condominiums and serviced residences", "Landed homes", "Shop offices"],
    faqs: [
      {
        q: "Are there properties near MRT stations in Seri Kembangan?",
        a: "Yes — several developments are close to MRT Putrajaya line stations such as Taman Equine. Ask Winnie for what is currently available near the station you need.",
      },
      {
        q: "Do you have rental units in Seri Kembangan?",
        a: "Rentals are a large part of Winnie's work here. Current listings are shown on this page; WhatsApp her for units not yet listed online.",
      },
    ],
  },
  {
    slug: "putrajaya",
    name: "Putrajaya",
    region: "Federal Territory of Putrajaya",
    intro: [
      "Putrajaya is Malaysia's federal administrative centre — planned, green and well connected to Kuala Lumpur, Cyberjaya and KLIA. Its residential precincts and developments near IOI Resort City attract civil servants, families and professionals.",
      "Winnie is a regular agent for Putrajaya condominiums and serviced residences, including well-known developments near IOI City Mall.",
    ],
    propertyTypes: ["Condominiums and serviced residences", "Landed homes", "Investment units"],
    faqs: [
      {
        q: "Which Putrajaya developments do you cover?",
        a: "Winnie regularly handles condominiums and serviced residences around Putrajaya and IOI Resort City. Her current Putrajaya listings are shown on this page.",
      },
      {
        q: "Is Putrajaya good for property investment?",
        a: "It depends on your budget, holding period and rental goals. Winnie offers investment consultation to compare rental demand and pricing across developments before you commit.",
      },
    ],
  },
  {
    slug: "cyberjaya",
    name: "Cyberjaya",
    region: "Sepang, Selangor",
    intro: [
      "Cyberjaya, next to Putrajaya, grew as Malaysia's technology and education hub and is home to Multimedia University and many multinational offices. It offers condominiums, landed homes and lakeside properties at a calmer pace than the city.",
      "Winnie helps buyers, tenants and investors find property here, from student-friendly rentals to freehold landed homes.",
    ],
    propertyTypes: ["Condominiums and serviced residences", "Landed and lakeside homes", "Commercial units"],
    faqs: [
      {
        q: "Do you have landed properties for sale in Cyberjaya?",
        a: "Yes — Winnie handles landed and lakeside homes as well as condominiums in Cyberjaya. See her current listings on this page or WhatsApp for off-market options.",
      },
      {
        q: "Is Cyberjaya suitable for rental investment?",
        a: "Demand comes from students and tech-sector workers. Winnie can walk you through rental yields and tenant profiles for specific developments.",
      },
    ],
  },
  {
    slug: "kuala-lumpur",
    name: "Kuala Lumpur",
    region: "Federal Territory of Kuala Lumpur",
    intro: [
      "From city-centre condominiums to landed homes in the suburbs, Kuala Lumpur offers the widest range of property in Malaysia — and the widest range of prices.",
      "Winnie helps clients buy, sell and rent across Kuala Lumpur, with a focus on the southern areas close to Puchong, Seri Kembangan and Putrajaya.",
    ],
    propertyTypes: ["Condominiums and serviced residences", "Landed homes", "Office and retail space"],
    faqs: [
      {
        q: "Do you cover all of Kuala Lumpur?",
        a: "Winnie works across Kuala Lumpur, most often in the southern parts of the city that connect to Puchong, Seri Kembangan and Putrajaya. WhatsApp her with the area you are considering.",
      },
      {
        q: "Can you help me compare KL with nearby Selangor areas?",
        a: "Yes — many clients weigh KL against Puchong, Seri Kembangan or Putrajaya for price and commute. Winnie can shortlist options in each.",
      },
    ],
  },
];

export const areaBySlug = (slug: string) => areas.find((a) => a.slug === slug);
export const areaByName = (name: string) => areas.find((a) => a.name.toLowerCase() === name.trim().toLowerCase());
