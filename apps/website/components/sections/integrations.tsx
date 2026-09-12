"use client";

import Link from "next/link";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { TiltCard } from "@/components/ui/tilt-card";
import {
  HubSpotIcon,
  ZohoIcon,
  ShopifyIcon,
  WooCommerceIcon,
  GoogleAdsIcon,
  MetaIcon,
  ZapierIcon,
  ZendeskIcon,
} from "@/components/ui/brand-icons";

/**
 * Real marks only. A connector wall is the one place on a marketing site where
 * a generic glyph actively costs trust — the reader is scanning for a logo
 * they recognise, and a grid of identical outline shapes tells them nothing.
 * Connectors whose marks are not open-licensed are named in the line below the
 * grid instead of being drawn.
 */
const integrations = [
  { icon: HubSpotIcon, name: "HubSpot", category: "CRM", chip: "bg-[#FF7A59]/12 text-[#FF7A59]" },
  { icon: ZohoIcon, name: "Zoho", category: "CRM", chip: "bg-[#E42527]/10 text-[#E42527]" },
  {
    icon: ShopifyIcon,
    name: "Shopify",
    category: "Commerce",
    chip: "bg-[#7AB55C]/14 text-[#5E8E3E]",
  },
  {
    icon: WooCommerceIcon,
    name: "WooCommerce",
    category: "Commerce",
    chip: "bg-[#96588A]/12 text-[#96588A]",
  },
  {
    icon: GoogleAdsIcon,
    name: "Google Ads",
    category: "Ads",
    chip: "bg-[#4285F4]/12 text-[#4285F4]",
  },
  { icon: MetaIcon, name: "Meta Ads", category: "Ads", chip: "bg-[#0467DF]/12 text-[#0467DF]" },
  {
    icon: ZapierIcon,
    name: "Zapier",
    category: "Automation",
    chip: "bg-[#FF4F00]/12 text-[#FF4F00]",
  },
  {
    icon: ZendeskIcon,
    name: "Zendesk",
    category: "Support",
    // Zendesk's primary #03363D disappears on a dark band; their secondary
    // green reads on both grounds.
    chip: "bg-[#78A300]/14 text-[#78A300]",
  },
];

export function Integrations() {
  return (
    <section id="integrations" className="wash-warm py-28 sm:py-36">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <SectionHeading
          eyebrow="Integrations"
          title="Plugs into the stack you already run"
          description="Sync contacts and pipeline both ways — saqi.ai doesn't ask you to rip out your CRM or ad stack, just to stop reconciling them by hand."
        />

        <RevealGroup className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {integrations.map((it) => (
            <RevealItem key={it.name}>
              <TiltCard className="flex h-full flex-col items-center gap-3 p-6 text-center" strength={5}>
                <span
                  className={`flex h-12 w-12 items-center justify-center rounded-r-sm ${it.chip}`}
                >
                  <it.icon className="h-6 w-6" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-fg">{it.name}</p>
                  <p className="text-[11px] uppercase tracking-wide text-fg-dim">{it.category}</p>
                </div>
              </TiltCard>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal delay={0.1}>
          <p className="mt-6 text-center text-sm text-fg-muted">
            Salesforce, Slack, Segment and Twilio connectors ship too, alongside{" "}
            <span className="font-semibold text-fg">40+</span> more —{" "}
            <Link href="/developers" className="font-semibold text-primary hover:text-primary-hi">
              and anything else through the API
            </Link>
            .
          </p>
        </Reveal>

        <RevealGroup className="mt-10 grid gap-4 sm:grid-cols-3">
          {[
            { stat: "2-way sync", desc: "Contact, deal, and pipeline updates flow both directions in near real time." },
            { stat: "No migration", desc: "Keep your CRM as the system of record — saqi.ai enriches it, doesn't replace it." },
            { stat: "REST + GraphQL", desc: "Anything not covered by a native connector goes through the public API." },
          ].map((f) => (
            <RevealItem key={f.stat}>
              <div className="glass h-full rounded-r p-5">
                <p className="text-sm font-semibold text-primary">{f.stat}</p>
                <p className="mt-1.5 text-sm leading-6 text-fg-muted">{f.desc}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
