import Image from "next/image";
import Link from "next/link";
import { Clock, Gem, Heart, Shield, Users, type LucideIcon } from "lucide-react";
import { Container } from "@/components/layout/container";
import { CtaBand, Eyebrow } from "@/components/sections/blocks";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "About Us",
  "SANCH BLACK CAR arranges chauffeur-driven transportation. Service area, fleet, and contact details are confirmed with each quote until the owner publishes them.",
  "/about-us",
);

const values = [
  { icon: Gem, title: "Care with the details", text: "Addresses, times, and passenger counts are repeated back in the quote so nothing is guessed." },
  { icon: Shield, title: "Straight answers", text: "If a vehicle or a city is not available, the reply says so." },
  { icon: Heart, title: "The passenger's plan", text: "The itinerary you send is the one we price." },
  { icon: Clock, title: "Time treated seriously", text: "A pickup time is part of the booking you accept, not a slogan on this page." },
];

export default function Page() {
  return (
    <>
      <section className="relative min-h-[520px] bg-ink text-white">
        <Image src="/images/airport.jpg" alt="Aircraft and evening light at an airport" fill priority className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/30" />
        <Container className="relative flex min-h-[520px] flex-col justify-center py-20">
          <Eyebrow light>About SANCH BLACK CAR</Eyebrow>
          <h1 className="mt-4 max-w-xl font-serif text-5xl leading-[0.95] md:text-6xl">Redefining<br /><span className="text-gold">Luxury Travel</span></h1>
          <p className="mt-5 max-w-lg text-white/80">Chauffeur-driven transportation, quoted before it is confirmed. This page is the brand story. It is not a list of unverified promises.</p>
          <Link href="/bookings" className="mt-8 inline-flex h-11 w-fit items-center rounded-full bg-gold px-5 text-sm font-medium text-ink">Book Your Ride</Link>
        </Container>
      </section>

      <section className="bg-ivory py-16 md:py-20">
        <Container className="grid items-center gap-10 lg:grid-cols-2">
          <div className="relative min-h-[360px] overflow-hidden rounded-3xl">
            <Image src="/images/sedan.jpg" alt="Black luxury sedan" fill className="object-cover" sizes="50vw" />
          </div>
          <div>
            <Eyebrow>Our story</Eyebrow>
            <h2 className="mt-3 font-serif text-4xl md:text-5xl">Built for the ride itself</h2>
            <p className="mt-5 leading-8 text-muted">
              SANCH BLACK CAR exists to arrange a chauffeur and a vehicle for a specific journey. The operating region, the cars in service, and the published phone number are waiting on the owner. Until those facts are confirmed, every page asks you to request a quote rather than assume a city, a rate, or a guarantee.
            </p>
            <p className="mt-4 leading-8 text-muted">
              What you can expect from the website is a clear form, a real email delivery when it is connected, and an honest error if it is not.
            </p>
            <Link href="/services" className="mt-6 inline-flex h-11 items-center rounded-full bg-gold px-5 text-sm font-medium text-ink">Our Services</Link>
          </div>
        </Container>
      </section>

      <section className="border-y border-line bg-white">
        <Container className="grid gap-6 py-8 sm:grid-cols-2 lg:grid-cols-5">
          {(
          [
            { icon: Gem, label: "Vehicle categories" },
            { icon: Users, label: "Chauffeur travel" },
            { icon: Shield, label: "Quoted first" },
            { icon: Clock, label: "Agreed timing" },
            { icon: Heart, label: "Occasion care" },
          ] satisfies { icon: LucideIcon; label: string }[]
        ).map((item) => (
            <div key={item.label} className="flex items-center gap-3">
              <item.icon className="size-5 text-gold-ink" aria-hidden />
              <p className="text-sm font-medium">{item.label}</p>
            </div>
          ))}
        </Container>
      </section>

      <section className="bg-ivory py-16">
        <Container className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <Eyebrow>Our mission</Eyebrow>
            <h2 className="mt-3 font-serif text-4xl md:text-5xl">A calm arrival, arranged properly</h2>
            <p className="mt-5 leading-8 text-muted">
              The mission is simple: match a vehicle category and a chauffeur to the trip you describe, then confirm it in writing. Comfort is the cabin and the timing. It is not a list of awards or partner logos.
            </p>
          </div>
          <div className="relative min-h-[320px] overflow-hidden rounded-3xl">
            <Image src="/images/terminal.jpg" alt="Airport terminal" fill className="object-cover" sizes="50vw" />
          </div>
        </Container>
      </section>

      <section className="bg-ink py-16 text-white">
        <Container>
          <Eyebrow light>Why people enquire</Eyebrow>
          <h2 className="mt-3 font-serif text-4xl md:text-5xl">A higher standard starts with the brief</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {values.map((item) => (
              <article key={item.title} className="rounded-2xl bg-charcoal p-5">
                <item.icon className="size-5 text-gold" aria-hidden />
                <h3 className="mt-4 font-serif text-2xl">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-white/65">{item.text}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-white py-16">
        <Container className="grid items-center gap-10 lg:grid-cols-2">
          <div className="relative min-h-[320px] overflow-hidden rounded-3xl">
            <Image src="/images/interior.jpg" alt="Black sedan on the road" fill className="object-cover" sizes="50vw" />
          </div>
          <div>
            <Eyebrow>What drives us</Eyebrow>
            <h2 className="mt-3 font-serif text-4xl">The work behind the quote</h2>
            <ul className="mt-6 space-y-4">
              {values.map((item) => (
                <li key={item.title}>
                  <h3 className="font-medium">{item.title}</h3>
                  <p className="text-sm leading-6 text-muted">{item.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <CtaBand title="Experience the SANCH BLACK CAR difference" text="Send a date and two addresses. The reply is the start of the booking, not this page." href="/contact-us" label="Contact Us" image="/images/suv.jpg" />
    </>
  );
}
