"use client";

import { SectionHeading } from "@/components/ui/section-heading";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { StatCounter } from "@/components/ui/stat-counter";
import { TrendingUp, Smile, Meh, Frown } from "lucide-react";

const sentimentBars = [62, 71, 58, 80, 74, 88, 91, 85, 93, 97, 90, 96];

const stats = [
  { value: 2.4, suffix: "s", decimals: 1, label: "Median first response time" },
  { value: 38, suffix: "%", label: "Lift in qualified pipeline" },
  { value: 400, suffix: "K+", label: "Messages orchestrated / day" },
  { value: 99.95, suffix: "%", decimals: 2, label: "Platform uptime SLA" },
];

export function Insights() {
  return (
    <section id="insights" className="py-28 sm:py-36">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <SectionHeading
          eyebrow="Real-time insight"
          title="Understand the customer while the conversation is still open"
          description="Sentiment, intent, and funnel health update live — not in tomorrow's report — so marketing and sales can react while it still matters."
        />

        <div className="mt-16 grid gap-6 lg:grid-cols-5">
          <RevealItem className="lg:col-span-3">
            <div className="h-full rounded-r border border-border bg-surface p-6 sm:p-8">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-fg">Sentiment trend</p>
                  <p className="text-xs text-fg-dim">Last 12 weeks · all channels</p>
                </div>
                <span className="flex items-center gap-1.5 rounded-full bg-primary-soft px-2.5 py-1 text-xs font-medium text-primary-hi">
                  <TrendingUp className="h-3.5 w-3.5" /> +19%
                </span>
              </div>

              <div className="mt-8 flex h-40 items-end gap-2.5">
                {sentimentBars.map((v, i) => (
                  <div key={i} className="flex flex-1 flex-col items-center gap-2">
                    <div className="relative w-full overflow-hidden rounded-t-sm bg-raised" style={{ height: "100%" }}>
                      <div
                        className="absolute bottom-0 w-full rounded-t-sm bg-gradient-to-t from-e600 to-e400 transition-all duration-700"
                        style={{ height: `${v}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex items-center gap-6 border-t border-border pt-5 text-xs text-fg-muted">
                <span className="flex items-center gap-1.5"><Smile className="h-3.5 w-3.5 text-e600" /> Positive 71%</span>
                <span className="flex items-center gap-1.5"><Meh className="h-3.5 w-3.5 text-amber" /> Neutral 22%</span>
                <span className="flex items-center gap-1.5"><Frown className="h-3.5 w-3.5 text-rose" /> Negative 7%</span>
              </div>
            </div>
          </RevealItem>

          <RevealItem className="lg:col-span-2">
            <div className="flex h-full flex-col justify-between gap-6 rounded-r border border-border bg-surface p-6 sm:p-8">
              <p className="text-sm font-semibold text-fg">Live funnel</p>
              {[
                { label: "Website visitors", value: 100, tone: "bg-border-strong" },
                { label: "Leads captured", value: 34, tone: "bg-e400" },
                { label: "Qualified (score ≥ 70)", value: 19, tone: "bg-e600" },
                { label: "Meetings booked", value: 8, tone: "bg-e800" },
              ].map((row) => (
                <div key={row.label}>
                  <div className="flex items-center justify-between text-xs text-fg-muted">
                    <span>{row.label}</span>
                    <span className="font-mono-tabular text-fg-dim">{row.value}%</span>
                  </div>
                  <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-raised">
                    <div className={`h-full rounded-full ${row.tone}`} style={{ width: `${row.value}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </RevealItem>
        </div>

        <RevealGroup className="mt-14 grid grid-cols-2 gap-8 border-t border-border pt-14 sm:grid-cols-4">
          {stats.map((s) => (
            <RevealItem key={s.label}>
              <StatCounter {...s} />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
