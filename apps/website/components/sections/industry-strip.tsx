import { Marquee } from "@/components/ui/marquee";
import { Reveal } from "@/components/ui/reveal";
import {
  Landmark,
  ShoppingBag,
  HeartPulse,
  Building2,
  GraduationCap,
  Boxes,
  ShieldCheck,
  Plane,
  Car,
  Truck,
} from "lucide-react";

const industries = [
  { icon: Landmark, label: "Financial services" },
  { icon: ShoppingBag, label: "D2C & e-commerce" },
  { icon: HeartPulse, label: "Healthcare & wellness" },
  { icon: Building2, label: "Real estate" },
  { icon: GraduationCap, label: "EdTech" },
  { icon: Boxes, label: "SaaS & B2B" },
  { icon: ShieldCheck, label: "Insurance" },
  { icon: Plane, label: "Travel & hospitality" },
  { icon: Car, label: "Automotive" },
  { icon: Truck, label: "Logistics" },
];

export function IndustryStrip() {
  return (
    <section className="border-y border-border bg-elevated py-10">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <Reveal>
          <p className="mb-6 text-center text-xs font-semibold uppercase tracking-[0.18em] text-fg-dim">
            Built for revenue teams across regulated, high-volume industries
          </p>
        </Reveal>
        <Marquee>
          {[...industries, ...industries].map((ind, i) => (
            // With no customer logos to show yet, this rail is the closest the
            // page gets to social proof — so it is rendered to be read, not
            // greyed back to 70% opacity like decoration.
            <span
              key={i}
              className="flex items-center gap-2.5 whitespace-nowrap text-base font-medium text-fg-muted"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-r-sm bg-primary-soft text-primary">
                <ind.icon className="h-4 w-4" />
              </span>
              {ind.label}
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
