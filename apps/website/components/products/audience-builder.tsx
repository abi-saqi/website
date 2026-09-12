"use client";

import { motion } from "framer-motion";
import { Megaphone, Target, ShoppingBag, MessageCircle, Filter } from "lucide-react";

const rules = [
  { field: "Source", op: "is any of", value: "Click-to-WhatsApp, Meta Ads" },
  { field: "Lead score", op: "≥", value: "60" },
  { field: "Last activity", op: "within", value: "14 days" },
  { field: "Consent", op: "is", value: "Marketing, opted in" },
];

const destinations = [
  { icon: Megaphone, label: "Google Ads", chip: "bg-[#F59E0B]/14 text-[#B45309]", note: "Customer Match" },
  { icon: Target, label: "Meta Ads", chip: "bg-[#0866FF]/12 text-[#0866FF]", note: "Custom Audience" },
  { icon: ShoppingBag, label: "Shopify", chip: "bg-[#95BF47]/16 text-[#5E8E3E]", note: "Catalog segment" },
  { icon: MessageCircle, label: "WhatsApp", chip: "bg-[#25D366]/14 text-[#1DA851]", note: "Campaign" },
];

export function AudienceBuilder() {
  return (
    <div className="glass-strong rounded-r p-5 sm:p-6">
      <div className="flex items-center justify-between gap-4 border-b border-border pb-4">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-r-sm bg-primary-soft text-primary">
            <Filter className="h-4 w-4" />
          </span>
          <div>
            <p className="text-sm font-semibold text-fg">High-intent, last 14 days</p>
            <p className="text-xs text-fg-dim">Live segment</p>
          </div>
        </div>
        <div className="shrink-0 text-right">
          <p className="font-mono-tabular text-xl font-semibold leading-none text-fg">48,210</p>
          <p className="mt-1 text-[10px] font-semibold uppercase tracking-wide text-fg-dim">
            Profiles
          </p>
        </div>
      </div>

      <ul className="mt-4 flex flex-col gap-2">
        {rules.map((r, i) => (
          <motion.li
            key={r.field}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.4, delay: i * 0.07 }}
            className="flex flex-wrap items-center gap-x-2 gap-y-1 rounded-r-sm border border-border bg-surface px-3 py-2 text-xs"
          >
            <span className="font-semibold text-fg">{r.field}</span>
            <span className="text-fg-dim">{r.op}</span>
            <span className="rounded-full bg-primary-soft px-2 py-0.5 font-medium text-primary">
              {r.value}
            </span>
          </motion.li>
        ))}
      </ul>

      <p className="mt-5 text-[10px] font-semibold uppercase tracking-wide text-fg-dim">
        Syncs to
      </p>
      <div className="mt-2 grid grid-cols-2 gap-2">
        {destinations.map((d, i) => (
          <motion.div
            key={d.label}
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.4, delay: 0.3 + i * 0.06 }}
            className="flex items-center gap-2.5 rounded-r-sm border border-border bg-surface px-3 py-2.5"
          >
            <span
              className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-r-sm ${d.chip}`}
            >
              <d.icon className="h-3.5 w-3.5" />
            </span>
            <span className="min-w-0">
              <span className="block truncate text-xs font-semibold text-fg">{d.label}</span>
              <span className="block truncate text-[10px] text-fg-dim">{d.note}</span>
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
