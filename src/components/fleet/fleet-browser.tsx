"use client";

import { useMemo, useState } from "react";
import { FleetCard } from "@/components/fleet/fleet-card";
import { fleet, fleetFilters, type FleetCategory } from "@/content/fleet";
import { cn } from "@/lib/utils";

export function FleetBrowser() {
  const [filter, setFilter] = useState<(typeof fleetFilters)[number]>("All Vehicles");
  const visible = useMemo(
    () => (filter === "All Vehicles" ? fleet : fleet.filter((vehicle) => vehicle.categories.includes(filter as FleetCategory))),
    [filter],
  );

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Vehicle categories">
        {fleetFilters.map((item) => (
          <button
            key={item}
            type="button"
            role="tab"
            aria-selected={filter === item}
            onClick={() => setFilter(item)}
            className={cn(
              "rounded-full px-4 py-2 text-sm",
              filter === item ? "bg-gold text-ink" : "bg-white text-charcoal",
            )}
          >
            {item === "Sprinter" ? "Sprinter / Van" : item}
          </button>
        ))}
      </div>
      <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {visible.map((vehicle) => (
          <FleetCard key={vehicle.slug} vehicle={vehicle} />
        ))}
      </div>
      {visible.length === 0 ? <p className="mt-6 text-sm text-muted">No vehicles are listed in that category.</p> : null}
    </div>
  );
}
