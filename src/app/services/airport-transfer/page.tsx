import Image from "next/image";
import Link from "next/link";
import { Clock, Gem, Plane, Shield, Users } from "lucide-react";
import { QuoteForm } from "@/components/booking/quote-form";
import { Container } from "@/components/layout/container";
import { faqSchema, JsonLd } from "@/components/seo/json-ld";
import { FaqSplit, FleetBand, IconBand, ServiceHero, SplitBlock } from "@/components/sections/blocks";
import { faqs } from "@/content/faqs";
import { exampleAirports } from "@/content/places";
import { coverageNote } from "@/config/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Airport Transfers",
  "Request a chauffeur quote for airport pickups and drop-offs. Flight details help us plan the meeting point. Nothing is reserved until you accept the quote.",
  "/services/airport-transfer",
);

export default function Page() {
  const items = faqs["airport-transfer"];
  return (
    <>
      <JsonLd data={faqSchema(items)} />
      <ServiceHero
        eyebrow="Airport transfer service"
        title={<><span className="block">Stress-Free</span><span className="text-gold">Airport Transfers</span></>}
        description="Chauffeur transportation to or from the airport, planned from the flight details, luggage, and address you send with the quote."
        image="/images/airport.jpg"
        imageAlt="Aircraft on the airport apron at dusk"
        highlights={[
          { icon: Plane, label: "Flight details" },
          { icon: Clock, label: "Scheduled timing" },
          { icon: Users, label: "Meet on arrival" },
          { icon: Gem, label: "Luxury categories" },
        ]}
      >
        <QuoteForm
          appearance="card"
          title="Book Airport Transfer"
          service="Airport transfer"
          modes={[
            { id: "airport-pickup", label: "Pickup" },
            { id: "airport-dropoff", label: "Drop-off" },
          ]}
        />
      </ServiceHero>
      <SplitBlock
        eyebrow="Premium airport transportation"
        title="Your journey begins with a clear plan"
        body="Tell us whether you are arriving or departing, which airport, and where the other end of the trip is. We reply with the vehicle category, meeting point, and price before anything is confirmed."
        image="/images/terminal.jpg"
        imageAlt="Airport terminal interior"
        href="/bookings?service=airport"
        cta="Book Your Airport Transfer"
      />
      <IconBand
        items={[
          { icon: Plane, title: "Flight details", text: "Share the flight number so the pickup can be planned around the schedule you provide." },
          { icon: Clock, title: "Agreed timing", text: "Waiting time, if any, is written into the quote rather than assumed." },
          { icon: Users, title: "Meet and greet", text: "Ask for a name board or a specific door in the enquiry." },
          { icon: Gem, title: "Room for luggage", text: "Passenger and bag counts decide the category we offer." },
          { icon: Shield, title: "Direct reply", text: "Questions are answered in the quote thread." },
        ]}
      />
      <section className="bg-ivory py-16">
        <Container>
          <p className="text-[11px] uppercase tracking-[0.28em] text-gold-ink">Airports people ask about</p>
          <h2 className="mt-3 font-serif text-4xl md:text-5xl">Example airports</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {exampleAirports.map((airport) => (
              <article key={airport.code} className="relative min-h-48 overflow-hidden rounded-2xl">
                <Image src={airport.image} alt="" fill className="object-cover" sizes="25vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                <div className="relative flex h-full min-h-48 flex-col justify-end p-4 text-white">
                  <h3 className="font-serif text-3xl">{airport.code}</h3>
                  <p className="text-sm text-white/80">{airport.name}</p>
                </div>
              </article>
            ))}
          </div>
          <p className="mt-5 text-sm leading-6 text-muted">{coverageNote}</p>
        </Container>
      </section>
      <FleetBand title="Travel in a category that fits the luggage" />
      <FaqSplit
        title="Airport transfer questions"
        items={items}
        image="/images/jet.jpg"
        imageAlt="Private aircraft on the ground"
        ctaTitle="Request an airport quote"
        ctaText="Send the flight, the address, and the vehicle category you prefer."
        ctaHref="/bookings?service=airport"
        ctaLabel="Get a Quote"
      />
      <p className="sr-only"><Link href="/our-fleet">Fleet</Link></p>
    </>
  );
}
