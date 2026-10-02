export type Testimonial = {
  name: string;
  quote: string;
  source: "Google Review";
};

// Sourced verbatim (trimmed for length where noted) from client-provided
// Google review screenshots — D:\yy\Client Google Reviews\. Two additional
// WhatsApp thank-you messages were supplied but are intentionally excluded:
// they cannot be attributed as verifiable Google reviews.
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
    name: "Bryan Lim",
    quote: "5 star satisfaction to agent Winnie for her great service helping me rent out my unit.",
    source: "Google Review",
  },
];
