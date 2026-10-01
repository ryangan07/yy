import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import { siteUrl } from "@/lib/constants";
import { pageOpenGraph } from "@/lib/seo";
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

// Homepage targets "property agent / real estate negotiator + area" (CLAUDE.md §12, Q21).
const title = "Property Agent in Putrajaya & Cyberjaya | Winnie Wong";
const description =
  "Real estate negotiator (REN 80684) with 20+ years' experience and 100+ deals closed. Homes, shops and factories for sale and rent across the Klang Valley.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: title, template: "%s | Winnie Wong" },
  description,
  alternates: { canonical: "/" },
  openGraph: pageOpenGraph({ path: "/", title, description }),
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
