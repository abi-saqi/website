import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function Marquee({
  children,
  className,
  reverse = false,
  speed = "normal",
}: {
  children: ReactNode;
  className?: string;
  reverse?: boolean;
  speed?: "normal" | "fast";
}) {
  return (
    <div className={cn("group relative flex overflow-hidden", className)}>
      <div
        className={cn(
          "flex shrink-0 items-center gap-12 pr-12",
          speed === "fast" ? "animate-marquee-fast" : "animate-marquee",
          reverse && "[animation-direction:reverse]"
        )}
      >
        {children}
      </div>
      <div
        aria-hidden
        className={cn(
          "flex shrink-0 items-center gap-12 pr-12",
          speed === "fast" ? "animate-marquee-fast" : "animate-marquee",
          reverse && "[animation-direction:reverse]"
        )}
      >
        {children}
      </div>
    </div>
  );
}
