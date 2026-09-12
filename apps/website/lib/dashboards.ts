import {
  LayoutDashboard,
  Megaphone,
  Phone,
  MessagesSquare,
  Kanban,
  type LucideIcon,
} from "lucide-react";

export type DashboardScreen = {
  key: string;
  label: string;
  icon: LucideIcon;
  src: string;
  /** Shown in the tabbed preview. One sentence. */
  caption: string;
  /** Shown in the scroll showcase, where the copy carries more weight. */
  headline: string;
  detail: string;
};

/**
 * The real console screens, cropped from a product recording. Single source of
 * truth for both the tabbed preview and the pinned scroll showcase so the two
 * never drift.
 */
export const DASHBOARDS: DashboardScreen[] = [
  {
    key: "overview",
    label: "Dashboard",
    icon: LayoutDashboard,
    src: "/dashboard/dashboard-overview.jpg",
    caption:
      "Every channel, one screen — leads, MQL/SQL, revenue, retention, and response time live together.",
    headline: "One screen, not four reports",
    detail:
      "Leads, qualification rate, revenue, retention, and response time on the same view — so nobody exports three dashboards to answer one question in a Monday meeting.",
  },
  {
    key: "acquisition",
    label: "Acquisition Studio",
    icon: Megaphone,
    src: "/dashboard/dashboard-acquisition.jpg",
    caption:
      "Capture: cross-network campaign spend and leads reconciled against CRM revenue, per channel.",
    headline: "Spend reconciled to revenue",
    detail:
      "Campaign spend across networks sits beside the pipeline it actually produced, matched through the CRM — not modelled, and not a week behind.",
  },
  {
    key: "voice",
    label: "Voice AI",
    icon: Phone,
    src: "/dashboard/dashboard-voice.jpg",
    caption:
      "Voice is a first-class channel — call volume, sentiment, and conversion tracked per agent, per script.",
    headline: "Calls you can actually search",
    detail:
      "Every call transcribed, scored for sentiment, and attached to the profile — so a manager can find the six calls where pricing came up, not guess.",
  },
  {
    key: "conversations",
    label: "Conversations",
    icon: MessagesSquare,
    src: "/dashboard/dashboard-conversations.jpg",
    caption:
      "Qualify: one inbox for WhatsApp, Instagram, RCS, voice, and web — with SLA timers running.",
    headline: "One inbox, every channel",
    detail:
      "WhatsApp, Instagram, RCS, voice, and web chat in a single queue with SLA timers running, so an agent answers in order of urgency rather than by whichever tab is open.",
  },
  {
    key: "pipeline",
    label: "Pipeline",
    icon: Kanban,
    src: "/dashboard/dashboard-pipeline.jpg",
    caption:
      "Convert: stage-by-stage conversion and deal health, weighted to real ₹ pipeline value.",
    headline: "A forecast with its working shown",
    detail:
      "Stage-by-stage conversion and deal health weighted to real rupee value, where every number drills back to the conversation that moved it.",
  },
];
