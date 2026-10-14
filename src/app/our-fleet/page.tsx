import { Car, Clock, Gem, Shield, Users, type LucideIcon } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { FleetBrowser } from "@/components/fleet/fleet-browser";
import { Eyebrow } from "@/components/sections/blocks";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Our Fleet",
  "Browse chauffeur vehicle categories: executive sedan, luxury SUV, sprinter, and limousine. Models shown are illustrative until availability is confirmed.",
  "/our-fleet",
);

export default function Page() {
  return (
    <>
      <section className="relative min-h-[460px] bg-ink text-white">
        <div className="absolute inset-0 bg-[url('/images/sedan.jpg')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/25" />
        <Container className="relative flex min-h-[460px] flex-col justify-center py-16">
          <Eyebrow light>Our fleet</Eyebrow>
          <h1 className="mt-3 max-w-xl font-serif text-5xl md:text-6xl">Luxury categories for every journey</h1>
          <p className="mt-4 max-w-xl text-white/75">Choose a category to enquire about. Photographs and example model names are illustrative until the owner confirms the working fleet.</p>
        </Container>
      </section>
      <section className="border-b border-line bg-white">
        <Container className="grid gap-4 py-6 sm:grid-cols-2 lg:grid-cols-5">
          {(
          [
            { icon: Gem, label: "Recent categories" },
            { icon: Users, label: "Chauffeur included" },
            { icon: Shield, label: "Maintained for the booking" },
            { icon: Car, label: "Sized to your party" },
            { icon: Clock, label: "Confirmed per date" },
          ] satisfies { icon: LucideIcon; label: string }[]
        ).map((item) => (
            <p key={item.label} className="flex items-center gap-2 text-sm">
              <item.icon className="size-4 text-gold-ink" aria-hidden />
              {item.label}
            </p>
          ))}
        </Container>
      </section>
      <section className="bg-ivory py-14">
        <Container>
          <FleetBrowser />
          <div className="mt-10 flex flex-col items-start justify-between gap-4 rounded-3xl bg-ink p-8 text-white md:flex-row md:items-center">
            <div>
              <h2 className="font-serif text-3xl">Need a different setup?</h2>
              <p className="mt-2 max-w-xl text-sm text-white/70">Child seats, an extra vehicle, or a specific accessibility note can be requested. Availability is part of the reply.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/bookings" className="inline-flex h-11 items-center rounded-full bg-gold px-5 text-sm font-medium text-ink">Book Now</Link>
              <Link href="/contact-us" className="inline-flex h-11 items-center rounded-full border border-white/40 px-5 text-sm text-white">Contact Us</Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
