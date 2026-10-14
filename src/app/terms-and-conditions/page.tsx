import { LegalDocument } from "@/components/legal/legal-document";
import { termsSections } from "@/content/legal";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Terms & Conditions",
  "Terms for using the SANCH BLACK CAR website and for chauffeur reservations. A form submission is a quote request, not a confirmed booking.",
  "/terms-and-conditions",
);

export default function Page() {
  return (
    <LegalDocument
      title="Terms & Conditions"
      description="These terms explain how a quote becomes a reservation, and how pricing, changes, and website use are handled. Commercial details for a ride are the quotation you accept."
      sections={termsSections}
    />
  );
}
