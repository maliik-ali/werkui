import type { ReactNode } from "react";

export function SectionHead({ eyebrow, title, lead, action }: { eyebrow?: string; title: ReactNode; lead?: ReactNode; action?: ReactNode }) {
  return (
    <div className="reveal mb-10 flex flex-col gap-4 md:mb-14 md:flex-row md:items-end md:justify-between">
      <div className="max-w-2xl">
        {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
        <h2 className="text-3xl leading-[1.08] md:text-[44px]">{title}</h2>
        {lead && <p className="mt-4 text-lg leading-relaxed text-muted">{lead}</p>}
      </div>
      {action}
    </div>
  );
}

export function Faq({ items }: { items: { q: string; a: ReactNode }[] }) {
  return (
    <div className="divide-y divide-line rounded-[20px] border border-line bg-surface">
      {items.map((it) => (
        <details key={it.q} className="group px-5 md:px-7">
          <summary className="flex min-h-16 items-center justify-between gap-6 py-4 text-left text-base font-medium md:text-lg">
            {it.q}
            <span aria-hidden="true" className="chev grid size-8 shrink-0 place-items-center rounded-full border border-line text-muted transition-transform duration-200">
              +
            </span>
          </summary>
          <div className="pb-6 pr-10 leading-relaxed text-muted">{it.a}</div>
        </details>
      ))}
    </div>
  );
}
