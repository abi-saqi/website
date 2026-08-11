import { SectionHeading } from "@/components/ui/section-heading";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { TiltCard } from "@/components/ui/tilt-card";
import { ShieldCheck, Lock, FileCheck2, Globe2, Users, ScrollText } from "lucide-react";

const pillars = [
  {
    icon: Lock,
    title: "Consent enforced inline",
    desc: "Every send clears one non-bypassable gate — consent, suppression, quiet hours, and frequency caps — before it leaves the platform.",
  },
  {
    icon: ScrollText,
    title: "Hash-chained audit trail",
    desc: "Every mutation is logged and exportable to your SIEM. No message is ever dropped silently — every suppression carries a reason.",
  },
  {
    icon: Globe2,
    title: "Data residency by design",
    desc: "DPDP, GDPR, and CCPA satisfied from one codebase, with PII pinned to region and jurisdiction rule packs applied automatically.",
  },
  {
    icon: Users,
    title: "SSO, SCIM & RBAC",
    desc: "Enterprise identity from day one — single sign-on, automated provisioning, and role-based access down to the field level.",
  },
  {
    icon: FileCheck2,
    title: "DLT & 10DLC compliant",
    desc: "WhatsApp template approval, DLT registration, and TCPA-safe sending handled inline, per market, per channel.",
  },
  {
    icon: ShieldCheck,
    title: "SOC 2 & ISO 27001",
    desc: "Independently audited security controls, backed by tested backup and disaster-recovery drills.",
  },
];

export function Trust() {
  return (
    <section id="trust" className="border-t border-border bg-elevated py-28 sm:py-36">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <SectionHeading
          eyebrow="Trust & compliance"
          title="Enterprise-grade by default, not by add-on"
          description="Procurement asks for this in writing. It ships with the platform, not as a professional-services project."
        />

        <RevealGroup className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map((p) => (
            <RevealItem key={p.title}>
              <TiltCard className="h-full p-6" strength={5}>
                <div className="flex h-10 w-10 items-center justify-center rounded-r-sm bg-primary-soft text-primary">
                  <p.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-fg">{p.title}</h3>
                <p className="mt-1.5 text-sm leading-6 text-fg-muted">{p.desc}</p>
              </TiltCard>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
