import type { Metadata } from "next";
import Link from "next/link";
import {
  Inbox,
  Brain,
  Send,
  ArrowUpRight,
  Clock,
  Camera,
  MessageCircle,
  PhoneCall,
  Handshake,
} from "lucide-react";
import { ProductHero, ProductFooterNav } from "@/components/products/product-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { TiltCard } from "@/components/ui/tilt-card";
import { CTA } from "@/components/sections/cta";

export const metadata: Metadata = {
  title: "How it works — saqi.ai explained in plain language",
  description:
    "No jargon: what goes into saqi.ai, what it does with it, and what your team gets back — plus a plain-English glossary of the terms used everywhere else on this site.",
};

const steps = [
  {
    icon: Inbox,
    n: "Someone gets in touch",
    body: "They message your WhatsApp, reply to an Instagram ad, fill in a form, or ring you. Today each of those probably lands somewhere different. Here they all land in the same place.",
  },
  {
    icon: Brain,
    n: "We work out who they are",
    body: "If they have contacted you before — on any channel — we recognise them and pull up the history. Then we read what they want and how urgent it sounds, and give it a score.",
  },
  {
    icon: Send,
    n: "The right person replies",
    body: "A high score goes straight to the right salesperson with the full history attached. A routine question gets answered automatically. Nothing waits in a queue nobody checks.",
  },
];

const glossary = [
  {
    term: "Omnichannel",
    plain:
      "All the ways a customer can reach you — WhatsApp, Instagram, phone, your website — treated as one conversation instead of four separate ones.",
  },
  {
    term: "Customer profile",
    plain:
      "One page per person, holding everything they have ever done with you: messages, calls, pages viewed, things bought. The thing your team opens instead of six tabs.",
  },
  {
    term: "Lead scoring",
    plain:
      "A number that estimates how ready someone is to buy, based on what they did. Viewed pricing three times? Score goes up. Went quiet for a week? Score goes down.",
  },
  {
    term: "Routing",
    plain:
      "Deciding which colleague gets the enquiry — by region, language, who is free, or who owns the account — and starting a clock so it does not get forgotten.",
  },
  {
    term: "Nudge",
    plain:
      "A small, well-timed message triggered by something the customer did, like leaving items in a basket. Not a mass mail-out.",
  },
  {
    term: "Campaign",
    plain:
      "A message sent to many people at once, like a sale announcement. Still checked against each person's permission before it goes.",
  },
  {
    term: "Template",
    plain:
      "A pre-approved message format. WhatsApp requires businesses to get these approved before sending, so we manage that approval for you.",
  },
  {
    term: "Consent gate",
    plain:
      "An automatic check before every single message: did this person agree to hear from us, is it a reasonable hour where they are, and have we already messaged them enough today?",
  },
];

