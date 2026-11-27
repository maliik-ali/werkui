import type { ComponentType } from "react";
import ShimmerButtonDemo from "@/registry/werkui/examples/shimmer-button-demo";
import AnnouncementBannerDemo from "@/registry/werkui/examples/announcement-banner-demo";
import MarqueeDemo from "@/registry/werkui/examples/marquee-demo";
import GradientTextDemo from "@/registry/werkui/examples/gradient-text-demo";
import BentoGridDemo from "@/registry/werkui/examples/bento-grid-demo";
import HeroSectionDemo from "@/registry/werkui/examples/hero-section-demo";
import NavbarDemo from "@/registry/werkui/examples/navbar-demo";
import PricingCardsDemo from "@/registry/werkui/examples/pricing-cards-demo";
import TestimonialsMarqueeDemo from "@/registry/werkui/examples/testimonials-marquee-demo";

export type PropDoc = { name: string; type: string; default?: string; description: string };

export type RegistryComponent = {
  slug: string;
  title: string;
  description: string;
  category: "Buttons" | "Text" | "Layout" | "Sections";
  /** Path of the component source, relative to the project root. */
  file: string;
  Demo: ComponentType;
  props: PropDoc[];
  /** npm packages the component needs (informational on the docs page). */
  dependencies?: string[];
  /** Slugs of other WerkUI components it builds on. */
  uses?: string[];
  /** Shown with a "New" badge in navigation. */
  isNew?: boolean;
};

const f = (slug: string) => `src/registry/werkui/${slug}.tsx`;

export const components: RegistryComponent[] = [
  {
    slug: "navbar",
    title: "Navbar",
    description: "A sticky navigation bar with a blurred background on scroll and an accessible mobile menu.",
    category: "Sections",
    file: f("navbar"),
    Demo: NavbarDemo,
    dependencies: ["lucide-react"],
    isNew: true,
    props: [
      { name: "logo", type: "ReactNode", description: "Logo or brand, usually a link to the home page." },
      { name: "links", type: "{ label: string; href: string }[]", description: "Navigation links." },
      { name: "actions", type: "ReactNode", description: "Buttons shown on the right." },
    ],
  },
  {
    slug: "pricing-cards",
    title: "Pricing Cards",
    description: "Pricing plans with a monthly and yearly toggle and a highlighted featured plan.",
    category: "Sections",
    file: f("pricing-cards"),
    Demo: PricingCardsDemo,
    dependencies: ["lucide-react"],
    isNew: true,
    props: [
      { name: "plans", type: "PricingPlan[]", description: "Plans with name, price, features, cta and optional featured and badge." },
      { name: "currency", type: "string", default: '"$"', description: "Currency symbol for numeric prices." },
      { name: "defaultBilling", type: '"monthly" | "yearly"', default: '"monthly"', description: "Initially selected billing period." },
      { name: "yearlyLabel", type: "string", description: 'Small label beside the yearly option, e.g. "Save 20%".' },
    ],
  },
  {
    slug: "testimonials-marquee",
    title: "Testimonials Marquee",
    description: "Rows of testimonial cards that scroll in opposite directions and pause on hover.",
    category: "Sections",
    file: f("testimonials-marquee"),
    Demo: TestimonialsMarqueeDemo,
    uses: ["marquee"],
    isNew: true,
    props: [
      { name: "testimonials", type: "Testimonial[]", description: "Items with name, quote and optional handle and avatar." },
      { name: "rows", type: "number", default: "2", description: "Number of scrolling rows. Rows alternate direction." },
      { name: "duration", type: "string", default: '"40s"', description: "Time for one loop." },
    ],
  },
  {
    slug: "hero-section",
    title: "Hero Section",
    description: "A staggered-reveal hero with announcement, headline, copy, actions and optional media.",
    category: "Sections",
    file: f("hero-section"),
    Demo: HeroSectionDemo,
    dependencies: ["motion"],
    props: [
      { name: "announcement", type: "ReactNode", description: "Pill above the title, e.g. an AnnouncementBanner." },
      { name: "title", type: "ReactNode", description: "The headline." },
      { name: "description", type: "ReactNode", description: "Supporting copy." },
      { name: "actions", type: "ReactNode", description: "Buttons or links under the copy." },
      { name: "media", type: "ReactNode", description: "Product screenshot or demo below." },
    ],
  },
  {
    slug: "bento-grid",
    title: "Bento Grid",
    description: "A responsive bento layout of feature cards with hover reveal and a background slot.",
    category: "Sections",
    file: f("bento-grid"),
    Demo: BentoGridDemo,
    dependencies: ["lucide-react"],
    props: [
      { name: "name", type: "string", description: "Card title." },
      { name: "description", type: "string", description: "Card copy." },
      { name: "icon", type: "ReactNode", description: "Icon shown above the title." },
      { name: "href", type: "string", description: "Link target for the call to action." },
      { name: "cta", type: "string", default: '"Learn more"', description: "Call-to-action label." },
      { name: "background", type: "ReactNode", description: "Decorative element behind the text." },
    ],
  },
  {
    slug: "marquee",
    title: "Marquee",
    description: "An infinite, CSS-only scrolling track for logos, testimonials or badges.",
    category: "Layout",
    file: f("marquee"),
    Demo: MarqueeDemo,
    props: [
      { name: "reverse", type: "boolean", default: "false", description: "Run in the opposite direction." },
      { name: "pauseOnHover", type: "boolean", default: "false", description: "Pause while hovered." },
      { name: "vertical", type: "boolean", default: "false", description: "Scroll vertically." },
      { name: "repeat", type: "number", default: "4", description: "How many times the content repeats." },
    ],
  },
  {
    slug: "shimmer-button",
    title: "Shimmer Button",
    description: "A primary call-to-action button with a looping light sweep.",
    category: "Buttons",
    file: f("shimmer-button"),
    Demo: ShimmerButtonDemo,
    props: [
      { name: "shimmerColor", type: "string", default: '"#ffffff"', description: "Colour of the light sweep." },
      { name: "background", type: "string", default: '"var(--foreground)"', description: "Any CSS background for the button face." },
      { name: "shimmerDuration", type: "string", default: '"2.5s"', description: "Duration of one sweep." },
    ],
  },
  {
    slug: "announcement-banner",
    title: "Announcement Banner",
    description: "A pill-shaped link with a badge, used above hero headlines.",
    category: "Buttons",
    file: f("announcement-banner"),
    Demo: AnnouncementBannerDemo,
    dependencies: ["lucide-react"],
    props: [
      { name: "badge", type: "string", default: '"New"', description: "Highlighted label." },
      { name: "href", type: "string", default: '"#"', description: "Link target." },
    ],
  },
  {
    slug: "gradient-text",
    title: "Gradient Text",
    description: "Inline text with a slowly moving gradient. Uses your chart colour tokens.",
    category: "Text",
    file: f("gradient-text"),
    Demo: GradientTextDemo,
    props: [{ name: "className", type: "string", description: "Extra classes, e.g. to change the font size." }],
  },
];

export const getComponent = (slug: string) => components.find((c) => c.slug === slug);
