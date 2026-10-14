import type { MetadataRoute } from "next";
import { posts } from "@/content/blog";
import { fleet } from "@/content/fleet";
import { services } from "@/content/services";
import { siteConfig } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = "2026-10-14";
  const staticPaths = [
    "",
    "/about-us",
    "/contact-us",
    "/bookings",
    "/blog",
    "/our-fleet",
    "/services",
    "/privacy-policy",
    "/terms-and-conditions",
    "/thank-you",
  ];

  return [
    ...staticPaths.map((path) => ({
      url: `${siteConfig.url}${path || "/"}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.7,
    })),
    ...services.map((service) => ({
      url: `${siteConfig.url}${service.href}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...fleet.map((vehicle) => ({
      url: `${siteConfig.url}/our-fleet/${vehicle.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...posts.map((post) => ({
      url: `${siteConfig.url}/blog/${post.slug}`,
      lastModified: post.date,
      changeFrequency: "yearly" as const,
      priority: 0.5,
    })),
  ];
}
