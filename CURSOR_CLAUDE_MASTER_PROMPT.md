# CURSOR / CLAUDE CODE MASTER IMPLEMENTATION PROMPT

You are a senior Next.js architect, design engineer and UX specialist. Build the complete production-quality SANCH BLACK CAR luxury chauffeured transportation website in this repository. Read `PRD.md` fully before coding and inspect EVERY image in `references/` visually; these are the approved page-specific design mockups. Implement the website in Next.js App Router + strict TypeScript + Tailwind CSS + shadcn/ui, using current compatible stable releases, Lucide icons, React Hook Form and Zod. No Docker.

CRITICAL DESIGN REQUIREMENTS
1. `references/homepage-primary.png` controls the homepage design. Other screenshots control their named service/page routes; supplementary homepage and airport alternatives are inspiration only.
2. Aim for close visual fidelity: layout proportions, premium serif headings, dark cinematic hero photography, warm gold CTAs, ivory sections, typography, card grids, booking panel placement, margins, spacing, section order, background transitions and footer.
3. Do NOT display a full-page screenshot as the website. Rebuild each section as real accessible responsive HTML and reusable React components. Do not use screenshot crops as production vehicle images. Use approved/licensed imagery or explicit placeholders.
4. The company is SANCH BLACK CAR, a chauffeur-driven transportation brand, NOT a self-drive car rental site. Keep copy original and brand-consistent.
5. Do not invent real phone numbers, street addresses, customer testimonials, corporate partners, guarantees, rates, airports served or vehicle availability. Store unknown values in editable config and use neutral placeholders without presenting them as verified claims.

EXECUTION
A. Inspect repository, images, and PRD; create a concise implementation plan and route/component map.
B. Initialize or adapt Next.js App Router project with TypeScript, Tailwind, shadcn/ui, ESLint, next/font and next/image. Keep components in `src/components/`, pages in `src/app/`, data in `src/content/`, configuration in `src/config/`.
C. Implement responsive header, logo treatment, mega-menu/mobile menu, footer, typography/color tokens, buttons, forms, service/fleet cards, accordion, and CTA sections.
D. Build homepage FIRST. Render or inspect it at desktop and mobile sizes and refine it against `references/homepage-primary.png` before proceeding.
E. Implement every route in PRD using its named screenshot, with unique hero and section compositions; do not make all service pages generic duplicates.
F. Implement conditional booking quote forms for one-way, round-trip, hourly, point-to-point, as-directed, wedding, corporate, roadshows, city tours and special events. Validate client/server with Zod. Implement `/api/quote` with safe email integration via env vars; if credentials missing, show a clear non-success state rather than pretending booking completed.
G. Add about, contact, fleet, vehicle detail, blog index, blog detail, privacy, terms and thank-you pages; accessible FAQ accordions and functional internal links.
H. Add metadata, canonical, sitemap, robots, schema with verified fields only, image optimization, responsive behavior, error handling, and basic automated tests.
I. Run lint, typecheck, build and fix all issues. If browser/screenshot tooling is available, perform desktop/mobile visual QA and iterate; otherwise report that visual QA remains pending.
J. Create `README.md`, `.env.example`, `IMPLEMENTATION_STATUS.md`, and list all owner-supplied information needed before production launch.

REFERENCE-TO-ROUTE MAPPING
/ -> references/homepage-primary.png
/about-us -> references/about-us.png
/contact-us -> references/contact-us.png
/blog -> references/blog.png
/our-fleet -> references/homepage-primary.png (fleet section, supplemented by service fleet sections)
/services/airport-transfer -> references/airport-transfer-reference-inspired.png
/services/city-to-city-transfer -> references/city-to-city-transfer.png
/services/hourly-chauffeur -> references/hourly-chauffeur.png
/services/wedding-service -> references/wedding-service.png
/services/corporate-transfer -> references/corporate-transfer.png
/services/special-events -> references/special-events.png
/services/roadshows -> references/roadshows.png
/services/city-tours -> references/city-tours.png
/services/limousine-service -> references/limousine-service.png
/services/chauffeur-service -> references/chauffeur-service.png

DELIVERY RULES
- Actually write and test working code, not just describe how it might be built.
- Work in phases but continue until all PRD routes and key functionality are implemented, unless blocked by missing assets/credentials.
- Avoid asking routine questions: use editable configuration and clearly marked placeholders for unknown business facts.
- Do not claim a booking/payment integration works without verifying it.
- After each phase, report completed files, verification results and outstanding blockers.
- Final output: all routes implemented, successful build, responsive design, complete README, and transparent list of any unverified business content or unavailable external integrations.
