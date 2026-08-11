import type { LucideIcon } from "lucide-react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export function IconBulletList({
  items,
  className,
}: {
  items: (string | { label: string; icon?: LucideIcon })[];
  className?: string;
}) {
  return (
    <ul className={cn("flex flex-col gap-2", className)}>
      {items.map((item) => {
        const label = typeof item === "string" ? item : item.label;
        const Icon = typeof item === "string" ? Check : item.icon ?? Check;
        return (
          <li key={label} className="flex items-center gap-2.5 text-sm text-fg-muted">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary">
              <Icon className="h-3 w-3" strokeWidth={2.5} />
            </span>
            {label}
          </li>
        );
      })}
    </ul>
  );
}
