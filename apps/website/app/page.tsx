import { Hero } from "@/components/sections/hero";
import { IndustryStrip } from "@/components/sections/industry-strip";
import { Problem } from "@/components/sections/problem";
import { Capture } from "@/components/sections/capture";
import { OmnichannelTeaser } from "@/components/sections/omnichannel-teaser";
import { PlatformStory } from "@/components/sections/platform-story";
import { Architecture } from "@/components/sections/architecture";
import { Insights } from "@/components/sections/insights";
import { Integrations } from "@/components/sections/integrations";
import { Trust } from "@/components/sections/trust";
import { FAQ } from "@/components/sections/faq";
import { CTA } from "@/components/sections/cta";

export default function Home() {
  return (
    <>
      <Hero />
      <IndustryStrip />
      <Problem />
      <Capture />
      <OmnichannelTeaser />
      <PlatformStory />
      <Architecture />
      <Insights />
      <Integrations />
      <Trust />
      <FAQ />
      <CTA />
    </>
  );
}
