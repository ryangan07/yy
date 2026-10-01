import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import { siteUrl } from "@/lib/constants";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400"],
  variable: "--font-cormorant",
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jost",
  display: "swap",
});

const description =
  "Property negotiator serving Kuala Lumpur, Putrajaya, Cyberjaya, Seri Kembangan and Puchong. Residential, commercial, industrial and investment consultation. REN 80684, The Roof Realty Sdn Bhd.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Winnie Wong — Real Estate Negotiator", template: "%s | Winnie Wong" },
  description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_MY",
    siteName: "Winnie Wong — Real Estate Negotiator",
    title: "Winnie Wong — Real Estate Negotiator",
    description,
    images: [{ url: "/images/og-cover.jpg", width: 1200, height: 630, alt: "Winnie Wong, Real Estate Negotiator" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jost.variable}`}>
      <body className="bg-bg text-body font-sans antialiased">{children}</body>
    </html>
  );
}
