import Link from "next/link";
import { Container } from "@/components/layout/container";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Enquiry sent",
  "Your SANCH BLACK CAR enquiry was delivered. This is not a confirmed reservation.",
  "/thank-you",
);

export default function Page() {
  return (
    <Container className="py-20">
      <p className="text-[11px] uppercase tracking-[0.28em] text-gold-ink">Enquiry</p>
      <h1 className="mt-3 max-w-2xl font-serif text-5xl">Your message was delivered</h1>
      <div className="mt-6 max-w-2xl space-y-4 leading-8 text-muted">
        <p>The form was accepted by the email service, so the enquiry is in the business inbox. That is not a confirmed ride, a price, or a vehicle assignment.</p>
        <p>Watch the email address you entered for a reply. If you need to add a stop or a flight number, send another message rather than assuming the first one can be edited here.</p>
      </div>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/" className="inline-flex h-11 items-center rounded-full bg-gold px-5 text-sm font-medium text-ink">Back home</Link>
        <Link href="/our-fleet" className="inline-flex h-11 items-center rounded-full border border-gold-ink/30 px-5 text-sm">View the fleet</Link>
      </div>
    </Container>
  );
}
