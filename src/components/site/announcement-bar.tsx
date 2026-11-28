import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function AnnouncementBar() {
  return (
    <Link
      href="/docs/components/stat-card"
      className="group flex items-center justify-center gap-2 border-b bg-muted/50 px-4 py-2 text-center text-sm text-muted-foreground transition-colors hover:text-foreground"
    >
      Dashboard components are here: Stat Card and Bar Chart Card
      <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
    </Link>
  );
}
