import Link from "next/link";
import { ArrowUpRight, Layers } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { StatCounter } from "@/components/ui/stat-counter";
import { CHANNELS, STAGES } from "@/lib/channels";

/**
 * Compact counterpart to the full animated diagram on /use-cases. Same story
 * (many channels in, one number out), told as a channel grid plus a stage
 * stepper rather than the large radial SVG — so a visitor who reads Home and
 * then clicks through isn't shown the identical graphic twice.
 */
export function OmnichannelTeaser() {
  return (
    <section id="omnichannel" className="wash border-t border-border bg-elevated py-28 sm:py-36">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <SectionHeading
          eyebrow="Omnichannel metrics"
          title="Eight channels in. One revenue number out."
          description="Website, WhatsApp, Instagram, voice, RCS, and ad clicks — including Click-to-WhatsApp — resolve to one profile, scored, routed, and tied back to pipeline in real time."
        />

        <RevealGroup className="mt-14 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
          {CHANNELS.map((c) => (
            <RevealItem key={c.label}>
              <div className="glass flex h-full items-center gap-2.5 rounded-r px-3 py-3">
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-r-sm ${c.chip}`}
                >
                  <c.icon className="h-4 w-4" />
                </span>
                <span className="min-w-0 text-xs font-medium leading-tight text-fg">{c.label}</span>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal delay={0.1} className="mt-3">
          <div className="glass-strong flex flex-col gap-6 rounded-r p-6 sm:p-7 lg:flex-row lg:items-center lg:gap-8">
            <div className="flex items-start gap-3.5 lg:w-64 lg:shrink-0">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-r-sm bg-primary text-white">
                <Layers className="h-5 w-5" />
              </span>
              <div>
                <p className="text-base font-semibold text-fg">One unified profile</p>
                <p className="mt-1 text-sm leading-6 text-fg-muted">
                  Every channel above resolves to the same record, instantly.
                </p>
              </div>
            </div>

            <div className="flex flex-1 flex-col gap-3 border-y border-border py-5 sm:flex-row sm:items-center sm:justify-around sm:gap-2 lg:border-x lg:border-y-0 lg:px-8 lg:py-0">
              {STAGES.map((s) => (
                <div key={s.label} className="flex items-center gap-2.5">
                  <span
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-white"
                    style={{ backgroundColor: s.color }}
                  >
                    <s.icon className="h-3.5 w-3.5" />
                  </span>
                  <div className="leading-tight">
                    <p className="text-sm font-semibold text-fg">{s.label}</p>
                    <p className="text-[11px] text-fg-dim">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:shrink-0">
              <StatCounter
                value={2.89}
                decimals={2}
                prefix="₹"
                suffix=" Cr"
                label="Pipeline influenced, this month"
              />
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.15} className="mt-8 flex justify-center">
          <Link
            href="/use-cases"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary-hi"
          >
            See it running live, end to end <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
