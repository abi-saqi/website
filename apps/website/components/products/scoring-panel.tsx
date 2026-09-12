"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const signals = [
  { label: "Matches ICP (fintech, 200–1000 seats)", points: 25 },
  { label: "Viewed pricing page 3×", points: 18 },
  { label: "Replied on WhatsApp within 1h", points: 22 },
  { label: "Opened proposal, no reply 5 days", points: -8 },
  { label: "Demo attended", points: 25 },
];

const total = signals.reduce((sum, s) => sum + s.points, 0);

export function ScoringPanel() {
  return (
    <div className="glass-strong rounded-r p-5 sm:p-6">
      <div className="flex items-start justify-between gap-4 border-b border-border pb-4">
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-fg">Vertex Fintech — R. Iyer</p>
          <p className="text-xs text-fg-dim">Last touch: WhatsApp · 41 min ago</p>
        </div>
        <div className="shrink-0 text-right">
          <p className="font-mono-tabular text-2xl font-semibold leading-none text-primary">
            {total}
          </p>
          <p className="mt-1 text-[10px] font-semibold uppercase tracking-wide text-fg-dim">
            Score
          </p>
        </div>
      </div>

      <ul className="mt-4 flex flex-col gap-2.5">
        {signals.map((s, i) => {
          const positive = s.points > 0;
          return (
            <motion.li
              key={s.label}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="flex items-center gap-3"
            >
              <span className="min-w-0 flex-1 truncate text-xs text-fg-muted">{s.label}</span>
              <div className="h-1.5 w-16 shrink-0 overflow-hidden rounded-full bg-raised">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${(Math.abs(s.points) / 25) * 100}%` }}
                  viewport={{ once: true, margin: "-15%" }}
                  transition={{ duration: 0.7, delay: i * 0.07 + 0.15 }}
                  className={`h-full rounded-full ${positive ? "bg-primary" : "bg-rose"}`}
                />
              </div>
              <span
                className={`font-mono-tabular w-8 shrink-0 text-right text-xs font-semibold ${
                  positive ? "text-primary" : "text-rose"
                }`}
              >
                {positive ? "+" : ""}
                {s.points}
              </span>
            </motion.li>
          );
        })}
      </ul>

      <div className="mt-5 flex items-center gap-2.5 rounded-r-sm border border-primary/30 bg-primary-soft px-3 py-2.5">
        <ArrowRight className="h-4 w-4 shrink-0 text-primary" />
        <p className="min-w-0 text-xs font-medium text-fg">
          Routed to <span className="font-semibold">Priya M.</span> — Enterprise West, 2h SLA
        </p>
      </div>
    </div>
  );
}
