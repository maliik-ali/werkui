import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { Button as UiButton, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/** Site button names mapped onto the shadcn/ui Button variants. */
type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";
const variantMap = { primary: "default", secondary: "secondary", ghost: "outline" } as const;
const sizeMap = { sm: "sm", md: "default", lg: "lg" } as const;

export function buttonClass(variant: Variant = "primary", size: Size = "md", extra = "") {
  return cn(buttonVariants({ variant: variantMap[variant], size: sizeMap[size] }), extra);
}

type Props = { variant?: Variant; size?: Size; className?: string; children: ReactNode };

export function ButtonLink({ variant = "primary", size = "md", className, children, href, ...rest }: Props & { href: string } & Omit<ComponentProps<"a">, "href" | "className" | "children">) {
  const external = /^https?:\/\//.test(href);
  const plain = external || href.startsWith("/go/");
  return (
    <UiButton asChild variant={variantMap[variant]} size={sizeMap[size]} className={className}>
      {plain ? (
        <a href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})} {...rest}>
          {children}
        </a>
      ) : (
        <Link href={href} {...rest}>
          {children}
        </Link>
      )}
    </UiButton>
  );
}

export function Button({ variant = "primary", size = "md", className, children, ...rest }: Props & Omit<ComponentProps<"button">, "className" | "children">) {
  return (
    <UiButton variant={variantMap[variant]} size={sizeMap[size]} className={className} {...rest}>
      {children}
    </UiButton>
  );
}
