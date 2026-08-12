"use client";

import { SectionHeading } from "@/components/ui/section-heading";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { TiltCard } from "@/components/ui/tilt-card";
import {
  Cloud,
  Orbit,
  Grid2x2,
  ShoppingBag,
  Megaphone,
  Target,
  Zap,
  GitBranch,
} from "lucide-react";

const integrations = [
  { icon: Cloud, name: "Salesforce", category: "CRM", chip: "bg-[#00A1E0]/14 text-[#00A1E0]" },
  { icon: Orbit, name: "HubSpot", category: "CRM", chip: "bg-[#FF7A59]/14 text-[#FF7A59]" },
  { icon: Grid2x2, name: "Zoho", category: "CRM", chip: "bg-rose/14 text-rose" },
  { icon: ShoppingBag, name: "Shopify", category: "Commerce", chip: "bg-[#95BF47]/16 text-[#5E8E3E]" },
  { icon: Megaphone, name: "Google Ads", category: "Ads", chip: "bg-[#F59E0B]/14 text-[#B45309]" },
  { icon: Target, name: "Meta Ads", category: "Ads", chip: "bg-[#0866FF]/12 text-[#0866FF]" },
  { icon: Zap, name: "Zapier", category: "Automation", chip: "bg-[#FF4A00]/14 text-[#FF4A00]" },
  { icon: GitBranch, name: "Segment", category: "Data", chip: "bg-teal/14 text-teal-dk" },
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
                <span className={`flex h-11 w-11 items-center justify-center rounded-r-sm ${it.chip}`}>
                  <it.icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-fg">{it.name}</p>
                  <p className="text-[11px] uppercase tracking-wide text-fg-dim">{it.category}</p>
                </div>
              </TiltCard>
            </RevealItem>
          ))}
        </RevealGroup>

        <RevealGroup className="mt-6 grid gap-4 sm:grid-cols-3">
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
