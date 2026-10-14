import { z } from "zod";
import { getVehicle } from "@/content/fleet";
import { issuesToMap, zodIssuesToMap } from "@/lib/quote";
import { shiftIsoDate } from "@/lib/utils";

export const bookingServices = [
  { id: "point-to-point", label: "Point to Point" },
  { id: "airport", label: "Airport Transfer" },
  { id: "city-to-city", label: "City to City" },
  { id: "hourly", label: "Hourly Chauffeur" },
  { id: "wedding-service", label: "Wedding Service" },
  { id: "corporate-transfer", label: "Corporate Transfer" },
  { id: "special-events", label: "Special Events" },
  { id: "roadshows", label: "Roadshows" },
  { id: "city-tours", label: "City Tours" },
  { id: "limousine-service", label: "Limousine Service" },
  { id: "chauffeur-service", label: "Chauffeur Service" },
] as const;

const serviceAliases: Record<string, BookingServiceId> = {
  "airport-transfer": "airport",
  "hourly-chauffeur": "hourly",
  "city-to-city-transfer": "city-to-city",
};

const hourlyServiceIds = new Set<BookingServiceId>(["hourly", "city-tours", "roadshows"]);

export const hourlyDurations = ["2", "3", "4", "5", "6", "8", "10", "12"] as const;

export type BookingServiceId = (typeof bookingServices)[number]["id"];
export type BookingTrip = "one-way" | "round-trip";

export type BookingFormValues = {
  serviceType: BookingServiceId;
  trip: BookingTrip;
  date: string;
  time: string;
  pickup: string;
  stops: string[];
  dropoff: string;
  returnDate: string;
  returnTime: string;
  passengers: number;
  suitcases: number;
  hours: string;
  flightNumber: string;
  terminal: string;
  instructions: string;
  vehicle: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  companyName: string;
  comments: string;
  meetAndGreet: boolean;
  airportParking: boolean;
  privacyAccepted: boolean;
  smsConsent: boolean;
  website: string;
  clientToday: string;
  clientNow: string;
};

const datePattern = /^\d{4}-\d{2}-\d{2}$/;
const timePattern = /^([01]\d|2[0-3]):[0-5]\d$/;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^[0-9+().\-\s]{7,30}$/;
const flightPattern = /^[A-Za-z0-9\s-]{2,15}$/;

export function serviceLabel(id: string) {
  return bookingServices.find((service) => service.id === id)?.label ?? id;
}

export function needsHours(id: string) {
  return hourlyServiceIds.has(id as BookingServiceId);
}

export function needsFlight(id: string) {
  return id === "airport";
}

export function bookingPath(options?: {
  service?: BookingServiceId;
  vehicle?: string;
  trip?: BookingTrip;
  note?: string;
}) {
  const params = new URLSearchParams();
  if (options?.service) params.set("service", options.service);
  if (options?.vehicle) params.set("vehicle", options.vehicle);
  if (options?.trip) params.set("trip", options.trip);
  if (options?.note) params.set("note", options.note);
  const query = params.toString();
  return query ? `/bookings?${query}` : "/bookings";
}

export function readBookingQuery(query: Record<string, string | string[] | undefined>) {
  const one = (key: string) => {
    const value = query[key];
    const text = Array.isArray(value) ? value[0] ?? "" : value ?? "";
    return text.trim();
  };
  const serviceRaw = serviceAliases[one("service")] ?? one("service");
  const serviceType: BookingServiceId = bookingServices.some((service) => service.id === serviceRaw)
    ? (serviceRaw as BookingServiceId)
    : "point-to-point";
  const trip: BookingTrip = one("trip") === "round-trip" ? "round-trip" : "one-way";
  const vehicleRaw = one("vehicle");
  const vehicle = getVehicle(vehicleRaw) ? vehicleRaw : "";
  return {
    serviceType,
    trip,
    vehicle,
    instructions: one("note").slice(0, 300),
  };
}

function add(issues: { path: string; message: string }[], path: string, message: string) {
  issues.push({ path, message });
}

function filledStops(stops: string[]) {
  return stops.map((stop) => stop.trim()).filter(Boolean);
}

