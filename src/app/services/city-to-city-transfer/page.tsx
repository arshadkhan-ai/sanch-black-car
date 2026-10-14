import Image from "next/image";
import Link from "next/link";
import { Car, Clock, MapPin, Shield } from "lucide-react";
import { QuoteForm } from "@/components/booking/quote-form";
import { Container } from "@/components/layout/container";
import { faqSchema, JsonLd } from "@/components/seo/json-ld";
import { FaqSplit, FleetBand, ProcessSteps, ServiceHero, SplitBlock } from "@/components/sections/blocks";
import { coverageNote } from "@/config/site";
import { faqs } from "@/content/faqs";
import { exampleRoutes } from "@/content/places";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "City to City Transfers",
  "Request a chauffeur quote for private travel between cities, including one-way, round-trip, and multi-city plans.",
  "/services/city-to-city-transfer",
);

export default function Page() {
  const items = faqs["city-to-city-transfer"];
  return (
    <>
      <JsonLd data={faqSchema(items)} />
      <ServiceHero
        eyebrow="City to city transfer"
        title={<><span className="block">Travel Comfortably</span><span className="text-gold">Between Cities</span></>}
        description="A private chauffeur for the longer ride between two places. Sit in one vehicle from the pickup address to the destination you name."
        image="/images/city.jpg"
        imageAlt="City skyline"
        highlights={[
          { icon: Car, label: "Private vehicle" },
          { icon: Shield, label: "Professional chauffeur" },
          { icon: Clock, label: "Quoted timing" },
          { icon: MapPin, label: "Door to door" },
        ]}
      >
        <QuoteForm
          appearance="card"
          title="Book a City Transfer"
          service="City to city transfer"
          modes={[
            { id: "one-way", label: "One Way" },
            { id: "round-trip", label: "Round Trip" },
            { id: "multi-city", label: "Multi-City" },
          ]}
        />
      </ServiceHero>
      <SplitBlock
        eyebrow="Longer private journeys"
        title="Distance travel, quoted before you go"
        body="Use this service when the trip is a transfer, not a tour. Tell us both cities, the date, and whether anyone needs a return or extra stops. We price that plan and confirm a vehicle category if it is available."
        image="/images/road.jpg"
        imageAlt="Highway at dusk"
        href="/bookings?service=city-to-city"
        cta="Book Your Ride"
        aside={
          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            {[
              ["Comfortable hours", "A sedan or SUV kept for the length of the transfer.", "/images/interior.jpg"],
              ["One plan", "Stops you add are included in the quote, not invented later.", "/images/bridge.jpg"],
              ["Groups", "Ask for a sprinter when the party should stay together.", "/images/van.jpg"],
            ].map(([title, text, image]) => (
              <article key={title} className="overflow-hidden rounded-2xl bg-white">
                <div className="relative h-28">
                  <Image src={image} alt="" fill className="object-cover" sizes="200px" />
                </div>
                <div className="p-3">
                  <h3 className="font-medium">{title}</h3>
                  <p className="mt-1 text-sm text-muted">{text}</p>
                </div>
              </article>
            ))}
          </div>
        }
      />
      <section className="bg-ink py-16 text-white">
        <Container>
          <div className="flex items-end justify-between gap-4">
            <h2 className="font-serif text-4xl md:text-5xl">Example city pairs</h2>
            <Link href="/contact-us" className="text-sm text-gold">Ask about a route</Link>
          </div>
          <div className="mt-8 flex gap-4 overflow-x-auto pb-2">
            {exampleRoutes.map((route) => (
              <article key={`${route.from}-${route.to}`} className="relative h-64 w-64 shrink-0 overflow-hidden rounded-2xl">
                <Image src={route.image} alt="" fill className="object-cover" sizes="256px" />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
                <div className="relative flex h-full flex-col justify-end p-4">
                  <h3 className="font-serif text-2xl">{route.from} to {route.to}</h3>
                  <Link href="/bookings?service=city-to-city" className="mt-2 text-sm text-gold">Request a quote</Link>
                </div>
              </article>
            ))}
          </div>
          <p className="mt-4 text-sm text-white/60">{coverageNote}</p>
        </Container>
      </section>
      <ProcessSteps />
      <FleetBand title="Vehicles for a longer transfer" theme="light" />
      <FaqSplit title="City transfer questions" items={items} image="/images/suv.jpg" imageAlt="Black luxury SUV" ctaTitle="Quote the city pair" ctaText="Name both ends of the journey and the date." ctaHref="/bookings?service=city-to-city" ctaLabel="Get a Quote" />
    </>
  );
}
