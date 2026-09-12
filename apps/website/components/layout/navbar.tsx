"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { Menu, X, Sparkles, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { useLeadModal } from "@/components/providers/lead-modal-provider";
import { PRODUCTS, NAV_LINKS } from "@/lib/nav";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState(false);
  const [mobileProducts, setMobileProducts] = useState(false);
  const productsRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const { openDemo } = useLeadModal();
  const pathname = usePathname();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 24);
  });

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Any navigation closes both menus — without this the panel stays open over
  // the page you just moved to. Adjusted during render rather than in an
  // effect, which is the documented way to reset state when a prop changes.
  const [prevPath, setPrevPath] = useState(pathname);
  if (pathname !== prevPath) {
    setPrevPath(pathname);
    setOpen(false);
    setProducts(false);
    setMobileProducts(false);
  }

  useEffect(() => {
    if (!products) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setProducts(false);
    };
    const onPointer = (e: PointerEvent) => {
      if (!productsRef.current?.contains(e.target as Node)) setProducts(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onPointer);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onPointer);
    };
  }, [products]);

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
          scrolled || products ? "glass" : "border border-transparent bg-transparent"
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
          {/* Click-to-toggle rather than hover-to-open: hover-open fights the
              click handler (the pointer opens it, then the click closes it
              again) and leaves touch users with no way in. One interaction
              model covers mouse, touch, and keyboard. */}
          <div ref={productsRef} className="relative">
            <button
              onClick={() => setProducts((v) => !v)}
              aria-expanded={products}
              aria-haspopup="true"
              className={cn(
                "flex items-center gap-1 rounded-r-sm px-3.5 py-2 text-sm font-medium transition-colors",
                products ? "text-fg" : "text-fg-muted hover:text-fg"
              )}
            >
              Products
              <ChevronDown
                className={cn(
                  "h-3.5 w-3.5 transition-transform duration-200",
                  products && "rotate-180"
                )}
              />
            </button>

            <AnimatePresence>
              {products && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                  // Solid, not glass: page content showing through a navigation
                  // menu reads as a rendering fault rather than a material.
                  className="absolute left-0 top-full mt-2 w-[34rem] rounded-r border border-border-strong bg-surface p-2 shadow-[0_16px_48px_-16px_rgba(24,43,33,0.28)]"
                >
                  <div className="grid grid-cols-2 gap-1.5">
                    {PRODUCTS.map((p) => (
                      <Link
                        key={p.href}
                        href={p.href}
                        className="group flex flex-col gap-2 rounded-r-sm p-4 transition-colors hover:bg-raised"
                      >
                        <span className="flex items-center gap-2.5">
                          <span className="flex h-8 w-8 items-center justify-center rounded-r-sm bg-primary-soft text-primary">
                            <p.icon className="h-4 w-4" />
                          </span>
                          <span className="text-sm font-semibold text-fg">{p.name}</span>
                        </span>
                        <span className="text-xs leading-5 text-fg-muted">{p.summary}</span>
                        <span className="mt-1 flex flex-wrap gap-1.5">
                          {p.items.map((i) => (
                            <span
                              key={i}
                              className="rounded-full border border-border px-2 py-0.5 text-[10px] font-medium text-fg-dim"
                            >
                              {i}
                            </span>
                          ))}
                        </span>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {NAV_LINKS.map((l) => (
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
            aria-expanded={open}
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
            className="glass mx-4 mt-2 flex max-h-[calc(100vh-7rem)] flex-col gap-1 overflow-y-auto rounded-r p-3 md:hidden"
          >
            <button
              onClick={() => setMobileProducts((v) => !v)}
              aria-expanded={mobileProducts}
              className="flex items-center justify-between rounded-r-sm px-3.5 py-2.5 text-sm font-medium text-fg-muted hover:bg-raised hover:text-fg"
            >
              Products
              <ChevronDown
                className={cn(
                  "h-4 w-4 transition-transform duration-200",
                  mobileProducts && "rotate-180"
                )}
              />
            </button>
            <AnimatePresence initial={false}>
              {mobileProducts && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className="flex flex-col gap-1 pb-1 pl-2">
                    {PRODUCTS.map((p) => (
                      <Link
                        key={p.href}
                        href={p.href}
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-2.5 rounded-r-sm px-3.5 py-2.5 hover:bg-raised"
                      >
                        <span className="flex h-7 w-7 items-center justify-center rounded-r-sm bg-primary-soft text-primary">
                          <p.icon className="h-3.5 w-3.5" />
                        </span>
                        <span className="min-w-0">
                          <span className="block text-sm font-medium text-fg">{p.name}</span>
                          <span className="block text-[11px] leading-4 text-fg-dim">
                            {p.summary}
                          </span>
                        </span>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {NAV_LINKS.map((l) => (
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
