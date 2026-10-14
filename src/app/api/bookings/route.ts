import { getVehicle } from "@/content/fleet";
import {
  assertTravelWindow,
  bookingFieldErrors,
  bookingSchema,
  formatBookingRequest,
  type BookingPayload,
} from "@/lib/booking";
import { sendEnquiry } from "@/lib/mail";
import { clientKey, isRateLimited } from "@/lib/rate-limit";

function json(body: unknown, status = 200) {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

async function referenceFromBookingSystem(value: BookingPayload) {
  const url = process.env.BOOKING_WEBHOOK_URL;
  if (!url) return null;

  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (process.env.BOOKING_WEBHOOK_TOKEN) headers.Authorization = `Bearer ${process.env.BOOKING_WEBHOOK_TOKEN}`;

  const response = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(value),
    signal: AbortSignal.timeout(12000),
  });

  if (!response.ok) {
    return { ok: false as const, status: 502, message: "The reservation system did not accept this request, so no booking was created." };
  }

  const payload = (await response.json().catch(() => null)) as { reference?: unknown } | null;
  const reference = typeof payload?.reference === "string" ? payload.reference.trim() : "";
  if (!reference) {
    return {
      ok: false as const,
      status: 502,
      message: "The reservation system did not return a booking reference, so no reference is shown and the ride is not marked confirmed.",
    };
  }

  return { ok: true as const, reference };
}

export async function POST(request: Request) {
  if (isRateLimited(`booking:${clientKey(request)}`)) {
    return json({ ok: false, message: "Too many requests were sent just now. Wait a minute and try again." }, 429);
  }

  const raw = await request.text();
  if (raw.length > 30000) return json({ ok: false, message: "This request is too long to send." }, 413);

  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return json({ ok: false, message: "The request could not be read." }, 400);
  }

  if (body && typeof body === "object" && "website" in body && typeof body.website === "string" && body.website.length > 0) {
    return json({ ok: false, message: "The request could not be accepted." }, 400);
  }

  const parsed = bookingSchema.safeParse(body);
  if (!parsed.success) {
    return json({ ok: false, message: "Some details need correcting.", fieldErrors: bookingFieldErrors(parsed.error) }, 400);
  }

  if (!assertTravelWindow(parsed.data.clientToday)) {
    return json({ ok: false, message: "The travel date could not be checked. Refresh the page and try again." }, 400);
  }

  if (!getVehicle(parsed.data.vehicle)) {
    return json({ ok: false, message: "Choose a vehicle category from the fleet list." }, 400);
  }

  const value = parsed.data;
  const text = formatBookingRequest(value);

  if (process.env.BOOKING_WEBHOOK_URL) {
    try {
      const booked = await referenceFromBookingSystem(value);
      if (!booked) {
        return json({ ok: false, message: "The reservation system is not available, so no booking was created." }, 503);
      }
      if (!booked.ok) return json({ ok: false, message: booked.message }, booked.status);
      const mailed = await sendEnquiry(`Booking request ${booked.reference}`, text);
      return json({
        ok: true,
        reference: booked.reference,
        enquirySent: mailed.ok,
        confirmed: false,
      });
    } catch {
      return json({ ok: false, message: "The reservation system could not be reached, so no booking was created." }, 502);
    }
  }

  const sent = await sendEnquiry(`Booking request — ${value.serviceType}`, text);
  if (!sent.ok) return json({ ok: false, message: sent.message }, sent.status);

  return json({
    ok: true,
    enquirySent: true,
    reference: null,
    confirmed: false,
  });
}
