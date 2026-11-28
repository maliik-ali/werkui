"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

export interface HeroSectionProps extends Omit<React.ComponentProps<"section">, "title"> {
  /** Small pill above the title, e.g. an AnnouncementBanner. */
  announcement?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  /** Buttons or links rendered under the description. */
  actions?: React.ReactNode;
  /** Product screenshot or demo rendered below. */
  media?: React.ReactNode;
}

export function HeroSection({
  announcement,
  title,
  description,
  actions,
  media,
  className,
  ...props
}: HeroSectionProps) {
  const reduce = useReducedMotion();
  const item = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, delay, ease: "easeOut" as const },
  });

  return (
    <section
      className={cn("relative mx-auto flex w-full max-w-5xl flex-col items-center px-6 py-20 text-center", className)}
      {...props}
    >
      {announcement && <motion.div {...item(0)}>{announcement}</motion.div>}
      <motion.h1
        {...item(0.08)}
        className="mt-6 text-balance text-4xl font-medium tracking-tight sm:text-6xl"
      >
        {title}
      </motion.h1>
      {description && (
        <motion.p {...item(0.16)} className="mt-5 max-w-2xl text-balance text-lg text-muted-foreground">
          {description}
        </motion.p>
      )}
      {actions && (
        <motion.div {...item(0.24)} className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {actions}
        </motion.div>
      )}
      {media && (
        <motion.div {...item(0.34)} className="mt-14 w-full">
          {media}
        </motion.div>
      )}
    </section>
  );
}