export function collectBookingIssues(value: BookingFormValues, phase: "ride" | "vehicle" | "contact" | "full") {
  const issues: { path: string; message: string }[] = [];
  const checkRide = phase === "ride" || phase === "full";
  const checkVehicle = phase === "vehicle" || phase === "full";
  const checkContact = phase === "contact" || phase === "full";

  if (checkRide) {
    if (!bookingServices.some((service) => service.id === value.serviceType)) {
      add(issues, "serviceType", "Choose a service type.");
    }
    if (value.trip !== "one-way" && value.trip !== "round-trip") {
      add(issues, "trip", "Choose one way or round trip.");
    }
    if (!datePattern.test(value.date)) {
      add(issues, "date", "Choose a pickup date.");
    } else if (value.clientToday && datePattern.test(value.clientToday) && value.date < value.clientToday) {
      add(issues, "date", "Pickup date cannot be in the past.");
    }
    if (!timePattern.test(value.time)) {
      add(issues, "time", "Choose a pickup time.");
    } else if (
      value.date &&
      value.clientToday &&
      value.date === value.clientToday &&
      value.clientNow &&
      value.time < value.clientNow
    ) {
      add(issues, "time", "Pickup time cannot be in the past.");
    }
    if (!value.pickup.trim()) add(issues, "pickup", "Enter a pickup location.");
    if (!needsHours(value.serviceType) && !value.dropoff.trim()) {
      add(issues, "dropoff", "Enter a drop-off location.");
    }
    value.stops.forEach((stop, index) => {
      if (stop.trim().length > 160) add(issues, `stops.${index}`, "Keep this stop under 160 characters.");
    });
    if (value.stops.length > 8) add(issues, "stops", "Add no more than 8 stops.");
    if (value.trip === "round-trip") {
      if (!datePattern.test(value.returnDate)) add(issues, "returnDate", "Choose a return date.");
      else if (value.date && value.returnDate < value.date) add(issues, "returnDate", "Return date must be on or after pickup.");
      if (!timePattern.test(value.returnTime)) add(issues, "returnTime", "Choose a return time.");
    }
    const passengers = Number(value.passengers);
    if (!Number.isInteger(passengers) || passengers < 1 || passengers > 14) {
      add(issues, "passengers", "Enter 1 to 14 passengers.");
    }
    const suitcases = Number(value.suitcases);
    if (!Number.isInteger(suitcases) || suitcases < 0 || suitcases > 20) {
      add(issues, "suitcases", "Enter 0 to 20 suitcases.");
    }
    if (needsHours(value.serviceType) && !hourlyDurations.includes(value.hours as (typeof hourlyDurations)[number])) {
      add(issues, "hours", "Choose how many hours you need.");
    }
    if (needsFlight(value.serviceType)) {
      if (!flightPattern.test(value.flightNumber.trim())) add(issues, "flightNumber", "Enter a flight number.");
      if (value.terminal.trim().length < 1) add(issues, "terminal", "Enter the airport terminal.");
      else if (value.terminal.trim().length > 40) add(issues, "terminal", "Keep the terminal under 40 characters.");
    }
    if (value.instructions.length > 2000) add(issues, "instructions", "Shorten the special instructions.");
  }

  if (checkVehicle) {
    if (!value.vehicle || !getVehicle(value.vehicle)) add(issues, "vehicle", "Select a vehicle category.");
  }

  if (checkContact) {
    if (value.firstName.trim().length < 2) add(issues, "firstName", "Enter your first name.");
    if (value.lastName.trim().length < 2) add(issues, "lastName", "Enter your last name.");
    if (!emailPattern.test(value.email.trim())) add(issues, "email", "Enter a valid email address.");
    if (!phonePattern.test(value.phone.trim())) add(issues, "phone", "Enter a phone number we can use to reply.");
    if (value.companyName.length > 80) add(issues, "companyName", "Keep the company name under 80 characters.");
    if (value.comments.length > 2000) add(issues, "comments", "Shorten the comments.");
    if (value.privacyAccepted !== true) add(issues, "privacyAccepted", "Accept the Privacy Policy to send this request.");
    if (value.website.length > 0) add(issues, "website", "This request could not be accepted.");
  }

  return issues;
}

