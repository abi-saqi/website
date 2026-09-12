import { Globe, Phone, BrainCircuit, HandCoins, TrendingUp, type LucideIcon } from "lucide-react";
import {
  WhatsAppIcon,
  InstagramIcon,
  MetaIcon,
  GoogleAdsIcon,
  GoogleMessagesIcon,
  type IconComponent,
} from "@/components/ui/brand-icons";

export type Channel = {
  icon: IconComponent;
  label: string;
  /** Stroke/particle colour for the SVG diagram. */
  color: string;
  /** Tailwind classes for the icon chip in card/list contexts. */
  chip: string;
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
  { icon: Globe, label: "Website", color: "var(--primary)", chip: "bg-primary-soft text-primary" },
  {
    icon: WhatsAppIcon,
    label: "WhatsApp",
    color: "#25D366",
    chip: "bg-[#25D366]/14 text-[#1DA851]",
  },
  {
    icon: InstagramIcon,
    label: "Instagram",
    color: "#DD2A7B",
    chip: "bg-[#DD2A7B]/10",
  },
  { icon: Phone, label: "Voice", color: "#3B82F6", chip: "bg-[#3B82F6]/12 text-[#3B82F6]" },
  {
    icon: GoogleMessagesIcon,
    label: "RCS",
    color: "#1A73E8",
    chip: "bg-[#1A73E8]/12 text-[#1A73E8]",
  },
  {
    icon: GoogleAdsIcon,
    label: "Google Ads",
    color: "#4285F4",
    chip: "bg-[#4285F4]/12 text-[#4285F4]",
  },
  { icon: MetaIcon, label: "Meta Ads", color: "#0467DF", chip: "bg-[#0467DF]/12 text-[#0467DF]" },
  {
    icon: WhatsAppIcon,
    label: "Click-to-WhatsApp",
    color: "#F97316",
    chip: "bg-[#F97316]/14 text-[#EA580C]",
  },
];

export type Stage = {
  icon: LucideIcon;
  label: string;
  desc: string;
  color: string;
};

export const STAGES: Stage[] = [
  { icon: BrainCircuit, label: "Qualify", desc: "Scored & routed", color: "var(--primary)" },
  { icon: HandCoins, label: "Convert", desc: "Deal won", color: "var(--teal)" },
  { icon: TrendingUp, label: "ROI", desc: "Revenue attributed", color: "var(--e700)" },
];
