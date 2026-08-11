"use client";

import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { useLeadModal } from "@/components/providers/lead-modal-provider";
import { ArrowRight, CalendarCheck } from "lucide-react";

export function CTA() {
  const { openDemo, openSales } = useLeadModal();
  return (
    <section id="demo" className="relative overflow-hidden py-28 sm:py-36">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,var(--primary-soft),transparent)]" />
      <div className="mx-auto max-w-4xl px-6 sm:px-8">
        <Reveal>
          <div className="glass-strong rounded-r px-6 py-14 text-center sm:px-14 sm:py-16">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary-soft text-primary">
              <CalendarCheck className="h-5 w-5" />
            </span>
            <h2 className="mt-6 text-balance text-3xl font-semibold tracking-tight text-fg sm:text-4xl md:text-5xl">
              See your funnel run on one platform
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-balance text-base leading-7 text-fg-muted sm:text-lg">
              30 minutes with a solutions engineer. Bring your current stack — we&apos;ll show
              you what moves to saqi.ai on day one and what stays behind.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" onClick={openDemo}>
                Book a demo <ArrowRight className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="lg" onClick={openSales}>
                Talk to sales
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
