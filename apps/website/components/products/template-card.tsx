"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Globe } from "lucide-react";

const locales = ["en-IN", "hi-IN", "ta-IN", "mr-IN"];

export function TemplateCard() {
  return (
    <div className="glass-strong rounded-r p-5 sm:p-6">
      <div className="flex items-start justify-between gap-4 border-b border-border pb-4">
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-fg">order_shipped_v3</p>
          <p className="text-xs text-fg-dim">WhatsApp · Utility</p>
        </div>
        <span className="flex shrink-0 items-center gap-1.5 rounded-full bg-primary-soft px-2.5 py-1 text-[11px] font-medium text-primary">
          <CheckCircle2 className="h-3 w-3" />
          Approved
        </span>
      </div>

      {/* Rendered preview, so the variables are visible in place rather than
          described in prose. */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-15%" }}
        transition={{ duration: 0.45 }}
        className="mt-4 rounded-r-sm bg-[#25D366]/8 p-3.5"
      >
        <p className="text-sm leading-6 text-fg">
          Hi{" "}
          <span className="rounded bg-primary-soft px-1 font-mono-tabular text-[12px] text-primary">
            {"{{1}}"}
          </span>
          , your order{" "}
          <span className="rounded bg-primary-soft px-1 font-mono-tabular text-[12px] text-primary">
            {"{{2}}"}
          </span>{" "}
          has shipped and arrives by{" "}
          <span className="rounded bg-primary-soft px-1 font-mono-tabular text-[12px] text-primary">
            {"{{3}}"}
          </span>
          .
        </p>
        <div className="mt-3 flex gap-2">
          <span className="flex-1 rounded-r-sm border border-[#25D366]/30 bg-surface py-1.5 text-center text-xs font-medium text-[#1DA851]">
            Track order
          </span>
          <span className="flex-1 rounded-r-sm border border-[#25D366]/30 bg-surface py-1.5 text-center text-xs font-medium text-[#1DA851]">
            Talk to us
          </span>
        </div>
      </motion.div>

      <div className="mt-4 flex items-center gap-2">
        <Globe className="h-3.5 w-3.5 shrink-0 text-fg-dim" />
        <div className="flex flex-wrap gap-1.5">
          {locales.map((l) => (
            <span
              key={l}
              className="font-mono-tabular rounded-full border border-border px-2 py-0.5 text-[10px] text-fg-muted"
            >
              {l}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
