import { MessageCircle, Phone, Mail } from "lucide-react";
import { business, waMessages, whatsappLink } from "@/lib/constants";
import Reveal from "@/components/ui/Reveal";
import ContactForm from "./ContactForm";
import LoanCalculator from "./LoanCalculator";

const contactRow = [
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "016-268 8885",
    href: whatsappLink(waMessages.contact),
  },
  {
    icon: Phone,
    label: "Call",
    value: business.phoneDisplay,
    href: business.phoneHref,
  },
  {
    icon: Mail,
    label: "Email",
    value: business.email,
    href: `mailto:${business.email}`,
  },
];

export default function Contact() {
  return (
    <section
      id="contact"
      className="flex min-h-screen items-center bg-surface py-section-mobile md:py-section"
    >
      <div className="mx-auto max-w-content px-6">
        <Reveal className="mx-auto max-w-measure text-center">
          <p className="text-xs uppercase tracking-[0.16em] text-muted">Contact</p>
          <h2 className="mt-3 text-h2 text-ink">Let&apos;s talk about your property</h2>
        </Reveal>

        <div className="mt-6 flex flex-wrap justify-center gap-6">
          {contactRow.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target={item.label === "WhatsApp" ? "_blank" : undefined}
              rel={item.label === "WhatsApp" ? "noopener noreferrer" : undefined}
              className="flex items-center gap-2 text-sm text-body hover:text-ink"
            >
              <item.icon strokeWidth={1.5} size={18} className="text-camel" />
              {item.value}
            </a>
          ))}
        </div>

        <div className="mx-auto mt-12 grid max-w-content gap-8 md:grid-cols-2">
          <Reveal>
            <ContactForm />
          </Reveal>
          <Reveal delay={0.1}>
            <LoanCalculator />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
