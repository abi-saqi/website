import {
  Globe,
  MessageCircle,
  Camera,
  Phone,
  MessageSquareText,
  Megaphone,
  Target,
  MousePointerClick,
  BrainCircuit,
  HandCoins,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";

export type Channel = {
  icon: LucideIcon;
  label: string;
  /** Stroke/particle colour for the SVG diagram. */
  color: string;
  /** Tailwind classes for the icon chip in card/list contexts. */
  chip: string;
};

/**
 * Canonical channel list. Both the full omnichannel diagram (/use-cases) and
 * the compact Home teaser read from this so the two never drift apart.
 * Colours are the channels' own brand hues, deliberately not the emerald
 * accent, so a reader can pick out a channel at a glance.
 */
export const CHANNELS: Channel[] = [
  { icon: Globe, label: "Website", color: "var(--primary)", chip: "bg-primary-soft text-primary" },
  { icon: MessageCircle, label: "WhatsApp", color: "#25D366", chip: "bg-[#25D366]/12 text-[#1DA851]" },
  {
    icon: Camera,
    label: "Instagram",
    color: "#DD2A7B",
    chip: "bg-gradient-to-br from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white",
  },
  { icon: Phone, label: "Voice", color: "#3B82F6", chip: "bg-[#3B82F6]/12 text-[#3B82F6]" },
  { icon: MessageSquareText, label: "RCS", color: "#06B6D4", chip: "bg-[#06B6D4]/12 text-[#0891B2]" },
  { icon: Megaphone, label: "Google Ads", color: "#F59E0B", chip: "bg-[#F59E0B]/14 text-[#B45309]" },
  { icon: Target, label: "Meta Ads", color: "#0866FF", chip: "bg-[#0866FF]/12 text-[#0866FF]" },
  {
    icon: MousePointerClick,
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
