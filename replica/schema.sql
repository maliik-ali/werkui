-- WerkUI schema v1. Postgres on Supabase. Access rules: row level security.
-- Public (anon) can read published catalog rows and insert leads / subscribers.
-- Everything else is written from the Supabase dashboard or a service-role key.

create extension if not exists pgcrypto;

create or replace function public.set_updated_at() returns trigger
language plpgsql set search_path = '' as $$
begin new.updated_at = now(); return new; end $$;

-- Sellers. Today: WerkUI's own two (Malik Ali, Rayvens). Later: anyone, linked to auth.users.
create table public.sellers (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  handle text not null unique check (handle ~ '^[a-z0-9-]{2,40}$'),
  display_name text not null,
  headline text,
  bio text,
  avatar_url text,
  website_url text,
  links jsonb not null default '{}',
  is_verified boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index on public.sellers (user_id);

create table public.categories (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  position int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- One row per thing for sale. kind leaves room for courses, consultations, books.
create table public.products (
  id uuid primary key default gen_random_uuid(),
  seller_id uuid not null references public.sellers(id) on delete restrict,
  category_id uuid references public.categories(id) on delete set null,
  slug text not null unique check (slug ~ '^[a-z0-9-]{2,80}$'),
  kind text not null default 'template'
    check (kind in ('template','ui_kit','course','consultation','book')),
  name text not null,
  tagline text not null,
  description text not null default '',
  price_cents int check (price_cents >= 0),       -- null = not on sale yet, 0 = free
  compare_at_cents int check (compare_at_cents is null or compare_at_cents > price_cents),
  currency text not null default 'USD',
  payment_url text,                      -- Stripe payment link; null on free products
  cover_hue int not null default 250 check (cover_hue between 0 and 360),
  cover_url text,
  screens_count int,
  features jsonb not null default '[]',
  built_for jsonb not null default '[]',
  included jsonb not null default '[]',
  stats jsonb not null default '{}',
  is_new boolean not null default false,
  is_featured boolean not null default false,
  status text not null default 'draft' check (status in ('draft','published','archived')),
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index on public.products (seller_id);
create index on public.products (category_id);
create index on public.products (status, published_at desc);
create index on public.products (kind);

-- A product can ship on several platforms, each with its own preview and file.
create table public.product_variants (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  platform text not null
    check (platform in ('figma','framer','webflow','wordpress','bootstrap','mui')),
  preview_url text,                      -- public demo / community page
  free_access_url text,                  -- only for free products; paid files are handed over by Stripe
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (product_id, platform)
);
create index on public.product_variants (platform);

create table public.product_images (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  url text not null,
  alt text not null default '',
  position int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index on public.product_images (product_id, position);

create table public.plans (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  blurb text not null default '',
  platforms jsonb not null default '[]',
  yearly_cents int check (yearly_cents >= 0),
  lifetime_cents int check (lifetime_cents >= 0),
  currency text not null default 'USD',
  yearly_payment_url text,
  lifetime_payment_url text,
  perks jsonb not null default '[]',
  is_featured boolean not null default false,
  position int not null default 0,
  status text not null default 'published' check (status in ('draft','published','archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.service_leads (
  id uuid primary key default gen_random_uuid(),
  path text not null check (path in ('rayvens','malikali','unsure')),
  name text not null check (char_length(name) between 1 and 120),
  email text not null check (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$' and char_length(email) <= 254),
  budget text check (budget is null or char_length(budget) <= 60),
  message text not null check (char_length(message) between 1 and 4000),
  product_slug text check (product_slug is null or char_length(product_slug) <= 80),
  ref text check (ref is null or char_length(ref) <= 40),
  created_at timestamptz not null default now()
);

create table public.subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique check (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$' and char_length(email) <= 254),
  source text check (source is null or char_length(source) <= 60),
  created_at timestamptz not null default now()
);

-- Outbound clicks to checkout, for attribution from malikali.de and rayvens.com.
create table public.checkout_clicks (
  id uuid primary key default gen_random_uuid(),
  product_slug text check (product_slug is null or char_length(product_slug) <= 80),
  plan_slug text check (plan_slug is null or char_length(plan_slug) <= 80),
  ref text check (ref is null or char_length(ref) <= 40),
  created_at timestamptz not null default now()
);
create index on public.checkout_clicks (created_at desc);

-- Phase 2 (Stripe API + accounts): orders and entitlements. Created now so nothing has to move later.
create table public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  email text not null,
  product_id uuid references public.products(id) on delete restrict,
  plan_id uuid references public.plans(id) on delete restrict,
  amount_cents int not null check (amount_cents >= 0),
  currency text not null default 'USD',
  status text not null default 'pending' check (status in ('pending','paid','refunded','failed')),
  stripe_session_id text unique,         -- idempotency: a webhook that arrives twice hits this
  ref text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint one_target check ((product_id is null) <> (plan_id is null))
);
create index on public.orders (user_id);
create index on public.orders (email);
create index on public.orders (product_id);
create index on public.orders (plan_id);

create table public.entitlements (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  email text not null,
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id uuid references public.products(id) on delete cascade,
  plan_id uuid references public.plans(id) on delete cascade,
  expires_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index on public.entitlements (user_id);
create index on public.entitlements (email);
create index on public.entitlements (order_id);
create index on public.entitlements (product_id);
create index on public.entitlements (plan_id);

-- updated_at triggers
do $$ declare t text; begin
  foreach t in array array['sellers','categories','products','product_variants','product_images','plans','orders','entitlements'] loop
    execute format('create trigger set_updated_at before update on public.%I for each row execute function public.set_updated_at()', t);
  end loop;
end $$;

-- Row level security
alter table public.sellers enable row level security;
alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.product_variants enable row level security;
alter table public.product_images enable row level security;
alter table public.plans enable row level security;
alter table public.service_leads enable row level security;
alter table public.subscribers enable row level security;
alter table public.checkout_clicks enable row level security;
alter table public.orders enable row level security;
alter table public.entitlements enable row level security;

create policy "public reads sellers" on public.sellers for select to anon, authenticated using (true);
create policy "public reads categories" on public.categories for select to anon, authenticated using (true);
create policy "public reads published products" on public.products for select to anon, authenticated using (status = 'published');
create policy "public reads variants of published products" on public.product_variants for select to anon, authenticated
  using (exists (select 1 from public.products p where p.id = product_id and p.status = 'published'));
create policy "public reads images of published products" on public.product_images for select to anon, authenticated
  using (exists (select 1 from public.products p where p.id = product_id and p.status = 'published'));
create policy "public reads published plans" on public.plans for select to anon, authenticated using (status = 'published');

create policy "anyone can send a lead" on public.service_leads for insert to anon, authenticated with check (true);
create policy "anyone can subscribe" on public.subscribers for insert to anon, authenticated with check (true);
create policy "anyone can log a checkout click" on public.checkout_clicks for insert to anon, authenticated with check (true);

create policy "buyers read own orders" on public.orders for select to authenticated using (user_id = (select auth.uid()));
create policy "buyers read own entitlements" on public.entitlements for select to authenticated using (user_id = (select auth.uid()));
-- No anon read on leads, subscribers, clicks, orders, entitlements. No public writes to the catalog.
