"use client";

import { Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";

function toggleTheme() {
  const root = document.documentElement;
  const current =
    root.getAttribute("data-theme") ??
    (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  const next = current === "dark" ? "light" : "dark";
  root.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
}

export function ThemeToggle({ className }: { className?: string }) {
  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle light and dark mode"
      className={cn(
        "relative flex h-9 w-9 items-center justify-center rounded-r-sm border border-border text-fg-muted transition-colors hover:border-primary hover:text-primary",
        className
      )}
    >
      <Sun className="theme-icon-sun h-4 w-4" />
      <Moon className="theme-icon-moon h-4 w-4" />
    </button>
  );
}
