const phone = process.env.NEXT_PUBLIC_PHONE || "+1 516 580 9894";
const email = process.env.NEXT_PUBLIC_EMAIL || "ajaykaumar275@gmail.com";

export const siteConfig = {
  name: "SANCH BLACK CAR",
  contactName: "Ajay Kumar",
  description:
    "SANCH BLACK CAR arranges chauffeur-driven luxury transportation for airport transfers, city-to-city travel, hourly hire, weddings, corporate meetings, and special events. Request a quote. A ride is confirmed only after we reply.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  website: "https://www.sanchblackcarserviceinc.com",
  websiteLabel: "www.sanchblackcarserviceinc.com",
  phone,
  businessPhone: process.env.NEXT_PUBLIC_BUSINESS_PHONE || phone,
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "",
  email,
  address: process.env.NEXT_PUBLIC_ADDRESS || "266-11 Union Tpke, New Hyde Park, NY 11040",
  hours: process.env.NEXT_PUBLIC_HOURS || "",
  legalEffectiveDate: process.env.NEXT_PUBLIC_LEGAL_EFFECTIVE_DATE || "",
  social: {
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "https://www.instagram.com/",
    facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL || "https://www.facebook.com/",
    linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL || "https://www.linkedin.com/",
    youtube: process.env.NEXT_PUBLIC_YOUTUBE_URL || "https://www.youtube.com/",
  },
} as const;

export const coverageNote =
  "Airports, cities, vehicle models, and timing shown on this website are examples for quotation. Coverage and availability are confirmed in each reply, not by this page.";
