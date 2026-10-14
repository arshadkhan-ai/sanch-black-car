import Image from "next/image";
import { cn } from "@/lib/utils";

const alt = "SANCH BLACK CAR - Luxury Chauffeur Service";

export function Logo({
  className,
  priority = false,
  size = "header",
}: {
  className?: string;
  priority?: boolean;
  size?: "header" | "footer";
}) {
  return (
    <Image
      src="/images/sanch-black-car-logo-champagne.png"
      alt={alt}
      width={1724}
      height={389}
      priority={priority}
      fetchPriority={priority ? "high" : "auto"}
      className={cn(
        "object-contain",
        size === "footer"
          ? "h-auto w-full max-w-[320px]"
          : "h-[45px] w-auto max-w-[min(200px,52vw)] md:h-[55px] md:max-w-[260px] lg:h-[65px] lg:max-w-[300px]",
        className,
      )}
      style={size === "footer" ? { width: "100%", height: "auto" } : { width: "auto" }}
    />
  );
}
