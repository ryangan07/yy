import { MessageCircle, Phone } from "lucide-react";
import { business, waMessages, whatsappLink } from "@/lib/constants";

export default function MobileCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 flex border-t border-line bg-surface md:hidden">
      <a
        href={whatsappLink(waMessages.mobileCta)}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-1 items-center justify-center gap-2 py-4 text-sm font-medium text-ink"
      >
        <MessageCircle strokeWidth={1.5} size={18} />
        WhatsApp
      </a>
      <a
        href={business.phoneHref}
        className="flex flex-1 items-center justify-center gap-2 border-l border-line bg-cta py-4 text-sm font-medium text-white"
      >
        <Phone strokeWidth={1.5} size={18} />
        Call
      </a>
    </div>
  );
}
