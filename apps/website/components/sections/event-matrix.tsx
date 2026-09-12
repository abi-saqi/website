import {
  ShoppingBag,
  Cloud,
  LifeBuoy,
  Target,
  CalendarX2,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";

type Action = { label: string; kind: "nudge" | "template" | "bulk" | "crm" | "suppress" };

const actionStyle: Record<Action["kind"], string> = {
  nudge: "bg-primary-soft text-primary",
  template: "bg-[#25D366]/14 text-[#1DA851]",
  bulk: "bg-[#F59E0B]/14 text-[#B45309]",
  crm: "bg-[#3B82F6]/12 text-[#3B82F6]",
  suppress: "bg-rose/12 text-rose",
};

type Row = {
  icon: LucideIcon;
  chip: string;
  source: string;
  event: string;
  what: string;
  actions: Action[];
};

const rows: Row[] = [
  {
    icon: ShoppingBag,
    chip: "bg-[#95BF47]/16 text-[#5E8E3E]",
    source: "Shopify",
    event: "cart.abandoned",
    what: "Someone leaves a full basket without checking out.",
    actions: [
      { label: "WhatsApp nudge", kind: "nudge" },
      { label: "RCS fallback", kind: "template" },
      { label: "Open opportunity in CRM", kind: "crm" },
    ],
  },
  {
    icon: ShoppingBag,
    chip: "bg-[#95BF47]/16 text-[#5E8E3E]",
    source: "Shopify",
    event: "order.fulfilled",
    what: "An order ships and a tracking number exists.",
    actions: [
      { label: "order_shipped template", kind: "template" },
      { label: "Deal stage updated", kind: "crm" },
    ],
  },
  {
    icon: Target,
    chip: "bg-[#0866FF]/12 text-[#0866FF]",
    source: "Meta Lead Ads",
    event: "lead.submitted",
    what: "A lead form is completed on Facebook or Instagram.",
    actions: [
      { label: "Instant WhatsApp reply", kind: "nudge" },
      { label: "Scored and routed", kind: "crm" },
    ],
  },
  {
    icon: Cloud,
    chip: "bg-[#00A1E0]/14 text-[#00A1E0]",
    source: "Salesforce / HubSpot",
    event: "opportunity.stage_changed",
    what: "A deal moves to negotiation, or slips backwards.",
    actions: [
      { label: "Owner notified", kind: "nudge" },
      { label: "Follow-up sequence", kind: "bulk" },
    ],
  },
  {
    icon: LifeBuoy,
    chip: "bg-[#F59E0B]/14 text-[#B45309]",
    source: "Zendesk / Freshdesk",
    event: "ticket.escalated",
    what: "A customer has an open complaint.",
    actions: [
      { label: "Marketing paused 7 days", kind: "suppress" },
      { label: "Account owner alerted", kind: "nudge" },
    ],
  },
  {
    icon: CalendarX2,
    chip: "bg-[#8134AF]/12 text-[#8134AF]",
    source: "Calendar",
    event: "meeting.no_show",
    what: "A booked demo is missed.",
    actions: [
      { label: "Re-book nudge", kind: "nudge" },
      { label: "Task created for the rep", kind: "crm" },
    ],
  },
];

/**
 * The event-to-action map. Deliberately concrete: a buyer wants to know which
 * of their systems can start a journey and what the journey then does, not an
 * abstract statement that the platform "integrates".
 */
export function EventMatrix() {
  return (
    <>
      <RevealGroup className="flex flex-col gap-3">
        {rows.map((r) => (
          <RevealItem key={`${r.source}-${r.event}`}>
            <div className="glass grid items-center gap-4 rounded-r p-4 sm:p-5 lg:grid-cols-[15rem_1fr_auto]">
              <div className="flex min-w-0 items-center gap-3">
                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-r-sm ${r.chip}`}
                >
                  <r.icon className="h-4 w-4" />
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-sm font-semibold text-fg">{r.source}</span>
                  <code className="font-mono-tabular block truncate text-[11px] text-fg-dim">
                    {r.event}
                  </code>
                </span>
              </div>

              <p className="min-w-0 text-sm leading-6 text-fg-muted">{r.what}</p>

              <div className="flex flex-wrap items-center gap-1.5 lg:justify-end">
                <ArrowRight className="hidden h-3.5 w-3.5 shrink-0 text-fg-dim lg:block" />
                {r.actions.map((a) => (
                  <span
                    key={a.label}
                    className={`whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] font-medium ${actionStyle[a.kind]}`}
                  >
                    {a.label}
                  </span>
                ))}
              </div>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>

      <p className="mt-6 text-center text-sm text-fg-muted">
        Anything not listed here arrives the same way — one{" "}
        <code className="font-mono-tabular text-primary">POST /v1/events</code> from your own
        backend starts any journey you build.
      </p>
    </>
  );
}
