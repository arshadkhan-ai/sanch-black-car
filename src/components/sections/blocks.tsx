import Image from "next/image";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/container";
import { FleetCard } from "@/components/fleet/fleet-card";
import { FaqAccordion } from "@/components/ui/accordion";
import { fleet, type FleetVehicle } from "@/content/fleet";
import { coverageNote } from "@/config/site";
import { cn } from "@/lib/utils";

export function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <p className={cn("text-[11px] font-medium uppercase tracking-[0.32em]", light ? "text-gold" : "text-gold-ink")}>
      {children}
    </p>
  );
}

export function ServiceHero({
  eyebrow,
  title,
  description,
  image,
  imageAlt,
  highlights,
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  description: string;
  image: string;
  imageAlt: string;
  highlights: { icon: LucideIcon; label: string }[];
  children: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-ink text-white">
      <Image src={image} alt={imageAlt} fill priority className="object-cover" sizes="100vw" />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/75 to-black/35" />
      <Container className="relative grid items-start gap-8 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-20">
        <div className="max-w-xl pt-4">
          <Eyebrow light>{eyebrow}</Eyebrow>
          <h1 className="mt-4 font-serif text-5xl leading-[0.95] sm:text-6xl">{title}</h1>
          <p className="mt-5 text-base leading-7 text-white/80">{description}</p>
          <ul className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {highlights.map((item) => (
              <li key={item.label} className="text-center sm:text-left">
                <item.icon className="mx-auto size-5 text-gold sm:mx-0" aria-hidden />
                <p className="mt-2 text-xs leading-5 text-white/80">{item.label}</p>
              </li>
            ))}
          </ul>
        </div>
        <div>{children}</div>
      </Container>
    </section>
  );
}

export function SplitBlock({
  eyebrow,
  title,
  body,
  image,
  imageAlt,
  href,
  cta,
  reverse = false,
  aside,
}: {
  eyebrow: string;
  title: string;
  body: string;
  image: string;
  imageAlt: string;
  href?: string;
  cta?: string;
  reverse?: boolean;
  aside?: React.ReactNode;
}) {
  return (
    <section className="bg-ivory py-16 md:py-20">
      <Container className={cn("grid items-center gap-10 lg:grid-cols-2", reverse && "lg:[&>*:first-child]:order-2")}>
        <div>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="mt-3 font-serif text-4xl leading-tight text-charcoal md:text-5xl">{title}</h2>
          <p className="mt-5 text-base leading-8 text-muted">{body}</p>
          {href && cta ? (
            <Link href={href} className="mt-6 inline-flex h-11 items-center gap-2 rounded-full bg-gold px-5 text-sm font-medium text-ink hover:bg-gold-deep">
              {cta} <ArrowRight className="size-4" aria-hidden />
            </Link>
          ) : null}
        </div>
        {aside ?? (
          <div className="relative min-h-[320px] overflow-hidden rounded-2xl">
            <Image src={image} alt={imageAlt} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
          </div>
        )}
      </Container>
    </section>
  );
}

export function IconBand({ items }: { items: { icon: LucideIcon; title: string; text: string }[] }) {
  return (
    <section className="border-y border-line bg-white">
      <Container className="grid gap-6 py-8 sm:grid-cols-2 lg:grid-cols-5">
        {items.map((item) => (
          <div key={item.title} className="flex gap-3">
            <item.icon className="mt-0.5 size-5 shrink-0 text-gold-ink" aria-hidden />
            <div>
              <h3 className="text-sm font-semibold">{item.title}</h3>
              <p className="mt-1 text-sm leading-6 text-muted">{item.text}</p>
            </div>
          </div>
        ))}
      </Container>
    </section>
  );
}

