"use client";

import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { IconBulletList } from "@/components/ui/icon-bullet";
import { Layers, ArrowDown, Database, Mail, Bot, Headset, BarChart3 } from "lucide-react";

/* These five mirror the stack the hero says saqi.ai replaces. CPaaS is
   deliberately absent — it is not part of the product (see CLAUDE.md). */
const stack = [
  { label: "CDP", desc: "customer data platform", icon: Database, offset: { x: -18, y: -10 } },
  { label: "Marketing automation", desc: "email & campaign tools", icon: Mail, offset: { x: 14, y: -16 } },
  { label: "Chatbot tool", desc: "bolted onto the widget", icon: Bot, offset: { x: 20, y: 4 } },
  { label: "Contact centre", desc: "separate agent desktop", icon: Headset, offset: { x: -14, y: 18 } },
  { label: "BI layer", desc: "dashboards, after the fact", icon: BarChart3, offset: { x: 16, y: 20 } },
];

export function Problem() {
  const ref = useRef<HTMLDivElement>(null);
  const [converge, setConverge] = useState(0);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setConverge(Math.min(1, Math.max(0, v * 1.5)));
  });

  return (
    <section ref={ref} id="platform" className="relative" style={{ height: "220vh" }}>
      <div className="sticky top-0 flex min-h-screen items-center overflow-hidden py-24">
        <div className="mx-auto w-full max-w-6xl px-6 sm:px-8">
          <SectionHeading
            eyebrow="Why saqi.ai"
            title="Five tools, five logins, one broken picture of the customer"
            description="Every stitched-together stack loses the same thing: a single, trustworthy, real-time view of who your customer is and what they need next. Scroll — watch it collapse into one."
          />

          <div className="mt-16 grid gap-6 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-2">
              {stack.map((s) => (
                <motion.div
                  key={s.label}
                  style={{
                    transform: `translate(${s.offset.x * converge}px, ${s.offset.y * converge}px) scale(${1 - converge * 0.12})`,
                    opacity: 1 - converge * 0.75,
                  }}
                  className="glass flex h-full flex-col justify-between gap-3 rounded-r p-5"
                >
                  <s.icon className="h-4 w-4 text-fg-dim" />
                  <div>
                    <p className="text-sm font-semibold text-fg">{s.label}</p>
                    <p className="text-xs text-fg-dim">{s.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="flex items-center justify-center py-4 lg:py-0">
              <motion.div
                animate={{ rotate: converge > 0.5 ? 90 : 0 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col items-center gap-2 text-fg-dim"
              >
                <ArrowDown className="h-6 w-6 lg:-rotate-90" />
                <span className="text-xs font-medium uppercase tracking-wider">becomes</span>
              </motion.div>
            </div>

            <motion.div
              style={{
                transform: `scale(${0.94 + converge * 0.06})`,
                boxShadow: `0 ${20 + converge * 20}px ${50 + converge * 40}px -25px rgba(5,150,105,${0.15 + converge * 0.25})`,
              }}
              className="glass-strong relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-r border border-primary/30 p-8"
            >
              <div
                className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-e300/30 blur-3xl transition-opacity duration-300"
                style={{ opacity: 0.4 + converge * 0.6 }}
              />
              <Layers className="h-6 w-6 text-primary" />
              <div>
                <p className="text-xl font-semibold text-fg">One platform</p>
                <p className="mt-2 text-sm leading-6 text-fg-muted">
                  One consent model. One audit trail. One place the AI can reason about the
                  customer — from first click to closed deal.
                </p>
              </div>
              <motion.div style={{ opacity: Math.min(1, Math.max(0, converge * 2)) }}>
                <IconBulletList
                  items={["Single customer profile", "Real-time event log", "One compliance gate for every send"]}
                />
              </motion.div>
            </motion.div>
          </div>

          <Reveal delay={0.1} className="mt-10">
            <p className="text-center text-xs font-medium uppercase tracking-wider text-fg-dim">
              {converge < 0.95 ? "Keep scrolling" : "One profile. Every channel. Real time."}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
