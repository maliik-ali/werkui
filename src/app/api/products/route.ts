import { getProducts } from "@/lib/data";
import { SITE_URL } from "@/lib/format";

/**
 * Public, read-only product feed for partner sites (malikali.de, rayvens.com).
 * Append ?ref=malikali or ?ref=rayvens to `url` when linking so sales can be attributed.
 */
export async function GET() {
  const products = await getProducts();
  const body = products.map((p) => ({
    slug: p.slug,
    name: p.name,
    tagline: p.tagline,
    category: p.category,
    kind: p.kind,
    platforms: p.variants.map((v) => v.platform),
    price_cents: p.priceCents,
    currency: p.currency,
    is_free: p.priceCents === 0,
    is_new: p.isNew,
    cover_url: p.coverUrl,
    url: `${SITE_URL}/templates/${p.slug}`,
  }));
  return Response.json(
    { products: body },
    { headers: { "Access-Control-Allow-Origin": "*", "Cache-Control": "public, s-maxage=300, stale-while-revalidate=3600" } },
  );
}