export function MediaGrid({
  eyebrow,
  title,
  intro,
  items,
  theme = "light",
  columns = 4,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  items: { title: string; text: string; image: string; href?: string }[];
  theme?: "light" | "dark";
  columns?: 3 | 4 | 5 | 6;
}) {
  const dark = theme === "dark";
  const cols = { 3: "lg:grid-cols-3", 4: "lg:grid-cols-4", 5: "lg:grid-cols-5", 6: "lg:grid-cols-3 xl:grid-cols-6" }[columns];
  return (
    <section className={cn("py-16 md:py-20", dark ? "bg-ink text-white" : "bg-ivory text-charcoal")}>
      <Container>
        {eyebrow ? <Eyebrow light={dark}>{eyebrow}</Eyebrow> : null}
        <div className="mt-3 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <h2 className="max-w-xl font-serif text-4xl leading-tight md:text-5xl">{title}</h2>
          {intro ? <p className={cn("max-w-md text-sm leading-7", dark ? "text-white/70" : "text-muted")}>{intro}</p> : null}
        </div>
        <div className={cn("mt-8 grid gap-4 sm:grid-cols-2", cols)}>
          {items.map((item) => (
            <article key={item.title} className={cn("overflow-hidden rounded-2xl", dark ? "bg-charcoal" : "bg-white shadow-sm")}>
              <div className="relative aspect-[16/10]">
                <Image src={item.image} alt="" fill className="object-cover" sizes="(max-width: 768px) 100vw, 25vw" />
              </div>
              <div className="p-4">
                <h3 className="font-serif text-2xl">{item.title}</h3>
                <p className={cn("mt-2 text-sm leading-6", dark ? "text-white/70" : "text-muted")}>{item.text}</p>
                {item.href ? (
                  <Link href={item.href} className="mt-3 inline-flex text-sm text-gold-ink hover:text-gold-deep">
                    Learn more
                  </Link>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function FleetBand({
  title,
  theme = "light",
  vehicles,
}: {
  title: string;
  theme?: "light" | "dark";
  vehicles?: FleetVehicle[];
}) {
  const list = vehicles ?? fleet.slice(0, 4);
  const dark = theme === "dark";
  return (
    <section className={cn("py-16 md:py-20", dark ? "bg-[#0d1013] text-white" : "bg-white text-charcoal")}>
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-serif text-4xl md:text-5xl">{title}</h2>
          <Link href="/our-fleet" className="inline-flex h-10 items-center rounded-full border border-gold/50 px-4 text-sm text-gold-ink hover:bg-gold/10">
            View full fleet
          </Link>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {list.map((vehicle) => (
            <FleetCard key={vehicle.slug} vehicle={vehicle} variant={dark ? "dark" : "light"} />
          ))}
        </div>
      </Container>
    </section>
  );
}

export function ReasonGrid({
  eyebrow,
  title,
  items,
  theme = "dark",
}: {
  eyebrow: string;
  title: string;
  items: { icon: LucideIcon; title: string; text: string }[];
  theme?: "dark" | "light";
}) {
  const dark = theme === "dark";
  return (
    <section className={cn("py-16 md:py-20", dark ? "bg-ink text-white" : "bg-ivory")}>
      <Container>
        <Eyebrow light={dark}>{eyebrow}</Eyebrow>
        <h2 className="mt-3 max-w-xl font-serif text-4xl md:text-5xl">{title}</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <article key={item.title} className={cn("rounded-2xl p-5", dark ? "bg-charcoal" : "bg-white")}>
              <item.icon className="size-5 text-gold" aria-hidden />
              <h3 className="mt-4 font-serif text-2xl">{item.title}</h3>
              <p className={cn("mt-2 text-sm leading-6", dark ? "text-white/65" : "text-muted")}>{item.text}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function ProcessSteps({
  steps = [
    { title: "Enter details", text: "Share the date, places, and the kind of journey you want." },
    { title: "Get a quote", text: "We reply with availability and a price. Nothing is reserved yet." },
    { title: "Confirm the plan", text: "You accept the quote in writing and the arrangement is set." },
    { title: "Travel", text: "The chauffeur follows the meeting point and timing you confirmed." },
  ],
}: {
  steps?: { title: string; text: string }[];
}) {
  return (
    <section className="bg-white py-16 md:py-20">
      <Container>
        <Eyebrow>How it works</Eyebrow>
        <h2 className="mt-3 font-serif text-4xl md:text-5xl">Easy booking process</h2>
        <ol className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <li key={step.title} className="rounded-2xl border border-line p-5">
              <span className="inline-flex size-10 items-center justify-center rounded-full bg-gold font-serif text-lg text-ink">{index + 1}</span>
              <h3 className="mt-4 font-serif text-2xl">{step.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">{step.text}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

export function FaqSplit({
  title,
  items,
  image,
  imageAlt,
  ctaTitle,
  ctaText,
  ctaHref,
  ctaLabel,
}: {
  title: string;
  items: { q: string; a: string }[];
  image: string;
  imageAlt: string;
  ctaTitle: string;
  ctaText: string;
  ctaHref: string;
  ctaLabel: string;
}) {
  return (
    <section className="bg-ivory">
      <div className="grid lg:grid-cols-2">
        <div className="relative min-h-[420px]">
          <Image src={image} alt={imageAlt} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/20" />
          <div className="relative flex h-full min-h-[420px] flex-col justify-end p-8 text-white md:p-12">
            <p className="text-[11px] tracking-[0.28em] text-gold">READY WHEN YOU ARE</p>
            <h2 className="mt-3 max-w-md font-serif text-4xl leading-tight md:text-5xl">{ctaTitle}</h2>
            <p className="mt-3 max-w-md text-sm leading-7 text-white/80">{ctaText}</p>
            <Link href={ctaHref} className="mt-6 inline-flex h-11 w-fit items-center rounded-full bg-gold px-5 text-sm font-medium text-ink hover:bg-gold-deep">
              {ctaLabel}
            </Link>
          </div>
        </div>
        <div className="bg-white px-6 py-12 md:px-12">
          <Eyebrow>Questions</Eyebrow>
          <h2 className="mt-3 font-serif text-4xl">{title}</h2>
          <div className="mt-6">
            <FaqAccordion items={items} />
          </div>
        </div>
      </div>
    </section>
  );
}

export function PackageRow({
  packages,
}: {
  packages: { title: string; text: string }[];
}) {
  return (
    <section className="bg-ink py-16 text-white md:py-20">
      <Container>
        <Eyebrow light>Hourly packages</Eyebrow>
        <h2 className="mt-3 font-serif text-4xl md:text-5xl">Choose the length of the day</h2>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-white/70">
          Fares are not published. Each duration is quoted for your date and vehicle category.
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {packages.map((item) => (
            <article key={item.title} className="rounded-2xl border border-gold/30 bg-charcoal p-5">
              <h3 className="font-serif text-3xl text-gold">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-white/70">{item.text}</p>
              <Link href="/bookings?service=hourly" className="mt-5 inline-flex text-sm text-gold">Get a quote</Link>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function Note({ children }: { children: React.ReactNode }) {
  return <p className="mt-6 text-sm leading-6 text-muted">{children ?? coverageNote}</p>;
}

export function CtaBand({
  title,
  text,
  href,
  label,
  image,
}: {
  title: string;
  text: string;
  href: string;
  label: string;
  image: string;
}) {
  return (
    <section className="relative min-h-[360px] overflow-hidden bg-ink text-white">
      <Image src={image} alt="" fill className="object-cover" sizes="100vw" />
      <div className="absolute inset-0 bg-black/60" />
      <Container className="relative flex min-h-[360px] flex-col items-start justify-center py-16">
        <p className="text-[11px] tracking-[0.28em] text-gold">READY TO RIDE</p>
        <h2 className="mt-3 max-w-2xl font-serif text-4xl md:text-6xl">{title}</h2>
        <p className="mt-4 max-w-xl text-white/80">{text}</p>
        <Link href={href} className="mt-6 inline-flex h-11 items-center rounded-full bg-gold px-5 text-sm font-medium text-ink hover:bg-gold-deep">
          {label}
        </Link>
      </Container>
    </section>
  );
}
