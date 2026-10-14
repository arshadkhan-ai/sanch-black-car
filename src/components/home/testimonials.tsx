"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { Container } from "@/components/layout/container";

const reviews = [
  {
    quote: "Outstanding service! The chauffeur was professional, punctual, and the vehicle was immaculate. Highly recommend SANCH BLACK CAR.",
    role: "Business Traveler",
  },
  {
    quote: "Made our airport transfer seamless and stress-free. The entire experience was first-class from booking to drop-off.",
    role: "Frequent Flyer",
  },
  {
    quote: "We used SANCH BLACK CAR for our wedding day and it was perfect. The service, vehicle, and attention to detail were amazing!",
    role: "Wedding Client",
  },
];

export function Testimonials() {
  const [start, setStart] = useState(0);
  const ordered = reviews.map((_, index) => reviews[(start + index) % reviews.length]);
  const current = reviews[start];

  function shift(direction: number) {
    setStart((value) => (value + direction + reviews.length) % reviews.length);
  }

  return (
    <section className="bg-ivory py-16 md:py-20" aria-labelledby="testimonials-heading">
      <Container>
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-gold-ink">Client Testimonials</p>
            <h2 id="testimonials-heading" className="mt-3 font-serif text-4xl text-ink md:text-5xl">What Our Clients Say</h2>
          </div>
          <div className="flex gap-2">
            <button type="button" onClick={() => shift(-1)} aria-label="Previous reviews" className="inline-flex size-10 items-center justify-center rounded-full border border-line bg-white text-charcoal hover:border-gold hover:text-gold-ink">
              <ChevronLeft className="size-4" aria-hidden />
            </button>
            <button type="button" onClick={() => shift(1)} aria-label="Next reviews" className="inline-flex size-10 items-center justify-center rounded-full border border-line bg-white text-charcoal hover:border-gold hover:text-gold-ink">
              <ChevronRight className="size-4" aria-hidden />
            </button>
          </div>
        </div>

        <div className="mt-8 hidden gap-5 md:grid md:grid-cols-3">
          {ordered.map((review) => (
            <ReviewCard key={review.role} quote={review.quote} role={review.role} />
          ))}
        </div>
        <div className="mt-8 md:hidden">
          <ReviewCard quote={current.quote} role={current.role} />
        </div>
      </Container>
    </section>
  );
}

function ReviewCard({ quote, role }: { quote: string; role: string }) {
  return (
    <figure className="rounded-xl border border-line bg-white p-6 shadow-sm">
      <Quote className="size-8 fill-gold text-gold" aria-hidden />
      <blockquote className="mt-4 text-sm leading-7 text-charcoal">“{quote}”</blockquote>
      <div className="mt-4 flex gap-0.5" aria-label="5 out of 5 stars">
        {Array.from({ length: 5 }, (_, index) => (
          <Star key={index} className="size-3.5 fill-gold text-gold" aria-hidden />
        ))}
      </div>
      <figcaption className="mt-3 text-sm text-muted">{role}</figcaption>
    </figure>
  );
}
