export const TESTIMONIAL_SOURCES = ["Google Review", "WhatsApp message", "Facebook review", "Client message"] as const;

export type Testimonial = {
  name: string;
  quote: string;
  source: string; // one of TESTIMONIAL_SOURCES — shown under the name, so label it honestly
};

// Built-in defaults. Once Winnie imports them in Admin → Reviews, the website reads reviews from
// Firestore instead and these are only the fallback. Google reviews are verbatim (trimmed for length)
// from client screenshots in D:\yy\Client Google Reviews\; WhatsApp messages are labelled as such.
// Order is the carousel order — Tim Kan first at the client's request.
export const testimonials: Testimonial[] = [
  {
    name: "Tim Kan",
    quote:
      "Winnie is a kind and trustworthy agent who made the whole process smooth and stress-free. She is highly professional and efficient — I only needed two viewings before confidently deciding to sign the contract.",
    source: "Google Review",
  },
  {
    name: "Zahra Osman",
    quote:
      "Winnie Wong was a lifesaver! As an international student, I had no idea about the local housing market, but she guided me through everything. She's super helpful, patient, and genuinely wants the best for her clients. Highly recommend for anyone needing assistance, especially if you're new to the area.",
    source: "Google Review",
  },
  {
    name: "Muhammad Hazman Mohd Zaini",
    quote:
      "I'm extremely grateful for the outstanding service provided by my property agent Winnie Wong. She made sure everything was handled efficiently, from the first viewing to the final paperwork. Her commitment, patience, and attention to detail were impressive.",
    source: "Google Review",
  },
  {
    name: "Siswanto Tan",
    quote:
      "One of few agents I contacted to find a suitable unit for rent, the most dedicated one. As a first time renter, can put your trust in her to find a proper (and legit) place — everything handled smoothly.",
    source: "Google Review",
  },
  {
    name: "Noor Al-Farsi",
    quote:
      "Winnie is the best agent I could have asked for. She is patient, kind, and genuinely cares about her clients. She guided me honestly and professionally, and I'm truly thankful for her support. 10 stars are not enough!",
    source: "Google Review",
  },
  {
    name: "Faraj Alzawy",
    quote:
      "She was quick to respond, very responsive, and prompt in replying to my calls. She is also very honest. I recommend dealing with her.",
    source: "Google Review",
  },
  {
    name: "Ez Faraj",
    quote:
      "An excellent experience in renting the apartment. The agent was extremely professional and transparent, and all procedures were handled smoothly and clearly. Highly recommend working with them.",
    source: "Google Review",
  },
  {
    name: "Kogi Vanee",
    quote:
      "Professional, responsive, and dedicated throughout the entire process. Her knowledge, patience, and attention to detail made everything smooth and stress-free. I highly recommend her to anyone looking for a reliable and trustworthy property agent.",
    source: "Google Review",
  },
  {
    name: "Nad",
    quote:
      "Although I didn't end up renting through Winnie, I still wanted to leave this review because she truly deserves the recognition — professional, patient, and kind. It's rare to meet someone who goes above and beyond even when there is no guarantee of closing a deal.",
    source: "Google Review",
  },
  {
    name: "Mabuchi Kazuaki",
    quote:
      "To be honest, we moved to Malaysia in August 2024 and have lived in two different places so far. In our experience here, we have never met an agent and landlord who reply as fast as you both do!",
    source: "WhatsApp message",
  },
  {
    name: "Mabuchi Kazuaki",
    quote:
      "I used to think this slow response was just the normal way of doing things in Malaysia. But you and your landlord are completely different. On top of that, you gave us such a wonderful deal. Thank you so much. We are so excited to stay at your unit!",
    source: "WhatsApp message",
  },
  {
    name: "Bryan Lim",
    quote: "5 star satisfaction to agent Winnie for her great service helping me rent out my unit.",
    source: "Google Review",
  },
];
