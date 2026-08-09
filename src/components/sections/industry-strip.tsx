import { Marquee } from "@/components/ui/marquee";
import { Reveal } from "@/components/ui/reveal";

const industries = [
  "Financial services",
  "D2C & e-commerce",
  "Healthcare & wellness",
  "Real estate",
  "EdTech",
  "SaaS & B2B",
  "Insurance",
  "Travel & hospitality",
  "Automotive",
  "Logistics",
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
          {[...industries, ...industries].map((label, i) => (
            <span
              key={i}
              className="whitespace-nowrap text-lg font-medium text-fg-dim/70"
            >
              {label}
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
