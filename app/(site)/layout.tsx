import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileCta from "@/components/layout/MobileCta";
import WhatsAppFab from "@/components/layout/WhatsAppFab";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="pb-16 md:pb-0">
      <Header />
      {children}
      <Footer />
      <MobileCta />
      <WhatsAppFab />
    </div>
  );
}
