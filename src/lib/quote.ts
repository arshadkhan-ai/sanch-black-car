import { z } from "zod";

export const quoteModes = [
  "one-way",
  "round-trip",
  "hourly",
  "multi-city",
  "as-directed",
  "point-to-point",
  "airport-pickup",
  "airport-dropoff",
  "event",
  "wedding",
  "roadshow",
  "city-tour",
] as const;

export type QuoteMode = (typeof quoteModes)[number];

export type QuoteValues = {
  mode: QuoteMode;
  service: string;
  pickup: string;
  dropoff: string;
  airport: string;
  date: string;
  time: string;
  returnDate: string;
  returnTime: string;
  hours: string;
  passengers: number;
  luggage: string;
  vehicle: string;
  flightNumber: string;
  eventType: string;
  itinerary: string;
  name: string;
  email: string;
  phone: string;
  notes: string;
  consent: boolean;
  company: string;
  clientToday: string;
  clientNow: string;
};

const datePattern = /^\d{4}-\d{2}-\d{2}$/;
const timePattern = /^([01]\d|2[0-3]):[0-5]\d$/;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^[0-9+().\-\s]{7,30}$/;

export function fieldsForMode(mode: QuoteMode) {
  return {
    pickup: mode !== "airport-pickup",
    dropoff: [
      "one-way",
      "round-trip",
      "point-to-point",
      "airport-pickup",
      "event",
      "wedding",
      "multi-city",
      "roadshow",
    ].includes(mode),
    airport: mode === "airport-pickup" || mode === "airport-dropoff",
    returnTrip: mode === "round-trip",
    hours: mode === "hourly" || mode === "as-directed" || mode === "city-tour",
    eventType: mode === "event" || mode === "wedding" || mode === "roadshow",
    itinerary: mode === "multi-city" || mode === "roadshow",
    flight: mode === "airport-pickup" || mode === "airport-dropoff",
    time: mode !== "multi-city",
  };
}

function add(
  issues: { path: string; message: string }[],
  path: string,
  message: string,
) {
  issues.push({ path, message });
}

export function collectQuoteIssues(
  value: Partial<QuoteValues>,
  phase: "trip" | "full",
) {
  const issues: { path: string; message: string }[] = [];
  const mode = value.mode;
  if (!mode || !quoteModes.includes(mode)) {
    add(issues, "mode", "Choose a trip type.");
    return issues;
  }

  const fields = fieldsForMode(mode);
  const today = value.clientToday ?? "";

  if (!datePattern.test(today)) {
    add(issues, "date", "Choose a travel date.");
  }
  if (!value.date || !datePattern.test(value.date)) {
    add(issues, "date", "Choose a valid travel date.");
  } else if (datePattern.test(today) && value.date < today) {
    add(issues, "date", "The travel date cannot be in the past.");
  }

  if (fields.time) {
    if (!value.time || !timePattern.test(value.time)) {
      add(issues, "time", "Choose a valid time.");
    } else if (
      value.date &&
      value.date === today &&
      value.clientNow &&
      timePattern.test(value.clientNow) &&
      value.time < value.clientNow
    ) {
      add(issues, "time", "Choose a later time today.");
    }
  }

  if (fields.pickup && !value.pickup?.trim()) {
    add(issues, "pickup", "Enter a pickup location.");
  }
  if (fields.dropoff && !value.dropoff?.trim()) {
    add(issues, "dropoff", "Enter a drop-off location.");
  }
  if (fields.airport && !value.airport?.trim()) {
    add(issues, "airport", "Choose an airport.");
  }
  if (fields.hours && !value.hours?.trim()) {
    add(issues, "hours", "Choose a duration.");
  }
  if (fields.eventType && !value.eventType?.trim()) {
    add(issues, "eventType", "Choose the occasion.");
  }
  if (fields.itinerary && (value.itinerary?.trim().length ?? 0) < 12) {
    add(issues, "itinerary", "Add a short itinerary, at least a sentence.");
  }
  if (fields.returnTrip) {
    if (!value.returnDate || !datePattern.test(value.returnDate)) {
      add(issues, "returnDate", "Choose a return date.");
    } else if (value.date && value.returnDate < value.date) {
      add(issues, "returnDate", "The return date must be on or after the departure.");
    }
    if (!value.returnTime || !timePattern.test(value.returnTime)) {
      add(issues, "returnTime", "Choose a return time.");
    }
  }

  const passengers = Number(value.passengers);
  if (!Number.isInteger(passengers) || passengers < 1 || passengers > 14) {
    add(issues, "passengers", "Choose between 1 and 14 passengers.");
  }

  if (value.flightNumber && !/^[A-Za-z0-9\s-]{2,15}$/.test(value.flightNumber)) {
    add(issues, "flightNumber", "Enter a flight number using letters and numbers.");
  }

  if (phase === "full") {
    if (!value.name || value.name.trim().length < 2) {
      add(issues, "name", "Enter your name.");
    }
    if (!value.email || !emailPattern.test(value.email.trim())) {
      add(issues, "email", "Enter a valid email address.");
    }
    if (!value.phone || !phonePattern.test(value.phone.trim())) {
      add(issues, "phone", "Enter a phone number we can use to reply.");
    }
    if (value.consent !== true) {
      add(issues, "consent", "Confirm that we may contact you about this enquiry.");
    }
    if (value.company && value.company.length > 0) {
      add(issues, "company", "This enquiry could not be accepted.");
    }
  }

  return issues;
}

