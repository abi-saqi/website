import type { Metadata } from "next";
import Link from "next/link";
import { Filter, BellRing, LayoutTemplate, Bot, Code2, ArrowUpRight } from "lucide-react";
import { ProductHero, ProductFooterNav } from "@/components/products/product-hero";
import { FeatureRow } from "@/components/products/feature-row";
import { AudienceBuilder } from "@/components/products/audience-builder";
import { NudgeTimeline } from "@/components/products/nudge-timeline";
import { TemplateCard } from "@/components/products/template-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { TiltCard } from "@/components/ui/tilt-card";
import { CTA } from "@/components/sections/cta";

export const metadata: Metadata = {
  title: "Marketing — campaigns, nudges, bots, and ad audiences | saqi.ai",
  description:
    "Build audiences from live behaviour, sync them to Google and Meta, trigger nudges from Shopify and Facebook catalog events, and run WhatsApp and RCS campaigns — every send through one consent gate.",
};

const bots = [
  {
    title: "Qualify before a human sees it",
    desc: "The bot asks the three questions your reps always ask, scores the answers, and only escalates what clears the bar.",
  },
  {
    title: "Answer from your own content",
    desc: "Retrieval runs against your docs and catalog, and every answer carries a citation. No citation, no send.",
  },
  {
    title: "Hand off with the full thread",
    desc: "When confidence drops or sentiment turns, the agent inherits the transcript, the profile, and the deal — mid-sentence.",
  },
  {
    title: "Stay inside the rules",
    desc: "Outside the WhatsApp session window the bot switches to an approved template instead of failing the send silently.",
  },
];

const requestSample = `POST /v1/events
Authorization: Bearer sk_live_••••

{
  "type": "cart.abandoned",
  "profile": { "phone": "+919820098200" },
  "properties": {
    "cart_id": "cart_8812",
    "value": 12400,
    "currency": "INR",
    "items": 3
  }
}`;

const responseSample = `201 Created

{
  "id": "evt_01JQ8W7K2M",
  "status": "accepted",
  "profile_id": "prf_7T2ZC9",
  "matched_journeys": [
    { "id": "jrn_cart_recovery", "action": "enqueued" }
  ],
  "policy": { "consent": "granted", "quiet_hours": false }
}`;

