import Link from "next/link";
import { Clock, Globe, Mail, MapPin, Phone, UserRound } from "lucide-react";
import { Logo } from "@/components/layout/logo";
import { siteConfig } from "@/config/site";

function SocialIcon({ name }: { name: string }) {
  const common = { viewBox: "0 0 24 24", className: "size-4", fill: "currentColor", "aria-hidden": true as const };
  if (name === "Instagram") {
    return (
      <svg {...common}>
        <path d="M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4zm5 4.5A4.5 4.5 0 1 0 16.5 12 4.5 4.5 0 0 0 12 7.5zm6.25-.75a1 1 0 1 0 1 1 1 1 0 0 0-1-1zM12 9a3 3 0 1 1-3 3 3 3 0 0 1 3-3z" />
      </svg>
    );
  }
  if (name === "Facebook") {
    return (
      <svg {...common}>
        <path d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H8v3h2v7h3v-7h2.6l.4-3H13v-2c0-.6.4-1 1-1z" />
      </svg>
    );
  }
  if (name === "LinkedIn") {
    return (
      <svg {...common}>
        <path d="M6.5 9H3.7v11h2.8zm.2-3.5A1.7 1.7 0 1 1 5 3.8a1.7 1.7 0 0 1 1.7 1.7zM20.3 13.3c0-2.8-1.5-4.3-3.8-4.3a3.3 3.3 0 0 0-2.9 1.6h-.1V9H10.8c0 1.8 0 11 0 11h2.8v-6.1c0-.3 0-.7.1-1a2 2 0 0 1 1.9-1.4c1.3 0 1.9 1 1.9 2.5V20h2.8z" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <path d="M23 12.2a11 11 0 0 1-11 8.3 11 11 0 0 1-7.8-3.2L6.4 15a7.6 7.6 0 1 0 2.2-8.7l-2.1-1.5A11 11 0 0 1 23 12.2zM10 9.2v7.6l6.4-3.8z" />
    </svg>
  );
}

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/about-us", label: "About Us" },
  { href: "/our-fleet", label: "Our Fleet" },
  { href: "/blog", label: "Blog" },
  { href: "/bookings", label: "Book a Ride" },
  { href: "/contact-us", label: "Contact Us" },
];

const footerServices = [
  { href: "/services/airport-transfer", label: "Airport Transfer" },
  { href: "/services/city-to-city-transfer", label: "City to City Transfer" },
  { href: "/services/hourly-chauffeur", label: "Hourly Chauffeur" },
  { href: "/services/wedding-service", label: "Wedding Service" },
  { href: "/services/corporate-transfer", label: "Corporate Transfer" },
  { href: "/services/special-events", label: "Special Events" },
  { href: "/services/roadshows", label: "Roadshows" },
  { href: "/services/city-tours", label: "City Tours" },
  { href: "/services/limousine-service", label: "Limousine Service" },
  { href: "/services/chauffeur-service", label: "Chauffeur Service" },
];

const legalLinks = [
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms-and-conditions", label: "Terms & Conditions" },
];

const socials = [
  { name: "Instagram", href: siteConfig.social.instagram },
  { name: "Facebook", href: siteConfig.social.facebook },
  { name: "LinkedIn", href: siteConfig.social.linkedin },
  { name: "YouTube", href: siteConfig.social.youtube },
].filter((social) => social.href);

const linkClass = "hover:text-gold";

export function SiteFooter() {
  const hasContact = Boolean(siteConfig.phone || siteConfig.email || siteConfig.address || siteConfig.hours);

  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto grid max-w-[1180px] gap-10 px-5 py-14 md:grid-cols-2 md:px-8 lg:grid-cols-[1.15fr_0.8fr_1.5fr_0.7fr]">
        <div>
          <Logo size="footer" />
          <p className="mt-5 max-w-xs text-sm leading-7 text-white/65">
            Premium black car and chauffeur services for a more luxurious, comfortable and reliable travel experience.
          </p>
          <ul className="mt-5 space-y-3 text-sm text-white/70">
            <li className="flex gap-2">
              <UserRound className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden />
              <span>{siteConfig.contactName}</span>
            </li>
            {siteConfig.phone ? (
              <li className="flex gap-2">
                <Phone className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden />
                <a href={`tel:${siteConfig.phone}`} className={linkClass}>{siteConfig.phone}</a>
              </li>
            ) : null}
            {siteConfig.email ? (
              <li className="flex gap-2">
                <Mail className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden />
                <a href={`mailto:${siteConfig.email}`} className={`${linkClass} break-all`}>{siteConfig.email}</a>
              </li>
            ) : null}
            <li className="flex gap-2">
              <Globe className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden />
              <a href={siteConfig.website} className={`${linkClass} break-all`} target="_blank" rel="noopener noreferrer">{siteConfig.websiteLabel}</a>
            </li>
            {siteConfig.address ? (
              <li className="flex gap-2">
                <MapPin className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden />
                <span>{siteConfig.address}</span>
              </li>
            ) : null}
            {siteConfig.hours ? (
              <li className="flex gap-2">
                <Clock className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden />
                <span>{siteConfig.hours}</span>
              </li>
            ) : null}
            {!hasContact ? (
              <li>Phone, email, and street address have not been published yet. Use the contact form to enquire.</li>
            ) : null}
          </ul>
          {socials.length > 0 ? (
            <div className="mt-5 flex gap-3">
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  aria-label={social.name}
                  className="inline-flex size-9 items-center justify-center rounded-full border border-white/20 text-white/80 hover:border-gold hover:text-gold"
                  target="_blank"
                  rel="noreferrer"
                >
                  <SocialIcon name={social.name} />
                </a>
              ))}
            </div>
          ) : null}
        </div>

        <nav aria-label="Quick links">
          <h2 className="font-serif text-xl text-gold">Quick Links</h2>
          <ul className="mt-4 space-y-2 text-sm text-white/70">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={linkClass}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Our services">
          <h2 className="font-serif text-xl text-gold">Our Services</h2>
          <ul className="mt-4 grid grid-cols-1 gap-x-6 gap-y-2 text-sm text-white/70 sm:grid-cols-2">
            {footerServices.map((service) => (
              <li key={service.href}>
                <Link href={service.href} className={linkClass}>{service.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Legal">
          <h2 className="font-serif text-xl text-gold">Legal</h2>
          <ul className="mt-4 space-y-2 text-sm text-white/70">
            {legalLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={linkClass}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1180px] flex-col gap-3 px-5 py-5 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between md:px-8">
          <p>© 2026 SANCH BLACK CAR. All rights reserved.</p>
          <p className="flex flex-wrap gap-4">
            {legalLinks.map((link) => (
              <Link key={link.href} href={link.href} className={linkClass}>{link.label}</Link>
            ))}
          </p>
        </div>
      </div>
    </footer>
  );
}
