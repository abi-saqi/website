"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { useLeadModal } from "@/components/providers/lead-modal-provider";
import type { ReactNode } from "react";

export function ProductHero({
  eyebrow,
  title,
  lede,
  proof,
  secondary,
}: {
  eyebrow: string;
  title: ReactNode;
  lede: string;
  /** Short, checkable facts. Not slogans — these sit under enterprise scrutiny. */
  proof: string[];
  secondary?: { href: string; label: string };
}) {
  const { openDemo } = useLeadModal();

  return (
    // Ink, like every other page opening. It is also what the fixed navbar
    // assumes is behind it at scroll position zero.
    <section className="ink ink-glow ink-grid relative overflow-hidden pb-20 pt-36 sm:pb-24 sm:pt-40">
      <div className="mx-auto max-w-4xl px-6 text-center sm:px-8">
        <Reveal>
          <Badge>{eyebrow}</Badge>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="mt-6 text-balance text-4xl font-semibold leading-[1.12] tracking-tight text-fg sm:text-5xl">
            {title}
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-5 max-w-2xl text-balance text-lg leading-8 text-fg-muted">
            {lede}
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button onClick={openDemo} size="lg">
              Book a demo <ArrowRight className="h-4 w-4" />
            </Button>
            {secondary && (
              <Button href={secondary.href} variant="outline" size="lg">
                {secondary.label} <ArrowUpRight className="h-4 w-4" />
              </Button>
            )}
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <ul className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs font-medium uppercase tracking-wider text-fg-dim">
            {proof.map((p) => (
              <li key={p} className="flex items-center gap-3">
                {p}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

/** Cross-link rail at the foot of a product page. */
export function ProductFooterNav({
  links,
}: {
  links: { href: string; label: string; desc: string }[];
}) {
  return (
    <section className="border-t border-border py-16">
      <div className="mx-auto grid max-w-6xl gap-3 px-6 sm:grid-cols-3 sm:px-8">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="glass group flex flex-col gap-1 rounded-r p-5 transition-colors hover:border-primary/40"
          >
            <span className="flex items-center gap-1.5 text-sm font-semibold text-fg">
              {l.label}
              <ArrowUpRight className="h-3.5 w-3.5 text-fg-dim transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
            </span>
            <span className="text-xs leading-5 text-fg-muted">{l.desc}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
