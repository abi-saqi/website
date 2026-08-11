"use client";

import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { TiltCard } from "@/components/ui/tilt-card";
import { useLeadModal } from "@/components/providers/lead-modal-provider";
import { Camera, Megaphone, Phone, ArrowRight, X, Check } from "lucide-react";

const scenarios = [
  {
    icon: Camera,
    setup: "A lead DMs your Instagram at 11 PM",
    before: { icon: X, text: "Sits unread until morning — avg. 9h first response" },
    after: { icon: Check, text: "AI qualifies instantly, hands off only if high-intent — avg. 41s response" },
  },
  {
    icon: Megaphone,
    setup: "Marketing runs a ₹5L WhatsApp campaign",
    before: { icon: X, text: "No idea which leads actually became revenue" },
    after: { icon: Check, text: "ROAS tracked to the rupee, per campaign, per channel — 5.05x average" },
  },
  {
    icon: Phone,
    setup: "A VIP customer calls support",
    before: { icon: X, text: "Agent starts from zero — re-asks everything" },
    after: { icon: Check, text: "Full timeline — web visits, past chats, deal stage — before they say hello" },
  },
];

export function UseCaseScenarios() {
  const { openDemo } = useLeadModal();
  return (
    <RevealGroup className="grid gap-5 lg:grid-cols-3">
      {scenarios.map((s) => (
        <RevealItem key={s.setup}>
          <TiltCard className="flex h-full flex-col gap-5 p-6" strength={5} onClick={openDemo}>
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-r-sm bg-primary-soft text-primary">
                <s.icon className="h-5 w-5" />
              </span>
              <p className="text-sm font-semibold leading-5 text-fg">{s.setup}</p>
            </div>

            <div className="flex flex-col gap-2.5 border-t border-border pt-4">
              <div className="flex items-start gap-2.5">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-rose/10 text-rose">
                  <s.before.icon className="h-3 w-3" strokeWidth={2.5} />
                </span>
                <p className="text-sm leading-6 text-fg-dim line-through decoration-fg-dim/40">{s.before.text}</p>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary">
                  <s.after.icon className="h-3 w-3" strokeWidth={2.5} />
                </span>
                <p className="text-sm font-medium leading-6 text-fg">{s.after.text}</p>
              </div>
            </div>

            <div className="mt-auto flex items-center gap-1.5 pt-2 text-xs font-semibold text-primary">
              See how <ArrowRight className="h-3 w-3" />
            </div>
          </TiltCard>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}
