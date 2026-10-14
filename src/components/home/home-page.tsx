import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Briefcase, Car, Clock, Gem, Headset, Plane, Users, type LucideIcon } from "lucide-react";
import { QuoteForm } from "@/components/booking/quote-form";
import { Testimonials } from "@/components/home/testimonials";
import { Container } from "@/components/layout/container";
import { WhyChooseUs } from "@/components/sections/why-choose-us";
import { fleet } from "@/content/fleet";

const homeFleet = fleet.slice(0, 3);

const serviceCards: {
  href: string;
  title: string;
  text: string;
  image: string;
  alt: string;
  icon: LucideIcon;
}[] = [
  {
    href: "/services/airport-transfer",
    title: "Airport Transfers",
    text: "Stress-free, on-time airport transportation to and from all major airports.",
    image: "/images/jet.jpg",
    alt: "Private jet parked on an airport apron",
    icon: Plane,
  },
  {
    href: "/services/corporate-transfer",
    title: "Corporate Travel",
    text: "Professional transportation for your business needs, meetings and corporate events.",
    image: "/images/suit.jpg",
    alt: "Professional wearing a tailored suit",
    icon: Briefcase,
  },
  {
    href: "/services/hourly-chauffeur",
    title: "Hourly Chauffeur",
    text: "Flexible hourly services for your schedule and transportation needs.",
    image: "/images/interior.jpg",
    alt: "Black luxury car in motion",
    icon: Clock,
  },
  {
    href: "/services/special-events",
    title: "Special Events",
    text: "Make your special moments even more memorable with our luxury transportation.",
    image: "/images/wedding.jpg",
    alt: "Bride and groom outdoors",
    icon: Gem,
  },
];

const aboutPoints: { icon: LucideIcon; label: string }[] = [
  { icon: Users, label: "Professional Chauffeurs" },
  { icon: Car, label: "Luxury Fleet" },
  { icon: Clock, label: "On-Time Guarantee" },
  { icon: Headset, label: "24/7 Service" },
];

function capacity(value: string, noun: string) {
  return `${value.replace(/up to /i, "")} ${noun}`;
}

