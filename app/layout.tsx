import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileCta from "@/components/layout/MobileCta";
import SectionNav from "@/components/layout/SectionNav";
import WhatsAppFab from "@/components/layout/WhatsAppFab";
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

export const metadata: Metadata = {
  title: "Winnie Wong — Real Estate Negotiator",
  description:
    "Property negotiator serving Kuala Lumpur, Putrajaya, Cyberjaya, Seri Kembangan and Puchong. Residential, commercial and investment consultation. REN 80684, The Roof Realty Sdn Bhd.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jost.variable}`}>
      <body className="bg-bg pb-16 text-body font-sans antialiased md:pb-0">
        <Header />
        <SectionNav />
        {children}
        <Footer />
        <MobileCta />
        <WhatsAppFab />
      </body>
    </html>
  );
}
