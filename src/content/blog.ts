export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  image: string;
  imageAlt: string;
  paragraphs: string[];
};

export const blogCategories = [
  "All Posts",
  "Airport Travel",
  "Corporate Travel",
  "Special Events",
  "Our Fleet",
  "Travel Tips",
  "Luxury Lifestyle",
] as const;

export const posts: BlogPost[] = [
  {
    slug: "planning-a-calm-airport-transfer",
    title: "How to plan a calm airport transfer",
    excerpt:
      "The useful details are simple: flight number, terminal, luggage, and the address you are actually going to. Here is how to send them.",
    category: "Airport Travel",
    date: "2026-03-12",
    image: "/images/airport.jpg",
    imageAlt: "Aircraft parked at an airport",
    paragraphs: [
      "An airport transfer feels easy when the chauffeur has the same facts you do. Start with the airport, the direction of travel, and whether this is an arrival or a departure.",
      "On an arrival, the flight number matters more than a guess about the curb. Share it in the enquiry so the pickup can be planned around the scheduled time. This website does not claim a live airline feed. If the time moves, send an update.",
      "Say how many bags you have and whether anyone needs a child seat. A sedan that is comfortable for two people with carry-ons is the wrong request for a family with four large cases.",
      "For departures, work backward from the time you want to be at the terminal, not from the moment you would like to leave the house. Include the terminal if you know it.",
      "A quote is not a confirmed car. Read the reply for the vehicle category, the meeting point, and what happens if the schedule shifts, then accept it in writing.",
    ],
  },
  {
    slug: "when-hourly-chauffeur-hire-helps",
    title: "When hourly chauffeur hire is the right brief",
    excerpt:
      "Hourly hire suits a day with several stops. Point-to-point suits a single journey. The difference is the way the time is reserved.",
    category: "Corporate Travel",
    date: "2026-02-02",
    image: "/images/meeting.jpg",
    imageAlt: "Professionals meeting indoors",
    paragraphs: [
      "Book point-to-point when you know the start, the end, and little in between. Book hourly when the day has meetings, a lunch, and a train of short rides that would be clumsy as separate trips.",
      "The hours you request are the container for the day. Stops inside that window are the point of the booking. A plan that runs long needs an extension, and an extension should be quoted before it is assumed.",
      "Tell us the first pickup and the city. You do not need a perfect minute-by-minute list, but a sentence about the kinds of stops helps us suggest a vehicle.",
      "Executives often use hourly hire between offices. Couples use it for fittings and venue visits. The same form covers both. What changes is the note you write.",
    ],
  },
  {
    slug: "wedding-transportation-timeline",
    title: "A practical wedding transportation timeline",
    excerpt:
      "The vehicle is only half of the plan. The other half is the order of addresses and who is in the car at each point.",
    category: "Special Events",
    date: "2026-01-18",
    image: "/images/wedding.jpg",
    imageAlt: "A couple dressed for a wedding",
    paragraphs: [
      "Write the day in order: where the couple starts, where photographs happen, where the ceremony is, and where the reception ends. A beautiful car cannot fix a schedule that skips an address.",
      "Separate the couple's car from guest transportation if the timings are different. A sprinter can shuttle guests. A sedan or limousine can stay with the couple. Ask for both in one enquiry so the quotes match.",
      "Decoration, a name board, or a specific colour are requests, not assumptions. Note them. We confirm what the vehicle can actually carry.",
      "Leave a margin around the ceremony. If you want the chauffeur to wait through photographs, those minutes belong inside the hours you book.",
    ],
  },
  {
    slug: "sedan-suv-or-sprinter",
    title: "Sedan, SUV, or sprinter: choosing a category",
    excerpt:
      "Choose from the number of people, the luggage, and the impression you want. Model names come later, in the quote.",
    category: "Our Fleet",
    date: "2025-11-20",
    image: "/images/sedan.jpg",
    imageAlt: "Black luxury sedan",
    paragraphs: [
      "A sedan category usually suits one to three passengers with moderate luggage. It is the quiet choice for an airport run or a single meeting.",
      "An SUV category adds seats and bag space. It is the practical request for a family or a small team that wants one car.",
      "A sprinter category is for groups and guest movements. Capacity depends on the vehicle that is actually available, so the headcount in your form matters more than a brochure number.",
      "The photographs on this site are illustrative. SANCH BLACK CAR confirms the vehicle category and, when known, the model in the quotation. Until then, treat famous nameplates as examples, not inventory.",
    ],
  },
  {
    slug: "city-day-without-a-fixed-script",
    title: "How to brief a city day without a fixed script",
    excerpt:
      "You can keep the plan loose and still give a chauffeur enough to quote. Start point, hours, and the kind of stops are enough.",
    category: "Travel Tips",
    date: "2025-10-09",
    image: "/images/skyline.jpg",
    imageAlt: "City skyline at dusk",
    paragraphs: [
      "A city tour or an as-directed day does not need a locked itinerary to begin. It needs a start address, a duration, and a sentence about what you care about: museums, shops, restaurants, or meetings.",
      "Photo stops and dinner reservations sit inside the hours. If a restaurant is across town from the last museum, say so. Distance is what changes a quote.",
      "If you are visiting a city you do not know, ask for a chauffeur who will follow your list rather than a packaged tour. This service is transportation. A separate guide is not included unless the quote says it is.",
      "The city names on our tours page are examples of places people ask about. They are not a promise that every city is in the operating area. The reply to your enquiry is the confirmation.",
    ],
  },
  {
    slug: "what-to-send-with-a-roadshow-brief",
    title: "What to send with a roadshow brief",
    excerpt:
      "Investor days fail in the gaps between buildings. A stop list with times is the document that keeps the car useful.",
    category: "Luxury Lifestyle",
    date: "2025-09-01",
    image: "/images/bridge.jpg",
    imageAlt: "Bridge and city skyline",
    paragraphs: [
      "List each meeting with an address and a realistic start time. Add the passenger names if more than one person will be in the vehicle.",
      "Say whether you need the same chauffeur across cities or a fresh car in each city. Continuity is a request we confirm against the schedule.",
      "If the roadshow includes an airport on either end, put the flight in the same brief. Splitting it into a separate last-minute email is how luggage plans get lost.",
      "We quote the plan you send. A later change of city is a new quote, not a silent edit.",
    ],
  },
];

export function getPost(slug: string) {
  return posts.find((post) => post.slug === slug);
}

export function relatedPosts(slug: string) {
  const current = getPost(slug);
  if (!current) return posts.slice(0, 3);
  const same = posts.filter((post) => post.slug !== slug && post.category === current.category);
  const rest = posts.filter((post) => post.slug !== slug && post.category !== current.category);
  return [...same, ...rest].slice(0, 3);
}
