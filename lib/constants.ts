export const business = {
  name: "Winnie Wong",
  title: "Real Estate Negotiator",
  ren: "REN 80684",
  agency: "The Roof Realty Sdn Bhd",
  agencyZh: "特富房地产代理有限公司",
  licence: "E(1)1605/3",
  phoneDisplay: "016-268 8885",
  phoneHref: "tel:+60162688885",
  whatsappBase: "https://wa.me/60162688885",
  email: "winniewong.trr@yahoo.com",
  office: "25-1 Jalan OP 1/6, Pusat Perdagangan One Puchong, 47160 Puchong, Selangor",
  agencyHQ: "Blk A-2-3, Kuchai Exchange, No.43, Jalan Kuchai Maju 13, 58200 Kuala Lumpur",
  agencySite: "https://theroofrealty.com",
  agencyFb: "https://facebook.com/Theroofrealty",
  areasServed: ["Kuala Lumpur", "Putrajaya", "Cyberjaya", "Seri Kembangan", "Puchong"],
  get areasServedText() {
    const areas = this.areasServed;
    return `${areas.slice(0, -1).join(", ")} and ${areas[areas.length - 1]}`;
  },
  yearsExperience: 3,
  caseCount: "100+",
};

export function whatsappLink(message: string) {
  return `${business.whatsappBase}?text=${encodeURIComponent(message)}`;
}

export const waMessages = {
  services: `Hi Winnie, I'd like to know more about your property services.`,
  contact: `Hi Winnie, I'd like to get in touch regarding a property enquiry.`,
  mobileCta: `Hi Winnie, I'd like to speak with you about a property.`,
};