const journey = [
  {
    icon: Camera,
    time: "11:04 pm",
    title: "She taps your Instagram ad",
    body: "Priya sees an ad for your winter range and sends a message asking whether a coat comes in her size.",
    chip: "bg-gradient-to-br from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white",
  },
  {
    icon: MessageCircle,
    time: "11:04 pm",
    title: "She gets an answer straight away",
    body: "The assistant checks the catalogue, confirms the size is in stock, and asks which city she is in — without waking anyone up.",
    chip: "bg-[#25D366]/14 text-[#1DA851]",
  },
  {
    icon: Clock,
    time: "11:06 pm",
    title: "Her interest is recorded",
    body: "Because she asked about stock and gave a location, her score rises. She is flagged as worth a human follow-up, but not messaged again overnight.",
    chip: "bg-[#3B82F6]/12 text-[#3B82F6]",
  },
  {
    icon: PhoneCall,
    time: "9:30 am",
    title: "A salesperson picks it up",
    body: "Arjun opens his queue. Priya is at the top, with the whole conversation and the exact product already attached. He does not ask her to repeat anything.",
    chip: "bg-primary-soft text-primary",
  },
  {
    icon: Handshake,
    time: "10:12 am",
    title: "It closes, and it is counted",
    body: "She buys. The sale is tied back to the Instagram ad that started it, so you know what that ad was actually worth.",
    chip: "bg-teal/12 text-teal-dk",
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <ProductHero
        eyebrow="How it works"
        title={
          <>
            The whole thing,
            <br />
            without the jargon.
          </>
        }
        lede="Most software sites explain themselves in words only the people who built it use. This page does not. If you are deciding whether this is worth a meeting, start here."
        proof={["Five-minute read", "No acronyms", "One worked example"]}
        secondary={{ href: "/use-cases", label: "See real scenarios" }}
      />

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-6 sm:px-8">
          <SectionHeading
            eyebrow="In three steps"
            title="What actually happens"
            description="That is genuinely the whole loop. Everything else on this site is a detail inside one of these three steps."
          />
          <RevealGroup className="mt-14 grid gap-4 md:grid-cols-3">
            {steps.map((s, i) => (
              <RevealItem key={s.n}>
                <TiltCard className="h-full p-6" strength={5}>
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-r-sm bg-primary-soft text-primary">
                      <s.icon className="h-5 w-5" />
                    </span>
                    <span className="font-mono-tabular text-xs font-semibold text-fg-dim">
                      Step {i + 1}
                    </span>
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-fg">{s.n}</h3>
                  <p className="mt-2 text-sm leading-6 text-fg-muted">{s.body}</p>
                </TiltCard>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="wash border-t border-border bg-elevated py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-6 sm:px-8">
          <SectionHeading
            eyebrow="One evening, start to finish"
            title="What it looks like for one customer"
            description="A single real-shaped example, from the ad she tapped to the sale you can attribute."
          />

          <ol className="mt-14 flex flex-col">
            {journey.map((j, i) => (
              <Reveal key={j.title} delay={i * 0.05}>
                <li className="relative flex gap-4 pb-8 last:pb-0">
                  {i < journey.length - 1 && (
                    <span
                      aria-hidden
                      className="absolute left-[19px] top-11 h-[calc(100%-2.75rem)] w-px bg-border-strong"
                    />
                  )}
                  <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${j.chip}`}
                  >
                    <j.icon className="h-4 w-4" />
                  </span>
                  <div className="min-w-0 pt-1">
                    <span className="font-mono-tabular text-[11px] font-semibold uppercase tracking-wide text-fg-dim">
                      {j.time}
                    </span>
                    <h3 className="mt-1 text-base font-semibold text-fg">{j.title}</h3>
                    <p className="mt-1.5 text-sm leading-6 text-fg-muted">{j.body}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-6 sm:px-8">
          <SectionHeading
            eyebrow="Plain English"
            title="Every term we use, translated"
            description="If a word on this site made you pause, it is probably here. Nothing on this page assumes you work in software."
          />
          <RevealGroup className="mt-14 grid gap-4 sm:grid-cols-2">
            {glossary.map((g) => (
              <RevealItem key={g.term}>
                <div className="glass h-full rounded-r p-5">
                  <h3 className="text-sm font-semibold text-primary">{g.term}</h3>
                  <p className="mt-2 text-sm leading-6 text-fg-muted">{g.plain}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal delay={0.15} className="mt-8 flex justify-center">
            <Link
              href="/use-cases"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary-hi"
            >
              Now see it applied to real situations
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </Reveal>
        </div>
      </section>

      <ProductFooterNav
        links={[
          {
            href: "/use-cases",
            label: "Use cases",
            desc: "The same idea, applied to specific everyday situations.",
          },
          {
            href: "/products/sales",
            label: "Sales",
            desc: "What the salespeople in that example are actually working in.",
          },
          {
            href: "/products/marketing",
            label: "Marketing",
            desc: "How the ad, the nudge, and the campaign side works.",
          },
        ]}
      />

      <CTA />
    </>
  );
}
