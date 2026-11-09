"use client";
import { useState } from "react";
import { Check } from "lucide-react";
import { money } from "@/lib/format";
import { PLATFORM_LABEL, type Plan } from "@/lib/types";
import { buttonClass } from "./Button";

export function PlanCards({ plans }: { plans: Plan[] }) {
  const [billing, setBilling] = useState<"yearly" | "lifetime">("yearly");
  return (
    <div>
      <div role="radiogroup" aria-label="Billing" className="mx-auto mb-10 flex w-fit rounded-full border border-line bg-surface p-1">
        {(["yearly", "lifetime"] as const).map((b) => (
          <button
            key={b}
            type="button"
            role="radio"
            aria-checked={billing === b}
            onClick={() => setBilling(b)}
            className={`min-h-11 cursor-pointer rounded-full px-6 text-sm font-medium transition-colors ${billing === b ? "bg-fg text-bg" : "text-muted hover:text-fg"}`}
          >
            {b === "yearly" ? "Yearly" : "Lifetime"}
          </button>
        ))}
      </div>
      <ul className="grid gap-5 lg:grid-cols-3">
        {plans.map((p) => {
          const cents = billing === "yearly" ? p.yearlyCents : p.lifetimeCents;
          const url = billing === "yearly" ? p.yearlyPaymentUrl : p.lifetimePaymentUrl;
          const live = cents !== null && url;
          return (
            <li key={p.slug} className={`card spot relative flex flex-col p-7 ${p.isFeatured ? "border-accent/50 shadow-glow lg:-translate-y-3" : ""}`}>
              {p.isFeatured && <span className="absolute -top-3 left-7 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-on-accent">Best value</span>}
              <h3 className="text-xl font-semibold">{p.name}</h3>
              <p className="mt-2 min-h-12 text-muted">{p.blurb}</p>
              <p className="mt-6 flex items-baseline gap-2">
                {cents !== null ? (
                  <>
                    <span className="text-5xl font-semibold tracking-tight">{money(cents, p.currency)}</span>
                    <span className="text-muted">{billing === "yearly" ? "/ year" : "once"}</span>
                  </>
                ) : (
                  <span className="text-3xl font-semibold tracking-tight">Early access</span>
                )}
              </p>
              <p className="mt-2 text-sm text-muted">{p.platforms.map((x) => PLATFORM_LABEL[x]).join(" + ")}</p>
              <a href={`/go/plan-${p.slug}?billing=${billing}`} className={buttonClass(p.isFeatured ? "primary" : "secondary", "lg", "mt-7 w-full")}>
                {live ? `Get ${p.name}` : "Join the early list"}
              </a>
              <ul className="mt-7 space-y-3 border-t border-line pt-6">
                {p.perks.map((perk) => (
                  <li key={perk} className="flex gap-3 text-sm">
                    <Check aria-hidden="true" size={18} className="mt-0.5 shrink-0 text-accent" />
                    {perk}
                  </li>
                ))}
              </ul>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
