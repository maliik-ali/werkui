"use client";
import { useActionState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { submitLead, subscribe, type FormState } from "@/lib/actions";
import { Button } from "./Button";

const field = "h-12 rounded-md bg-card px-4 text-base md:text-base";

function Status({ state }: { state: FormState }) {
  return (
    <p role="status" aria-live="polite" className={`min-h-5 text-sm ${state ? (state.ok ? "text-success" : "text-danger") : ""}`}>
      {state?.message}
    </p>
  );
}

function Honeypot() {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px]">
      <label>
        Company
        <input name="company" tabIndex={-1} autoComplete="off" />
      </label>
    </div>
  );
}

export function NewsletterForm({ source }: { source: string }) {
  const [state, action, pending] = useActionState(subscribe, null);
  return (
    <form action={action} className="relative flex flex-col gap-2 [.on-ink_&_input]:border-white/20 [.on-ink_&_input]:bg-white/10 [.on-ink_&_input]:text-on-ink [.on-ink_&_input]:placeholder:text-ink-muted [.on-ink_&_[role=status]]:text-accent-soft">
      <Honeypot />
      <input type="hidden" name="source" value={source} />
      <Label htmlFor={`nl-${source}`}>Get new templates by email</Label>
      <div className="flex gap-2">
        <Input id={`nl-${source}`} name="email" type="email" required autoComplete="email" placeholder="you@studio.com" className={field} />
        <Button type="submit" variant="secondary" disabled={pending} className="h-12 shrink-0">
          {pending ? "Joining…" : "Join"}
        </Button>
      </div>
      <Status state={state} />
    </form>
  );
}

export function LeadForm({ defaultPath = "unsure", productSlug, topic }: { defaultPath?: "rayvens" | "malikali" | "unsure"; productSlug?: string; topic?: string }) {
  const [state, action, pending] = useActionState(submitLead, null);
  if (state?.ok) {
    return (
      <Card role="status" className="rounded-[20px] p-8 text-center">
        <p className="text-xl font-medium">Message sent</p>
        <p className="text-muted-foreground">{state.message}</p>
      </Card>
    );
  }
  return (
    <Card className="relative rounded-[20px] p-6 md:p-8">
      <form action={action} className="grid gap-5">
        <Honeypot />
        {productSlug && <input type="hidden" name="product_slug" value={productSlug} />}
        <fieldset>
          <legend className="mb-2 text-sm font-medium">Who do you need?</legend>
          <RadioGroup name="path" defaultValue={defaultPath} className="grid gap-2 sm:grid-cols-3">
            {[
              ["rayvens", "A team (Rayvens)"],
              ["malikali", "One senior designer"],
              ["unsure", "Not sure yet"],
            ].map(([v, label]) => (
              <Label key={v} htmlFor={`path-${v}`} className="flex min-h-12 cursor-pointer items-center gap-3 rounded-md border border-input px-4 font-normal has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-secondary/10">
                <RadioGroupItem id={`path-${v}`} value={v} />
                {label}
              </Label>
            ))}
          </RadioGroup>
        </fieldset>
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor="lead-name">Name</Label>
            <Input id="lead-name" name="name" required autoComplete="name" className={field} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="lead-email">Email</Label>
            <Input id="lead-email" name="email" type="email" required autoComplete="email" className={field} />
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="lead-budget">
            Budget <span className="font-normal text-muted-foreground">(optional)</span>
          </Label>
          <div className="[&>div]:w-full">
            <NativeSelect id="lead-budget" name="budget" defaultValue="" className={field + " py-0"}>
              <NativeSelectOption value="">Choose a range</NativeSelectOption>
              <NativeSelectOption>Under $500</NativeSelectOption>
              <NativeSelectOption>$500 to $2,000</NativeSelectOption>
              <NativeSelectOption>$2,000 to $10,000</NativeSelectOption>
              <NativeSelectOption>$10,000+</NativeSelectOption>
            </NativeSelect>
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="lead-message">What do you need?</Label>
          <Textarea id="lead-message" name="message" required minLength={10} rows={5} defaultValue={topic ?? ""} aria-describedby="lead-help" className="rounded-md bg-card px-4 py-3 text-base md:text-base" />
          <p id="lead-help" className="text-sm text-muted-foreground">Which template, what should change, and when you need it.</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Status state={state} />
          <Button type="submit" size="lg" disabled={pending}>
            {pending ? "Sending…" : "Send request"}
          </Button>
        </div>
      </form>
    </Card>
  );
}
