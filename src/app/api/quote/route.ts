import { quoteSchema, zodIssuesToMap } from "@/lib/quote";
import { sendEnquiry } from "@/lib/mail";
import { clientKey, isRateLimited } from "@/lib/rate-limit";
import { shiftIsoDate } from "@/lib/utils";

function json(body: unknown, status = 200) {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: Request) {
  if (isRateLimited(`quote:${clientKey(request)}`)) {
    return json({ ok: false, message: "Too many enquiries were sent just now. Wait a minute and try again." }, 429);
  }

  const raw = await request.text();
  if (raw.length > 20000) {
    return json({ ok: false, message: "This enquiry is too long to send." }, 413);
  }

  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return json({ ok: false, message: "The enquiry could not be read." }, 400);
  }

  if (body && typeof body === "object" && "company" in body && typeof body.company === "string" && body.company.length > 0) {
    return json({ ok: false, message: "The enquiry could not be accepted." }, 400);
  }

  const parsed = quoteSchema.safeParse(body);
  if (!parsed.success) {
    return json({ ok: false, message: "Some details need correcting.", fieldErrors: zodIssuesToMap(parsed.error) }, 400);
  }

  const serverToday = new Date().toISOString().slice(0, 10);
  const earliest = shiftIsoDate(serverToday, -1);
  const latest = shiftIsoDate(serverToday, 1);
  if (parsed.data.clientToday < earliest || parsed.data.clientToday > latest) {
    return json({ ok: false, message: "The travel date could not be checked. Refresh the page and try again." }, 400);
  }

  const value = parsed.data;
  const text = [
    `Service: ${value.service}`,
    `Mode: ${value.mode}`,
    `Pickup: ${value.pickup || "—"}`,
    `Drop-off: ${value.dropoff || "—"}`,
    `Airport: ${value.airport || "—"}`,
    `Date: ${value.date} ${value.time || ""}`.trim(),
    `Return: ${value.returnDate || "—"} ${value.returnTime || ""}`.trim(),
    `Hours: ${value.hours || "—"}`,
    `Passengers: ${value.passengers}`,
    `Luggage: ${value.luggage || "—"}`,
    `Vehicle: ${value.vehicle || "—"}`,
    `Flight: ${value.flightNumber || "—"}`,
    `Occasion: ${value.eventType || "—"}`,
    `Itinerary: ${value.itinerary || "—"}`,
    `Name: ${value.name}`,
    `Email: ${value.email}`,
    `Phone: ${value.phone}`,
    `Notes: ${value.notes || "—"}`,
  ].join("\n");

  const sent = await sendEnquiry(`Quote enquiry — ${value.service}`, text);
  if (!sent.ok) return json({ ok: false, message: sent.message }, sent.status);
  return json({ ok: true });
}
