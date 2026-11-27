"use client";

import { CopyButton } from "./copy-button";
import { cn } from "@/lib/utils";

/** Renders highlighted code HTML (produced by shiki on the server) with a copy button. */
export function CodeFrame({ html, source, className }: { html: string; source: string; className?: string }) {
  return (
    <div className={cn("relative rounded-xl border bg-card", className)}>
      <CopyButton value={source} label="Copy code" className="absolute right-3 top-3 z-10" />
      <div
        className="max-h-[32rem] overflow-auto p-4 text-sm [&_pre]:bg-transparent!"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
