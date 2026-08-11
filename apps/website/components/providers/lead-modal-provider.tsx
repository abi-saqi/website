"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { LeadModal } from "@/components/sections/lead-modal";

type LeadModalMode = "demo" | "sales" | null;

const LeadModalContext = createContext<{
  openDemo: () => void;
  openSales: () => void;
} | null>(null);

export function LeadModalProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<LeadModalMode>(null);

  const openDemo = useCallback(() => setMode("demo"), []);
  const openSales = useCallback(() => setMode("sales"), []);
  const close = useCallback(() => setMode(null), []);

  const value = useMemo(() => ({ openDemo, openSales }), [openDemo, openSales]);

  return (
    <LeadModalContext.Provider value={value}>
      {children}
      <LeadModal mode={mode} onClose={close} />
    </LeadModalContext.Provider>
  );
}

export function useLeadModal() {
  const ctx = useContext(LeadModalContext);
  if (!ctx) throw new Error("useLeadModal must be used within LeadModalProvider");
  return ctx;
}
