import { SectionHeading } from "@/components/ui/section-heading";
import { DashboardShowcase } from "@/components/sections/dashboard-showcase";

/**
 * The console showcase, on ink.
 *
 * The five screens are real light-UI screenshots, and a light screenshot on a
 * light page has nothing to sit against — it reads as part of the page chrome.
 * On a dark band the same image reads as a product photograph, which is the
 * whole reason Apple, Linear and Braze put their product shots on black.
 *
 * Shared by Home and /use-cases so the treatment cannot drift between them.
 */
export function ConsoleBand({
  eyebrow = "Inside the console",
  title = "The actual console, not a mockup",
  description = "Every screen here is a real saqi.ai workspace. Keep scrolling to move through capture, voice, conversations, and pipeline as your team would.",
}: {
  eyebrow?: string;
  title?: string;
  description?: string;
}) {
  return (
    // No `overflow-hidden` here, deliberately: an ancestor with a clipped
    // overflow makes `position: sticky` resolve against that box instead of
    // the viewport, which silently kills the pinned showcase inside. The glow
    // is `absolute inset-0` so the section's `relative` already contains it.
    <section className="ink ink-glow relative pt-24 sm:pt-28">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <SectionHeading eyebrow={eyebrow} title={title} description={description} />
      </div>
      <div className="mt-14 pb-24 sm:pb-28">
        <DashboardShowcase />
      </div>
    </section>
  );
}
