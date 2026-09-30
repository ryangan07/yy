import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import { waMessages, whatsappLink } from "@/lib/constants";

export default function WhatsAppFab() {
  return (
    <a
      href={whatsappLink(waMessages.mobileCta)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-40 hidden h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform duration-300 hover:scale-105 md:flex"
    >
      <WhatsAppIcon className="h-7 w-7" />
    </a>
  );
}
