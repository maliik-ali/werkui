import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function AnnouncementBar() {
  return (
    <Link
      href="/docs/components"
      className="group flex items-center justify-center gap-2 bg-primary px-4 py-2 text-center text-sm font-medium text-primary-foreground"
    >
      <span aria-hidden>✨</span>
      Navbar, Pricing Cards and Testimonials Marquee are live
      <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
}
