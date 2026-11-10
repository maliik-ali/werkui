"use client";
import { useState } from "react";
import { Check } from "lucide-react";
import { money } from "@/lib/format";
import { PLATFORM_LABEL, type Plan } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { buttonClass } from "./Button";

export function PlanCards({ plans }: { plans: Plan[] }) {
  const [billing, setBilling] = useState<"yearly" | "lifetime">("yearly");
  return (
    <div>
      <Tabs value={billing} onValueChange={(v) => setBilling(v as "yearly" | "lifetime")} className="mb-10 items-center">
        <TabsList aria-label="Billing" className="h-auto rounded-[18px] border bg-card p-1 group-data-[orientation=horizontal]/tabs:h-auto">
          <TabsTrigger value="yearly" className="min-h-11 rounded-[14px] px-6 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Yearly</TabsTrigger>
          <TabsTrigger value="lifetime" className="min-h-11 rounded-[14px] px-6 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Lifetime</TabsTrigger>
        </TabsList>
      </Tabs>
      <ul className="grid gap-5 lg:grid-cols-3">
        {plans.map((p) => {
          const cents = billing === "yearly" ? p.yearlyCents : p.lifetimeCents;
          const url = billing === "yearly" ? p.yearlyPaymentUrl : p.lifetimePaymentUrl;
          const live = cents !== null && url;
          return (
            <li key={p.slug}>
              <Card className={`spot relative h-full gap-0 overflow-visible rounded-[20px] p-7 ${p.isFeatured ? "border-fg shadow-glow lg:-translate-y-3" : ""}`}>
              {p.isFeatured && <Badge variant="secondary" className="absolute -top-3 left-7 rounded-full px-3 py-1 font-semibold">Best value</Badge>}
              <h3 className="text-xl font-semibold">{p.name}</h3>
              <p className="mt-2 min-h-12 text-muted-foreground">{p.blurb}</p>
              <p className="mt-6 flex items-baseline gap-2">
                {cents !== null ? (
                  <>
                    <span className="text-5xl font-semibold tracking-tight">{money(cents, p.currency)}</span>
                    <span className="text-muted-foreground">{billing === "yearly" ? "/ year" : "once"}</span>
                  </>
                ) : (
                  <span className="text-3xl font-semibold tracking-tight">Early access</span>
                )}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">{p.platforms.map((x) => PLATFORM_LABEL[x]).join(" + ")}</p>
              <a href={`/go/plan-${p.slug}?billing=${billing}`} className={buttonClass(p.isFeatured ? "primary" : "secondary", "lg", "mt-7 w-full")}>
                {live ? `Get ${p.name}` : "Join the early list"}
              </a>
              <ul className="mt-7 space-y-3 border-t border-line pt-6">
                {p.perks.map((perk) => (
                  <li key={perk} className="flex gap-3 text-sm">
                    <Check aria-hidden="true" size={18} className="mt-0.5 shrink-0 text-link" />
                    {perk}
                  </li>
                ))}
              </ul>
            </Card>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
