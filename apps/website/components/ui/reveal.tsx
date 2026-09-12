"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { DUR, EASE, RISE, STAGGER } from "@/lib/motion";

/**
 * One enter transition for the whole site, from the shared motion scale. A
 * short rise that settles before the eye arrives is what makes scrolling feel
 * quick rather than animated — longer travel draws attention to the animation
 * instead of the content.
 */
const variants: Variants = {
  hidden: { opacity: 0, y: RISE.md },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DUR.base, ease: EASE },
  },
};

export function Reveal({
  children,
  className,
  delay = 0,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "span";
}) {
  const Comp = motion[as];
  return (
    <Comp
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      variants={variants}
      transition={{ delay }}
    >
      {children}
    </Comp>
  );
}

export function RevealGroup({
  children,
  className,
  stagger = STAGGER,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
}) {
  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div className={cn(className)} variants={variants}>
      {children}
    </motion.div>
  );
}
