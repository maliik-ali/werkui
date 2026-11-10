"use client";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { CreditCard, Eye, Search, Wand2, type LucideIcon } from "lucide-react";

type Step = { title: string; short: string; long: string; points: string[]; icon: LucideIcon; mock: { label: string; chips: string[] } };

const steps: Step[] = [
  {
    title: "Browse",
    short: "Find a kit that fits the product you are building.",
    long: "Filter by platform, category or price. Dashboards, websites, design systems and UX templates sit in one catalog.",
    points: ["Filter by Figma, Framer or Webflow", "Free and premium side by side", "Every product shows its real screens"],
    icon: Search,
    mock: { label: "Catalog", chips: ["Dashboards", "Websites", "Free"] },
  },
  {
    title: "Preview",
    short: "Open the real file before you pay.",
    long: "Each product links to its live file, so you can click through pages, components and variables first.",
    points: ["Open the file in Figma", "Check components and layers", "See every included screen"],
    icon: Eye,
    mock: { label: "Preview in Figma", chips: ["Pages", "Components", "Variables"] },
  },
  {
    title: "Buy",
    short: "Pay once and get the file right away.",
    long: "Checkout runs on Stripe. The link to duplicate the file appears straight after payment and in your receipt.",
    points: ["Secure checkout with Stripe", "One-time payment", "Use on unlimited projects"],
    icon: CreditCard,
    mock: { label: "Order", chips: ["Paid", "File link", "Receipt"] },
  },
  {
    title: "Customise",
    short: "Make it yours, or have us do it.",
    long: "Swap colours, type and content yourself, or hire Rayvens or Malik Ali to tailor the template for you.",
    points: ["Built from components", "Rayvens for a full team", "Malik Ali for one senior designer"],
    icon: Wand2,
    mock: { label: "Your brand", chips: ["Colours", "Type", "Content"] },
  },
];

export function HowItWorks() {
  const [active, setActive] = useState(0);
  return (
    <ol className="flex flex-col gap-4 lg:h-[520px] lg:flex-row">
      {steps.map((s, i) => {
        const open = i === active;
        return (
          <li
            key={s.title}
            onMouseEnter={() => setActive(i)}
            className={`relative overflow-hidden rounded-[28px] border border-line bg-surface transition-[flex-grow] duration-500 ease-out-soft lg:min-w-0 lg:basis-0 ${open ? "lg:grow-[2.4]" : "lg:grow"}`}
          >
            <button
              type="button"
              aria-expanded={open}
              onClick={() => setActive(i)}
              onFocus={() => setActive(i)}
              className="relative z-10 block w-full cursor-pointer p-7 text-left lg:p-8"
            >
              <span className="block text-[28px] font-medium leading-tight tracking-tight">{s.title}</span>
              <span className={`mt-3 block text-sm leading-relaxed text-muted-foreground ${open ? "lg:hidden" : ""}`}>{s.short}</span>
            </button>
            <div className={`relative z-10 -mt-4 px-7 pb-7 lg:px-8 ${open ? "" : "lg:hidden"}`}>
              <p className="hidden max-w-sm text-sm leading-relaxed text-muted-foreground lg:block">{s.long}</p>
              <ul className="mt-5 space-y-3">
                {s.points.map((p, n) => (
                  <li key={p} className="flex items-center gap-3 text-sm">
                    <span aria-hidden="true" className={`grid size-6 shrink-0 place-items-center rounded-full ${["bg-[#dff3c4]", "bg-[#cfe3ff]", "bg-[#c9f1ec]"][n % 3]}`}>
                      <s.icon size={13} />
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
              <div aria-hidden="true" className="mt-7 rounded-[22px] bg-gradient-to-br from-[#bfe0ff] via-[#9fe3d6] to-[#e3f3a6] p-5">
                <Card className="gap-0 rounded-[16px] border-0 p-5 shadow-card">
                  <div className="flex items-center gap-3">
                    <span className="grid size-9 place-items-center rounded-full bg-accent text-on-accent">
                      <s.icon size={16} />
                    </span>
                    <span className="text-sm font-medium">{s.mock.label}</span>
                  </div>
                  <div className="mt-4 flex gap-2 rounded-xl bg-raised p-2">
                    {s.mock.chips.map((c) => (
                      <span key={c} className="flex-1 rounded-lg bg-[#cfe3ff] px-2 py-2 text-center text-xs font-medium">
                        {c}
                      </span>
                    ))}
                  </div>
                </Card>
              </div>
            </div>
            {/* soft arches on the closed cards */}
            <div aria-hidden="true" className={`pointer-events-none absolute inset-x-0 bottom-0 hidden h-1/2 ${open ? "" : "lg:block"}`}>
              <div className="absolute -left-1/3 bottom-0 h-full w-[90%] rounded-t-full bg-gradient-to-b from-[#f3f1ea] to-[#fde9dc] opacity-90" />
              <div className="absolute -right-1/4 bottom-0 h-[85%] w-[80%] rounded-t-full bg-gradient-to-b from-[#eef3e2] to-[#dfe9ff] opacity-90" />
            </div>
          </li>
        );
      })}
    </ol>
  );
}
