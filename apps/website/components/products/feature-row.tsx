import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { IconBulletList } from "@/components/ui/icon-bullet";
import { cn } from "@/lib/utils";

/**
 * Alternating capability block: prose on one side, a live visual on the other.
 * `flip` moves the visual to the left on wide screens; on narrow screens the
 * visual always follows the prose so the reading order stays sensible.
 */
export function FeatureRow({
  icon: Icon,
  eyebrow,
  title,
  body,
  bullets,
  visual,
  flip = false,
  className,
}: {
  icon: LucideIcon;
  eyebrow: string;
  title: string;
  body: string;
  bullets?: string[];
  visual: ReactNode;
  flip?: boolean;
  className?: string;
}) {
  return (
    <section className={cn("py-20 sm:py-24", className)}>
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 sm:px-8 lg:grid-cols-2 lg:gap-16">
        <div className={cn("min-w-0", flip && "lg:order-2")}>
          <Reveal>
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              <Icon className="h-4 w-4" />
              {eyebrow}
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-4 max-w-lg text-balance text-2xl font-semibold leading-tight tracking-tight text-fg sm:text-3xl">
              {title}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 max-w-lg text-base leading-7 text-fg-muted">{body}</p>
          </Reveal>
          {bullets && (
            <Reveal delay={0.15}>
              <IconBulletList items={bullets} className="mt-6" />
            </Reveal>
          )}
        </div>

        <Reveal delay={0.1} className={cn("min-w-0", flip && "lg:order-1")}>
          {visual}
        </Reveal>
      </div>
    </section>
  );
}
