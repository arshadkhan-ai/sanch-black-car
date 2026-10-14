import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export function pageMeta(title: string, description: string, path: string): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: siteConfig.name,
      type: "website",
      images: [{ url: "/images/sedan.jpg", alt: "Black luxury sedan on the road" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/images/sedan.jpg"],
    },
  };
}
