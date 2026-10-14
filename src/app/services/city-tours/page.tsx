import Image from "next/image";
import { Camera, Clock, Gem, MapPin } from "lucide-react";
import { QuoteForm } from "@/components/booking/quote-form";
import { Container } from "@/components/layout/container";
import { faqSchema, JsonLd } from "@/components/seo/json-ld";
import { FaqSplit, FleetBand, MediaGrid, ServiceHero, SplitBlock } from "@/components/sections/blocks";
import { coverageNote } from "@/config/site";
import { faqs } from "@/content/faqs";
import { exampleAttractions } from "@/content/places";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "City Tours",
  "Request a private chauffeur for a city day built around the places you choose. This is transportation, not a packaged guided tour.",
  "/services/city-tours",
);

export default function Page() {
  const items = faqs["city-tours"];
  return (
    <>
      <JsonLd data={faqSchema(items)} />
      <ServiceHero
        eyebrow="City tours"
        title={<><span className="block">Explore the City</span><span className="text-gold">at Your Pace</span></>}
        description="A chauffeur and vehicle for the hours you want, with stops you choose. A separate guide is not included unless the quote says so."
        image="/images/skyline.jpg"
        imageAlt="City skyline at dusk"
        highlights={[
          { icon: MapPin, label: "Your itinerary" },
          { icon: Clock, label: "Half or full day" },
          { icon: Gem, label: "Private vehicle" },
          { icon: Camera, label: "Photo stops" },
        ]}
      >
        <QuoteForm
          appearance="card"
          title="Book a City Tour"
          service="City tours"
          modes={[
            { id: "city-tour", label: "By the hour" },
            { id: "hourly", label: "Half or full day" },
          ]}
        />
      </ServiceHero>
      <SplitBlock
        eyebrow="A private city day"
        title="Landmarks, meals, and the time between them"
        body="Tell us the city, the start address, and what you care about. We quote the hours and the vehicle. The city names below are examples of places people ask about, not a fixed tour list."
        image="/images/city.jpg"
        imageAlt="Downtown skyline"
        href="/bookings?service=city-tours"
        cta="Book Your City Tour"
      />
      <MediaGrid
        title="Ways to shape the day"
        items={[
          { title: "Landmarks", text: "A short list of places, with time left to walk.", image: "/images/dc.jpg" },
          { title: "Neighbourhoods", text: "Shopping, galleries, or dining between rides.", image: "/images/shopping.jpg" },
          { title: "Lookouts", text: "Photo stops counted inside the reserved hours.", image: "/images/golden-gate.jpg" },
          { title: "A slower day", text: "Fewer addresses and more time at each one.", image: "/images/miami.jpg" },
        ]}
      />
      <FleetBand title="Vehicles for a city day" theme="dark" />
      <section className="bg-ivory py-16">
        <Container>
          <h2 className="font-serif text-4xl md:text-5xl">Cities people ask to see</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {exampleAttractions.map((place) => (
              <article key={place.city} className="overflow-hidden rounded-2xl bg-white">
                <div className="relative h-40">
                  <Image src={place.image} alt="" fill className="object-cover" sizes="33vw" />
                </div>
                <div className="p-4">
                  <h3 className="font-serif text-2xl">{place.city}</h3>
                  <p className="mt-2 text-sm text-muted">{place.text}</p>
                </div>
              </article>
            ))}
          </div>
          <p className="mt-5 text-sm text-muted">{coverageNote}</p>
        </Container>
      </section>
      <FaqSplit title="City tour questions" items={items} image="/images/la.jpg" imageAlt="Los Angeles skyline" ctaTitle="Describe the day you want" ctaText="Hours, start point, and the kind of stops." ctaHref="/bookings?service=city-tours" ctaLabel="Get a City Tour Quote" />
    </>
  );
}
