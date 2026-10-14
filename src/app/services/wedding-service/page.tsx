import { Clock, Gem, Heart, Users } from "lucide-react";
import { QuoteForm } from "@/components/booking/quote-form";
import { faqSchema, JsonLd } from "@/components/seo/json-ld";
import { FaqSplit, FleetBand, MediaGrid, ProcessSteps, ServiceHero, SplitBlock } from "@/components/sections/blocks";
import { faqs } from "@/content/faqs";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Wedding Chauffeur",
  "Request wedding-day chauffeur transportation for the couple and guests. Timing, venues, and vehicle category are confirmed in the quote.",
  "/services/wedding-service",
);

export default function Page() {
  const items = faqs["wedding-service"];
  return (
    <>
      <JsonLd data={faqSchema(items)} />
      <ServiceHero
        eyebrow="Wedding transportation"
        title={<><span className="block">Arrive in Elegance</span><span className="text-gold">on the Wedding Day</span></>}
        description="Chauffeur transportation arranged around the ceremony, photographs, and reception. Send the timeline and we quote the vehicles that fit it."
        image="/images/wedding.jpg"
        imageAlt="A couple dressed for a wedding"
        highlights={[
          { icon: Gem, label: "Chosen vehicle" },
          { icon: Users, label: "Couple and guests" },
          { icon: Clock, label: "Day-of timing" },
          { icon: Heart, label: "Photo stops" },
        ]}
      >
        <QuoteForm
          appearance="card"
          title="Book Wedding Transportation"
          service="Wedding service"
          modes={[
            { id: "wedding", label: "Wedding Day" },
            { id: "hourly", label: "Guest shuttle" },
          ]}
        />
      </ServiceHero>
      <SplitBlock
        eyebrow="The wedding day"
        title="A vehicle plan for the addresses that matter"
        body="List where the couple starts, where guests gather, and where the night ends. One enquiry can cover a sedan for the couple and a sprinter for everyone else."
        image="/images/wedding-2.jpg"
        imageAlt="Wedding celebration"
        href="/bookings?service=wedding-service"
        cta="Book Wedding Service"
      />
      <MediaGrid
        title="What the day can include"
        items={[
          { title: "Couple's car", text: "A sedan or limousine request for the two of you and a small party.", image: "/images/interior.jpg" },
          { title: "Simple styling", text: "Ask about ribbon or a modest decoration. We confirm what the vehicle allows.", image: "/images/wedding.jpg" },
          { title: "Guest moves", text: "A sprinter request when family should travel together.", image: "/images/van.jpg" },
          { title: "More than one venue", text: "Ceremony, photographs, and reception in the same quote.", image: "/images/event.jpg" },
        ]}
      />
      <FleetBand title="Categories for a wedding day" theme="dark" />
      <ProcessSteps
        steps={[
          { title: "Share the day", text: "Venues, times, and how many people are travelling." },
          { title: "Receive the quote", text: "Vehicle categories, timing, and price in one reply." },
          { title: "Confirm it", text: "The plan is set only when you accept the quote." },
          { title: "Wedding day", text: "The chauffeur follows the timeline you confirmed." },
        ]}
      />
      <FaqSplit title="Wedding service questions" items={items} image="/images/wedding-2.jpg" imageAlt="Wedding guests outdoors" ctaTitle="Plan the wedding cars" ctaText="Send the schedule even if a few times are still moving." ctaHref="/bookings?service=wedding-service" ctaLabel="Get a Quote" />
    </>
  );
}
