export type Platform = "figma" | "framer" | "webflow" | "wordpress" | "bootstrap" | "mui";
export type ProductKind = "template" | "ui_kit" | "course" | "consultation" | "book";

export interface Seller {
  handle: string;
  displayName: string;
  headline: string;
  bio: string;
  websiteUrl: string;
  links: Record<string, string>;
  isVerified: boolean;
  hue: number;
}

export interface Variant {
  platform: Platform;
  previewUrl: string | null;
  /** Only set on free products. Paid files are handed over by Stripe after payment. */
  freeAccessUrl: string | null;
}

export interface Product {
  slug: string;
  sellerHandle: string;
  kind: ProductKind;
  category: string;
  categorySlug: string;
  name: string;
  tagline: string;
  description: string;
  /** null = not on sale yet (price to be confirmed). 0 = free. */
  priceCents: number | null;
  compareAtCents: number | null;
  currency: string;
  paymentUrl: string | null;
  coverHue: number;
  coverUrl: string | null;
  images: string[];
  layout: "dashboard" | "landing" | "doc" | "mobile";
  screensCount: number | null;
  features: string[];
  builtFor: string[];
  included: string[];
  isNew: boolean;
  isFeatured: boolean;
  publishedAt: string;
  variants: Variant[];
}

export interface Plan {
  slug: string;
  name: string;
  blurb: string;
  platforms: Platform[];
  yearlyCents: number | null;
  lifetimeCents: number | null;
  currency: string;
  yearlyPaymentUrl: string | null;
  lifetimePaymentUrl: string | null;
  perks: string[];
  isFeatured: boolean;
}

export const PLATFORM_LABEL: Record<Platform, string> = {
  figma: "Figma",
  framer: "Framer",
  webflow: "Webflow",
  wordpress: "WordPress",
  bootstrap: "Bootstrap",
  mui: "Material UI",
};

export const KIND_LABEL: Record<ProductKind, string> = {
  template: "Templates",
  ui_kit: "UI kits",
  course: "Courses",
  consultation: "Consultations",
  book: "Books",
};
