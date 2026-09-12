import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import Link from "next/link";
import type { ReactNode } from "react";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-r-sm text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-white hover:bg-primary-hi shadow-[0_1px_0_0_rgba(255,255,255,0.15)_inset]",
        outline:
          "border border-border-strong text-fg hover:border-primary hover:text-primary bg-transparent",
        ghost: "text-fg-muted hover:text-fg hover:bg-raised",
        soft: "bg-primary-soft text-primary-hi hover:bg-e100",
      },
      size: {
        default: "h-11 px-6",
        sm: "h-9 px-4 text-[13px]",
        lg: "h-13 px-8 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface ButtonProps extends VariantProps<typeof buttonVariants> {
  href?: string;
  className?: string;
  children: ReactNode;
  onClick?: () => void;
  target?: string;
  rel?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

export function Button({
  href,
  className,
  variant,
  size,
  children,
  ...props
}: ButtonProps) {
  const cls = cn(buttonVariants({ variant, size }), className);
  if (href) {
    return (
      <Link href={href} className={cls} {...props}>
        {children}
      </Link>
    );
  }
  return (
    <button className={cls} {...props}>
      {children}
    </button>
  );
}
