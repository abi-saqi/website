"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { Menu, X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { useLeadModal } from "@/components/providers/lead-modal-provider";
import { cn } from "@/lib/utils";

const links = [
  { href: "/#platform", label: "Platform" },
  { href: "/#capture", label: "Capture" },
  { href: "/use-cases", label: "Use Cases" },
  { href: "/#scale", label: "Scale" },
  { href: "/#insights", label: "Insights" },
  { href: "/#trust", label: "Trust" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  const { openDemo } = useLeadModal();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 24);
  });

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "py-3" : "py-5"
      )}
    >
      <div
        className={cn(
          "mx-auto flex max-w-6xl items-center justify-between rounded-r px-4 py-2.5 transition-all duration-300 sm:px-5",
          scrolled ? "glass" : "border border-transparent bg-transparent"
        )}
      >
        <Link href="/#top" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-r-sm bg-primary text-white">
            <Sparkles className="h-4 w-4" />
          </span>
          <span className="text-[15px] font-semibold tracking-tight text-fg">
            saqi<span className="text-primary">.ai</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-r-sm px-3.5 py-2 text-sm font-medium text-fg-muted transition-colors hover:text-fg"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />
          <Button href="https://app.saqi.ai" variant="ghost" size="sm">
            Sign in
          </Button>
          <Button onClick={openDemo} size="sm">
            Book a demo
          </Button>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            className="flex h-9 w-9 items-center justify-center rounded-r-sm text-fg"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="glass mx-4 mt-2 flex flex-col gap-1 rounded-r p-3 md:hidden"
          >
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-r-sm px-3.5 py-2.5 text-sm font-medium text-fg-muted hover:bg-raised hover:text-fg"
              >
                {l.label}
              </Link>
            ))}
            <div className="mt-2 flex flex-col gap-2 border-t border-border pt-3">
              <Button href="https://app.saqi.ai" variant="outline" size="sm">
                Sign in
              </Button>
              <Button
                onClick={() => {
                  setOpen(false);
                  openDemo();
                }}
                size="sm"
              >
                Book a demo
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
