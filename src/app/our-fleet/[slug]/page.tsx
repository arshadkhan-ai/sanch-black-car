import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/container";
import { FleetCard } from "@/components/fleet/fleet-card";
import { QuoteForm } from "@/components/booking/quote-form";
import { fleet, getVehicle } from "@/content/fleet";
import { pageMeta } from "@/lib/seo";

export const instant = false;

export function generateStaticParams() {
  return fleet.map((vehicle) => ({ slug: vehicle.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const vehicle = getVehicle(slug);
  if (!vehicle) return {};
  return pageMeta(vehicle.name, vehicle.summary, `/our-fleet/${vehicle.slug}`);
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const vehicle = getVehicle(slug);
  if (!vehicle) notFound();
  const related = fleet.filter((item) => item.slug !== vehicle.slug).slice(0, 3);

  return (
    <div className="bg-ivory">
      <Container className="py-10">
        <nav aria-label="Breadcrumb" className="text-sm text-muted">
          <Link href="/" className="hover:text-gold-ink">Home</Link>
          <span aria-hidden> / </span>
          <Link href="/our-fleet" className="hover:text-gold-ink">Our Fleet</Link>
          <span aria-hidden> / </span>
          <span aria-current="page">{vehicle.name}</span>
        </nav>
        <div className="mt-6 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <div className="relative aspect-[16/10] overflow-hidden rounded-3xl">
              <Image src={vehicle.image} alt={vehicle.name} fill priority className="object-cover" sizes="(max-width: 1024px) 100vw, 60vw" />
            </div>
            <p className="mt-3 text-sm text-muted">{vehicle.illustrativeModel}</p>
            <h1 className="mt-4 font-serif text-5xl">{vehicle.name}</h1>
            <Link href={`/bookings?vehicle=${vehicle.slug}`} className="mt-5 inline-flex h-11 items-center rounded-full bg-gold px-5 text-sm font-medium text-ink">Book Now</Link>
            <p className="mt-4 max-w-2xl leading-8 text-muted">{vehicle.summary}</p>
            <dl className="mt-6 grid gap-4 sm:grid-cols-3">
              {[
                ["Typical passengers", vehicle.passengers],
                ["Typical luggage", vehicle.bags],
                ["Categories", vehicle.categories.join(", ")],
              ].map(([label, value]) => (
                <div key={label} className="rounded-2xl bg-white p-4">
                  <dt className="text-xs uppercase tracking-[0.16em] text-muted">{label}</dt>
                  <dd className="mt-2 font-medium">{value}</dd>
                </div>
              ))}
            </dl>
            <h2 className="mt-8 font-serif text-3xl">Amenities you can request</h2>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {vehicle.amenities.map((item) => (
                <li key={item} className="rounded-xl bg-white px-4 py-3 text-sm">{item}</li>
              ))}
            </ul>
            <h2 className="mt-8 font-serif text-3xl">Often requested for</h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {vehicle.suitableFor.map((item) => (
                <li key={item} className="rounded-full bg-white px-4 py-2 text-sm">{item}</li>
              ))}
            </ul>
          </div>
          <QuoteForm
            appearance="card"
            title={`Enquire about ${vehicle.name}`}
            service={vehicle.name}
            modes={[
              { id: "one-way", label: "One Way" },
              { id: "hourly", label: "Hourly" },
            ]}
          />
        </div>
        <h2 className="mt-14 font-serif text-3xl">Other categories</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {related.map((item) => (
            <FleetCard key={item.slug} vehicle={item} />
          ))}
        </div>
      </Container>
    </div>
  );
}
