# SANCH BLACK CAR — Product Requirements Document (PRD)
Version 1.0 | Next.js luxury chauffeured transportation website | 14 October 2026

## 1. Project goal
Build a production-ready, mobile-first, SEO-optimized premium chauffeur and luxury transportation marketing website for SANCH BLACK CAR. Recreate the visual direction, section order, composition, and page-specific components of the supplied `references/*.png` screenshots as closely as practical. Screenshots are visual references, NOT images to paste as entire pages. Implement all content as real, responsive HTML/CSS and accessible interactive components. This is chauffeur-driven transportation, not a self-drive rental checkout.

## 2. Visual design system
- Brand: SANCH BLACK CAR; aesthetic: luxury, editorial, cinematic, refined.
- Colors: near-black #080A0B, charcoal #141719, warm ivory #F8F6F2, white #FFFFFF, champagne gold #D7AF6D, gold hover #C69A52, muted grey #6B7075. Treat as initial design tokens, adjust to screenshots.
- Headings: elegant serif (e.g., Cormorant Garamond or Playfair Display); body: modern sans (e.g., Inter). Use next/font.
- Premium photography, generous spacing, gold CTA buttons, thin borders, subtle overlays, consistent 4/8px spacing scale, restrained animation.
- Desktop reference screenshots are authoritative for composition; responsive layouts should be deliberately designed at 1440, 1024, 768, 390, and 360px widths.
- Avoid horizontal scrolling, text-over-image contrast failures, fake business credentials, fabricated testimonials, and copied third-party branding.

## 3. Reference mapping
Each page has its own named reference in `references/`. The primary homepage is `homepage-primary.png`; `homepage-alternative*.png` are supplementary inspiration, not replacement. `airport-transfer-reference-inspired.png` is the primary airport design; `airport-transfer-alternative.png` is supplemental.

## 4. Site map and URLs
| Route | Primary reference | Essential sections |
|---|---|---|
| `/` | homepage-primary.png | hero + booking widget, about, services, fleet, why choose us, testimonials placeholder, CTA, footer |
| `/about-us` | about-us.png | brand story, mission, values, experience, CTA |
| `/contact-us` | contact-us.png | contact form, contact information, optional map, CTA |
| `/blog` | blog.png | featured article, category chips, grid, pagination/search |
| `/blog/[slug]` | derived from blog | article content, breadcrumbs, related posts, schema |
| `/our-fleet` | homepage-primary.png fleet + service refs | category filters, vehicle cards, detail CTA |
| `/our-fleet/[slug]` | fleet card design | gallery, specs, amenities, booking CTA |
| `/services/airport-transfer` | airport-transfer-reference-inspired.png | airport booking, benefits, airports, meet & greet, fleet, FAQs |
| `/services/city-to-city-transfer` | city-to-city-transfer.png | route booking, transfer advantages, destinations, fleet, FAQs |
| `/services/hourly-chauffeur` | hourly-chauffeur.png | hourly form, use cases, packages, fleet, FAQs |
| `/services/wedding-service` | wedding-service.png | wedding form, occasion cards, fleet, packages, FAQs |
| `/services/corporate-transfer` | corporate-transfer.png | corporate booking, business travel use cases, fleet, FAQs |
| `/services/special-events` | special-events.png | event booking, event categories, fleet, FAQs |
| `/services/roadshows` | roadshows.png | multi-stop booking, investor meetings, fleet, FAQs |
| `/services/city-tours` | city-tours.png | duration booking, tour types, attractions, fleet, FAQs |
| `/services/limousine-service` | limousine-service.png | limousine form, occasions, limo fleet, FAQs |
| `/services/chauffeur-service` | chauffeur-service.png | as-directed/hourly booking, benefits, fleet, FAQs |
| `/privacy-policy`, `/terms-of-service` | consistent layout | editable legal copy, no fabricated claims |
| `/thank-you` | consistent layout | enquiry acknowledgement and next steps |

## 5. Shared components
Sticky `SiteHeader`, accessible `DesktopNav` + `MobileMenu`, `Logo`, `Hero`, `Breadcrumbs`, `BookingWidget`, `ServiceCard`, `FleetCard`, `FeatureStrip`, `Testimonials` (only approved reviews), `Steps`, `FAQAccordion`, `CTASection`, `SiteFooter`, `ContactForm`, `CookieNotice` only if required by tracking, `ScrollToTop`. Shared header/footer must match across pages, while hero, booking mode and section layouts vary by page.

