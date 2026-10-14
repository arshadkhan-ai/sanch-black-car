export type FleetCategory = "Sedan" | "SUV" | "Sprinter" | "Limousine" | "Executive" | "Luxury";

export type FleetVehicle = {
  slug: string;
  name: string;
  categories: FleetCategory[];
  image: string;
  passengers: string;
  bags: string;
  summary: string;
  illustrativeModel: string;
  amenities: string[];
  suitableFor: string[];
};

export const fleetFilters = ["All Vehicles", "Sedan", "SUV", "Sprinter", "Executive", "Luxury"] as const;

export const fleet: FleetVehicle[] = [
  {
    slug: "executive-sedan",
    name: "Executive Sedan",
    categories: ["Sedan", "Executive"],
    image: "/images/sedan.jpg",
    passengers: "Up to 3",
    bags: "Up to 3",
    summary: "A quiet sedan category for airport runs, dinners, and one or two passengers who want a discreet arrival.",
    illustrativeModel: "Illustrative example: a black luxury sedan. The exact model is unconfirmed until the owner publishes the fleet.",
    amenities: ["Leather seating", "Climate control", "Bottled water on request", "Charging cables on request"],
    suitableFor: ["Airport transfers", "Business meetings", "Evenings out"],
  },
  {
    slug: "luxury-suv",
    name: "Luxury SUV",
    categories: ["SUV", "Luxury"],
    image: "/images/suv.jpg",
    passengers: "Up to 6",
    bags: "Up to 6",
    summary: "Extra cabin space for families, executives with luggage, or small groups who want to ride together.",
    illustrativeModel: "Illustrative example: a black luxury SUV. Availability of any named model is unconfirmed.",
    amenities: ["Spacious seating", "Luggage room", "Climate control", "Tinted glass where the vehicle has it"],
    suitableFor: ["Family airport travel", "Client entertaining", "City-to-city trips"],
  },
  {
    slug: "premium-sprinter",
    name: "Premium Sprinter",
    categories: ["Sprinter", "Executive"],
    image: "/images/van.jpg",
    passengers: "Up to 14",
    bags: "Up to 14",
    summary: "A van category for groups, guest shuttles, and roadshows that need one vehicle for the whole party.",
    illustrativeModel: "Illustrative example: a black Mercedes-Benz van. Seating layouts are confirmed per quote.",
    amenities: ["Group seating", "Standing room to board easily", "Luggage space", "Multiple pickup stops on request"],
    suitableFor: ["Weddings", "Corporate groups", "Event shuttles"],
  },
  {
    slug: "stretch-limousine",
    name: "Stretch Limousine",
    categories: ["Limousine", "Luxury"],
    image: "/images/night-car.jpg",
    passengers: "Up to 10",
    bags: "Up to 6",
    summary: "A limousine category for entrances that call for a longer vehicle. The photograph is illustrative, not a specific limousine in our garage.",
    illustrativeModel: "Stretch limousines are quoted by occasion. Model, colour, and interior are unconfirmed until booked.",
    amenities: ["Occasion styling on request", "Privacy partition where fitted", "Group seating", "Photo-stop timing"],
    suitableFor: ["Weddings", "Proms", "Galas", "Nights out"],
  },
  {
    slug: "business-sedan",
    name: "Business Sedan",
    categories: ["Sedan", "Executive"],
    image: "/images/interior.jpg",
    passengers: "Up to 3",
    bags: "Up to 2",
    summary: "A second sedan option when the priority is a calm cabin between meetings.",
    illustrativeModel: "Illustrative photograph of a black luxury sedan in motion. The fleet model is unconfirmed.",
    amenities: ["Quiet cabin", "Work-friendly seating", "Climate control", "Door-to-door timing"],
    suitableFor: ["Corporate transfers", "Hourly hire", "As-directed days"],
  },
  {
    slug: "executive-suv",
    name: "Executive SUV",
    categories: ["SUV", "Executive", "Luxury"],
    image: "/images/gwagon.jpg",
    passengers: "Up to 4",
    bags: "Up to 4",
    summary: "A smaller luxury SUV category for principals who want presence without a full passenger van.",
    illustrativeModel: "Illustrative photograph. A specific SUV is offered only when it is available for that date.",
    amenities: ["Elevated seating", "Premium interior", "Luggage room", "City and highway travel"],
    suitableFor: ["Roadshows", "VIP arrivals", "Special events"],
  },
];

export function getVehicle(slug: string) {
  return fleet.find((vehicle) => vehicle.slug === slug);
}
