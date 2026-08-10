/**
 * Shared Tailwind preset: the emerald design-token system.
 * Apps import this in their tailwind.config.ts via `presets: [require("@saqi/config/tailwind-preset")]`.
 */
module.exports = {
  theme: {
    extend: {
      colors: {
        e50: "#ECFDF5",
        e100: "#D1FAE5",
        e200: "#A7F3D0",
        e300: "#6EE7B7",
        e400: "#34D399",
        e500: "#10B981",
        e600: "#059669",
        e700: "#047857",
        e800: "#065F46",
        e900: "#064E3B",
        teal: "#0D9488",
        "teal-dk": "#0F766E",
        bg: "#F3F5F4",
        surface: "#FFFFFF",
        elevated: "#F7F9F8",
        raised: "#EDF1EF",
        border: "#E2E7E4",
        "border-strong": "#C9D2CD",
        fg: "#111917",
        "fg-muted": "#5A6B64",
        "fg-dim": "#8A968F",
        primary: "#059669",
        "primary-hi": "#047857",
        "primary-soft": "#ECFDF5",
        amber: "#B45309",
        rose: "#BE123C",
        slate: "#64748B",
      },
      borderRadius: {
        DEFAULT: "10px",
        sm: "6px",
      },
      fontFamily: {
        sans: ["ui-sans-serif", "-apple-system", "Segoe UI", "Roboto", "Arial", "sans-serif"],
        mono: ["ui-monospace", "SF Mono", "JetBrains Mono", "Menlo", "Consolas", "monospace"],
      },
    },
  },
};
