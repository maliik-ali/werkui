import { Badge } from "@/components/ui/badge";
import { PLATFORM_LABEL, type Platform } from "@/lib/types";

const dot: Record<Platform, string> = {
  figma: "#ff7262",
  framer: "#0a7fa8",
  webflow: "#006bff",
  wordpress: "#4a5b73",
  bootstrap: "#7b61ff",
  mui: "#0057d9",
};

export function PlatformBadge({ platform }: { platform: Platform }) {
  return (
    <Badge variant="outline" className="gap-1.5 rounded-full bg-card px-2.5 py-1 font-medium text-muted-foreground">
      <span aria-hidden="true" className="size-1.5 rounded-full" style={{ background: dot[platform] }} />
      {PLATFORM_LABEL[platform]}
    </Badge>
  );
}
