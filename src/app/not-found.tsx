import Link from "next/link";
import { Container } from "@/components/layout/container";

export default function NotFound() {
  return (
    <Container className="py-24">
      <h1 className="font-serif text-5xl">This page is not on the site</h1>
      <p className="mt-4 max-w-lg text-muted">The address may be mistyped. Use the menu or return home to request a quote.</p>
      <Link href="/" className="mt-6 inline-flex h-11 items-center rounded-full bg-gold px-5 text-sm font-medium text-ink">Go home</Link>
    </Container>
  );
}
