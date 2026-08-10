import { Hero } from "@/components/sections/hero";
import { IndustryStrip } from "@/components/sections/industry-strip";
import { Problem } from "@/components/sections/problem";
import { Capture } from "@/components/sections/capture";
import { PlatformStory } from "@/components/sections/platform-story";
import { Architecture } from "@/components/sections/architecture";
import { Insights } from "@/components/sections/insights";
import { Trust } from "@/components/sections/trust";
import { CTA } from "@/components/sections/cta";

export default function Home() {
  return (
    <>
      <Hero />
      <IndustryStrip />
      <Problem />
      <Capture />
      <PlatformStory />
      <Architecture />
      <Insights />
      <Trust />
      <CTA />
    </>
  );
}
