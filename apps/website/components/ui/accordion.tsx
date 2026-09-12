"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { EASE } from "@/lib/motion";

export function Accordion({
  items,
}: {
  items: { question: string; answer: string; icon?: LucideIcon; chip?: string }[];
}) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="flex flex-col gap-3">
      {items.map((item, i) => {
        const isOpen = open === i;
        const Icon = item.icon;
        return (
          <div key={item.question} className="glass overflow-hidden rounded-r">
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
              aria-expanded={isOpen}
            >
              <span className="flex items-center gap-3">
                {Icon && (
                  <span
                    className={cn(
                      "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
                      item.chip ?? "bg-primary-soft text-primary"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                  </span>
                )}
                <span className="text-sm font-semibold text-fg sm:text-base">{item.question}</span>
              </span>
              <motion.span
                animate={{ rotate: isOpen ? 45 : 0 }}
                transition={{ duration: 0.25 }}
                className={cn(
                  "flex h-7 w-7 shrink-0 items-center justify-center rounded-full",
                  isOpen ? "bg-primary text-white" : "bg-primary-soft text-primary"
                )}
              >
                <Plus className="h-4 w-4" />
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: EASE }}
                  className="overflow-hidden"
                >
                  <p className="px-6 pb-5 text-sm leading-6 text-fg-muted">{item.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
