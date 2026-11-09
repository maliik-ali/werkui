"use server";
import { cookies } from "next/headers";
import { z } from "zod";
import { supabase } from "./supabase";

export type FormState = { ok: boolean; message: string } | null;

const NOT_CONNECTED =
  "This form isn't connected yet, so nothing was sent. Please reach out through rayvens.com or malikali.de for now.";

const leadSchema = z.object({
  path: z.enum(["rayvens", "malikali", "unsure"]),
  name: z.string().trim().min(1, "Please add your name.").max(120),
  email: z.string().trim().email("That email doesn't look right.").max(254),
  budget: z.string().trim().max(60).optional(),
  message: z.string().trim().min(10, "Tell us a little more about the project (10+ characters).").max(4000),
  product_slug: z.string().trim().max(80).optional(),
});

export async function submitLead(_prev: FormState, fd: FormData): Promise<FormState> {
  if (fd.get("company")) return { ok: true, message: "Thanks, we'll be in touch." }; // honeypot
  const parsed = leadSchema.safeParse({
    path: fd.get("path") || "unsure",
    name: fd.get("name"),
    email: fd.get("email"),
    budget: fd.get("budget") || undefined,
    message: fd.get("message"),
    product_slug: fd.get("product_slug") || undefined,
  });
  if (!parsed.success) return { ok: false, message: parsed.error.issues[0].message };
  const db = supabase();
  if (!db) return { ok: false, message: NOT_CONNECTED };
  const ref = (await cookies()).get("wk_ref")?.value?.slice(0, 40) ?? null;
  const { error } = await db.from("service_leads").insert({ ...parsed.data, ref });
  if (error) {
    console.error("[lead]", error.message);
    return { ok: false, message: "Something went wrong on our side. Please try again in a minute." };
  }
  return { ok: true, message: "Got it. You'll hear back within one working day." };
}

export async function subscribe(_prev: FormState, fd: FormData): Promise<FormState> {
  if (fd.get("company")) return { ok: true, message: "You're on the list." };
  const email = z.string().trim().email().max(254).safeParse(fd.get("email"));
  if (!email.success) return { ok: false, message: "That email doesn't look right." };
  const db = supabase();
  if (!db) return { ok: false, message: "Sign-ups open shortly. Please check back soon." };
  const { error } = await db.from("subscribers").insert({ email: email.data.toLowerCase(), source: String(fd.get("source") ?? "site").slice(0, 60) });
  if (error && error.code !== "23505") {
    console.error("[subscribe]", error.message);
    return { ok: false, message: "Something went wrong. Please try again." };
  }
  return { ok: true, message: "You're on the list. New drops land in your inbox." };
}
