import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";
import { getPlans, getProduct } from "@/lib/data";
import { supabase } from "@/lib/supabase";

function safe(url: string | null | undefined) {
  if (!url) return null;
  try {
    const u = new URL(url);
    return u.protocol === "https:" ? u.toString() : null;
  } catch {
    return null;
  }
}

/** Checkout hand-off: logs the click with its referrer tag, then redirects to Stripe (or the free file). */
export async function GET(req: NextRequest, ctx: RouteContext<"/go/[slug]">) {
  const { slug } = await ctx.params;
  const origin = req.nextUrl.origin;
  const jar = await cookies();
  const ref = (req.nextUrl.searchParams.get("ref") ?? jar.get("wk_ref")?.value ?? "").slice(0, 40) || null;

  let target: string | null = null;
  let fallback = `${origin}/support`;
  let productSlug: string | null = null;
  let planSlug: string | null = null;

  if (slug.startsWith("plan-")) {
    planSlug = slug.slice(5);
    const plan = (await getPlans()).find((p) => p.slug === planSlug);
    if (!plan) return NextResponse.redirect(`${origin}/pricing`, 302);
    const lifetime = req.nextUrl.searchParams.get("billing") === "lifetime";
    target = safe(lifetime ? plan.lifetimePaymentUrl : plan.yearlyPaymentUrl);
    fallback = `${origin}/support?plan=${plan.slug}`;
  } else {
    const product = await getProduct(slug);
    if (!product) return NextResponse.redirect(`${origin}/templates`, 302);
    productSlug = product.slug;
    target =
      product.priceCents === 0
        ? safe(product.variants.find((v) => v.freeAccessUrl)?.freeAccessUrl)
        : product.priceCents === null
          ? null
          : safe(product.paymentUrl);
    fallback = `${origin}/support?product=${product.slug}`;
  }

  const db = supabase();
  if (db && target) {
    const { error } = await db.from("checkout_clicks").insert({ product_slug: productSlug, plan_slug: planSlug, ref });
    if (error) console.error("[go]", error.message);
  }
  return NextResponse.redirect(target ?? fallback, 302);
}
