import { Globe, Phone, BrainCircuit, HandCoins, TrendingUp, type LucideIcon } from "lucide-react";
import {
  WhatsAppIcon,
  InstagramIcon,
  MetaIcon,
  GoogleAdsIcon,
  GoogleMessagesIcon,
  type IconComponent,
} from "@/components/ui/brand-icons";

/** The three outcomes a captured lead can be driven to. */
export type StageKey = "qualify" | "convert" | "roi";

export type Channel = {
  /** Stable id — used as a React key and by the flow diagram's state machine. */
  key: string;
  icon: IconComponent;
  label: string;
  /** Stroke/particle colour for the SVG diagram. */
  color: string;
  /** Tailwind classes for the icon chip in card/list contexts. */
  chip: string;
  /**
   * A representative event on this channel. The flow diagram walks these one
   * at a time, so the animation shows a real journey rather than anonymous
   * particles. Required, not optional: a new channel without a sample would
   * render a blank frame in the loop, so the type forces the author to write
   * one.
   */
  sample: {
    /** What arrived, as the console would log it. */
    event: string;
    /** What the model read from it. */
    intent: string;
    /** Lead score after this event, 0-100. */
    score: number;
    /** Where routing sends it. */
    stage: StageKey;
  };
};

/**
 * Canonical channel list. Both the full omnichannel diagram (/use-cases) and
 * the compact Home teaser read from this so the two never drift apart.
 *
 * Channels that belong to a third party use that party's real mark and hue —
 * a reader scanning the row should recognise WhatsApp by its logo, not read a
 * label to find out which generic speech bubble it is. Website and Voice stay
 * on Lucide glyphs because they are capabilities, not brands.
 */
export const CHANNELS: Channel[] = [
  {
    key: "website",
    icon: Globe,
    label: "Website",
    color: "var(--primary)",
    chip: "bg-primary-soft text-primary",
    sample: {
      event: "Pricing page · 3rd visit",
      intent: "Comparing plans, no form yet",
      score: 68,
      stage: "qualify",
    },
  },
  {
    key: "whatsapp",
    icon: WhatsAppIcon,
    label: "WhatsApp",
    color: "#25D366",
    chip: "bg-[#25D366]/14 text-[#1DA851]",
    sample: {
      event: "Inbound message · 11:04 pm",
      intent: "Asking if the coat is in her size",
      score: 94,
      stage: "convert",
    },
  },
  {
    key: "instagram",
    icon: InstagramIcon,
    label: "Instagram",
    color: "#DD2A7B",
    chip: "bg-[#DD2A7B]/10",
    sample: {
      event: "Story reply · winter range",
      intent: "Wants the link to the jacket",
      score: 81,
      stage: "qualify",
    },
  },
  {
    key: "voice",
    icon: Phone,
    label: "Voice",
    color: "#3B82F6",
    chip: "bg-[#3B82F6]/12 text-[#3B82F6]",
    sample: {
      event: "Inbound call · 4m 12s",
      intent: "Renewal question, mentions a competitor",
      score: 88,
      stage: "convert",
    },
  },
  {
    key: "rcs",
    icon: GoogleMessagesIcon,
    label: "RCS",
    color: "#1A73E8",
    chip: "bg-[#1A73E8]/12 text-[#1A73E8]",
    sample: {
      event: "Carousel tap · offer card",
      intent: "Opened the delivery-slot picker",
      score: 72,
      stage: "convert",
    },
  },
  {
    key: "google-ads",
    icon: GoogleAdsIcon,
    label: "Google Ads",
    color: "#4285F4",
    chip: "bg-[#4285F4]/12 text-[#4285F4]",
    sample: {
      event: "Search click · high-intent term",
      intent: 'Searched "buy" not "how to"',
      score: 76,
      stage: "roi",
    },
  },
  {
    key: "meta-ads",
    icon: MetaIcon,
    label: "Meta Ads",
    color: "#0467DF",
    chip: "bg-[#0467DF]/12 text-[#0467DF]",
    sample: {
      event: "Lead form · submitted",
      intent: "Gave budget and timeline",
      score: 85,
      stage: "roi",
    },
  },
  {
    key: "ctwa",
    icon: WhatsAppIcon,
    label: "Click-to-WhatsApp",
    color: "#F97316",
    chip: "bg-[#F97316]/14 text-[#EA580C]",
    sample: {
      event: "Ad click → chat opened",
      intent: "Straight from the ad into a thread",
      score: 90,
      stage: "roi",
    },
  },
];

export type Stage = {
  key: StageKey;
  icon: LucideIcon;
  label: string;
  desc: string;
  color: string;
};

export const STAGES: Stage[] = [
  {
    key: "qualify",
    icon: BrainCircuit,
    label: "Qualify",
    desc: "Scored & routed",
    color: "var(--primary)",
  },
  { key: "convert", icon: HandCoins, label: "Convert", desc: "Deal won", color: "var(--teal)" },
  {
    key: "roi",
    icon: TrendingUp,
    label: "ROI",
    desc: "Revenue attributed",
    color: "var(--e700)",
  },
];
