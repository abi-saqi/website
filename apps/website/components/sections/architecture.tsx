"use client";

import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import {
  Globe,
  LayoutGrid,
  Boxes,
  BrainCog,
  ShieldCheck,
  Send,
  Database,
  Building2,
  Contact,
  Zap,
  MessageSquare,
} from "lucide-react";
import { cn } from "@/lib/utils";

const layers = [
  {
    tag: "L1",
    title: "Edge",
    desc: "CDN, WAF, API gateway, webhook receiver, WebSocket gateway.",
    icon: Globe,
  },
  {
    tag: "L2",
    title: "Experience",
    desc: "Console, embeddable widget, REST + GraphQL API, SDKs.",
    icon: LayoutGrid,
  },
  {
    tag: "L3",
    title: "App modules",
    desc: "Conversations, bots, campaigns, content, segmentation, integrations.",
    icon: Boxes,
  },
  {
    tag: "L4",
    title: "AI platform",
    desc: "Model gateway, agent runtime, knowledge/RAG, guardrails, evals.",
    icon: BrainCog,
  },
  {
    tag: "L5",
    title: "Policy gate",
    desc: "Non-bypassable. Consent, suppression, quiet hours, DLT, spend caps.",
    icon: ShieldCheck,
    highlight: true,
  },
  {
    tag: "L6",
    title: "Delivery",
    desc: "Fair-scheduling dispatcher · WhatsApp Cloud API + BSP failover · web chat.",
    icon: Send,
  },
  {
    tag: "L7",
    title: "Data & platform",
    desc: "Profile store, append-only event log, consent ledger, IAM, hash-chained audit.",
    icon: Database,
  },
];

const capacity = [
  { value: "40+", label: "tenants", icon: Building2 },
  { value: "5M", label: "contacts", icon: Contact },
  { value: "800/s", label: "events", icon: Zap },
  { value: "400K/day", label: "messages", icon: MessageSquare },
];

export function Architecture() {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(1);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const count = Math.min(layers.length, Math.max(1, Math.ceil(v * layers.length + 0.15)));
    setRevealed(count);
  });

  return (
    <section
      ref={ref}
      id="scale"
      className="relative bg-elevated"
      style={{ height: `${layers.length * 62}vh` }}
    >
      <div className="sticky top-0 flex min-h-screen items-center overflow-hidden py-24">
        <div className="mx-auto grid w-full max-w-6xl gap-12 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16 sm:px-8">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              Built to scale
            </span>
            <h2 className="mt-3 max-w-md text-balance text-3xl font-semibold leading-[1.15] tracking-tight text-fg sm:text-4xl">
              One request, seven layers, zero single points of failure
            </h2>
            <p className="mt-4 max-w-md text-sm leading-6 text-fg-muted sm:text-base">
              A modular monolith, not a fleet of fragile microservices — every request from
              a customer&apos;s browser or WhatsApp thread crosses the same seven layers,
              with one gate nothing can bypass.
            </p>

            <div className="mt-10 grid grid-cols-2 gap-6 border-t border-border pt-8 sm:grid-cols-4 lg:grid-cols-2">
              {capacity.map((c) => (
                <div key={c.label} className="flex items-start gap-2.5">
                  <c.icon className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <div>
                    <div className="font-mono-tabular text-2xl font-semibold text-fg">{c.value}</div>
                    <div className="text-xs text-fg-dim">{c.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col-reverse gap-2.5">
            {layers.map((layer, i) => {
              const isRevealed = i < revealed;
              const isActive = i === revealed - 1;
              return (
                <motion.div
                  key={layer.tag}
                  animate={{
                    opacity: isRevealed ? 1 : 0,
                    y: isRevealed ? 0 : 24,
                    scale: isActive ? 1.02 : 1,
                  }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className={cn(
                    "glass flex items-center gap-4 rounded-r px-5 py-4",
                    layer.highlight && "border-primary/50 ring-1 ring-primary/20",
                    isActive && "border-primary/60 shadow-[0_8px_30px_-15px_rgba(5,150,105,0.35)]"
                  )}
                >
                  <span
                    className={cn(
                      "flex h-10 w-10 shrink-0 items-center justify-center rounded-r-sm text-xs font-semibold",
                      layer.highlight ? "bg-primary text-white" : "bg-primary-soft text-primary"
                    )}
                  >
                    <layer.icon className="h-5 w-5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono-tabular text-[11px] font-semibold text-fg-dim">
                        {layer.tag}
                      </span>
                      <p className="text-sm font-semibold text-fg">{layer.title}</p>
                      {layer.highlight && (
                        <span className="rounded-full bg-primary-soft px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary-hi">
                          non-bypassable
                        </span>
                      )}
                    </div>
                    <p className="mt-0.5 truncate text-xs text-fg-muted sm:whitespace-normal">
                      {layer.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
