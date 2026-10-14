"use client";

"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { Plus } from "lucide-react";

export function FaqAccordion({ items }: { items: { q: string; a: string }[] }) {
  return (
    <Accordion.Root type="single" collapsible className="divide-y divide-black/10 border-y border-black/10">
      {items.map((item) => (
        <Accordion.Item key={item.q} value={item.q}>
          <Accordion.Header>
            <Accordion.Trigger className="group flex w-full items-center justify-between gap-4 py-4 text-left text-[15px] font-medium text-charcoal">
              {item.q}
              <Plus className="size-4 shrink-0 text-gold-ink transition-transform group-data-[state=open]:rotate-45" aria-hidden />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content className="pb-4 pr-8 text-sm leading-7 text-muted">
            {item.a}
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}