export const quoteSchema = z
  .object({
    mode: z.enum(quoteModes),
    service: z.string().trim().min(2).max(80),
    pickup: z.string().trim().max(160).default(""),
    dropoff: z.string().trim().max(160).default(""),
    airport: z.string().trim().max(80).default(""),
    date: z.string(),
    time: z.string().default(""),
    returnDate: z.string().default(""),
    returnTime: z.string().default(""),
    hours: z.string().trim().max(40).default(""),
    passengers: z.coerce.number(),
    luggage: z.string().trim().max(40).default(""),
    vehicle: z.string().trim().max(80).default(""),
    flightNumber: z.string().trim().max(20).default(""),
    eventType: z.string().trim().max(80).default(""),
    itinerary: z.string().trim().max(2000).default(""),
    name: z.string().trim().max(80).default(""),
    email: z.string().trim().max(120).default(""),
    phone: z.string().trim().max(30).default(""),
    notes: z.string().trim().max(2000).default(""),
    consent: z.boolean().default(false),
    company: z.string().max(0).optional().default(""),
    clientToday: z.string().regex(datePattern),
    clientNow: z.string().regex(timePattern),
  })
  .superRefine((value, ctx) => {
    for (const issue of collectQuoteIssues(value, "full")) {
      ctx.addIssue({ code: "custom", path: [issue.path], message: issue.message });
    }
  });

export type QuotePayload = z.infer<typeof quoteSchema>;

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Enter your name.").max(80),
  email: z.string().trim().regex(emailPattern, "Enter a valid email address.").max(120),
  phone: z.string().trim().regex(phonePattern, "Enter a phone number.").max(30),
  service: z.string().trim().min(2).max(80),
  message: z.string().trim().min(10, "Add a few details so we can reply.").max(2000),
  consent: z.boolean().refine((value) => value, "Confirm that we may contact you."),
  company: z.string().max(0).optional().default(""),
});

export function issuesToMap(issues: { path: string; message: string }[]) {
  const map: Record<string, string> = {};
  for (const issue of issues) {
    if (!map[issue.path]) map[issue.path] = issue.message;
  }
  return map;
}

export function zodIssuesToMap(error: z.ZodError) {
  const map: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "form");
    if (!map[key]) map[key] = issue.message;
  }
  return map;
}
