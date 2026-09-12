import { Hero } from "@/components/sections/hero";
import { IndustryStrip } from "@/components/sections/industry-strip";
import { Problem } from "@/components/sections/problem";
import { Capture } from "@/components/sections/capture";
import { OmnichannelTeaser } from "@/components/sections/omnichannel-teaser";
import { ConsoleBand } from "@/components/sections/console-band";
import { PlatformStory } from "@/components/sections/platform-story";
import { Architecture } from "@/components/sections/architecture";
import { Insights } from "@/components/sections/insights";
import { Integrations } from "@/components/sections/integrations";
import { Trust } from "@/components/sections/trust";
import { FAQ } from "@/components/sections/faq";
import { CTA } from "@/components/sections/cta";

/**
 * Section order is a value rhythm, not just a narrative one: the four `ink`
 * bands (Hero, ConsoleBand, Trust, CTA) are spaced so the reader never travels
 * more than three light sections without the page changing key. Moving a
 * section here means checking that rhythm still alternates.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <IndustryStrip />
      <Problem />
      <Capture />
      <OmnichannelTeaser />
      <ConsoleBand />
      <PlatformStory />
      <Architecture />
      <Insights />
      <Trust />
      <Integrations />
      <FAQ />
      <CTA />
    </>
  );
}