export function HomePage() {
  return (
    <>
      <section className="relative bg-ink text-white">
        <div className="relative min-h-[640px] lg:min-h-[720px]">
          <Image
            src="/images/suv.jpg"
            alt="Black Cadillac Escalade"
            fill
            priority
            className="object-cover object-[72%_center]"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/25" />
          <Container className="relative flex min-h-[640px] flex-col justify-center pb-36 pt-16 lg:min-h-[720px]">
            <p className="text-[11px] tracking-[0.34em] text-gold">PROFESSIONAL · RELIABLE · LUXURY</p>
            <h1 className="mt-4 max-w-xl font-serif text-5xl leading-[0.95] sm:text-6xl lg:text-[4.6rem]">
              Arrive in Style.
              <span className="mt-1 block text-gold italic">Travel in Luxury.</span>
            </h1>
            <p className="mt-5 text-lg text-white">Premium Black Car &amp; Chauffeur Services</p>
            <p className="mt-3 max-w-md text-sm leading-7 text-white/75">
              Experience world-class chauffeured transportation for airport transfers, business travel, special events and more with SANCH BLACK CAR.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/bookings" className="inline-flex h-12 items-center gap-2 rounded-md bg-gold px-5 text-sm font-medium text-ink hover:bg-gold-deep">
                Book Your Ride
                <ArrowRight className="size-4" aria-hidden />
              </Link>
              <Link href="/our-fleet" className="inline-flex h-12 items-center rounded-md border border-white/70 px-5 text-sm text-white hover:bg-white/10">
                Explore Our Fleet
              </Link>
            </div>
          </Container>
        </div>
        <Container className="relative z-10 -mt-24 pb-8">
          <QuoteForm
            id="booking"
            appearance="bar"
            service="Homepage quote"
            modes={[
              { id: "one-way", label: "One Way" },
              { id: "round-trip", label: "Round Trip" },
              { id: "hourly", label: "Hourly" },
            ]}
          />
        </Container>
      </section>

      <section className="bg-ivory py-16 md:py-20">
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-gold-ink">About SANCH BLACK CAR</p>
            <h2 className="mt-3 font-serif text-4xl leading-tight text-ink md:text-5xl">The Art of Luxury Travel</h2>
            <p className="mt-5 max-w-xl text-sm leading-7 text-muted md:text-base">
              At SANCH BLACK CAR, we believe transportation is more than just a ride — it&apos;s an experience. Our professional chauffeurs, meticulously maintained fleet, and commitment to excellence ensure you arrive at your destination safely, comfortably, and in style.
            </p>
            <ul className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-4 lg:grid-cols-4">
              {aboutPoints.map((point) => (
                <li key={point.label} className="text-center sm:text-left">
                  <point.icon className="mx-auto size-6 text-gold-ink sm:mx-0" aria-hidden />
                  <p className="mt-2 text-sm leading-5 text-charcoal">{point.label}</p>
                </li>
              ))}
            </ul>
            <Link href="/about-us" className="mt-8 inline-flex h-11 items-center gap-2 rounded-md bg-gold px-5 text-sm font-medium text-ink hover:bg-gold-deep">
              Learn More About Us
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
          <div className="relative min-h-[420px] overflow-hidden rounded-2xl">
            <Image src="/images/suit.jpg" alt="Chauffeur in a dark suit" fill className="object-cover object-top" sizes="(max-width: 1024px) 100vw, 50vw" />
          </div>
        </Container>
      </section>

      <section id="services" className="bg-ink py-16 text-white md:py-20">
        <Container>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-gold">Our Services</p>
              <h2 className="mt-3 max-w-xl font-serif text-4xl leading-tight md:text-5xl">Premium Transportation for Every Occasion</h2>
            </div>
            <p className="max-w-sm text-sm leading-7 text-white/70">
              From airport transfers to corporate travel and special events, SANCH BLACK CAR provides reliable, comfortable, and elegant transportation tailored to your needs.
            </p>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {serviceCards.map((service) => (
              <article key={service.href} className="relative min-h-[360px] overflow-hidden rounded-2xl">
                <Image src={service.image} alt={service.alt} fill loading="eager" className="object-cover" sizes="(max-width: 768px) 100vw, 25vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/15" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <service.icon className="size-5 text-gold" aria-hidden />
                  <h3 className="mt-3 font-serif text-2xl">{service.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-white/80">{service.text}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm text-gold">
                    Learn More <ArrowRight className="size-4" aria-hidden />
                  </span>
                </div>
                <Link href={service.href} className="absolute inset-0" aria-label={`${service.title}. Learn more`} />
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-white py-16 md:py-20">
        <Container>
          <div className="grid items-end gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)_auto]">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-gold-ink">Our Fleet</p>
              <h2 className="mt-3 font-serif text-4xl text-ink md:text-5xl">A Fleet for Every Journey</h2>
            </div>
            <p className="max-w-sm text-sm leading-7 text-muted lg:justify-self-end">
              Travel in ultimate comfort and style with our meticulously maintained luxury vehicles, featuring the latest models and premium amenities.
            </p>
            <Link href="/our-fleet" className="inline-flex h-11 w-fit items-center gap-2 rounded-md bg-gold px-5 text-sm font-medium text-ink hover:bg-gold-deep">
              View Our Full Fleet
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {homeFleet.map((vehicle) => (
              <Link key={vehicle.slug} href={`/our-fleet/${vehicle.slug}`} className="block rounded-2xl border border-line bg-ivory p-4 text-center text-charcoal hover:border-gold">
                <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-white">
                  <Image src={vehicle.image} alt={vehicle.name} fill loading="eager" className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
                </div>
                <h3 className="mt-4 font-serif text-2xl text-ink">{vehicle.name}</h3>
                <p className="mt-2 flex items-center justify-center gap-4 text-sm text-muted">
                  <span className="inline-flex items-center gap-1.5"><Users className="size-4 text-gold-ink" aria-hidden />{capacity(vehicle.passengers, "Passengers")}</span>
                  <span className="inline-flex items-center gap-1.5"><Briefcase className="size-4 text-gold-ink" aria-hidden />{capacity(vehicle.bags, "Bags")}</span>
                </p>
                <span className="mt-4 inline-flex h-10 items-center gap-2 rounded-md border border-gold-ink/40 px-5 text-sm text-charcoal">
                  View Details <ArrowRight className="size-4" aria-hidden />
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <WhyChooseUs />
      <Testimonials />

      <section className="relative min-h-[340px] overflow-hidden bg-ink text-white">
        <Image src="/images/jet.jpg" alt="" fill className="object-cover object-[center_40%]" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/35" />
        <Container className="relative flex min-h-[340px] flex-col items-center justify-center py-16 text-center">
          <p className="text-[11px] tracking-[0.32em] text-gold">READY TO RIDE</p>
          <h2 className="mt-3 max-w-3xl font-serif text-4xl md:text-5xl">Experience the SANCH BLACK CAR Difference</h2>
          <p className="mt-4 max-w-xl text-sm leading-7 text-white/80 md:text-base">
            Book your luxury transportation today and travel with confidence.
          </p>
          <Link href="/bookings" className="mt-6 inline-flex h-12 items-center gap-2 rounded-md bg-gold px-5 text-sm font-medium text-ink hover:bg-gold-deep">
            Book Your Ride Now
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </Container>
      </section>
    </>
  );
}
