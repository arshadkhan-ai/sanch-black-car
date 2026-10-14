import { LegalDocument } from "@/components/legal/legal-document";
import { privacySections } from "@/content/legal";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Privacy Policy",
  "How SANCH BLACK CAR collects, uses, and shares information submitted through quote and contact enquiries on this website.",
  "/privacy-policy",
);

export default function Page() {
  return (
    <LegalDocument
      title="Privacy Policy"
      description="How enquiry details sent through this website are used to reply, prepare a quotation, and arrange a chauffeur booking you accept."
      sections={privacySections}
    />
  );
}
