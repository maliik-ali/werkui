import * as React from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AnnouncementBannerProps extends React.ComponentProps<"a"> {
  /** Short highlighted label, e.g. "New". */
  badge?: string;
}

export function AnnouncementBanner({
  badge = "New",
  href = "#",
  className,
  children,
  ...props
}: AnnouncementBannerProps) {
  return (
    <a
      href={href}
      className={cn(
        "group inline-flex items-center gap-2 rounded-full border bg-card py-1 pl-1 pr-3 text-sm text-muted-foreground shadow-xs transition-colors hover:text-foreground",
        className,
      )}
      {...props}
    >
      <span className="rounded-full bg-primary px-2.5 py-0.5 text-xs font-medium text-primary-foreground">
        {badge}
      </span>
      <span>{children}</span>
      <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
    </a>
  );
}
