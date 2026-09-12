"use client";

import Link from "next/link";
import { Sparkles, Mail } from "lucide-react";
import { useLeadModal } from "@/components/providers/lead-modal-provider";

/** Only destinations that actually exist are listed here. A dead `href="#"`
 *  reads as a broken site to the enterprise buyers this page is aimed at, so
 *  links are added when the page behind them is real, not before. */
const columns = [
  {
    title: "Platform",
    links: [
      { label: "Lead capture", href: "/#capture" },
      { label: "Omnichannel metrics", href: "/#omnichannel" },
      { label: "Campaigns & broadcast", href: "/#engage" },
      { label: "Analytics & sentiment", href: "/#insights" },
      { label: "Architecture", href: "/#scale" },
    ],
  },
  {
    title: "Channels",
    links: [
      { label: "Website widget", href: "/#capture" },
      { label: "WhatsApp & RCS", href: "/#capture" },
      { label: "Instagram & Facebook", href: "/#capture" },
      { label: "Voice / IVR", href: "/#capture" },
      { label: "API & webhooks", href: "/#capture" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Use cases", href: "/use-cases" },
      { label: "Security & trust", href: "/#trust" },
      { label: "Integrations", href: "/#integrations" },
      { label: "FAQ", href: "/#faq" },
    ],
  },
];

export function Footer() {
  const { openSales } = useLeadModal();

  return (
    <footer className="border-t border-border bg-elevated">
      {/* Static, build-time-detectable mirror of the form rendered client-side in
          components/sections/lead-modal.tsx — Netlify's form bot only parses the
          static HTML output, so the real (client-rendered) form needs a twin here
          with matching name/fields for Netlify to register the "lead-form" form
          and route submissions through to notifications. */}
      <form name="lead-form" data-netlify="true" data-netlify-honeypot="bot-field" hidden>
        <input type="text" name="name" />
        <input type="text" name="company" />
        <input type="email" name="email" />
        <input type="text" name="type" />
        <textarea name="message" />
        <input type="text" name="bot-field" />
      </form>

      <div className="mx-auto max-w-6xl px-6 py-16 sm:px-8">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-6">
          <div className="col-span-2">
            <Link href="/#top" className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-r-sm bg-primary text-white">
                <Sparkles className="h-4 w-4" />
              </span>
              <span className="text-[15px] font-semibold tracking-tight text-fg">
                saqi<span className="text-primary">.ai</span>
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-6 text-fg-muted">
              The omnichannel engagement platform that markets, captures, qualifies, and
              converts leads — in real time, on one customer profile.
            </p>
            <a
              href="mailto:sales@saqi.ai"
              className="mt-6 inline-flex items-center gap-2 rounded-r-sm border border-border-strong px-3 py-2 text-sm text-fg-muted transition-colors hover:border-primary hover:text-primary"
            >
              <Mail className="h-4 w-4" />
              sales@saqi.ai
            </a>
          </div>

          {columns.map((col) => (
            <div key={col.title} className="col-span-1 md:col-span-1">
              <h4 className="text-sm font-semibold text-fg">{col.title}</h4>
              <ul className="mt-4 flex flex-col gap-3">
                {col.links.map((l) => (
                  <li key={`${col.title}-${l.label}`}>
                    <Link
                      href={l.href}
                      className="text-sm text-fg-muted transition-colors hover:text-primary"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
                {col.title === "Company" && (
                  <li>
                    <button
                      onClick={openSales}
                      className="text-sm text-fg-muted transition-colors hover:text-primary"
                    >
                      Contact sales
                    </button>
                  </li>
                )}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-xs text-fg-dim sm:flex-row">
          <p>© {new Date().getFullYear()} Saqi.ai. All rights reserved.</p>
          <Link href="/#trust" className="hover:text-fg-muted">
            DPDP · GDPR · SOC 2 Type II in progress
          </Link>
        </div>
      </div>
    </footer>
  );
}
