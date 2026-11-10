import { cacheLife, cacheTag } from "next/cache";
import { media } from "@/data/media";
import { plans as seedPlans, products as seedProducts, sellers as seedSellers } from "@/data/seed";
import { supabase } from "./supabase";
import type { Plan, Product, Seller } from "./types";

/* eslint-disable @typescript-eslint/no-explicit-any */

function toProduct(r: any): Product {
  // Images are linked straight from the CDN list in src/data/media.ts unless the database row sets its own.
  const m = media[r.slug];
  const dbImages: string[] = [...(r.images ?? [])].sort((a: any, b: any) => a.position - b.position).map((i: any) => i.url);
  return {
    slug: r.slug,
    sellerHandle: r.seller?.handle ?? "malik-ali",
    kind: r.kind,
    category: r.category?.name ?? "Other",
    categorySlug: r.category?.slug ?? "other",
    name: r.name,
    tagline: r.tagline,
    description: r.description,
    priceCents: r.price_cents,
    compareAtCents: r.compare_at_cents,
    currency: r.currency,
    paymentUrl: r.payment_url,
    coverHue: r.cover_hue,
    coverUrl: r.cover_url ?? m?.images[0] ?? null,
    images: dbImages.length ? dbImages : (m?.images ?? []),
    layout: r.stats?.layout ?? "dashboard",
    screensCount: r.screens_count,
    features: r.features ?? [],
    builtFor: r.built_for ?? [],
    included: r.included ?? [],
    isNew: r.is_new,
    isFeatured: r.is_featured,
    publishedAt: r.published_at ?? r.created_at,
    variants: (r.variants ?? []).map((v: any) => ({
      platform: v.platform,
      previewUrl: v.preview_url,
      freeAccessUrl: v.free_access_url,
    })),
  };
}

export async function getProducts(): Promise<Product[]> {
  "use cache";
  cacheLife("minutes");
  cacheTag("catalog");
  const db = supabase();
  if (db) {
    const { data, error } = await db
      .from("wk_products")
      .select("*, seller:wk_sellers(handle), category:wk_categories(name, slug), variants:wk_product_variants(platform, preview_url, free_access_url), images:wk_product_images(url, position)")
      .eq("status", "published")
      .order("published_at", { ascending: false });
    if (!error && data && data.length) return data.map(toProduct);
    if (error) console.error("[data] products:", error.message);
  }
  return [...seedProducts].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export async function getProduct(slug: string): Promise<Product | null> {
  const all = await getProducts();
  return all.find((p) => p.slug === slug) ?? null;
}

export async function getSellers(): Promise<Seller[]> {
  "use cache";
  cacheLife("minutes");
  cacheTag("catalog");
  const db = supabase();
  if (db) {
    const { data, error } = await db.from("wk_sellers").select("*").order("created_at");
    if (!error && data && data.length)
      return data.map((r: any) => ({
        handle: r.handle,
        displayName: r.display_name,
        headline: r.headline ?? "",
        bio: r.bio ?? "",
        websiteUrl: r.website_url ?? "",
        links: r.links ?? {},
        isVerified: r.is_verified,
        hue: r.hue ?? 258,
      }));
    if (error) console.error("[data] sellers:", error.message);
  }
  return seedSellers;
}

export async function getSeller(handle: string): Promise<Seller | null> {
  const all = await getSellers();
  return all.find((s) => s.handle === handle) ?? null;
}

export async function getPlans(): Promise<Plan[]> {
  "use cache";
  cacheLife("minutes");
  cacheTag("catalog");
  const db = supabase();
  if (db) {
    const { data, error } = await db.from("wk_plans").select("*").eq("status", "published").order("position");
    if (!error && data && data.length)
      return data.map((r: any) => ({
        slug: r.slug,
        name: r.name,
        blurb: r.blurb,
        platforms: r.platforms ?? [],
        yearlyCents: r.yearly_cents,
        lifetimeCents: r.lifetime_cents,
        currency: r.currency,
        yearlyPaymentUrl: r.yearly_payment_url,
        lifetimePaymentUrl: r.lifetime_payment_url,
        perks: r.perks ?? [],
        isFeatured: r.is_featured,
      }));
    if (error) console.error("[data] plans:", error.message);
  }
  return seedPlans;
}
