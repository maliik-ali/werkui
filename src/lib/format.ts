import type { Product } from "./types";

export function money(cents: number, currency = "USD") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: cents % 100 === 0 ? 0 : 2,
  }).format(cents / 100);
}

export function priceLabel(p: Pick<Product, "priceCents" | "currency">) {
  if (p.priceCents === null) return "Coming soon";
  if (p.priceCents === 0) return "Free";
  return money(p.priceCents, p.currency);
}

export const isFree = (p: Pick<Product, "priceCents">) => p.priceCents === 0;
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://werkui.com";
