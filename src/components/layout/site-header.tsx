"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowRight, ChevronDown, Mail, Menu, Phone, X } from "lucide-react";
import { Logo } from "@/components/layout/logo";
import { services } from "@/content/services";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Home" },
  { href: "/our-fleet", label: "Our Fleet" },
  { href: "/about-us", label: "About" },
  { href: "/contact-us", label: "Contact" },
];

const headerSocials = [
  { name: "Facebook", href: siteConfig.social.facebook },
  { name: "Instagram", href: siteConfig.social.instagram },
  { name: "LinkedIn", href: siteConfig.social.linkedin },
  { name: "YouTube", href: siteConfig.social.youtube },
].filter((social) => social.href);

function SocialGlyph({ name }: { name: string }) {
  const common = { viewBox: "0 0 24 24", className: "size-3.5", fill: "currentColor", "aria-hidden": true as const };
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

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  function closeMenus() {
    setOpen(false);
    setServicesOpen(false);
  }

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-ink text-white">
      {siteConfig.email || siteConfig.phone || headerSocials.length > 0 ? (
        <div className="border-b border-white/10">
          <div className="mx-auto flex max-w-[1180px] flex-wrap items-center justify-between gap-x-4 gap-y-1 px-5 py-2 md:h-9 md:flex-nowrap md:px-8 md:py-0">
            {headerSocials.length > 0 ? (
              <div className="flex items-center gap-2">
                {headerSocials.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    aria-label={social.name}
                    className="inline-flex size-7 items-center justify-center rounded-full border border-white/20 text-white/80 hover:border-gold hover:text-gold"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <SocialGlyph name={social.name} />
                  </a>
                ))}
              </div>
            ) : null}
            <div className="ml-auto flex flex-wrap items-center justify-end gap-x-4 gap-y-1">
              {siteConfig.phone ? (
                <a href={`tel:${siteConfig.phone}`} className="inline-flex items-center gap-2 text-xs text-white/80 hover:text-gold sm:text-sm">
                  <Phone className="size-3.5 shrink-0 text-gold sm:size-4" aria-hidden />
                  {siteConfig.phone}
                </a>
              ) : null}
              {siteConfig.email ? (
                <a href={`mailto:${siteConfig.email}`} className="inline-flex items-center gap-2 text-xs text-white/80 hover:text-gold sm:text-sm">
                  <Mail className="size-3.5 shrink-0 text-gold sm:size-4" aria-hidden />
                  {siteConfig.email}
                </a>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
      <div className="mx-auto grid h-[65px] max-w-[1180px] grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2.5 px-4 sm:gap-3 sm:px-5 lg:h-[85px] lg:gap-6 lg:px-8">
        <Link href="/" aria-label="SANCH BLACK CAR home" className="min-w-0">
          <Logo priority />
        </Link>

        <nav className="col-start-2 hidden items-center justify-center gap-8 lg:flex" aria-label="Primary">
          <Link href="/" onClick={closeMenus} className={cn("text-sm text-white/85 hover:text-gold", pathname === "/" && "text-gold")}>
            Home
          </Link>
          <div
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button
              type="button"
              className="inline-flex items-center gap-1 text-sm text-white/85 hover:text-gold"
              aria-expanded={servicesOpen}
              aria-haspopup="true"
              onClick={() => setServicesOpen((value) => !value)}
            >
              Services
              <ChevronDown className="size-4" aria-hidden />
            </button>
            {servicesOpen ? (
              <div className="absolute left-1/2 top-full z-20 w-[460px] -translate-x-1/2 pt-3">
                <div className="grid grid-cols-2 gap-1 rounded-2xl border border-white/10 bg-charcoal p-3 shadow-2xl">
                  {services.map((service) => (
                    <Link
                      key={service.slug}
                      href={service.href}
                      onClick={closeMenus}
                      className="rounded-xl px-3 py-2.5 text-sm text-white/85 hover:bg-white/5 hover:text-gold"
                    >
                      {service.menu}
                    </Link>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
          {links.slice(1).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={closeMenus}
              className={cn(
                "text-sm text-white/85 hover:text-gold",
                pathname.startsWith(link.href) && "text-gold",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="col-start-3 flex shrink-0 items-center justify-end gap-2.5 sm:gap-3">
          <Link
            href="/bookings"
            className="inline-flex h-10 items-center gap-2 whitespace-nowrap rounded-md bg-gold px-3 text-sm font-medium text-ink hover:bg-gold-deep sm:px-5"
          >
            Book Now
            <ArrowRight className="hidden size-4 min-[420px]:block" aria-hidden />
          </Link>
          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-full border border-white/15 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open ? (
        <div id="mobile-menu" className="max-h-[calc(100dvh-6.75rem)] overflow-y-auto border-t border-white/10 bg-ink lg:hidden">
          <nav className="flex flex-col gap-1 px-4 py-4" aria-label="Mobile">
            <Link href="/" onClick={closeMenus} className="rounded-lg px-3 py-3 hover:bg-white/5">Home</Link>
            <p className="px-3 pt-3 text-xs tracking-[0.2em] text-gold">SERVICES</p>
            {services.map((service) => (
              <Link key={service.slug} href={service.href} onClick={closeMenus} className="rounded-lg px-3 py-2.5 text-white/85 hover:bg-white/5">
                {service.menu}
              </Link>
            ))}
            {links.slice(1).map((link) => (
              <Link key={link.href} href={link.href} onClick={closeMenus} className="rounded-lg px-3 py-3 hover:bg-white/5">
                {link.label}
              </Link>
            ))}
            <Link href="/blog" onClick={closeMenus} className="rounded-lg px-3 py-3 hover:bg-white/5">Blog</Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
