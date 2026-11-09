import { PLATFORM_LABEL, type Platform } from "@/lib/types";

const dot: Record<Platform, string> = {
  figma: "#ff7262",
  framer: "#3fd2ff",
  webflow: "#6f8bff",
  wordpress: "#9fb4c7",
  bootstrap: "#b48bff",
  mui: "#5aa9ff",
};

export function PlatformBadge({ platform }: { platform: Platform }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-bg/60 px-2.5 py-1 text-xs font-medium text-muted">
      <span aria-hidden="true" className="size-1.5 rounded-full" style={{ background: dot[platform] }} />
      {PLATFORM_LABEL[platform]}
    </span>
  );
}
