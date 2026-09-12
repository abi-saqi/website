"use client";

import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { TiltCard } from "@/components/ui/tilt-card";
import {
  Globe,
  Webhook,
  FormInput,
  Megaphone,
  Phone,
  MousePointerClick,
  ArrowUpRight,
} from "lucide-react";
import {
  InstagramIcon,
  WhatsAppIcon,
  GoogleMessagesIcon,
} from "@/components/ui/brand-icons";

const sources = [
  {
    icon: Globe,
    label: "Website widget",
    desc: "Embeddable chat + tracking script, live on any page in minutes",
    tag: "< 2 min setup",
    chip: "bg-primary-soft text-primary",
  },
  {
    icon: FormInput,
    label: "Forms & landing pages",
    desc: "Progressive profiling, UTM-aware, no duplicate contacts",
    tag: "Auto de-dupe",
    chip: "bg-teal/12 text-teal-dk",
  },
  {
    icon: InstagramIcon,
    label: "Instagram & Facebook",
    desc: "Comments, DMs, and lead ads land straight in the same profile",
    tag: "Real-time sync",
    chip: "bg-[#DD2A7B]/10",
  },
  {
    icon: WhatsAppIcon,
    label: "WhatsApp",
    desc: "Cloud API conversations, opted-in and unified with every other channel",
    tag: "Cloud API",
    chip: "bg-[#25D366]/14 text-[#1DA851]",
  },
  {
    icon: Phone,
    label: "Voice / IVR",
    desc: "Inbound and outbound calls transcribed, scored, and logged to the profile",
    tag: "Speech analytics",
    chip: "bg-[#3B82F6]/14 text-[#3B82F6]",
  },
  {
    icon: GoogleMessagesIcon,
    label: "RCS messaging",
    desc: "Rich cards, carousels, and suggested replies — Android's iMessage answer",
    tag: "Rich cards",
    chip: "bg-[#1A73E8]/12 text-[#1A73E8]",
  },
  {
    icon: MousePointerClick,
    label: "Click-to-WhatsApp ads",
    desc: "Meta CTW campaigns land the conversation directly in the same inbox",
    tag: "Meta CTW",
    chip: "bg-[#F97316]/14 text-[#EA580C]",
  },
  {
    icon: Megaphone,
    label: "Google & Meta Ads",
    desc: "Lead-gen forms sync without a manual export, spend tied to revenue",
    tag: "Zero manual export",
    chip: "bg-[#F59E0B]/14 text-[#B45309]",
  },
  {
    icon: Webhook,
    label: "API & webhooks",
    desc: "Push leads in from any source system in real time",
    tag: "REST + GraphQL",
    chip: "bg-slate/12 text-slate",
  },
];

export function Capture() {
  return (
    <section id="capture" className="wash py-28 sm:py-36">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <SectionHeading
          eyebrow="Capture"
          title="Catch every lead, wherever it shows up"
          description="Website, social, voice, ads, or a partner's system — every touch resolves to the same customer profile the instant it happens, with page-context and campaign source attached automatically."
        />

        <RevealGroup className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sources.map((s) => (
            <RevealItem key={s.label}>
              <TiltCard className="group h-full p-6" strength={6}>
                <div className="flex items-start justify-between">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-r-sm transition-transform group-hover:scale-105 ${s.chip}`}>
                    <s.icon className="h-5 w-5" />
                  </div>
                  <span className="rounded-full border border-border-strong px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-fg-dim">
                    {s.tag}
                  </span>
                </div>
                <h3 className="mt-4 flex items-center gap-1.5 text-base font-semibold text-fg">
                  {s.label}
                  <ArrowUpRight className="h-3.5 w-3.5 text-fg-dim opacity-0 transition-opacity group-hover:opacity-100" />
                </h3>
                <p className="mt-1.5 text-sm leading-6 text-fg-muted">{s.desc}</p>
              </TiltCard>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal delay={0.1} className="mt-6">
          <div className="glass rounded-r p-6 text-sm leading-6 text-fg-muted sm:p-8">
            <span className="font-semibold text-fg">Zero duplicate contacts. </span>
            Identity resolution merges anonymous website visits, ad clicks, and social
            conversations into one profile the moment an email, phone number, or login ties
            them together — so sales never works a lead twice.
          </div>
        </Reveal>
      </div>
    </section>
  );
}
