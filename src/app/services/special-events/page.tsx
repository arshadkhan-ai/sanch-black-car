import { Clock, Gem, Sparkles, Users } from "lucide-react";
import { QuoteForm } from "@/components/booking/quote-form";
import { faqSchema, JsonLd } from "@/components/seo/json-ld";
import { FaqSplit, FleetBand, MediaGrid, ProcessSteps, ServiceHero, SplitBlock } from "@/components/sections/blocks";
import { faqs } from "@/content/faqs";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Special Event Chauffeur",
  "Request chauffeur transportation for galas, concerts, nights out, and other occasions. Vehicle and timing are confirmed in the quote.",
  "/services/special-events",
);

export default function Page() {
  const items = faqs["special-events"];
  return (
    <>
      <JsonLd data={faqSchema(items)} />
      <ServiceHero
        eyebrow="Special events"
        title={<><span className="block">Make the Evening</span><span className="text-gold">Easy to Arrive At</span></>}
        description="Chauffeur transportation for the occasions that have a start time, a venue, and a group that should not be split across taxis."
        image="/images/event.jpg"
        imageAlt="Evening event lighting"
        highlights={[
          { icon: Gem, label: "Occasion vehicles" },
          { icon: Users, label: "Your guest count" },
          { icon: Clock, label: "Venue timing" },
          { icon: Sparkles, label: "Night returns" },
        ]}
      >
        <QuoteForm
          appearance="card"
          title="Book a Special Event Ride"
          service="Special events"
          modes={[
            { id: "event", label: "By occasion" },
            { id: "hourly", label: "By the hour" },
          ]}
        />
      </ServiceHero>
      <SplitBlock
        eyebrow="The occasion"
        title="Tell us the venue and the headcount"
        body="Weddings have their own page. This one is for galas, concerts, sport, parties, and nights out. The quote follows the passenger count and whether you need a return."
        image="/images/party.jpg"
        imageAlt="A celebration at night"
        href="/bookings?service=special-events"
        cta="Book Special Event Service"
      />
      <MediaGrid
        eyebrow="Occasions"
        title="Events we can quote"
        columns={3}
        items={[
          { title: "Galas", text: "A timed arrival and a return when the evening ends.", image: "/images/event.jpg" },
          { title: "Concerts and shows", text: "Pickup, venue, and the ride home in one plan.", image: "/images/concert.jpg" },
          { title: "Sporting events", text: "Group seating when the party wants one vehicle.", image: "/images/skyline.jpg" },
          { title: "Parties", text: "Several pickup addresses if you list them.", image: "/images/party.jpg" },
          { title: "Nights out", text: "Hourly hire when the plan is still loose.", image: "/images/night-car.jpg" },
          { title: "Proms and formals", text: "A limousine request when the entrance matters.", image: "/images/wedding.jpg", href: "/services/limousine-service" },
        ]}
      />
      <FleetBand title="Vehicles for an occasion" theme="dark" />
      <ProcessSteps />
      <FaqSplit title="Special event questions" items={items} image="/images/concert.jpg" imageAlt="Concert lighting" ctaTitle="Send the event details" ctaText="Venue, time, passenger count, and whether you need a return." ctaHref="/bookings?service=special-events" ctaLabel="Get a Quote" />
    </>
  );
}
