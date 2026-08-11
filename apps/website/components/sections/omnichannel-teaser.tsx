import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { OmnichannelFlow } from "@/components/sections/omnichannel-flow";

export function OmnichannelTeaser() {
  return (
    <section id="omnichannel" className="border-t border-border bg-elevated py-28 sm:py-36">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <SectionHeading
          eyebrow="Omnichannel metrics"
          title="Eight channels in. One revenue number out."
          description="Website, WhatsApp, Instagram, voice, RCS, and ad clicks — including Click-to-WhatsApp — resolve to one profile, scored, routed, and tied back to pipeline in real time."
        />

        <div className="mt-14">
          <OmnichannelFlow />
        </div>

        <Reveal delay={0.15} className="mt-8 flex justify-center">
          <Link
            href="/use-cases"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary-hi"
          >
            See the full omnichannel walkthrough <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