export default function MarketingPage() {
  return (
    <>
      <ProductHero
        eyebrow="Products · Marketing"
        title={
          <>
            Reach people on the channel
            <br />
            they already answer.
          </>
        }
        lede="Audiences built from live behaviour, nudges triggered by events from your own stack, and campaigns that clear consent, frequency, and quiet hours before a single message leaves the platform."
        proof={[
          "Consent gate on every send",
          "Google & Meta audience sync",
          "Template governance",
          "Per-market rule packs",
        ]}
        secondary={{ href: "/use-cases", label: "See the event flow" }}
      />

      <FeatureRow
        icon={Filter}
        eyebrow="Audiences & ad targeting"
        title="One segment, every destination"
        body="Build a segment once from behaviour, score, source, and consent state — then push it to Google Customer Match, Meta Custom Audiences, a Shopify catalog segment, or a WhatsApp campaign. Membership updates as people qualify and drop out."
        bullets={[
          "Live membership — no nightly CSV export",
          "Consent state is a first-class rule, not a filter you can forget",
          "Suppression applies to ad destinations too, not just messaging",
          "Catalog segments from Shopify and Facebook product feeds",
        ]}
        visual={<AudienceBuilder />}
      />

      <FeatureRow
        icon={BellRing}
        eyebrow="Nudges"
        title="Triggered by what happened, not by a calendar"
        body="Any event your stack emits — a Shopify cart, a catalog view, a support ticket, a webhook from your own backend — can start a nudge. Timing respects quiet hours in the customer's timezone, and the fallback channel only fires if the first one went unread."
        bullets={[
          "Event-triggered from any third-party integration or webhook",
          "Channel fallback: WhatsApp, then RCS, never both",
          "Frequency caps applied per profile, across every journey",
          "Every suppression logged with a machine-readable reason",
        ]}
        visual={<NudgeTimeline />}
        flip
        className="ink ink-glow relative"
      />

      <FeatureRow
        icon={LayoutTemplate}
        eyebrow="Campaigns & templates"
        title="Templates that survive review"
        body="Draft, localise, and submit templates for approval from the console, then track which variants are approved in which market. Broadcasts run through the dispatcher with fair scheduling, so one large campaign never starves your transactional traffic."
        bullets={[
          "Approval state tracked per template, per locale",
          "Variables validated before submission, not after rejection",
          "Bulk sends rate-limited per provider, with automatic failover",
          "Delivery, read, and reply receipts reconciled back to the profile",
        ]}
        visual={<TemplateCard />}
      />

      <section className="wash border-t border-border bg-elevated py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-6 sm:px-8">
          <SectionHeading
            eyebrow="Bots & automations"
            title="Automation that knows when to stop automating"
            description="The bot handles the repetitive opening moves. The moment it is out of its depth, a human takes over with everything already in context."
          />
          <RevealGroup className="mt-14 grid gap-4 sm:grid-cols-2">
            {bots.map((b) => (
              <RevealItem key={b.title}>
                <TiltCard className="h-full p-6" strength={5}>
                  <span className="flex h-10 w-10 items-center justify-center rounded-r-sm bg-primary-soft text-primary">
                    <Bot className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-base font-semibold text-fg">{b.title}</h3>
                  <p className="mt-1.5 text-sm leading-6 text-fg-muted">{b.desc}</p>
                </TiltCard>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-6 sm:px-8">
          <SectionHeading
            eyebrow="APIs"
            title="Send us an event, get a decision back"
            description="One endpoint takes any event from your stack. The response tells you which journeys matched and what the policy gate decided — so you can see why a message did or did not go out."
          />

          <div className="mt-14 grid gap-4 lg:grid-cols-2">
            {/* min-w-0: without it the grid item takes the code block's
                max-content width and overflows the viewport on phones, so the
                pre's own overflow-x-auto never gets a chance to engage. */}
            <Reveal className="min-w-0">
              <div className="glass h-full overflow-hidden rounded-r">
                <div className="flex items-center gap-2 border-b border-border px-4 py-2.5">
                  <Code2 className="h-3.5 w-3.5 text-fg-dim" />
                  <span className="text-[11px] font-semibold uppercase tracking-wide text-fg-dim">
                    Request
                  </span>
                </div>
                <pre className="overflow-x-auto px-4 py-4 text-[12.5px] leading-6 text-fg-muted">
                  <code className="font-mono-tabular">{requestSample}</code>
                </pre>
              </div>
            </Reveal>

            <Reveal delay={0.08} className="min-w-0">
              <div className="glass h-full overflow-hidden rounded-r">
                <div className="flex items-center gap-2 border-b border-border px-4 py-2.5">
                  <Code2 className="h-3.5 w-3.5 text-primary" />
                  <span className="text-[11px] font-semibold uppercase tracking-wide text-primary">
                    Response
                  </span>
                </div>
                <pre className="overflow-x-auto px-4 py-4 text-[12.5px] leading-6 text-fg-muted">
                  <code className="font-mono-tabular">{responseSample}</code>
                </pre>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.15} className="mt-6 flex justify-center">
            <Link
              href="/use-cases"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary-hi"
            >
              See which events map to which journeys
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </Reveal>
        </div>
      </section>

      <ProductFooterNav
        links={[
          {
            href: "/products/sales",
            label: "Sales",
            desc: "Pipeline, deal automation, scoring, and territory routing.",
          },
          {
            href: "/use-cases",
            label: "Use cases",
            desc: "Third-party events turned into nudges, campaigns, and pipeline.",
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
