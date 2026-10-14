export type ServiceItem = {
  slug: string;
  title: string;
  menu: string;
  href: string;
  summary: string;
  image: string;
  imageAlt: string;
};

export const services: ServiceItem[] = [
  {
    slug: "airport-transfer",
    title: "Airport Transfers",
    menu: "Airport Transfer",
    href: "/services/airport-transfer",
    summary: "Door-to-door chauffeur travel to or from the airport, planned around the flight details you share.",
    image: "/images/airport.jpg",
    imageAlt: "Commercial aircraft on an airport apron",
  },
  {
    slug: "corporate-transfer",
    title: "Corporate Travel",
    menu: "Corporate Transfer",
    href: "/services/corporate-transfer",
    summary: "Point-to-point and hourly chauffeur travel for meetings, visitors, and executive schedules.",
    image: "/images/executive.jpg",
    imageAlt: "Professional in a suit standing outdoors",
  },
  {
    slug: "hourly-chauffeur",
    title: "Hourly Chauffeur",
    menu: "Hourly Chauffeur",
    href: "/services/hourly-chauffeur",
    summary: "Keep a chauffeur and vehicle for a block of hours, with stops arranged as the day unfolds.",
    image: "/images/drive.jpg",
    imageAlt: "Driver's view along an open road",
  },
  {
    slug: "special-events",
    title: "Special Events",
    menu: "Special Events",
    href: "/services/special-events",
    summary: "Chauffeur transportation for galas, nights out, concerts, and other occasions you want handled smoothly.",
    image: "/images/event.jpg",
    imageAlt: "Warm evening event lighting",
  },
  {
    slug: "city-to-city-transfer",
    title: "City to City",
    menu: "City to City",
    href: "/services/city-to-city-transfer",
    summary: "Longer private transfers between cities, with the route and timing quoted before you travel.",
    image: "/images/road.jpg",
    imageAlt: "Open highway stretching toward the horizon",
  },
  {
    slug: "wedding-service",
    title: "Wedding Service",
    menu: "Wedding Service",
    href: "/services/wedding-service",
    summary: "Vehicles and timing for the couple, family, and guests, arranged around the wedding day schedule.",
    image: "/images/wedding.jpg",
    imageAlt: "Bride and groom walking together outdoors",
  },
  {
    slug: "roadshows",
    title: "Roadshows",
    menu: "Roadshows",
    href: "/services/roadshows",
    summary: "Multi-stop chauffeur support for investor meetings, site visits, and touring schedules.",
    image: "/images/meeting.jpg",
    imageAlt: "Two professionals in conversation at a table",
  },
  {
    slug: "city-tours",
    title: "City Tours",
    menu: "City Tours",
    href: "/services/city-tours",
    summary: "A private chauffeur itinerary built around the landmarks, meals, and pace you choose.",
    image: "/images/city.jpg",
    imageAlt: "Dense city skyline in daylight",
  },
  {
    slug: "limousine-service",
    title: "Limousine Service",
    menu: "Limousine Service",
    href: "/services/limousine-service",
    summary: "Limousine hire for entrances, celebrations, and transfers where the vehicle is part of the occasion.",
    image: "/images/party.jpg",
    imageAlt: "Evening celebration with warm lighting",
  },
  {
    slug: "chauffeur-service",
    title: "Chauffeur Service",
    menu: "Chauffeur Service",
    href: "/services/chauffeur-service",
    summary: "As-directed and point-to-point chauffeur travel when you want the details handled for you.",
    image: "/images/suit.jpg",
    imageAlt: "Tailored suit jacket, suggesting a formal chauffeur arrival",
  },
];

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}
