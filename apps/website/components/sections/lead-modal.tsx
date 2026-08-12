"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarCheck, CheckCircle2, LayoutDashboard, Megaphone, Phone, MessagesSquare } from "lucide-react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const previewTabs = [
  { key: "overview", label: "Dashboard", icon: LayoutDashboard, src: "/dashboard/dashboard-overview.jpg" },
  { key: "acquisition", label: "Acquisition", icon: Megaphone, src: "/dashboard/dashboard-acquisition.jpg" },
  { key: "voice", label: "Voice AI", icon: Phone, src: "/dashboard/dashboard-voice.jpg" },
  { key: "conversations", label: "Inbox", icon: MessagesSquare, src: "/dashboard/dashboard-conversations.jpg" },
];

function DemoPreview() {
  const [active, setActive] = useState(0);
  const tab = previewTabs[active]!;

  useEffect(() => {
    const id = setInterval(() => setActive((i) => (i + 1) % previewTabs.length), 2600);
    return () => clearInterval(id);
  }, []);

  return (
    <div>
      <div className="relative aspect-[1800/973] w-full overflow-hidden rounded-r-sm border border-border">
        <AnimatePresence mode="wait">
          <motion.div
            key={tab.key}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0"
          >
            <Image
              src={tab.src}
              alt={`${tab.label} screen of the saqi.ai console`}
              fill
              sizes="480px"
              className="object-cover object-top"
            />
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="mt-3 flex justify-center gap-1.5">
        {previewTabs.map((t, i) => (
          <button
            key={t.key}
            onClick={() => setActive(i)}
            aria-label={`Show ${t.label}`}
            className={cn(
              "h-1.5 rounded-full transition-all",
              i === active ? "w-6 bg-primary" : "w-1.5 bg-border-strong"
            )}
          />
        ))}
      </div>
    </div>
  );
}

type Mode = "demo" | "sales" | null;

const copy = {
  demo: {
    icon: CalendarCheck,
    title: "See saqi.ai on your own data",
    desc: "30 minutes with a solutions engineer — bring your current stack, we'll show you what moves on day one.",
    submitLabel: "Request my demo",
    successTitle: "Request received",
    successDesc: "A solutions engineer will reach out within one business day to confirm a time.",
    messageLabel: null as string | null,
  },
  sales: {
    icon: CheckCircle2,
    title: "Talk to sales",
    desc: "Tell us what you're trying to solve — a solutions engineer will follow up directly.",
    submitLabel: "Send to sales",
    successTitle: "Message sent",
    successDesc: "Someone from our team will get back to you within one business day.",
    messageLabel: "What are you trying to solve?",
  },
};

export function LeadModal({ mode, onClose }: { mode: Mode; onClose: () => void }) {
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "error">("idle");
  const [prevMode, setPrevMode] = useState(mode);

  if (mode !== prevMode) {
    setPrevMode(mode);
    if (mode) setStatus("idle");
  }

  const c = copy[mode ?? "demo"];

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    const body = new URLSearchParams(new FormData(e.currentTarget) as unknown as string[][]).toString();
    try {
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
      });
      setStatus(res.ok ? "done" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <Modal open={!!mode} onClose={onClose}>
      {status === "done" ? (
        <div className="flex flex-col items-center py-6 text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-soft text-primary">
            <CheckCircle2 className="h-6 w-6" />
          </span>
          <h3 className="mt-5 text-xl font-semibold text-fg">{c.successTitle}</h3>
          <p className="mt-2 max-w-sm text-sm leading-6 text-fg-muted">{c.successDesc}</p>
          <Button variant="outline" size="sm" className="mt-6" onClick={onClose}>
            Close
          </Button>
        </div>
      ) : (
        <>
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-soft text-primary">
            <c.icon className="h-5 w-5" />
          </span>
          <h3 className="mt-4 text-xl font-semibold text-fg">{c.title}</h3>
          <p className="mt-1.5 text-sm leading-6 text-fg-muted">{c.desc}</p>

          {mode === "demo" && (
            <div className="mt-6">
              <DemoPreview />
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            name="lead-form"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
            className="mt-6 flex flex-col gap-3.5"
          >
            <input type="hidden" name="form-name" value="lead-form" />
            <input type="hidden" name="type" value={mode ?? "demo"} />
            <p className="hidden">
              <label>
                Don&apos;t fill this out if you&apos;re human: <input name="bot-field" />
              </label>
            </p>
            <div className="grid gap-3.5 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="lead-name" className="text-xs font-medium text-fg-dim">
                  Full name
                </label>
                <input
                  id="lead-name"
                  name="name"
                  required
                  type="text"
                  autoComplete="name"
                  className="h-10 rounded-r-sm border border-border-strong bg-background px-3 text-sm text-fg outline-none transition-colors focus:border-primary"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="lead-company" className="text-xs font-medium text-fg-dim">
                  Company
                </label>
                <input
                  id="lead-company"
                  name="company"
                  required
                  type="text"
                  autoComplete="organization"
                  className="h-10 rounded-r-sm border border-border-strong bg-background px-3 text-sm text-fg outline-none transition-colors focus:border-primary"
                />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="lead-email" className="text-xs font-medium text-fg-dim">
                Work email
              </label>
              <input
                id="lead-email"
                name="email"
                required
                type="email"
                autoComplete="email"
                className="h-10 rounded-r-sm border border-border-strong bg-background px-3 text-sm text-fg outline-none transition-colors focus:border-primary"
              />
            </div>
            {c.messageLabel && (
              <div className="flex flex-col gap-1.5">
                <label htmlFor="lead-message" className="text-xs font-medium text-fg-dim">
                  {c.messageLabel}
                </label>
                <textarea
                  id="lead-message"
                  name="message"
                  required
                  rows={3}
                  className="resize-none rounded-r-sm border border-border-strong bg-background px-3 py-2 text-sm text-fg outline-none transition-colors focus:border-primary"
                />
              </div>
            )}
            {status === "error" && (
              <p className="text-xs font-medium text-rose">
                Something went wrong sending that — try again, or email sales@saqi.ai directly.
              </p>
            )}
            <Button size="lg" className="mt-2 w-full justify-center" disabled={status === "submitting"}>
              {status === "submitting" ? "Sending…" : c.submitLabel}
            </Button>
          </form>
        </>
      )}
    </Modal>
  );
}
