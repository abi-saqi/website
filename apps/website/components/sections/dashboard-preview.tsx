"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { LayoutDashboard, Megaphone, Phone, MessagesSquare, Kanban } from "lucide-react";
import { cn } from "@/lib/utils";

const tabs = [
  {
    key: "overview",
    label: "Dashboard",
    icon: LayoutDashboard,
    src: "/dashboard/dashboard-overview.jpg",
    caption: "Every channel, one screen — leads, MQL/SQL, revenue, retention, and response time live together.",
  },
  {
    key: "acquisition",
    label: "Acquisition Studio",
    icon: Megaphone,
    src: "/dashboard/dashboard-acquisition.jpg",
    caption: "Capture: cross-network campaign spend and leads reconciled against CRM revenue, per channel.",
  },
  {
    key: "voice",
    label: "Voice AI",
    icon: Phone,
    src: "/dashboard/dashboard-voice.jpg",
    caption: "Voice is a first-class channel — call volume, sentiment, and conversion tracked per agent, per script.",
  },
  {
    key: "conversations",
    label: "Conversations",
    icon: MessagesSquare,
    src: "/dashboard/dashboard-conversations.jpg",
    caption: "Qualify: one inbox for WhatsApp, Instagram, SMS, voice, and web — with SLA timers running.",
  },
  {
    key: "pipeline",
    label: "Pipeline",
    icon: Kanban,
    src: "/dashboard/dashboard-pipeline.jpg",
    caption: "Convert: stage-by-stage conversion and deal health, weighted to real ₹ pipeline value.",
  },
];

export function DashboardPreview() {
  const [active, setActive] = useState(0);
  const tab = tabs[active]!;

  return (
    <div className="mx-auto w-full max-w-5xl">
      <div className="flex flex-wrap items-center justify-center gap-2">
        {tabs.map((t, i) => (
          <button
            key={t.key}
            onClick={() => setActive(i)}
            className={cn(
              "flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors",
              i === active
                ? "border-primary bg-primary text-white"
                : "border-border-strong text-fg-muted hover:border-primary/40 hover:text-fg"
            )}
          >
            <t.icon className="h-3.5 w-3.5" />
            {t.label}
          </button>
        ))}
      </div>

      <div className="glass-strong relative mt-6 overflow-hidden rounded-r p-2 sm:p-3">
        <div className="flex items-center gap-2 px-2 py-2">
          <span className="h-2.5 w-2.5 rounded-full bg-rose/60" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber/60" />
          <span className="h-2.5 w-2.5 rounded-full bg-primary/60" />
          <span className="ml-3 flex-1 truncate rounded-full bg-raised px-3 py-1 font-mono-tabular text-[11px] text-fg-dim">
            app.saqi.ai/{tab.key}
          </span>
        </div>

        <div className="relative aspect-[1800/973] w-full overflow-hidden rounded-r-sm border border-border">
          <AnimatePresence mode="wait">
            <motion.div
              key={tab.key}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0"
            >
              <Image
                src={tab.src}
                alt={`${tab.label} screen of the saqi.ai console`}
                fill
                sizes="(min-width: 1024px) 960px, 100vw"
                className="object-cover object-top"
                priority={active === 0}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.p
          key={tab.key}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="mt-4 text-center text-sm leading-6 text-fg-muted"
        >
          {tab.caption}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
