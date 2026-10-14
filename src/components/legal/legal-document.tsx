import Link from "next/link";
import { Container } from "@/components/layout/container";
import { siteConfig } from "@/config/site";
import type { LegalSection } from "@/content/legal";

function formatLegalDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return value;
  const [year, month, day] = value.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, day)).toLocaleDateString("en-US", {
    timeZone: "UTC",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function ContactSection() {
  const published = [siteConfig.phone, siteConfig.email, siteConfig.address].filter(Boolean);

  return (
    <section id="contact-information" className="scroll-mt-28" aria-labelledby="contact-information-heading">
      <h2 id="contact-information-heading" className="font-serif text-3xl text-ink md:text-4xl">
        Contact Information
      </h2>
      <div className="mt-3 h-px w-16 bg-gold" />
      <div className="mt-5 space-y-4 text-base leading-8 text-charcoal">
        {published.length > 0 ? (
          <ul className="space-y-2">
            <li>Contact: {siteConfig.contactName}</li>
            {siteConfig.phone ? <li>Phone: {siteConfig.phone}</li> : null}
            {siteConfig.email ? (
              <li>
                Email: <a className="text-gold-ink underline decoration-gold/50 underline-offset-4 hover:text-ink" href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
              </li>
            ) : null}
            <li>
              Website: <a className="text-gold-ink underline decoration-gold/50 underline-offset-4 hover:text-ink" href={siteConfig.website}>{siteConfig.websiteLabel}</a>
            </li>
            {siteConfig.address ? <li>Address: {siteConfig.address}</li> : null}
          </ul>
        ) : (
          <p>
            A phone number, email address, and street address have not been published on this website yet. This page does not supply substitute contact details.
          </p>
        )}
        <p>
          You can send a privacy request or a question about these terms through the{" "}
          <Link href="/contact-us" className="text-gold-ink underline decoration-gold/50 underline-offset-4 hover:text-ink">
            contact form
          </Link>
          . Include the email address you used on the enquiry so the message can be matched.
        </p>
      </div>
    </section>
  );
}

export function LegalDocument({
  title,
  description,
  sections,
}: {
  title: string;
  description: string;
  sections: LegalSection[];
}) {
  const effectiveDate = siteConfig.legalEffectiveDate
    ? formatLegalDate(siteConfig.legalEffectiveDate)
    : "";
  const toc = [...sections.map((section) => ({ id: section.id, title: section.title })), { id: "contact-information", title: "Contact Information" }];

  const tocList = (
    <ol className="space-y-2 text-sm leading-6">
      {toc.map((item) => (
        <li key={item.id}>
          <a href={`#${item.id}`} className="text-charcoal hover:text-gold-ink">
            {item.title}
          </a>
        </li>
      ))}
    </ol>
  );

  return (
    <>
      <section className="bg-ink text-white">
        <Container className="py-14 md:py-20">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.18em] text-white/60">
              <li>
                <Link href="/" className="hover:text-gold">Home</Link>
              </li>
              <li aria-hidden="true" className="text-gold">/</li>
              <li aria-current="page" className="text-white">{title}</li>
            </ol>
          </nav>
          <p className="mt-6 text-[11px] font-medium uppercase tracking-[0.32em] text-gold">Legal</p>
          <h1 className="mt-3 max-w-3xl font-serif text-5xl leading-[0.95] md:text-6xl">{title}</h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-white/75">{description}</p>
          {effectiveDate ? <p className="mt-4 text-sm text-gold">Effective {effectiveDate}</p> : null}
        </Container>
      </section>

      <section className="bg-white py-12 md:py-16">
        <Container className="grid gap-10 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-14">
          <nav aria-label="On this page" className="lg:sticky lg:top-28 lg:max-h-[calc(100vh-8rem)] lg:self-start lg:overflow-y-auto">
            <details className="rounded-2xl border border-line bg-ivory p-4 lg:hidden">
              <summary className="cursor-pointer font-serif text-xl text-ink">On this page</summary>
              <div className="mt-4">{tocList}</div>
            </details>
            <div className="hidden lg:block">
              <p className="font-serif text-xl text-ink">On this page</p>
              <div className="mt-3 h-px w-10 bg-gold" />
              <div className="mt-4">{tocList}</div>
            </div>
          </nav>

          <article className="max-w-3xl space-y-12">
            {sections.map((section) => (
              <section key={section.id} id={section.id} className="scroll-mt-28" aria-labelledby={`${section.id}-heading`}>
                <h2 id={`${section.id}-heading`} className="font-serif text-3xl text-ink md:text-4xl">
                  {section.title}
                </h2>
                <div className="mt-3 h-px w-16 bg-gold" />
                <div className="mt-5 space-y-4 text-base leading-8 text-charcoal">
                  {section.blocks.map((block, index) =>
                    block.type === "list" ? (
                      <ul key={index} className="list-disc space-y-2 pl-5">
                        {block.items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    ) : (
                      <p key={index}>{block.text}</p>
                    ),
                  )}
                </div>
              </section>
            ))}
            <ContactSection />
          </article>
        </Container>
      </section>
    </>
  );
}
