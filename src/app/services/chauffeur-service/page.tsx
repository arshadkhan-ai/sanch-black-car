import { Clock, Gem, Shield, Users } from "lucide-react";
import { QuoteForm } from "@/components/booking/quote-form";
import { faqSchema, JsonLd } from "@/components/seo/json-ld";
import { FaqSplit, FleetBand, MediaGrid, ProcessSteps, ServiceHero, SplitBlock } from "@/components/sections/blocks";
import { faqs } from "@/content/faqs";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Chauffeur Service",
  "Request as-directed, hourly, or point-to-point chauffeur service. The vehicle category and schedule are confirmed in the quote.",
  "/services/chauffeur-service",
);

export default function Page() {
  const items = faqs["chauffeur-service"];
  return (
    <>
      <JsonLd data={faqSchema(items)} />
      <ServiceHero
        eyebrow="Chauffeur service"
        title={<><span className="block">Your Chauffeur,</span><span className="text-gold">for the Plan You Set</span></>}
        description="Point-to-point when the ride is simple. Hourly or as-directed when you want the car to stay with you. Either way, the enquiry comes before the reservation."
        image="/images/suit.jpg"
        imageAlt="Formal suit, suggesting chauffeur service"
        highlights={[
          { icon: Users, label: "A named booking" },
          { icon: Clock, label: "Hours or a transfer" },
          { icon: Gem, label: "Vehicle category" },
          { icon: Shield, label: "Written quote" },
        ]}
      >
        <QuoteForm
          appearance="card"
          title="Book a Chauffeur"
          service="Chauffeur service"
          modes={[
            { id: "hourly", label: "Hourly" },
            { id: "point-to-point", label: "Point to Point" },
            { id: "as-directed", label: "As Directed" },
          ]}
        />
      </ServiceHero>
      <SplitBlock
        eyebrow="Personal chauffeur travel"
        title="More than a ride across town"
        body="As-directed service keeps the chauffeur available while you decide the next stop, inside the hours you reserved. Point-to-point is the cleaner choice for one journey with a known end."
        image="/images/executive.jpg"
        imageAlt="Professional standing outdoors"
        href="/bookings?service=chauffeur-service"
        cta="Book a Chauffeur"
      />
      <MediaGrid
        title="Choose the shape of the booking"
        columns={5}
        items={[
          { title: "Business days", text: "Meetings with the car waiting between them.", image: "/images/meeting.jpg", href: "/services/corporate-transfer" },
          { title: "Airport", text: "Add a flight number when one end is a terminal.", image: "/images/airport.jpg", href: "/services/airport-transfer" },
          { title: "Events", text: "A timed arrival and the ride home.", image: "/images/event.jpg", href: "/services/special-events" },
          { title: "City time", text: "Hours held for a loose itinerary.", image: "/images/city.jpg", href: "/services/city-tours" },
          { title: "As directed", text: "You set the next address during the booking.", image: "/images/drive.jpg" },
        ]}
      />
      <FleetBand title="Categories with a chauffeur" theme="dark" />
      <ProcessSteps />
      <FaqSplit title="Chauffeur service questions" items={items} image="/images/sedan.jpg" imageAlt="Black luxury sedan" ctaTitle="Tell us how the day should work" ctaText="Transfer, hourly, or as-directed — the form follows that choice." ctaHref="/bookings?service=chauffeur-service" ctaLabel="Get a Chauffeur Quote" />
    </>
  );
}
