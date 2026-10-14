import { Suspense } from "react";
import { BookingWizard } from "@/components/booking/booking-wizard";
import { Container } from "@/components/layout/container";
import { readBookingQuery } from "@/lib/booking";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Book a Ride",
  "Request a SANCH BLACK CAR chauffeur. Choose the ride, a vehicle category, and your contact details. Nothing is reserved until we reply.",
  "/bookings",
);

export default function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  return (
    <section className="bg-ivory py-12 md:py-16">
      <Container>
        <p className="text-[11px] uppercase tracking-[0.28em] text-gold-ink">Reservations</p>
        <h1 className="mt-3 max-w-3xl font-serif text-5xl text-ink md:text-6xl">Book a chauffeur</h1>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-muted md:text-base">
          Enter the ride, choose a vehicle category, and send your details. This is a request for a quote. A booking reference is issued only by a connected reservation system, and the ride is not confirmed on this page.
        </p>
        <div className="mt-10">
          <Suspense fallback={<p className="text-sm text-muted">Loading the booking form…</p>}>
            <BookingLoader searchParams={searchParams} />
          </Suspense>
        </div>
      </Container>
    </section>
  );
}

async function BookingLoader({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const initial = readBookingQuery(await searchParams);
  return <BookingWizard initial={initial} />;
}
