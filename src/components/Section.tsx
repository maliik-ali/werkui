import type { ReactNode } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export function SectionHead({ eyebrow, title, lead, action }: { eyebrow?: string; title: ReactNode; lead?: ReactNode; action?: ReactNode }) {
  return (
    <div className="reveal mb-10 flex flex-col gap-4 md:mb-14 md:flex-row md:items-end md:justify-between">
      <div className="max-w-2xl">
        {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
        <h2 className="text-3xl leading-[1.08] md:text-[44px]">{title}</h2>
        {lead && <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{lead}</p>}
      </div>
      {action}
    </div>
  );
}

export function Faq({ items }: { items: { q: string; a: ReactNode }[] }) {
  return (
    <Accordion type="single" collapsible className="rounded-[20px] border bg-card px-5 md:px-7">
      {items.map((it, i) => (
        <AccordionItem key={it.q} value={`item-${i}`}>
          <AccordionTrigger className="min-h-16 items-center py-4 text-base hover:no-underline md:text-lg">{it.q}</AccordionTrigger>
          <AccordionContent className="pr-10 text-base leading-relaxed text-muted-foreground">{it.a}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
