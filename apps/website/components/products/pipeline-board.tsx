"use client";

import { motion } from "framer-motion";

const stages = [
  {
    name: "Qualified",
    tint: "var(--e400)",
    deals: [
      { co: "Meridian Retail", value: "18.4L", prob: 30, owner: "RK", source: "WhatsApp" },
      { co: "Talwar Motors", value: "9.2L", prob: 25, owner: "AS", source: "Website" },
    ],
  },
  {
    name: "Demo booked",
    tint: "var(--e500)",
    deals: [
      { co: "Nandi Healthcare", value: "42.0L", prob: 50, owner: "PM", source: "Meta Ads" },
      { co: "Corex Logistics", value: "15.6L", prob: 45, owner: "RK", source: "Voice" },
    ],
  },
  {
    name: "Proposal",
    tint: "var(--e600)",
    deals: [{ co: "Vertex Fintech", value: "68.5L", prob: 70, owner: "SD", source: "Instagram" }],
  },
  {
    name: "Won",
    tint: "var(--e700)",
    deals: [{ co: "Anand Textiles", value: "31.2L", prob: 100, owner: "PM", source: "CTW Ads" }],
  },
];

export function PipelineBoard() {
  return (
    <div className="glass-strong rounded-r p-4 sm:p-5">
      <div className="flex items-end justify-between gap-4 border-b border-border pb-4">
        <div>
          <p className="text-sm font-semibold text-fg">Pipeline</p>
          <p className="text-xs text-fg-dim">Current quarter</p>
        </div>
        <div className="shrink-0 text-right">
          <p className="font-mono-tabular text-xl font-semibold leading-none text-fg">₹1.84 Cr</p>
          <p className="mt-1 text-[10px] font-semibold uppercase tracking-wide text-fg-dim">
            Weighted
          </p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2.5 lg:grid-cols-4">
        {stages.map((stage, si) => (
          <div key={stage.name} className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span
                className="h-2 w-2 shrink-0 rounded-full"
                style={{ backgroundColor: stage.tint }}
              />
              <p className="truncate text-[11px] font-semibold uppercase tracking-wide text-fg-dim">
                {stage.name}
              </p>
            </div>

            <div className="mt-2 flex flex-col gap-2">
              {stage.deals.map((d, di) => (
                <motion.div
                  key={d.co}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-15%" }}
                  transition={{
                    duration: 0.45,
                    delay: si * 0.08 + di * 0.06,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="rounded-r-sm border border-border bg-surface p-2.5"
                >
                  <p className="truncate text-xs font-semibold text-fg">{d.co}</p>
                  <p className="font-mono-tabular mt-0.5 text-[13px] font-semibold text-fg">
                    ₹{d.value}
                  </p>

                  <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-raised">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${d.prob}%` }}
                      viewport={{ once: true, margin: "-15%" }}
                      transition={{ duration: 0.8, delay: si * 0.08 + di * 0.06 + 0.2 }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: stage.tint }}
                    />
                  </div>

                  <div className="mt-2 flex items-center justify-between gap-1.5">
                    <span className="truncate text-[10px] text-fg-dim">{d.source}</span>
                    <span className="flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full bg-primary-soft text-[9px] font-semibold text-primary">
                      {d.owner}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
