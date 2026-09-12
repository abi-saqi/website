"use client";

import { motion } from "framer-motion";
import { ShoppingBag, Clock, MessageCircle, MessageSquareText, ShieldCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Step = {
  icon: LucideIcon;
  chip: string;
  title: string;
  detail: string;
  tag?: string;
};

const steps: Step[] = [
  {
    icon: ShoppingBag,
    chip: "bg-[#95BF47]/16 text-[#5E8E3E]",
    title: "Cart abandoned",
    detail: "Shopify webhook · ₹12,400 basket",
    tag: "Event",
  },
  {
    icon: Clock,
    chip: "bg-slate/12 text-slate",
    title: "Wait 2 hours",
    detail: "Respects quiet hours in the profile's timezone",
    tag: "Delay",
  },
  {
    icon: ShieldCheck,
    chip: "bg-[#3B82F6]/12 text-[#3B82F6]",
    title: "Policy gate",
    detail: "Consent, frequency cap, suppression — all clear",
    tag: "Check",
  },
  {
    icon: MessageCircle,
    chip: "bg-[#25D366]/14 text-[#1DA851]",
    title: "WhatsApp nudge",
    detail: "Approved template with the basket contents",
    tag: "Send",
  },
  {
    icon: MessageSquareText,
    chip: "bg-[#06B6D4]/12 text-[#0891B2]",
    title: "RCS fallback",
    detail: "Only if unread after 24h — never both",
    tag: "Fallback",
  },
];

export function NudgeTimeline() {
  return (
    <div className="glass-strong rounded-r p-5 sm:p-6">
      <div className="flex items-center justify-between border-b border-border pb-4">
        <div>
          <p className="text-sm font-semibold text-fg">Abandoned cart recovery</p>
          <p className="text-xs text-fg-dim">Event-triggered nudge</p>
        </div>
        <span className="font-mono-tabular shrink-0 rounded-full bg-primary-soft px-2.5 py-1 text-[11px] font-semibold text-primary">
          18.4% recovered
        </span>
      </div>

      <ol className="mt-5 flex flex-col gap-2.5">
        {steps.map((s, i) => (
          <motion.li
            key={s.title}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.45, delay: i * 0.09, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3 rounded-r-sm border border-border bg-surface px-3 py-2.5"
          >
            <span
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-r-sm ${s.chip}`}
            >
              <s.icon className="h-4 w-4" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-medium text-fg">{s.title}</span>
              <span className="block truncate text-[11px] text-fg-dim">{s.detail}</span>
            </span>
            {s.tag && (
              <span className="shrink-0 rounded-full border border-border px-2 py-0.5 text-[10px] font-medium text-fg-dim">
                {s.tag}
              </span>
            )}
          </motion.li>
        ))}
      </ol>
    </div>
  );
}
