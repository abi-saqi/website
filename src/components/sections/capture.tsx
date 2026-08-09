"use client";

import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import {
  Globe,
  Camera,
  MessageCircle,
  Webhook,
  FormInput,
} from "lucide-react";

const sources = [
  { icon: Globe, label: "Website widget", desc: "Embeddable chat + tracking script, live on any page in minutes" },
  { icon: FormInput, label: "Forms & landing pages", desc: "Progressive profiling, UTM-aware, no duplicate contacts" },
  { icon: Camera, label: "Instagram & Facebook", desc: "Comments, DMs, and lead ads land straight in the same profile" },
  { icon: MessageCircle, label: "WhatsApp", desc: "Click-to-WhatsApp ads and Cloud API conversations, unified" },
  { icon: Webhook, label: "API & webhooks", desc: "Push leads in from any source system in real time" },
  { icon: Globe, label: "Ad platforms", desc: "Google & Meta lead-gen forms sync without a manual export" },
];

export function Capture() {
  return (
    <section id="capture" className="py-28 sm:py-36">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <SectionHeading
          eyebrow="Capture"
          title="Catch every lead, wherever it shows up"
          description="Website, social, ads, or a partner's system — every touch resolves to the same customer profile the instant it happens, with page-context and campaign source attached automatically."
        />

        <RevealGroup className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sources.map((s) => (
            <RevealItem key={s.label}>
              <div className="group h-full rounded-r border border-border bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_8px_30px_-12px_rgba(5,150,105,0.25)]">
                <div className="flex h-10 w-10 items-center justify-center rounded-r-sm bg-primary-soft text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                  <s.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-fg">{s.label}</h3>
                <p className="mt-1.5 text-sm leading-6 text-fg-muted">{s.desc}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal delay={0.1} className="mt-6">
          <div className="rounded-r border border-dashed border-border-strong bg-elevated p-6 text-sm leading-6 text-fg-muted sm:p-8">
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
