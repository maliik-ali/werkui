"use client";

import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PricingPlan {
  name: string;
  description?: string;
  /** Price per month. Use a string such as "Custom" for non-numeric plans. */
  price: { monthly: number | string; yearly: number | string };
  features: string[];
  cta: { label: string; href: string };
  /** Highlights the plan with a border and a badge. */
  featured?: boolean;
  /** Badge text on a featured plan. */
  badge?: string;
}

export interface PricingCardsProps extends React.ComponentProps<"div"> {
  plans: PricingPlan[];
  currency?: string;
  defaultBilling?: "monthly" | "yearly";
  /** Small label next to the yearly option, e.g. "Save 20%". */
  yearlyLabel?: string;
}

export function PricingCards({
  plans,
  currency = "$",
  defaultBilling = "monthly",
  yearlyLabel,
  className,
  ...props
}: PricingCardsProps) {
  const [billing, setBilling] = React.useState(defaultBilling);

  return (
    <div className={cn("w-full", className)} {...props}>
      <div className="flex justify-center">
        <div role="group" aria-label="Billing period" className="inline-flex rounded-full border bg-card p-1 text-sm">
          {(["monthly", "yearly"] as const).map((value) => (
            <button
              key={value}
              type="button"
              aria-pressed={billing === value}
              onClick={() => setBilling(value)}
              className={cn(
                "flex items-center gap-2 rounded-full px-4 py-1.5 font-medium capitalize transition-colors focus-visible:outline-2 focus-visible:outline-ring",
                billing === value ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground",
              )}
            >
              {value}
              {value === "yearly" && yearlyLabel && (
                <span
                  className={cn(
                    "rounded-full px-1.5 py-0.5 text-[10px] font-semibold",
                    billing === "yearly" ? "bg-primary-foreground/20" : "bg-accent text-accent-foreground",
                  )}
                >
                  {yearlyLabel}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 grid grid-cols-[repeat(auto-fit,minmax(13rem,1fr))] gap-4">
        {plans.map((plan) => {
          const price = plan.price[billing];
          return (
            <div
              key={plan.name}
              className={cn(
                "relative flex flex-col rounded-2xl border bg-card p-6",
                plan.featured && "border-primary shadow-lg ring-1 ring-primary/20",
              )}
            >
              {plan.featured && plan.badge && (
                <span className="absolute -top-3 left-6 rounded-full bg-primary px-3 py-0.5 text-xs font-medium text-primary-foreground">
                  {plan.badge}
                </span>
              )}
              <h3 className="text-lg font-semibold">{plan.name}</h3>
              {plan.description && <p className="mt-1 text-sm text-muted-foreground">{plan.description}</p>}
              <p className="mt-6 flex items-baseline gap-1">
                <span className="text-4xl font-semibold tracking-tight">
                  {typeof price === "number" ? `${currency}${price}` : price}
                </span>
                {typeof price === "number" && <span className="text-sm text-muted-foreground">/month</span>}
              </p>
              <p className="mt-1 h-4 text-xs text-muted-foreground">
                {typeof price === "number" && billing === "yearly" ? "Billed yearly" : ""}
              </p>
              <a
                href={plan.cta.href}
                className={cn(
                  "mt-6 inline-flex h-10 items-center justify-center rounded-full px-5 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
                  plan.featured
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "border bg-background hover:bg-accent",
                )}
              >
                {plan.cta.label}
              </a>
              <ul className="mt-6 flex flex-col gap-2.5 text-sm">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
