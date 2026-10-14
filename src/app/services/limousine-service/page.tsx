import { Clock, Gem, Sparkles, Users } from "lucide-react";
import { QuoteForm } from "@/components/booking/quote-form";
import { faqSchema, JsonLd } from "@/components/seo/json-ld";
import { FaqSplit, FleetBand, MediaGrid, ProcessSteps, ServiceHero, SplitBlock } from "@/components/sections/blocks";
import { fleet } from "@/content/fleet";
import { faqs } from "@/content/faqs";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Limousine Service",
  "Request a limousine for weddings, proms, nights out, and transfers. Availability and passenger capacity are confirmed in the quote.",
  "/services/limousine-service",
);

export default function Page() {
  const items = faqs["limousine-service"];
  const limos = fleet.filter((vehicle) => vehicle.categories.includes("Limousine") || vehicle.categories.includes("Luxury"));
  return (
    <>
      <JsonLd data={faqSchema(items)} />
      <ServiceHero
        eyebrow="Limousine service"
        title={<><span className="block">Travel in a</span><span className="text-gold">Limousine</span></>}
        description="Request a limousine when the vehicle is part of the occasion. Photographs on this page are illustrative. The car we offer is named in the quote."
        image="/images/party.jpg"
        imageAlt="Evening celebration"
        highlights={[
          { icon: Gem, label: "Limousine request" },
          { icon: Users, label: "Guest count" },
          { icon: Clock, label: "Hourly or transfer" },
          { icon: Sparkles, label: "Occasion arrival" },
        ]}
      >
        <QuoteForm
          appearance="card"
          title="Book Limousine Service"
          service="Limousine service"
          modes={[
            { id: "hourly", label: "Hourly" },
            { id: "point-to-point", label: "Point to Point" },
            { id: "as-directed", label: "As Directed" },
          ]}
        />
      </ServiceHero>
      <SplitBlock
        eyebrow="The entrance"
        title="A longer vehicle, confirmed for your date"
        body="Proms, weddings, and nights out are the usual reasons to ask. Tell us the passenger count so we do not suggest a vehicle that is too small. If a limousine is not free, we will say so rather than imply one is waiting."
        image="/images/night-car.jpg"
        imageAlt="Black car lights in the evening"
        href="/bookings?service=limousine-service&vehicle=stretch-limousine"
        cta="Book Limousine Service"
      />
      <MediaGrid
        title="Occasions for a limousine request"
        items={[
          { title: "Weddings", text: "Couple transportation with a timing plan.", image: "/images/wedding.jpg", href: "/services/wedding-service" },
          { title: "Proms and formals", text: "A pickup, the venue, and a return.", image: "/images/event.jpg" },
          { title: "Nights out", text: "Hourly hire when the evening has several stops.", image: "/images/party.jpg" },
          { title: "Airport in a limousine", text: "Ask, and we will confirm luggage space.", image: "/images/airport.jpg" },
          { title: "Galas", text: "A timed arrival at a named door.", image: "/images/concert.jpg" },
        ]}
        columns={5}
      />
      <FleetBand title="Limousine and luxury categories" theme="dark" vehicles={limos} />
      <ProcessSteps />
      <FaqSplit title="Limousine questions" items={items} image="/images/interior.jpg" imageAlt="Black luxury sedan" ctaTitle="Ask if a limousine is free" ctaText="Date, headcount, and whether you want hours or a transfer." ctaHref="/bookings?service=limousine-service&vehicle=stretch-limousine" ctaLabel="Get a Quote" />
    </>
  );
}
