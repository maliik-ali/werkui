import type { MetadataRoute } from "next";
import { getProducts, getSellers } from "@/lib/data";
import { SITE_URL } from "@/lib/format";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, sellers] = await Promise.all([getProducts(), getSellers()]);
  const pages = ["", "/templates", "/free", "/pricing", "/hire", "/support", "/license", "/terms", "/privacy", "/refunds"];
  return [
    ...pages.map((p) => ({ url: `${SITE_URL}${p}`, changeFrequency: "weekly" as const, priority: p === "" ? 1 : 0.7 })),
    ...products.map((p) => ({ url: `${SITE_URL}/templates/${p.slug}`, changeFrequency: "weekly" as const, priority: 0.8 })),
    ...sellers.map((s) => ({ url: `${SITE_URL}/creators/${s.handle}`, changeFrequency: "monthly" as const, priority: 0.5 })),
  ];
}
