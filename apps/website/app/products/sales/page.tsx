import type { Metadata } from "next";
import { Workflow, GitBranch, Target } from "lucide-react";
import { ProductHero, ProductFooterNav } from "@/components/products/product-hero";
import { FeatureRow } from "@/components/products/feature-row";
import { PipelineBoard } from "@/components/products/pipeline-board";
import { AutomationFlow } from "@/components/products/automation-flow";
import { ScoringPanel } from "@/components/products/scoring-panel";
import { SectionHeading } from "@/components/ui/section-heading";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { StatCounter } from "@/components/ui/stat-counter";
import { CTA } from "@/components/sections/cta";

export const metadata: Metadata = {
  title: "Sales — pipeline, automation, and routing | saqi.ai",
  description:
    "Run pipeline, deal automation, lead scoring, and territory routing on the same customer profile your marketing and support teams use. Built for revenue teams that need one system of record.",
};

const outcomes = [
  { value: 41, suffix: "s", label: "Median first response, any channel" },
  { value: 34, suffix: "%", label: "Lower cost per qualified lead" },
  { value: 2.1, decimals: 1, suffix: "×", label: "More demos per rep, per week" },
  { value: 96, suffix: "%", label: "Routing accuracy against territory rules" },
];

export default function SalesPage() {
  return (
    <>
      <ProductHero
        eyebrow="Products · Sales"
        title={
          <>
            One pipeline, fed by every
            <br />
            conversation your team has.
          </>
        }
        lede="Deals, tasks, and forecasts sit on the same customer profile as the WhatsApp thread, the ad click, and the support call — so a rep opens one record, not six tabs."
        proof={[
          "Two-way CRM sync",
          "Territory & round-robin routing",
          "Field-level RBAC",
          "Full audit trail",
        ]}
        secondary={{ href: "/use-cases", label: "See it end to end" }}
      />

      <FeatureRow
        icon={Workflow}
        eyebrow="Pipeline"
        title="A pipeline that reflects what actually happened"
        body="Stages update from real activity — a reply on WhatsApp, a call transcript, a proposal opened — instead of waiting for a rep to remember to log it. Weighted value recalculates as probability moves."
        bullets={[
          "Custom stages, per team or per region",
          "Weighted and unweighted forecast side by side",
          "Deal health from response latency and sentiment",
          "Stage changes written back to Salesforce, HubSpot, or Zoho",
        ]}
        visual={<PipelineBoard />}
      />

      <FeatureRow
        icon={GitBranch}
        eyebrow="Automation"
        title="Rules your ops team can read without a developer"
        body="Trigger on any event the platform sees, branch on any field it stores, and act across channels, CRM records, and tasks. Every outbound step still clears the same consent gate as a campaign."
        bullets={[
          "Trigger, condition, and action nodes with versioning",
          "Branching on score, source, territory, or custom fields",
          "Dry-run against last week's traffic before you enable it",
          "Every run logged with the reason it took each branch",
        ]}
        visual={<AutomationFlow />}
        flip
        className="border-t border-border bg-elevated"
      />

      <FeatureRow
        icon={Target}
        eyebrow="Scoring & routing"
        title="The right rep, while the lead is still warm"
        body="Scoring reads behavioural signals and firmographics together, then routing assigns on territory, language, skill, and current load — with an SLA timer attached from the moment it lands."
        bullets={[
          "Transparent scores — every point traceable to a signal",
          "Round-robin, load-balanced, or strict territory assignment",
          "Escalation when an SLA timer is about to breach",
          "Reassignment rules for out-of-office and overflow",
        ]}
        visual={<ScoringPanel />}
      />

      <section className="wash-warm border-t border-border bg-elevated py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-6 sm:px-8">
          <SectionHeading
            eyebrow="Outcomes"
            title="What changes in the first quarter"
            description="Measured across managed accounts running pipeline and routing on saqi.ai. Your numbers will differ — these are the ranges we plan against in a pilot."
          />
          <RevealGroup className="mt-14 grid grid-cols-2 gap-8 sm:grid-cols-4">
            {outcomes.map((o) => (
              <RevealItem key={o.label}>
                <StatCounter {...o} />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <ProductFooterNav
        links={[
          {
            href: "/products/marketing",
            label: "Marketing",
            desc: "Campaigns, nudges, bots, and ad audiences on the same profile.",
          },
          {
            href: "/use-cases",
            label: "Use cases",
            desc: "How events from your stack turn into routed, qualified pipeline.",
          },
          {
            href: "/#trust",
            label: "Trust & compliance",
            desc: "Consent, residency, audit trail, and access control.",
          },
        ]}
      />

      <CTA />
    </>
  );
}
