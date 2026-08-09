import { SectionHeading } from "@/components/ui/section-heading";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { Layers, Puzzle, ShieldAlert } from "lucide-react";

const stack = [
  { label: "CDP", desc: "customer data platform" },
  { label: "Marketing automation", desc: "email & campaign tools" },
  { label: "CPaaS", desc: "SMS / WhatsApp APIs" },
  { label: "Chatbot tool", desc: "bolted onto the widget" },
  { label: "Contact centre", desc: "separate agent desktop" },
  { label: "BI layer", desc: "dashboards, after the fact" },
];

export function Problem() {
  return (
    <section className="relative py-28 sm:py-36" id="platform">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <SectionHeading
          eyebrow="Why saqi.ai"
          title="Six tools, six logins, one broken picture of the customer"
          description="Every stitched-together stack loses the same thing: a single, trustworthy, real-time view of who your customer is and what they need next."
        />

        <div className="mt-16 grid gap-6 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
          <RevealGroup className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-2">
            {stack.map((s) => (
              <RevealItem key={s.label}>
                <div className="flex h-full flex-col justify-between gap-3 rounded-r border border-border bg-surface p-5 opacity-80 transition-opacity hover:opacity-100">
                  <Puzzle className="h-4 w-4 text-fg-dim" />
                  <div>
                    <p className="text-sm font-semibold text-fg">{s.label}</p>
                    <p className="text-xs text-fg-dim">{s.desc}</p>
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>

          <div className="flex items-center justify-center py-4 lg:py-0">
            <div className="flex flex-col items-center gap-2 text-fg-dim">
              <ShieldAlert className="h-6 w-6" />
              <span className="text-xs font-medium uppercase tracking-wider">becomes</span>
            </div>
          </div>

          <RevealItem>
            <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-r border border-primary/30 bg-gradient-to-b from-primary-soft to-surface p-8">
              <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-e300/30 blur-3xl" />
              <Layers className="h-6 w-6 text-primary" />
              <div>
                <p className="text-xl font-semibold text-fg">One platform</p>
                <p className="mt-2 text-sm leading-6 text-fg-muted">
                  One consent model. One audit trail. One place the AI can reason about the
                  customer — from first click to closed deal.
                </p>
              </div>
              <ul className="flex flex-col gap-2 text-sm text-fg-muted">
                {["Single customer profile", "Real-time event log", "One compliance gate for every send"].map(
                  (t) => (
                    <li key={t} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary" /> {t}
                    </li>
                  )
                )}
              </ul>
            </div>
          </RevealItem>
        </div>
      </div>
    </section>
  );
}
