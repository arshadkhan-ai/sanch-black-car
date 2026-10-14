import { Clock, Gem, Globe, Mail, MapPin, Phone, UserRound, type LucideIcon } from "lucide-react";
import { Container } from "@/components/layout/container";
import { ContactForm } from "@/components/forms/contact-form";
import { CtaBand, Eyebrow } from "@/components/sections/blocks";
import { siteConfig } from "@/config/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Contact Us",
  "Send SANCH BLACK CAR a question or a transportation brief. The message is delivered only when enquiry email is connected.",
  "/contact-us",
);

export default function Page() {
  return (
    <>
      <section className="relative min-h-[460px] bg-ink text-white">
        <div className="absolute inset-0 bg-[url('/images/sedan-road.jpg')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/75 to-black/30" />
        <Container className="relative flex min-h-[460px] flex-col justify-center py-16">
          <Eyebrow light>Contact SANCH BLACK CAR</Eyebrow>
          <h1 className="mt-4 max-w-xl font-serif text-5xl md:text-6xl">We are here for the journey you want to plan</h1>
          <p className="mt-4 max-w-lg text-white/75">Call, email, or send the form. A ride is confirmed only after we reply.</p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {(
            [
              { icon: Phone, label: siteConfig.phone },
              { icon: Mail, label: "Email Ajay Kumar" },
              { icon: Gem, label: "Quote before booking" },
              { icon: Clock, label: "Reply by email" },
            ] satisfies { icon: LucideIcon; label: string }[]
          ).map((item) => (
              <li key={item.label} className="flex items-center gap-2 text-sm">
                <item.icon className="size-4 text-gold" aria-hidden />
                {item.label}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="bg-ivory py-16">
        <Container className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-3xl bg-cream p-6 md:p-8">
            <Eyebrow>Get in touch</Eyebrow>
            <h2 className="mt-3 font-serif text-4xl">Contact us</h2>
            <p className="mt-3 text-sm leading-7 text-muted">
              If email delivery is not configured, the form will say so and will not pretend the message was sent.
            </p>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
          <aside className="rounded-3xl bg-ink p-6 text-white md:p-8">
            <h2 className="font-serif text-3xl">Let&apos;s connect</h2>
            <ul className="mt-6 space-y-5 text-sm">
              <li className="flex gap-3"><UserRound className="size-5 shrink-0 text-gold" aria-hidden /><span>{siteConfig.contactName}</span></li>
              <li className="flex gap-3">
                <Phone className="size-5 shrink-0 text-gold" aria-hidden />
                <a href={`tel:${siteConfig.phone}`} className="hover:text-gold">{siteConfig.phone}</a>
              </li>
              <li className="flex gap-3">
                <Mail className="size-5 shrink-0 text-gold" aria-hidden />
                <a href={`mailto:${siteConfig.email}`} className="break-all hover:text-gold">{siteConfig.email}</a>
              </li>
              <li className="flex gap-3">
                <Globe className="size-5 shrink-0 text-gold" aria-hidden />
                <a href={siteConfig.website} className="break-all hover:text-gold" target="_blank" rel="noopener noreferrer">{siteConfig.websiteLabel}</a>
              </li>
              <li className="flex gap-3"><MapPin className="size-5 shrink-0 text-gold" aria-hidden /><span>{siteConfig.address}</span></li>
              {siteConfig.hours ? (
                <li className="flex gap-3"><Clock className="size-5 shrink-0 text-gold" aria-hidden /><span>{siteConfig.hours}</span></li>
              ) : null}
            </ul>
          </aside>
        </Container>
      </section>

      <section className="bg-white py-16">
        <Container className="grid items-center gap-8 lg:grid-cols-2">
          <div>
            <Eyebrow>Find us</Eyebrow>
            <h2 className="mt-3 font-serif text-4xl">Our location</h2>
            <p className="mt-4 leading-7 text-muted">{siteConfig.address}</p>
            <a className="mt-6 inline-flex text-sm text-gold-ink" href={`https://maps.google.com/?q=${encodeURIComponent(siteConfig.address)}`}>Get directions</a>
          </div>
          <iframe
            title="Map of SANCH BLACK CAR in New Hyde Park"
            src={`https://maps.google.com/maps?q=${encodeURIComponent(siteConfig.address)}&z=15&output=embed`}
            className="min-h-64 w-full rounded-3xl border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </Container>
      </section>
      <CtaBand title="Prefer to price a ride directly?" text="The booking page collects the trip, a vehicle category, and your contact details." href="/bookings" label="Get a Quote" image="/images/interior.jpg" />
    </>
  );
}
