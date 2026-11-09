import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

/** Server-side client using the publishable key. Row level security decides what it can read and insert. */
export function supabase(): SupabaseClient | null {
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false } });
}

export const hasDatabase = Boolean(url && key);
