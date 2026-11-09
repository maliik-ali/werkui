import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium whitespace-nowrap cursor-pointer select-none transition-[transform,background-color,box-shadow,border-color,color] duration-200 ease-out-soft active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none";
const variants: Record<Variant, string> = {
  primary: "bg-accent text-on-accent hover:shadow-glow hover:-translate-y-0.5",
  secondary: "border border-line bg-surface/70 text-fg backdrop-blur hover:border-line-input hover:bg-raised",
  ghost: "text-muted hover:text-fg hover:bg-raised",
};
const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-13 px-7 text-base",
};

export function buttonClass(variant: Variant = "primary", size: Size = "md", extra = "") {
  return `${base} ${variants[variant]} ${sizes[size]} ${extra}`;
}

type Props = { variant?: Variant; size?: Size; className?: string; children: ReactNode };

export function ButtonLink({ variant, size, className, children, href, ...rest }: Props & { href: string } & Omit<ComponentProps<"a">, "href" | "className" | "children">) {
  const cls = buttonClass(variant, size, className);
  const external = /^https?:\/\//.test(href);
  if (external || href.startsWith("/go/")) {
    return (
      <a href={href} className={cls} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} {...rest}>
      {children}
    </Link>
  );
}

export function Button({ variant, size, className, children, ...rest }: Props & Omit<ComponentProps<"button">, "className" | "children">) {
  return (
    <button className={buttonClass(variant, size, className)} {...rest}>
      {children}
    </button>
  );
}
