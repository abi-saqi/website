import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { Badge } from "@/components/ui/badge";
import { StatCounter } from "@/components/ui/stat-counter";
import { OmnichannelFlow } from "@/components/sections/omnichannel-flow";
import { UseCaseScenarios } from "@/components/sections/use-case-scenarios";
import { DashboardPreview } from "@/components/sections/dashboard-preview";
import { CTA } from "@/components/sections/cta";

export const metadata: Metadata = {
  title: "Use Cases — See saqi.ai capture, qualify, and convert in real time",
  description:
    "Walk through how saqi.ai turns every channel — website, WhatsApp, Instagram, voice, and ads — into one real-time customer profile, scored, routed, and tied back to revenue.",
};

const roiStats = [
  { value: 34, suffix: "%", label: "Lower cost per qualified lead" },
  { value: 41, suffix: "s", label: "Avg. response time, any channel" },
  { value: 5.05, decimals: 2, suffix: "x", label: "Average attributed ROAS" },
  { value: 92, suffix: "%", label: "Retention on managed accounts" },
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
              Instagram, voice, and ad clicks flowing into one profile, scored, routed, and
              tied back to ₹ pipeline.
            </p>
          </Reveal>
        </div>

        <div className="mx-auto mt-16 max-w-6xl px-6 sm:px-8">
          <Reveal delay={0.15}>
            <OmnichannelFlow />
          </Reveal>
        </div>
      </section>

      <section className="py-20 sm:py-28">
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

      <section className="border-t border-border bg-elevated py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-6 sm:px-8">
          <SectionHeading
            eyebrow="Inside the console"
            title="The actual dashboard, not a mockup"
            description="Every screen below is a real saqi.ai workspace — switch tabs to see capture, voice, conversations, and pipeline as your team would."
          />
          <div className="mt-14">
            <DashboardPreview />
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-6 sm:px-8">
          <RevealGroup className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {roiStats.map((s) => (
              <RevealItem key={s.label}>
                <StatCounter {...s} />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <CTA />
    </>
  );
}
