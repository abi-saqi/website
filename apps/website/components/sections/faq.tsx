"use client";

import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { Accordion } from "@/components/ui/accordion";
import { Rocket, Layers, ShieldCheck, MessageCircle, Globe2 } from "lucide-react";

const faqs = [
  {
    icon: Rocket,
    chip: "bg-primary-soft text-primary",
    question: "How long does it take to go live?",
    answer:
      "Most teams have the website widget and one WhatsApp number live within a week. Full campaign migration and CRM sync typically take 2–4 weeks depending on how much history you bring over.",
  },
  {
    icon: Layers,
    chip: "bg-teal/12 text-teal-dk",
    question: "Do we have to replace our CRM?",
    answer:
      "No. Salesforce, HubSpot, and Zoho stay your system of record — saqi.ai syncs contacts and pipeline both ways and adds the real-time layer (capture, scoring, sentiment) your CRM was never built for.",
  },
  {
    icon: ShieldCheck,
    chip: "bg-amber/12 text-amber",
    question: "How does the consent gate actually work?",
    answer:
      "Every outbound message — campaign, bot reply, or agent send — passes through one inline policy check before it leaves the platform: consent status, suppression list, quiet hours, and frequency caps. Nothing bypasses it, and every suppression is logged with a machine-readable reason.",
  },
  {
    icon: MessageCircle,
    chip: "bg-[#25D366]/14 text-[#1DA851]",
    question: "Which WhatsApp setup do you support?",
    answer:
      "Meta's WhatsApp Cloud API as the primary path, with a BSP (Gupshup, 360dialog, or Infobip) as automatic failover behind one adapter interface — so a provider outage doesn't take down delivery.",
  },
  {
    icon: Globe2,
    chip: "bg-[#3B82F6]/12 text-[#3B82F6]",
    question: "Is our data pinned to a region?",
    answer:
      "Yes. PII is pinned to the tenant's region by design, with jurisdiction rule packs (DPDP for India, GDPR for the EU, TCPA/10DLC for the US) applied automatically rather than bolted on per market.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="border-t border-border bg-elevated py-28 sm:py-36">
      <div className="mx-auto max-w-3xl px-6 sm:px-8">
        <SectionHeading
          eyebrow="FAQ"
          title="Questions procurement usually asks first"
          description="If yours isn't here, a solutions engineer can answer it in the same call as the demo."
        />

        <Reveal delay={0.1} className="mt-14">
          <Accordion items={faqs} />
        </Reveal>
      </div>
    </section>
  );
}
