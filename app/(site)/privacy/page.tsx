import type { Metadata } from "next";
import { business } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy Notice / Notis Privasi",
  description: `How ${business.name} (${business.ren}) collects and uses personal data under the Personal Data Protection Act 2010.`,
  alternates: { canonical: "/privacy" },
};

const EFFECTIVE = "1 October 2026";
const EFFECTIVE_MS = "1 Oktober 2026";

// PDPA 2010 s.7(3) requires the notice in both the national language and English.
export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-content px-6 pb-section-mobile pt-32 md:pb-section md:pt-40">
      <p className="text-xs uppercase tracking-[0.16em] text-muted">Personal Data Protection Act 2010</p>
      <h1 className="mt-3 text-h2 text-ink">Privacy Notice / Notis Privasi</h1>
      <p className="mt-4 text-sm text-muted">
        <a href="#en" className="underline underline-offset-2 hover:text-ink">English</a>
        {" · "}
        <a href="#ms" className="underline underline-offset-2 hover:text-ink">Bahasa Malaysia</a>
      </p>

      <article id="en" className="mt-12 max-w-measure space-y-6 leading-relaxed text-body">
        <h2 className="font-display text-3xl font-light text-ink">English</h2>
        <p className="text-sm text-muted">Effective {EFFECTIVE}</p>

        <Section title="1. Who we are">
          This website is operated by {business.name}, {business.title} ({business.ren}), of {business.agency} (
          {business.licence}), {business.office}. In this notice, &ldquo;I&rdquo;, &ldquo;me&rdquo; and
          &ldquo;my&rdquo; refer to {business.name}.
        </Section>

        <Section title="2. Personal data I collect">
          When you use the enquiry form, I collect your name, phone number, the type of property you are
          interested in, your budget range and any message you write. If you contact me by WhatsApp, phone or
          email, I receive the details you choose to share there. The loan calculator runs entirely in your
          browser and its figures are not sent to me.
        </Section>

        <Section title="3. Why I use it">
          To reply to your enquiry; to provide real estate services you ask for (sale, purchase, rental and
          investment consultation), including arranging viewings and negotiations; to keep in touch about
          properties relevant to you; and to meet legal and regulatory obligations that apply to real estate
          negotiators in Malaysia.
        </Section>

        <Section title="4. Who I may share it with">
          {business.agency}, the registered estate agency I work under; parties to a transaction you ask me to
          handle, such as property owners, developers, banks and lawyers, only as needed for that transaction;
          and the service providers that run this website — Google Firebase (data storage), Netlify (hosting),
          Cloudinary (images) and Resend (email notifications). Some of these providers store data on servers
          outside Malaysia; they are bound by their own security and data protection terms. I do not sell
          your personal data.
        </Section>

        <Section title="5. Is it required?">
          Your name and phone number are required so that I can reply. Everything else is optional. If you
          prefer not to provide them, you can still reach me directly by WhatsApp or phone.
        </Section>

        <Section title="6. Your rights">
          You may ask to access or correct your personal data, limit how it is used, or withdraw your consent
          at any time by contacting me at {business.email} or {business.phoneDisplay}. I will respond within
          21 days as required by the Act. Withdrawing consent may mean I can no longer assist with your
          enquiry.
        </Section>

        <Section title="7. How long I keep it and how it is protected">
          I keep your data only for as long as needed for the purposes above or as required by law, after which
          it is deleted. Enquiries are stored in a database that only I can access, protected by sign-in
          restrictions.
        </Section>

        <Section title="8. Cookies">
          This website does not use advertising or tracking cookies. The admin area uses browser storage only
          to keep me signed in.
        </Section>

        <Section title="9. Changes">
          I may update this notice from time to time; the effective date above shows the latest version. If
          the English and Bahasa Malaysia versions differ, the English version prevails.
        </Section>
      </article>

      <hr className="my-16 border-line" />

      <article id="ms" lang="ms" className="max-w-measure space-y-6 leading-relaxed text-body">
        <h2 className="font-display text-3xl font-light text-ink">Bahasa Malaysia</h2>
        <p className="text-sm text-muted">Berkuat kuasa {EFFECTIVE_MS}</p>

        <Section title="1. Siapa kami">
          Laman web ini dikendalikan oleh {business.name}, Perunding Hartanah ({business.ren}), dari{" "}
          {business.agency} ({business.licence}), {business.office}. Dalam notis ini, &ldquo;saya&rdquo;
          merujuk kepada {business.name}.
        </Section>

        <Section title="2. Data peribadi yang saya kumpul">
          Apabila anda menggunakan borang pertanyaan, saya mengumpul nama, nombor telefon, jenis hartanah yang
          anda minati, julat bajet dan sebarang mesej yang anda tulis. Jika anda menghubungi saya melalui
          WhatsApp, telefon atau e-mel, saya menerima butiran yang anda pilih untuk kongsi. Kalkulator pinjaman
          berfungsi sepenuhnya dalam pelayar anda dan angkanya tidak dihantar kepada saya.
        </Section>

        <Section title="3. Tujuan penggunaan">
          Untuk membalas pertanyaan anda; untuk menyediakan perkhidmatan hartanah yang anda minta (jualan,
          pembelian, sewaan dan perundingan pelaburan), termasuk mengatur lawatan dan rundingan; untuk terus
          berhubung mengenai hartanah yang berkaitan dengan anda; dan untuk mematuhi kewajipan undang-undang
          dan peraturan yang terpakai kepada perunding hartanah di Malaysia.
        </Section>

        <Section title="4. Pihak yang mungkin menerima data anda">
          {business.agency}, firma ejen hartanah berdaftar tempat saya bernaung; pihak dalam transaksi yang anda
          minta saya uruskan, seperti pemilik hartanah, pemaju, bank dan peguam, hanya setakat yang perlu untuk
          transaksi tersebut; dan penyedia perkhidmatan yang mengendalikan laman web ini — Google Firebase
          (penyimpanan data), Netlify (pengehosan), Cloudinary (imej) dan Resend (pemberitahuan e-mel).
          Sesetengah penyedia ini menyimpan data di pelayan di luar Malaysia dan terikat dengan terma keselamatan
          serta perlindungan data mereka sendiri. Saya tidak menjual data peribadi anda.
        </Section>

        <Section title="5. Adakah ia wajib?">
          Nama dan nombor telefon anda diperlukan supaya saya dapat membalas. Maklumat lain adalah pilihan. Jika
          anda tidak mahu memberikannya, anda masih boleh menghubungi saya terus melalui WhatsApp atau telefon.
        </Section>

        <Section title="6. Hak anda">
          Anda boleh meminta untuk mengakses atau membetulkan data peribadi anda, mengehadkan penggunaannya, atau
          menarik balik persetujuan anda pada bila-bila masa dengan menghubungi saya di {business.email} atau{" "}
          {business.phoneDisplay}. Saya akan membalas dalam tempoh 21 hari seperti yang dikehendaki oleh Akta.
          Penarikan balik persetujuan mungkin menyebabkan saya tidak lagi dapat membantu pertanyaan anda.
        </Section>

        <Section title="7. Tempoh simpanan dan perlindungan">
          Saya menyimpan data anda hanya selama yang perlu untuk tujuan di atas atau seperti yang dikehendaki oleh
          undang-undang, dan selepas itu ia akan dipadam. Pertanyaan disimpan dalam pangkalan data yang hanya
          boleh diakses oleh saya, dilindungi oleh sekatan log masuk.
        </Section>

        <Section title="8. Kuki">
          Laman web ini tidak menggunakan kuki pengiklanan atau penjejakan. Bahagian pentadbir hanya menggunakan
          storan pelayar untuk mengekalkan log masuk saya.
        </Section>

        <Section title="9. Perubahan">
          Saya mungkin mengemas kini notis ini dari semasa ke semasa; tarikh berkuat kuasa di atas menunjukkan
          versi terkini. Sekiranya terdapat perbezaan antara versi Bahasa Inggeris dan Bahasa Malaysia, versi
          Bahasa Inggeris akan diguna pakai.
        </Section>
      </article>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h3 className="font-sans text-base font-medium text-ink">{title}</h3>
      <p className="mt-2">{children}</p>
    </section>
  );
}
