import { Briefcase, Clock, MapPin, Users } from "lucide-react";
import { QuoteForm } from "@/components/booking/quote-form";
import { faqSchema, JsonLd } from "@/components/seo/json-ld";
import { FaqSplit, FleetBand, MediaGrid, ProcessSteps, ServiceHero, SplitBlock } from "@/components/sections/blocks";
import { faqs } from "@/content/faqs";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Roadshow Transportation",
  "Request multi-stop chauffeur transportation for investor meetings, site visits, and touring schedules.",
  "/services/roadshows",
);

export default function Page() {
  const items = faqs.roadshows;
  return (
    <>
      <JsonLd data={faqSchema(items)} />
      <ServiceHero
        eyebrow="Roadshow transportation"
        title={<><span className="block">Seamless</span><span className="text-gold">Roadshow Transportation</span></>}
        description="A chauffeur plan for days that move from meeting to meeting. Send the stop list and we quote the hours, the cities, and the vehicle."
        image="/images/meeting.jpg"
        imageAlt="Professionals in a meeting"
        highlights={[
          { icon: Clock, label: "Stop timing" },
          { icon: Users, label: "Named passengers" },
          { icon: MapPin, label: "Multi-stop days" },
          { icon: Briefcase, label: "Investor meetings" },
        ]}
      >
        <QuoteForm
          appearance="card"
          title="Book Roadshow Transportation"
          service="Roadshows"
          modes={[
            { id: "roadshow", label: "Multi-city" },
            { id: "hourly", label: "Single city" },
          ]}
        />
      </ServiceHero>
      <SplitBlock
        eyebrow="On the road"
        title="The stop list is the brief"
        body="Investor meetings, site visits, and conference days fail in the gaps between buildings. Put each address and a realistic time in the itinerary so the quote matches the day you actually have."
        image="/images/bridge.jpg"
        imageAlt="City bridge"
        href="/bookings?service=roadshows"
        cta="Book Your Roadshow"
      />
      <MediaGrid
        title="Roadshow days we quote"
        items={[
          { title: "Investor meetings", text: "A principal and a small team between buildings.", image: "/images/executive.jpg" },
          { title: "Site visits", text: "Longer hops where a sprinter keeps the group together.", image: "/images/road.jpg" },
          { title: "Conference days", text: "Hotel, venue, and dinner in one hourly window.", image: "/images/event.jpg" },
          { title: "Airport on either end", text: "Add the flight so luggage is part of the same plan.", image: "/images/airport.jpg", href: "/services/airport-transfer" },
          { title: "More than one city", text: "Say whether you want the same chauffeur throughout.", image: "/images/city.jpg" },
        ]}
        columns={5}
      />
      <FleetBand title="Vehicles for a roadshow" theme="dark" />
      <ProcessSteps
        steps={[
          { title: "Send the list", text: "Addresses, times, and passenger names." },
          { title: "Get the quote", text: "Hours, category, and price for that itinerary." },
          { title: "Confirm staffing", text: "Continuity of chauffeur is confirmed if the schedule allows." },
          { title: "Travel the day", text: "Changes of city are re-quoted before they replace the plan." },
        ]}
      />
      <FaqSplit title="Roadshow questions" items={items} image="/images/skyline.jpg" imageAlt="Evening skyline" ctaTitle="Send the itinerary" ctaText="A sentence per stop is enough to price the day." ctaHref="/bookings?service=roadshows" ctaLabel="Get a Roadshow Quote" />
    </>
  );
}
