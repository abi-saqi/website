"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, PlayCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-28"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,var(--primary-soft),transparent)]" />
        <motion.div
          style={{ y: y1 }}
          className="absolute left-[8%] top-24 h-72 w-72 rounded-full bg-e300/30 blur-[110px]"
        />
        <motion.div
          style={{ y: y2 }}
          className="absolute right-[10%] top-52 h-80 w-80 rounded-full bg-teal/25 blur-[120px]"
        />
        <div
          className="absolute inset-0 opacity-[0.35] [background-image:linear-gradient(var(--border)_1px,transparent_1px),linear-gradient(90deg,var(--border)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_20%,black,transparent)]"
        />
      </div>

      <motion.div style={{ opacity }} className="mx-auto flex w-full max-w-6xl flex-col items-center px-6 text-center sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Badge>One profile. Every channel. Real time.</Badge>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 max-w-4xl text-balance text-4xl font-semibold leading-[1.08] tracking-tight text-fg sm:text-6xl md:text-[4.25rem]"
        >
          Market. Capture. Qualify.
          <br />
          <span className="bg-gradient-to-r from-e600 via-primary to-teal bg-clip-text text-transparent">
            Convert — in real time.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 max-w-2xl text-balance text-lg leading-8 text-fg-muted sm:text-xl"
        >
          Saqi.ai replaces your CDP, marketing automation, chatbot, and contact-centre stack
          with one platform — running campaigns, capturing leads from your website and social
          channels, scoring intent, reading sentiment, and routing to the right rep, all on a
          single real-time customer profile.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
        >
          <Button href="#demo" size="lg">
            Book a demo <ArrowRight className="h-4 w-4" />
          </Button>
          <Button href="#platform" variant="outline" size="lg">
            <PlayCircle className="h-4 w-4" /> See the platform
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-xs font-medium uppercase tracking-wider text-fg-dim"
        >
          <span>SOC 2 Type II · in progress</span>
          <span className="h-1 w-1 rounded-full bg-border-strong" />
          <span>DPDP · GDPR · TCPA ready</span>
          <span className="h-1 w-1 rounded-full bg-border-strong" />
          <span>99.95% uptime SLA</span>
          <span className="h-1 w-1 rounded-full bg-border-strong" />
          <span>SSO · SCIM · RBAC</span>
        </motion.div>
      </motion.div>
    </section>
  );
}
