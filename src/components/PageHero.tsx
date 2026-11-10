import type { ReactNode } from "react";
import { Backdrop } from "./Backdrop";

export function PageHero({ eyebrow, title, lead, children }: { eyebrow?: string; title: ReactNode; lead?: ReactNode; children?: ReactNode }) {
  return (
    <section className="relative isolate overflow-hidden border-b border-line">
      <Backdrop grid={false} className="opacity-70" />
      <div className="container-x relative py-16 md:py-24">
        {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
        <h1 className="max-w-3xl text-4xl font-semibold leading-[1.05] md:text-6xl">{title}</h1>
        {lead && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">{lead}</p>}
        {children}
      </div>
    </section>
  );
}
