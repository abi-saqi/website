import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { Badge } from "@/components/ui/badge";
import { StatCounter } from "@/components/ui/stat-counter";
import { OmnichannelFlow } from "@/components/sections/omnichannel-flow";
import { UseCaseScenarios } from "@/components/sections/use-case-scenarios";
import { DashboardShowcase } from "@/components/sections/dashboard-showcase";
import { EventMatrix } from "@/components/sections/event-matrix";
import { CTA } from "@/components/sections/cta";
import { TrendingDown, Zap, TrendingUp, HeartHandshake } from "lucide-react";

export const metadata: Metadata = {
  title: "Use Cases — See saqi.ai capture, qualify, and convert in real time",
  description:
    "Walk through how saqi.ai turns every channel — website, WhatsApp, Instagram, RCS, voice, and ads — into one real-time customer profile, scored, routed, and tied back to revenue.",
};

const roiStats = [
  {
    icon: TrendingDown,
    value: 34,
    suffix: "%",
    label: "Lower cost per qualified lead",
    chip: "bg-primary-soft text-primary",
  },
  {
    icon: Zap,
    value: 41,
    suffix: "s",
    label: "Avg. response time, any channel",
    chip: "bg-[#F59E0B]/14 text-[#B45309]",
  },
  {
    icon: TrendingUp,
    value: 5.05,
    decimals: 2,
    suffix: "x",
    label: "Average attributed ROAS",
    chip: "bg-[#3B82F6]/12 text-[#3B82F6]",
  },
  {
    icon: HeartHandshake,
    value: 92,
    suffix: "%",
    label: "Retention on managed accounts",
    chip: "bg-teal/12 text-teal-dk",
  },
];

export default function UseCasesPage() {
  return (
    <>
      <section className="relative overflow-hidden pb-20 pt-36 sm:pb-28 sm:pt-40">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,var(--primary-soft),transparent)]" />
        <div className="mx-auto max-w-4xl px-6 text-center sm:px-8">
          <Reveal>
            <Badge>Omnichannel · capture to revenue</Badge>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-6 text-balance text-4xl font-semibold leading-[1.1] tracking-tight text-fg sm:text-5xl md:text-6xl">
              Every channel in.
              <br />
              <span className="bg-gradient-to-r from-e600 via-primary to-teal bg-clip-text text-transparent">
                One revenue number out.
              </span>
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-6 max-w-2xl text-balance text-lg leading-8 text-fg-muted">
              This is what your team actually sees — not a feature list. Website, WhatsApp,
              Instagram, RCS, voice, and ad clicks — including Click-to-WhatsApp — flowing into
              one profile, scored, routed, and tied back to ₹ pipeline.
            </p>
          </Reveal>
        </div>

        <div className="mx-auto mt-16 max-w-6xl px-6 sm:px-8">
          <Reveal delay={0.15}>
            <OmnichannelFlow />
          </Reveal>
        </div>
      </section>

      <section className="relative overflow-hidden py-20 sm:py-28">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-[-4%] top-[10%] h-72 w-72 rounded-full bg-[#0866FF]/10 blur-[120px]" />
          <div className="absolute right-[-4%] bottom-[5%] h-72 w-72 rounded-full bg-[#F97316]/10 blur-[120px]" />
        </div>
        <div className="mx-auto max-w-6xl px-6 sm:px-8">
          <SectionHeading
            eyebrow="Real scenarios"
            title="What changes for your team, day to day"
            description="Not hypothetical — this is the before/after our existing customers describe in the first week."
          />
          <div className="mt-14">
            <UseCaseScenarios />
          </div>
        </div>
      </section>

      <section className="wash-warm border-t border-border bg-elevated py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-6 sm:px-8">
          <SectionHeading
            eyebrow="Events & integrations"
            title="What your other systems can set off"
            description="Every row is an event one of your existing tools already emits, and what saqi.ai does the moment it arrives — the nudge, the template, the CRM write-back."
          />
          <div className="mt-14">
            <EventMatrix />
          </div>
        </div>
      </section>

      <section className="border-t border-border pt-20 sm:pt-28">
        <div className="mx-auto max-w-6xl px-6 sm:px-8">
          <SectionHeading
            eyebrow="Inside the console"
            title="The actual console, not a mockup"
            description="Every screen here is a real saqi.ai workspace. Keep scrolling to move through capture, voice, conversations, and pipeline as your team would."
          />
        </div>
        <div className="mt-14 pb-20 sm:pb-28">
          <DashboardShowcase />
        </div>
      </section>

      <section className="relative overflow-hidden py-20 sm:py-28">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_50%_50%_at_50%_50%,var(--primary-soft),transparent)]" />
        <div className="mx-auto max-w-6xl px-6 sm:px-8">
          <RevealGroup className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {roiStats.map(({ icon: Icon, chip, ...s }) => (
              <RevealItem key={s.label}>
                <div className="glass flex h-full flex-col gap-4 rounded-r p-5">
                  <span className={`flex h-9 w-9 items-center justify-center rounded-r-sm ${chip}`}>
                    <Icon className="h-4 w-4" />
                  </span>
                  <StatCounter {...s} />
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <CTA />
    </>
  );
}
