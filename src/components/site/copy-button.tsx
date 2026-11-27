"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function CopyButton({ value, className, label = "Copy" }: { value: string; className?: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      aria-label={label}
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value);
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        } catch {
          /* clipboard unavailable */
        }
      }}
      className={cn(
        "grid size-8 place-items-center rounded-md border bg-card text-muted-foreground transition-colors hover:text-foreground",
        className,
      )}
    >
      {copied ? <Check className="size-4 text-primary" /> : <Copy className="size-4" />}
    </button>
  );
}
