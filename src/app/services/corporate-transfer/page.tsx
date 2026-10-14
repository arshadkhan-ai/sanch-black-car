import { Briefcase, Clock, Gem, Shield } from "lucide-react";
import { QuoteForm } from "@/components/booking/quote-form";
import { faqSchema, JsonLd } from "@/components/seo/json-ld";
import { FaqSplit, FleetBand, MediaGrid, ProcessSteps, ReasonGrid, ServiceHero, SplitBlock } from "@/components/sections/blocks";
import { faqs } from "@/content/faqs";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Corporate Chauffeur",
  "Request chauffeur transportation for meetings, visitors, and executive schedules. Company billing can be requested in the quote.",
  "/services/corporate-transfer",
);

export default function Page() {
  const items = faqs["corporate-transfer"];
  return (
    <>
      <JsonLd data={faqSchema(items)} />
      <ServiceHero
        eyebrow="Corporate transportation"
        title={<><span className="block">Business Travel,</span><span className="text-gold">Handled Door to Door</span></>}
        description="Chauffeur service for meetings, visiting clients, and days that should not depend on a last-minute car. Send the schedule and the passenger names."
        image="/images/executive.jpg"
        imageAlt="Professional dressed for a business meeting"
        highlights={[
          { icon: Briefcase, label: "Meeting days" },
          { icon: Clock, label: "Timed arrivals" },
          { icon: Shield, label: "Clear instructions" },
          { icon: Gem, label: "Executive categories" },
        ]}
      >
        <QuoteForm
          appearance="card"
          title="Book Corporate Transfer"
          service="Corporate transfer"
          modes={[
            { id: "one-way", label: "One Way" },
            { id: "round-trip", label: "Round Trip" },
            { id: "hourly", label: "Hourly" },
          ]}
        />
      </ServiceHero>
      <SplitBlock
        eyebrow="Executive travel"
        title="Transportation that stays out of the meeting"
        body="Use a point-to-point transfer for a single ride, or hourly hire when the day has several offices. Billing details and greeting notes belong in the same enquiry."
        image="/images/meeting.jpg"
        imageAlt="A business conversation"
        href="/bookings?service=corporate-transfer"
        cta="Book Corporate Transfer"
      />
      <MediaGrid
        title="How companies use the service"
        theme="light"
        items={[
          { title: "Client meetings", text: "A sedan between offices, with the addresses in the quote.", image: "/images/suit.jpg" },
          { title: "Airport for a visitor", text: "Pair this with flight details when a guest is arriving.", image: "/images/airport.jpg", href: "/services/airport-transfer" },
          { title: "Team movements", text: "A sprinter when several people share one schedule.", image: "/images/van.jpg" },
          { title: "Multi-stop days", text: "Roadshow-style lists when the day crosses the city.", image: "/images/city.jpg", href: "/services/roadshows" },
        ]}
      />
      <FleetBand title="Vehicles for executive travel" theme="dark" />
      <ReasonGrid
        eyebrow="For business travel"
        title="What we confirm in writing"
        theme="light"
        items={[
          { icon: Clock, title: "The time", text: "Pickup time is part of the accepted quote." },
          { icon: Shield, title: "The instructions", text: "Names, doors, and dress notes travel with the booking." },
          { icon: Briefcase, title: "The billing contact", text: "Ask for an invoice. Terms are in the quote." },
          { icon: Gem, title: "The category", text: "We name the vehicle class we can actually provide." },
        ]}
      />
      <ProcessSteps />
      <FaqSplit title="Corporate transfer questions" items={items} image="/images/skyline.jpg" imageAlt="City skyline at dusk" ctaTitle="Send the meeting schedule" ctaText="Include passenger names if more than one person is riding." ctaHref="/bookings?service=corporate-transfer" ctaLabel="Get a Corporate Quote" />
    </>
  );
}
