import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { HashScroll } from "@/components/layout/hash-scroll";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { ScrollTop } from "@/components/layout/scroll-top";
import { FloatingCallButton } from "@/components/widgets/FloatingCallButton";
import { WhatsAppChatWidget } from "@/components/widgets/WhatsAppChatWidget";
import { JsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/config/site";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "SANCH BLACK CAR | Luxury Chauffeur Transportation",
    template: "%s | SANCH BLACK CAR",
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    title: "SANCH BLACK CAR | Luxury Chauffeur Transportation",
    description: siteConfig.description,
    images: [{ url: "/images/sedan.jpg", alt: "Black luxury sedan" }],
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${serif.variable} ${sans.variable} h-full`}>
      <body className="min-h-full bg-ivory font-sans text-charcoal antialiased">
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-gold focus:px-4 focus:py-2 focus:text-ink">
          Skip to content
        </a>
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Organization",
            name: siteConfig.name,
            url: siteConfig.url,
            description: siteConfig.description,
            telephone: siteConfig.phone,
            email: siteConfig.email,
            address: {
              "@type": "PostalAddress",
              streetAddress: siteConfig.address,
              addressCountry: "US",
            },
          }}
        />
        <HashScroll />
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <ScrollTop />
        <FloatingCallButton />
        <WhatsAppChatWidget />
      </body>
    </html>
  );
}
