"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, PlayCircle, TrendingUp, ShieldCheck, Users } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/brand-icons";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EASE } from "@/lib/motion";
import { useLeadModal } from "@/components/providers/lead-modal-provider";

/**
 * Live numbers, in a rail directly under the product shot.
 *
 * These were previously absolutely positioned around the screenshot. At the
 * 1152px content width there is no gutter to hold them, so they landed on top
 * of the densest part of the UI and obscured the one asset worth showing. A
 * rail reads at every breakpoint and leaves the screenshot intact.
 */
const proofChips = [
  {
    icon: WhatsAppIcon,
    label: "WhatsApp threads",
    value: "12,402",
    note: "active now",
    tint: "text-[#25D366]",
  },
  {
    icon: TrendingUp,
    label: "Top lead score",
    value: "94",
    note: "routed in 41s",
    tint: "text-primary",
  },
  {
    icon: ShieldCheck,
    label: "Consent",
    value: "100%",
    note: "checked pre-send",
    tint: "text-[#60A5FA]",
  },
  {
    icon: Users,
    label: "Agents online",
    value: "48",
    note: "across 6 queues",
    tint: "text-[#FBBF24]",
  },
];

const trustRail = [
  "SOC 2 Type II · in progress",
  "DPDP · GDPR · TCPA ready",
  "99.95% uptime SLA",
  "SSO · SCIM · RBAC",
];

export function Hero() {
  const { openDemo } = useLeadModal();
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  // A single parallax gesture on the screenshot. The headline no longer fades
  // on scroll: two competing scroll effects in one viewport read as noise.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const shotY = useTransform(scrollYProgress, [0, 1], [0, -40]);

  return (
    <section
      id="top"
      ref={ref}
      className="ink ink-glow ink-grid relative overflow-hidden pt-32 sm:pt-36"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center px-6 text-center sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <Badge>Omnichannel CRM for revenue teams</Badge>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.08, ease: EASE }}
          className="mt-7 max-w-4xl text-balance text-4xl font-semibold leading-[1.06] tracking-tight text-fg sm:text-6xl md:text-[4.25rem]"
        >
          One CRM for the whole
          <br />
          <span className="bg-gradient-to-r from-e300 via-e400 to-teal bg-clip-text text-transparent">
            revenue team.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.16, ease: EASE }}
          className="mt-6 max-w-2xl text-balance text-lg leading-8 text-fg-muted"
        >
          saqi.ai brings lead capture, qualification, campaigns, and the agent inbox onto one live
          customer profile — so sales, marketing, and support stop working from four different
          versions of the same customer.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.24, ease: EASE }}
          className="mt-9 flex flex-col items-center gap-3 sm:flex-row"
        >
          <Button onClick={openDemo} size="lg">
            Book a demo <ArrowRight className="h-4 w-4" />
          </Button>
          <Button href="#platform" variant="outline" size="lg">
            <PlayCircle className="h-4 w-4" /> See the platform
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.32 }}
          className="mt-9 flex flex-wrap items-center justify-center gap-x-5 gap-y-2.5 text-xs font-medium uppercase tracking-wider text-fg-dim"
        >
          {trustRail.map((t, i) => (
            <span key={t} className="flex items-center gap-5">
              {i > 0 && <span className="hidden h-1 w-1 rounded-full bg-border-strong sm:block" />}
              {t}
            </span>
          ))}
        </motion.div>
      </div>

      {/* The product shot, given the space the headline used to waste. */}
      <motion.div
        style={reduced ? undefined : { y: shotY }}
        initial={{ opacity: 0, y: 44 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.34, ease: EASE }}
        className="relative mx-auto mt-14 max-w-6xl px-6 sm:mt-18 sm:px-8"
      >
        <div className="shot-frame relative">
          <Image
            src="/dashboard/dashboard-overview.jpg"
            alt="The saqi.ai dashboard: cross-channel lead volume, revenue trend, and lead funnel in one view"
            width={1800}
            height={973}
            priority
            sizes="(max-width: 1152px) 100vw, 1152px"
            className="block h-auto w-full"
          />
          {/* Fades the shot into the band so it does not end on a hard line. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#04100a] to-transparent"
          />
        </div>

      </motion.div>

      {/* Proof rail. Sits on the frame's lower edge so the shot and the numbers
          read as one object rather than two stacked blocks. */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.75, ease: EASE }}
        className="relative z-10 mx-auto -mt-10 max-w-5xl px-6 sm:-mt-12 sm:px-8"
      >
        <dl className="glass-strong grid grid-cols-2 gap-px overflow-hidden rounded-r sm:grid-cols-4">
          {proofChips.map((chip) => (
            <div key={chip.label} className="flex items-center gap-3 px-4 py-4 sm:px-5">
              <span className={`flex h-9 w-9 shrink-0 items-center justify-center ${chip.tint}`}>
                <chip.icon className="h-5 w-5" />
              </span>
              <div className="min-w-0">
                <dt className="truncate text-[10px] font-medium uppercase tracking-wide text-fg-dim">
                  {chip.label}
                </dt>
                <dd className="font-mono-tabular text-lg font-semibold leading-tight text-fg">
                  {chip.value}{" "}
                  <span className="font-sans text-[11px] font-normal text-fg-muted">
                    {chip.note}
                  </span>
                </dd>
              </div>
            </div>
          ))}
        </dl>
      </motion.div>

      <div className="h-20 sm:h-24" />
    </section>
  );
}
