import { Calendar, Clock, Gem, MapPin, Shield, Users } from "lucide-react";
import { QuoteForm } from "@/components/booking/quote-form";
import { faqSchema, JsonLd } from "@/components/seo/json-ld";
import { FaqSplit, MediaGrid, PackageRow, ReasonGrid, ServiceHero, SplitBlock } from "@/components/sections/blocks";
import { faqs } from "@/content/faqs";
import { hourlyPackages } from "@/content/places";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Hourly Chauffeur",
  "Reserve a chauffeur and vehicle by the hour. Stops inside the booked time are quoted up front, and extra time is agreed before it is added.",
  "/services/hourly-chauffeur",
);

export default function Page() {
  const items = faqs["hourly-chauffeur"];
  return (
    <>
      <JsonLd data={faqSchema(items)} />
      <ServiceHero
        eyebrow="Hourly chauffeur service"
        title={<><span className="block">Your Time.</span><span className="text-gold">Our Attention.</span></>}
        description="Keep a chauffeur for a block of hours when the day has more than one stop. The clock and the vehicle category are what we quote."
        image="/images/suit.jpg"
        imageAlt="Formal attire, suggesting a chauffeur arrival"
        highlights={[
          { icon: Calendar, label: "Flexible hours" },
          { icon: Users, label: "Your stops" },
          { icon: Gem, label: "Chosen category" },
          { icon: Shield, label: "Quoted first" },
        ]}
      >
        <QuoteForm
          appearance="card"
          title="Book Hourly Service"
          service="Hourly chauffeur"
          modes={[{ id: "hourly", label: "Hourly" }]}
        />
      </ServiceHero>
      <SplitBlock
        eyebrow="About hourly service"
        title="Travel on the hours you reserve"
        body="Hourly hire is for meetings, errands, fittings, or a day that should not be split into separate cars. Tell us the start address, the time, and how many hours you want held."
        image="/images/drive.jpg"
        imageAlt="View down a road from a moving car"
        href="/bookings?service=hourly"
        cta="Book Hourly Service"
      />
      <ReasonGrid
        eyebrow="Why book by the hour"
        title="A day with more than one address"
        items={[
          { icon: Clock, title: "Reserved time", text: "The vehicle stays with you for the hours in the quote." },
          { icon: MapPin, title: "Several stops", text: "Add the kinds of stops so the routing is priced honestly." },
          { icon: Gem, title: "Category of your choice", text: "Sedan, SUV, or sprinter, confirmed if available." },
          { icon: Shield, title: "Clear extras", text: "Overtime and extra distance are not silent add-ons." },
          { icon: Calendar, title: "Your schedule", text: "You set the order of the day inside the window." },
        ]}
      />
      <MediaGrid
        eyebrow="Popular uses"
        title="Days that suit hourly hire"
        items={[
          { title: "Business meetings", text: "Move between offices without booking a new car each time.", image: "/images/meeting.jpg" },
          { title: "Shopping and fittings", text: "Keep the vehicle nearby while you are inside.", image: "/images/shopping.jpg" },
          { title: "A loose city day", text: "Hold the hours, then choose the stops as you go.", image: "/images/skyline.jpg" },
          { title: "Evening plans", text: "Dinner, a venue, and the ride home in one booking.", image: "/images/event.jpg" },
        ]}
      />
      <PackageRow packages={hourlyPackages} />
      <FaqSplit title="Hourly service questions" items={items} image="/images/interior.jpg" imageAlt="Black sedan on a highway" ctaTitle="Hold the hours you need" ctaText="Send the start point, the date, and the duration." ctaHref="/bookings?service=hourly" ctaLabel="Get a Quote" />
    </>
  );
}
