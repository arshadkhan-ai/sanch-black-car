import { Clock, Gem, Headphones, Shield, Users, type LucideIcon } from "lucide-react";
import { Container } from "@/components/layout/container";

const benefits: { icon: LucideIcon; title: string }[] = [
  { icon: Gem, title: "Luxury Vehicles" },
  { icon: Users, title: "Professional Chauffeurs" },
  { icon: Shield, title: "Safe & Reliable" },
  { icon: Clock, title: "On-Time Guarantee" },
  { icon: Headphones, title: "24/7 Support" },
];

export function WhyChooseUs() {
  return (
    <section id="why-choose" aria-labelledby="why-choose-heading" className="scroll-mt-24 bg-ink py-14 text-white md:py-16">
      <Container className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-gold">Why Choose SANCH BLACK CAR</p>
          <h2 id="why-choose-heading" className="mt-3 max-w-md font-serif text-4xl leading-[1.05] md:text-5xl">
            A Higher Standard of Transportation
          </h2>
        </div>
        <ul className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-5">
          {benefits.map((benefit) => (
            <li key={benefit.title} className="text-center">
              <benefit.icon className="mx-auto size-7 text-gold" aria-hidden />
              <p className="mt-3 text-sm leading-5 text-white/90">{benefit.title}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
