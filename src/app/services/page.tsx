import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { services } from "@/content/services";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Services",
  "Chauffeur services from SANCH BLACK CAR: airport, city-to-city, hourly, wedding, corporate, events, roadshows, city tours, limousine, and as-directed travel.",
  "/services",
);

export default function Page() {
  return (
    <section className="bg-ivory py-16">
      <Container>
        <p className="text-[11px] uppercase tracking-[0.28em] text-gold-ink">Services</p>
        <h1 className="mt-3 max-w-2xl font-serif text-5xl">Chauffeur transportation, by the kind of day</h1>
        <p className="mt-4 max-w-2xl leading-7 text-muted">Each service has its own quote form. Choose the one that matches the trip, then send the details. A reply confirms availability and price.</p>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {services.map((service) => (
            <article key={service.slug} className="relative grid overflow-hidden rounded-3xl bg-white shadow-sm sm:grid-cols-[180px_1fr]">
              <div className="relative min-h-40">
                <Image src={service.image} alt={service.imageAlt} fill className="object-cover" sizes="180px" />
              </div>
              <div className="p-5">
                <h2 className="font-serif text-3xl">{service.title}</h2>
                <p className="mt-2 text-sm leading-6 text-muted">{service.summary}</p>
                <span className="mt-4 inline-flex text-sm text-gold-ink">View service</span>
              </div>
              <Link href={service.href} className="absolute inset-0" aria-label={`View ${service.title}`} />
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
