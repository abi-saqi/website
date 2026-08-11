"use client";

import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import {
  BrainCircuit,
  Radio,
  HeadsetIcon,
  BarChart3,
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { IconBulletList } from "@/components/ui/icon-bullet";

const steps = [
  {
    icon: BrainCircuit,
    tag: "Qualify",
    title: "Score intent and read sentiment as it happens",
    body:
      "Every message, click, and reply feeds a real-time lead score. Sentiment and urgency are detected turn by turn, so hot leads and frustrated customers surface before a human even looks.",
    points: ["Real-time intent & fit scoring", "Sentiment & urgency detection", "Auto-routing to the right rep or queue"],
    mock: {
      title: "Lead score — live",
      rows: [
        { name: "Priya M.", meta: "Requested pricing · 2m ago", value: 92, tone: "hot" },
        { name: "Arjun K.", meta: "Viewed case study · 6m ago", value: 68, tone: "warm" },
        { name: "Dana W.", meta: "Sentiment: frustrated", value: 41, tone: "cool" },
      ],
    },
  },
  {
    icon: Radio,
    tag: "Engage",
    title: "Run campaigns and broadcasts that never break consent",
    body:
      "Build a segment, send WhatsApp broadcasts or web campaigns, and every message clears one inline gate — consent, suppression, quiet hours, frequency caps — automatically, before it goes out.",
    points: ["Segment builder with live audience count", "WhatsApp + web broadcast from one composer", "Consent, DND & frequency caps enforced inline"],
    mock: {
      title: "Broadcast — Diwali offer",
      rows: [
        { name: "Audience", meta: "48,210 contacts · opted in", value: 100, tone: "hot" },
        { name: "Suppressed", meta: "DND / quiet hours / capped", value: 6, tone: "cool" },
        { name: "Delivered", meta: "WhatsApp Cloud API", value: 94, tone: "warm" },
      ],
    },
  },
  {
    icon: HeadsetIcon,
    tag: "Respond",
    title: "Hand off to a live agent without losing context",
    body:
      "When a conversation needs a human, it lands in the agent inbox with the full profile, score, and sentiment attached — routed by skill, language, and load, with SLA timers running.",
    points: ["Skill & language-based routing", "Full context on handoff, no re-asking", "SLA timers and supervisor barge-in"],
    mock: {
      title: "Agent inbox",
      rows: [
        { name: "#4821 Priya M.", meta: "Assigned · Rahul S.", value: 88, tone: "hot" },
        { name: "#4822 Sam T.", meta: "Waiting · 00:42 SLA", value: 55, tone: "warm" },
        { name: "#4823 Lee C.", meta: "Bot resolved", value: 12, tone: "cool" },
      ],
    },
  },
  {
    icon: BarChart3,
    tag: "Analyze",
    title: "See the whole funnel, in real time",
    body:
      "Marketing, sales, and support look at the same live numbers — source-to-revenue attribution, sentiment trends, campaign performance, and agent SLAs, in one dashboard.",
    points: ["Source-to-revenue attribution", "Sentiment & CSAT trend lines", "Campaign ROI down to the send"],
    mock: {
      title: "Pipeline — this week",
      rows: [
        { name: "New leads", meta: "+18% vs last week", value: 76, tone: "hot" },
        { name: "Qualified", meta: "Auto-scored ≥ 70", value: 54, tone: "warm" },
        { name: "Meetings booked", meta: "Synced to CRM", value: 31, tone: "cool" },
      ],
    },
  },
];

const toneClass: Record<string, string> = {
  hot: "bg-primary",
  warm: "bg-amber",
  cool: "bg-slate",
};

export function PlatformStory() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = Math.min(steps.length - 1, Math.floor(v * steps.length));
    setActive(idx);
  });

  return (
    <section ref={ref} id="engage" className="relative" style={{ height: `${steps.length * 100}vh` }}>
      <div className="sticky top-0 flex min-h-screen items-center overflow-hidden py-24">
        <div className="mx-auto grid w-full max-w-6xl gap-12 px-6 lg:grid-cols-2 lg:items-center lg:gap-20 sm:px-8">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              How it works
            </span>
            <h2 className="mt-3 max-w-lg text-balance text-3xl font-semibold leading-[1.15] tracking-tight text-fg sm:text-4xl">
              One continuous loop from first click to closed deal
            </h2>

            <div className="mt-10 flex flex-col gap-1">
              {steps.map((step, i) => {
                const isActive = i === active;
                return (
                  <div key={step.tag} className="relative py-4 pl-10">
                    <div className="absolute left-[15px] top-0 h-full w-px bg-border">
                      <motion.div
                        className="w-px bg-primary"
                        style={{ height: i < active ? "100%" : i === active ? "50%" : "0%" }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                    <div
                      className={cn(
                        "absolute left-0 top-4 flex h-8 w-8 items-center justify-center rounded-full border transition-colors duration-300",
                        isActive || i < active
                          ? "border-primary bg-primary text-white"
                          : "border-border-strong bg-surface text-fg-dim"
                      )}
                    >
                      {i < active ? <Check className="h-4 w-4" /> : <step.icon className="h-4 w-4" />}
                    </div>
                    <p
                      className={cn(
                        "text-xs font-semibold uppercase tracking-wider transition-colors duration-300",
                        isActive ? "text-primary" : "text-fg-dim"
                      )}
                    >
                      {step.tag}
                    </p>
                    <motion.div
                      animate={{
                        height: isActive ? "auto" : 0,
                        opacity: isActive ? 1 : 0,
                        marginTop: isActive ? 8 : 0,
                      }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <h3 className="text-lg font-semibold text-fg sm:text-xl">{step.title}</h3>
                      <p className="mt-2 max-w-md text-sm leading-6 text-fg-muted">{step.body}</p>
                      <IconBulletList items={step.points} className="mt-3" />
                    </motion.div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="glass-strong relative aspect-[4/5] w-full overflow-hidden rounded-r">
              <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,var(--primary-soft),transparent)]" />
              {steps.map((step, i) => (
                <motion.div
                  key={step.tag}
                  animate={{
                    opacity: i === active ? 1 : 0,
                    y: i === active ? 0 : 16,
                  }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 flex flex-col p-7"
                  style={{ pointerEvents: i === active ? "auto" : "none" }}
                >
                  <div className="flex items-center justify-between border-b border-border pb-4">
                    <div className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-rose/60" />
                      <span className="h-2.5 w-2.5 rounded-full bg-amber/60" />
                      <span className="h-2.5 w-2.5 rounded-full bg-primary/60" />
                    </div>
                    <span className="font-mono-tabular text-xs text-fg-dim">{step.mock.title}</span>
                  </div>
                  <div className="mt-6 flex flex-1 flex-col gap-3">
                    {step.mock.rows.map((row, ri) => (
                      <motion.div
                        key={row.name}
                        initial={{ opacity: 0, x: 16 }}
                        animate={{ opacity: i === active ? 1 : 0, x: i === active ? 0 : 16 }}
                        transition={{ delay: ri * 0.08, duration: 0.4 }}
                        className="glass rounded-r-sm p-4"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-fg">{row.name}</span>
                          <span className="font-mono-tabular text-xs text-fg-dim">{row.value}%</span>
                        </div>
                        <p className="mt-1 text-xs text-fg-dim">{row.meta}</p>
                        <div className="mt-2.5 h-1.5 w-full overflow-hidden rounded-full bg-raised">
                          <motion.div
                            className={cn("h-full rounded-full", toneClass[row.tone])}
                            initial={{ width: 0 }}
                            animate={{ width: i === active ? `${row.value}%` : 0 }}
                            transition={{ delay: ri * 0.08 + 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-5 flex items-center justify-center gap-2">
              {steps.map((s, i) => (
                <div
                  key={s.tag}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-300",
                    i === active ? "w-8 bg-primary" : "w-1.5 bg-border-strong"
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
