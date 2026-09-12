"use client";

import { useEffect, useRef } from "react";
import { animate, motion, useInView, useMotionValue, useTransform } from "framer-motion";
import { EASE } from "@/lib/motion";

export function StatCounter({
  value,
  suffix = "",
  prefix = "",
  decimals = 0,
  label,
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => v.toFixed(decimals));

  useEffect(() => {
    if (!inView) return;
    const controls = animate(count, value, {
      duration: 1.8,
      ease: EASE,
    });
    return controls.stop;
  }, [inView, value, count]);

  return (
    <div ref={ref} className="flex flex-col gap-1.5">
      <div className="font-mono-tabular flex items-baseline text-4xl font-semibold text-fg sm:text-5xl">
        <span>{prefix}</span>
        <motion.span>{rounded}</motion.span>
        <span>{suffix}</span>
      </div>
      <div className="text-sm text-fg-muted">{label}</div>
    </div>
  );
}
