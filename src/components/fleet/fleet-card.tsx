import Image from "next/image";
import Link from "next/link";
import { Briefcase, Users } from "lucide-react";
import type { FleetVehicle } from "@/content/fleet";
import { cn } from "@/lib/utils";

export function FleetCard({ vehicle, variant = "light" }: { vehicle: FleetVehicle; variant?: "light" | "dark" }) {
  const dark = variant === "dark";
  return (
    <article className={cn("overflow-hidden rounded-2xl", dark ? "bg-ink text-white" : "border border-line bg-white text-charcoal shadow-sm")}>
      <Link href={`/our-fleet/${vehicle.slug}`} className="relative block aspect-[16/10]">
        <Image src={vehicle.image} alt={vehicle.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
        {dark ? <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" /> : null}
      </Link>
      <div className="p-5">
        <h3 className="font-serif text-2xl">
          <Link href={`/our-fleet/${vehicle.slug}`} className="hover:text-gold-ink">{vehicle.name}</Link>
        </h3>
        <p className={cn("mt-2 flex flex-wrap gap-4 text-sm", dark ? "text-white/70" : "text-muted")}>
          <span className="inline-flex items-center gap-1.5"><Users className="size-4 text-gold" aria-hidden />{vehicle.passengers}</span>
          <span className="inline-flex items-center gap-1.5"><Briefcase className="size-4 text-gold" aria-hidden />{vehicle.bags}</span>
        </p>
        <p className={cn("mt-3 text-xs leading-5", dark ? "text-white/50" : "text-muted")}>Illustrative photo. Model and availability are confirmed in your quote.</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Link
            href={`/our-fleet/${vehicle.slug}`}
            className={cn(
              "inline-flex h-10 items-center rounded-full px-4 text-sm",
              dark ? "border border-gold/60 text-gold hover:bg-gold hover:text-ink" : "border border-gold-ink/30 text-gold-ink hover:bg-gold/10",
            )}
          >
            View Details
          </Link>
          <Link
            href={`/bookings?vehicle=${vehicle.slug}`}
            className={cn(
              "inline-flex h-10 items-center rounded-full px-4 text-sm",
              dark ? "bg-gold text-ink hover:bg-gold-deep" : "bg-gold text-ink hover:bg-gold-deep",
            )}
          >
            Book Now
          </Link>
        </div>
      </div>
    </article>
  );
}