## 6. Booking / quote request
Booking is **quote enquiry**, not confirmed reservation or payment. Form variants: one-way, round-trip, hourly, point-to-point, as-directed, event, multi-city. Fields by mode: service type, pickup/drop-off, additional stops, date/time, return date/time, hours, passenger count, luggage, vehicle category, flight number (airport), event type (events), itinerary (roadshows), contact name/email/phone, special instructions and consent. Enforce conditional validation using Zod, local date/time correctness, server-side validation, spam protection and clear loading/success/error states. On submit, send to `/api/quote` and email configured business recipient via provider (e.g., Resend) when keys are available. No pretend-success if delivery fails. Never show prices without actual pricing rules; use 'Get a Quote'.

## 7. Content and data model
Use typed local data in `src/content/` for services, fleet, airports, cities, FAQs, blog seed articles and site configuration; easy future CMS migration. Vehicle categories can include Executive Sedan, Luxury SUV, Sprinter, Stretch Limousine, but mark specs, availability and vehicle models as *unverified until owner confirms*. Use editable config for actual business name, logo, phone, email, address, operating region, social URLs, fleet, reviews, legal policies, airport coverage, pricing and guarantees. No sample phone/address/logos/client endorsements presented as real.

## 8. Technical stack
Next.js latest compatible stable App Router, TypeScript strict, React, Tailwind CSS, shadcn/ui (Radix primitives), Lucide React, React Hook Form, Zod, next/image, next/font. Optional Framer Motion / Motion for subtle entrance effects. Node.js LTS. No Docker. Avoid unnecessary backend/database initially; quote API route with server-side email integration is sufficient. Use environment variables and `.env.example` (never commit credentials). Keep content data separate from UI.

## 9. SEO, accessibility, performance
Unique title/meta description per page, canonical, Open Graph/Twitter metadata, robots, XML sitemap, service/business schema only with verified business details, FAQ schema only for visible FAQs, semantic heading structure, alt text, internal linking, descriptive slugs, optimized WebP/AVIF assets, lazy-loading, no layout shifts, WCAG 2.2 AA-oriented focus states/keyboard access/contrast, Core Web Vitals targets LCP <=2.5s, CLS <=0.1, INP <=200ms under realistic measurement. Analytics optional with consent requirements considered.

## 10. Image asset requirements
`references/*.png` are page screenshots for visual matching. Do not use them as hero photos, background strips, logos or fleet product images. Add properly licensed original photography to `public/images/` or use clearly labeled temporary placeholders until assets are supplied. Avoid extracting photos from reference screenshots as a substitute for licensed assets. Preserve aspect ratios and cropping with `next/image`.

## 11. Functional acceptance criteria
- All listed routes load and link correctly; shared nav and footer work on mobile and desktop.
- All quote modes show relevant fields; invalid inputs blocked; submit results in actual persisted/delivered enquiry or explicit integration-unavailable error.
- Service pages visually resemble their corresponding reference screenshots in hero composition, section ordering, spacing, card geometry, gold/black/ivory palette, CTA placement and typography.
- Responsive at 360/390/768/1024/1440px, no overflow; keyboard-friendly dialogs, accordions and menus.
- No invented contact details, testimonials, prices, client logos or guarantees published as facts.
- `npm run lint`, `npx tsc --noEmit`, and `npm run build` pass; include basic smoke tests and README.

## 12. Implementation milestones
1. Bootstrap Next.js, design tokens, typography, layouts, nav/footer, config and asset structure.
2. Implement homepage and booking widget; compare to homepage-primary screenshot.
3. Implement all service pages individually with their screenshot-specific layouts and shared components.
4. Fleet, about, contact, blog, blog detail and legal pages.
5. Connect quote/contact email handling and validation; error and success UX.
6. SEO, accessibility, mobile QA, visual screenshot comparisons, build and deployment guide.

## 13. Deployment and ownership
Deploy on Node-compatible hosting (Vercel or Ubuntu VPS with Node LTS and reverse proxy). Use environment-based site URL, email provider API keys, contact destination, and analytics configuration. Include README with native local setup and production commands. Owner to confirm actual service area, airports, phone, email, company address, fleet, terms, branding assets, and genuine testimonials before public launch.
