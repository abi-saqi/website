"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { DASHBOARDS } from "@/lib/dashboards";
import { cn } from "@/lib/utils";
import { EASE } from "@/lib/motion";

const COUNT = DASHBOARDS.length;
/** Scroll distance allotted to each screen. Longer feels laboured, shorter skips. */
const VH_PER_SCREEN = 85;

/**
 * Pinned scroll showcase: the console frame stays fixed while the reader
 * scrolls, and the screen inside it advances. The tall outer section provides
 * the scroll distance; the inner sticky element is what stays on screen.
 *
 * Below `lg`, and whenever the reader prefers reduced motion, this degrades to
 * a plain stacked list — a pinned section on a phone hijacks the scroll and a
 * crossfade is exactly the motion someone asked not to see.
 */
export function DashboardShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const next = Math.min(COUNT - 1, Math.max(0, Math.floor(v * COUNT)));
    setActive(next);
  });

  const screen = DASHBOARDS[active]!;

  return (
    <>
      {/* Pinned experience — large screens, motion allowed. */}
      <div
        ref={ref}
        className="relative hidden motion-safe:lg:block"
        style={{ height: `${COUNT * VH_PER_SCREEN}vh` }}
      >
        <div className="sticky top-0 flex min-h-screen items-center py-20">
          <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-6 sm:px-8 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="min-w-0">
              <ol className="flex flex-col gap-1">
                {DASHBOARDS.map((d, i) => {
                  const on = i === active;
                  return (
                    <li key={d.key}>
                      <button
                        onClick={() => {
                          const el = ref.current;
                          if (!el) return;
                          // Scroll to the midpoint of this screen's slice so the
                          // click lands on the same state the scroll would.
                          const slice = el.offsetHeight / COUNT;
                          window.scrollTo({
                            top: el.offsetTop + slice * i + slice / 2,
                            behavior: "smooth",
                          });
                        }}
                        className={cn(
                          "flex w-full items-center gap-3 rounded-r-sm px-3 py-2.5 text-left transition-colors",
                          on ? "bg-raised" : "hover:bg-raised/60"
                        )}
                      >
                        <span
                          className={cn(
                            "flex h-8 w-8 shrink-0 items-center justify-center rounded-r-sm transition-colors",
                            on ? "bg-primary text-white" : "bg-primary-soft text-primary"
                          )}
                        >
                          <d.icon className="h-4 w-4" />
                        </span>
                        <span
                          className={cn(
                            "text-sm font-medium transition-colors",
                            on ? "text-fg" : "text-fg-dim"
                          )}
                        >
                          {d.label}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ol>

              <AnimatePresence mode="wait">
                <motion.div
                  key={screen.key}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.3, ease: EASE }}
                  className="mt-8 border-t border-border pt-6"
                >
                  <h3 className="text-xl font-semibold tracking-tight text-fg">
                    {screen.headline}
                  </h3>
                  <p className="mt-2.5 max-w-md text-sm leading-6 text-fg-muted">
                    {screen.detail}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            <BrowserFrame>
              <AnimatePresence mode="wait">
                <motion.div
                  key={screen.key}
                  initial={{ opacity: 0, scale: 1.015 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.995 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="absolute inset-0"
                >
                  <Image
                    src={screen.src}
                    alt={`${screen.label} screen of the saqi.ai console`}
                    fill
                    sizes="(min-width: 1024px) 720px, 100vw"
                    className="object-cover object-top"
                    priority={active === 0}
                  />
                </motion.div>
              </AnimatePresence>
            </BrowserFrame>
          </div>
        </div>
      </div>

      {/* Stacked fallback — small screens and reduced motion. */}
      <div className="flex flex-col gap-12 motion-safe:lg:hidden">
        {DASHBOARDS.map((d) => (
          <div key={d.key} className="mx-auto w-full max-w-3xl px-6 sm:px-8">
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-r-sm bg-primary-soft text-primary">
                <d.icon className="h-4 w-4" />
              </span>
              <h3 className="text-base font-semibold text-fg">{d.headline}</h3>
            </div>
            <p className="mt-2 text-sm leading-6 text-fg-muted">{d.detail}</p>
            <div className="mt-4">
              <BrowserFrame url={`app.saqi.ai/${d.key}`}>
                <Image
                  src={d.src}
                  alt={`${d.label} screen of the saqi.ai console`}
                  fill
                  sizes="100vw"
                  className="object-cover object-top"
                />
              </BrowserFrame>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function BrowserFrame({ children, url }: { children: React.ReactNode; url?: string }) {
  return (
    <div className="glass-strong min-w-0 overflow-hidden rounded-r p-2 sm:p-3">
      <div className="flex items-center gap-2 px-2 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-rose/60" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber/60" />
        <span className="h-2.5 w-2.5 rounded-full bg-primary/60" />
        <span className="font-mono-tabular ml-3 flex-1 truncate rounded-full bg-raised px-3 py-1 text-[11px] text-fg-dim">
          {url ?? "app.saqi.ai"}
        </span>
      </div>
      <div className="relative aspect-[1800/973] w-full overflow-hidden rounded-r-sm border border-border">
        {children}
      </div>
    </div>
  );
}