export const bookingSchema = z
  .object({
    serviceType: z.enum([
      "point-to-point",
      "airport",
      "city-to-city",
      "hourly",
      "wedding-service",
      "corporate-transfer",
      "special-events",
      "roadshows",
      "city-tours",
      "limousine-service",
      "chauffeur-service",
    ]),
    trip: z.enum(["one-way", "round-trip"]),
    date: z.string(),
    time: z.string(),
    pickup: z.string().trim().max(160),
    stops: z.array(z.string().trim().max(160)).max(8).default([]),
    dropoff: z.string().trim().max(160).default(""),
    returnDate: z.string().default(""),
    returnTime: z.string().default(""),
    passengers: z.coerce.number(),
    suitcases: z.coerce.number(),
    hours: z.string().default(""),
    flightNumber: z.string().trim().max(20).default(""),
    terminal: z.string().trim().max(40).default(""),
    instructions: z.string().trim().max(2000).default(""),
    vehicle: z.string().trim().max(80),
    firstName: z.string().trim().max(60),
    lastName: z.string().trim().max(60),
    email: z.string().trim().max(120),
    phone: z.string().trim().max(30),
    companyName: z.string().trim().max(80).default(""),
    comments: z.string().trim().max(2000).default(""),
    meetAndGreet: z.boolean().default(false),
    airportParking: z.boolean().default(false),
    privacyAccepted: z.boolean(),
    smsConsent: z.boolean().default(false),
    website: z.string().max(0).optional().default(""),
    clientToday: z.string().regex(datePattern),
    clientNow: z.string().regex(timePattern),
  })
  .superRefine((value, ctx) => {
    for (const issue of collectBookingIssues(value as BookingFormValues, "full")) {
      ctx.addIssue({ code: "custom", path: issue.path.split("."), message: issue.message });
    }
  });

export type BookingPayload = z.infer<typeof bookingSchema>;

export function bookingFieldErrors(error: z.ZodError) {
  const map = zodIssuesToMap(error);
  for (const issue of error.issues) {
    const key = issue.path.map(String).join(".");
    if (key && !map[key]) map[key] = issue.message;
  }
  return map;
}

export function assertTravelWindow(clientToday: string) {
  const serverToday = new Date().toISOString().slice(0, 10);
  const earliest = shiftIsoDate(serverToday, -1);
  const latest = shiftIsoDate(serverToday, 1);
  return clientToday >= earliest && clientToday <= latest;
}

export function bookingIssuesToMap(issues: { path: string; message: string }[]) {
  return issuesToMap(issues);
}

export function formatBookingRequest(value: BookingPayload) {
  const vehicle = getVehicle(value.vehicle);
  const stops = filledStops(value.stops);
  return [
    "Booking request — not a confirmed reservation",
    `Service: ${serviceLabel(value.serviceType)}`,
    `Trip: ${value.trip === "round-trip" ? "Round trip" : "One way"}`,
    `Pickup: ${value.date} ${value.time} — ${value.pickup}`,
    stops.length ? `Stops:\n${stops.map((stop, index) => `${index + 1}. ${stop}`).join("\n")}` : "Stops: none",
    `Drop-off: ${value.dropoff || "—"}`,
    value.trip === "round-trip" ? `Return: ${value.returnDate} ${value.returnTime}` : "Return: —",
    needsHours(value.serviceType) ? `Hours: ${value.hours}` : "Hours: —",
    `Passengers: ${value.passengers}`,
    `Suitcases: ${value.suitcases}`,
    needsFlight(value.serviceType) ? `Flight: ${value.flightNumber}` : "Flight: —",
    needsFlight(value.serviceType) ? `Terminal: ${value.terminal}` : "Terminal: —",
    `Vehicle: ${vehicle?.name ?? value.vehicle}`,
    `Meet and greet: ${value.meetAndGreet ? "Requested" : "No"}`,
    `Airport parking: ${value.airportParking ? "Requested" : "No"}`,
    `Instructions: ${value.instructions || "—"}`,
    `Name: ${value.firstName} ${value.lastName}`,
    `Email: ${value.email}`,
    `Phone: ${value.phone}`,
    `Company: ${value.companyName || "—"}`,
    `Comments: ${value.comments || "—"}`,
    `SMS consent: ${value.smsConsent ? "Yes" : "No"}`,
    "Price: not calculated. No fare was published.",
  ].join("\n");
}
