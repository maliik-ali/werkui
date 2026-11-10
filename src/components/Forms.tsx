"use client";
import { useActionState } from "react";
import { submitLead, subscribe, type FormState } from "@/lib/actions";
import { Button } from "./Button";

const field =
  "h-12 w-full rounded-md border border-line-input bg-surface px-4 text-base text-fg placeholder:text-muted/70 transition-colors focus:border-fg focus:outline-none focus-visible:outline-2 focus-visible:outline-fg";

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
    <form action={action} className="relative flex flex-col gap-2 [.on-ink_&_input]:border-white/20 [.on-ink_&_input]:bg-white/10 [.on-ink_&_input]:text-on-ink [.on-ink_&_button]:bg-accent [.on-ink_&_button]:text-on-accent [.on-ink_&_input]:placeholder:text-ink-muted">
      <Honeypot />
      <input type="hidden" name="source" value={source} />
      <label htmlFor={`nl-${source}`} className="text-sm font-medium">
        Get new templates by email
      </label>
      <div className="flex gap-2">
        <input id={`nl-${source}`} name="email" type="email" required autoComplete="email" placeholder="you@studio.com" className={field} />
        <Button type="submit" disabled={pending} className="h-12 shrink-0">
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
      <div role="status" className="card p-8 text-center">
        <p className="text-xl font-semibold">Message sent</p>
        <p className="mt-2 text-muted">{state.message}</p>
      </div>
    );
  }
  return (
    <form action={action} className="card relative grid gap-5 p-6 md:p-8">
      <Honeypot />
      {productSlug && <input type="hidden" name="product_slug" value={productSlug} />}
      <fieldset>
        <legend className="mb-2 text-sm font-medium">Who do you need?</legend>
        <div className="grid gap-2 sm:grid-cols-3">
          {[
            ["rayvens", "A team (Rayvens)"],
            ["malikali", "One senior designer"],
            ["unsure", "Not sure yet"],
          ].map(([v, label]) => (
            <label key={v} className="flex min-h-12 cursor-pointer items-center gap-3 rounded-md border border-line-input px-4 text-sm has-checked:border-fg has-checked:bg-accent/40">
              <input type="radio" name="path" value={v} defaultChecked={v === defaultPath} className="accent-(--color-text)" />
              {label}
            </label>
          ))}
        </div>
      </fieldset>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="grid gap-2">
          <label htmlFor="lead-name" className="text-sm font-medium">Name</label>
          <input id="lead-name" name="name" required autoComplete="name" className={field} />
        </div>
        <div className="grid gap-2">
          <label htmlFor="lead-email" className="text-sm font-medium">Email</label>
          <input id="lead-email" name="email" type="email" required autoComplete="email" className={field} />
        </div>
      </div>
      <div className="grid gap-2">
        <label htmlFor="lead-budget" className="text-sm font-medium">Budget <span className="font-normal text-muted">(optional)</span></label>
        <select id="lead-budget" name="budget" className={field} defaultValue="">
          <option value="">Choose a range</option>
          <option>Under $500</option>
          <option>$500 to $2,000</option>
          <option>$2,000 to $10,000</option>
          <option>$10,000+</option>
        </select>
      </div>
      <div className="grid gap-2">
        <label htmlFor="lead-message" className="text-sm font-medium">What do you need?</label>
        <textarea id="lead-message" name="message" required minLength={10} rows={5} defaultValue={topic ?? ""} aria-describedby="lead-help" className={`${field} h-auto py-3`} />
        <p id="lead-help" className="text-sm text-muted">Which template, what should change, and when you need it.</p>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Status state={state} />
        <Button type="submit" size="lg" disabled={pending}>
          {pending ? "Sending…" : "Send request"}
        </Button>
      </div>
    </form>
  );
}
