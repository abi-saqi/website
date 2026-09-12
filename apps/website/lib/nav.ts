import { Megaphone, Workflow, type LucideIcon } from "lucide-react";

export type ProductNavItem = {
  href: string;
  name: string;
  icon: LucideIcon;
  /** One line, buyer-facing. Says who it is for and what it does. */
  summary: string;
  /** Capabilities surfaced in the nav panel — keep to four or fewer. */
  items: string[];
};

/**
 * Product IA. Single source of truth for the navbar panel, the mobile menu,
 * and the footer, so the three never drift. Add a product here, not in a
 * component.
 */
export const PRODUCTS: ProductNavItem[] = [
  {
    href: "/products/sales",
    name: "Sales",
    icon: Workflow,
    summary: "Pipeline, deal automation, and routing for the revenue team.",
    items: ["Pipeline", "Automation", "Scoring & routing", "Forecasting"],
  },
  {
    href: "/products/marketing",
    name: "Marketing",
    icon: Megaphone,
    summary: "Campaigns, nudges, bots, and ad audiences on one customer profile.",
    items: ["Campaigns & templates", "Nudges", "Bots & automations", "Ad audiences & catalogs"],
  },
];

/** Flat links that sit beside the Products menu. */
export const NAV_LINKS = [
  { href: "/use-cases", label: "Use cases" },
  { href: "/#integrations", label: "Integrations" },
  { href: "/#trust", label: "Trust" },
];
