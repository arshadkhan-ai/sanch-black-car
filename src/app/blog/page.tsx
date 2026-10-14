import { BlogBrowser } from "@/components/blog/blog-browser";
import { Container } from "@/components/layout/container";
import { ContactForm } from "@/components/forms/contact-form";
import { Eyebrow } from "@/components/sections/blocks";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Journal",
  "Notes from SANCH BLACK CAR on airport transfers, hourly chauffeur hire, weddings, and choosing a vehicle category.",
  "/blog",
);

export default function Page() {
  return (
    <>
      <section className="relative bg-ink py-20 text-white">
        <div className="absolute inset-0 bg-[url('/images/skyline.jpg')] bg-cover bg-center opacity-40" />
        <Container className="relative">
          <Eyebrow light>Our journal</Eyebrow>
          <h1 className="mt-3 font-serif text-5xl md:text-6xl">Insights for smarter travel</h1>
          <p className="mt-4 max-w-xl text-white/75">Practical notes on briefing a chauffeur. These are editorial articles, not customer reviews.</p>
        </Container>
      </section>
      <section className="bg-ivory py-14">
        <Container>
          <BlogBrowser />
        </Container>
      </section>
      <section className="bg-charcoal py-14 text-white">
        <Container className="grid items-center gap-8 lg:grid-cols-2">
          <div>
            <h2 className="font-serif text-4xl">Ask for travel notes</h2>
            <p className="mt-3 text-sm leading-7 text-white/70">
              Use the contact form with the service set to Newsletter. It is delivered only when email is connected, and it does not sign you up anywhere else.
            </p>
          </div>
          <div className="rounded-2xl bg-white p-5 text-charcoal">
            <ContactForm defaultService="Newsletter" />
          </div>
        </Container>
      </section>
    </>
  );
}
