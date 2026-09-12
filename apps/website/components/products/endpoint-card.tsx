import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

const methodStyle: Record<string, string> = {
  GET: "bg-[#3B82F6]/12 text-[#3B82F6]",
  POST: "bg-primary-soft text-primary",
  PATCH: "bg-[#F59E0B]/14 text-[#B45309]",
  DELETE: "bg-rose/12 text-rose",
};

/**
 * One endpoint, with the request and response bodies shown side by side —
 * the shapes are the whole point, so they are never behind a tab.
 */
export function EndpointCard({
  method,
  path,
  title,
  description,
  request,
  response,
  note,
}: {
  method: keyof typeof methodStyle | string;
  path: string;
  title: string;
  description: string;
  request: string;
  response: string;
  note?: string;
}) {
  return (
    <Reveal>
      <div className="glass overflow-hidden rounded-r">
        <div className="border-b border-border p-5 sm:p-6">
          <div className="flex flex-wrap items-center gap-2.5">
            <span
              className={cn(
                "font-mono-tabular rounded-r-sm px-2 py-1 text-[11px] font-bold tracking-wide",
                methodStyle[method] ?? "bg-raised text-fg-muted"
              )}
            >
              {method}
            </span>
            <code className="font-mono-tabular min-w-0 break-all text-sm font-semibold text-fg">
              {path}
            </code>
          </div>
          <h3 className="mt-3 text-base font-semibold text-fg">{title}</h3>
          <p className="mt-1.5 max-w-2xl text-sm leading-6 text-fg-muted">{description}</p>
        </div>

        <div className="grid gap-px bg-border lg:grid-cols-2">
          <CodePane label="Request" tone="muted" code={request} />
          <CodePane label="Response" tone="primary" code={response} />
        </div>

        {note && (
          <p className="border-t border-border px-5 py-3.5 text-xs leading-5 text-fg-dim sm:px-6">
            {note}
          </p>
        )}
      </div>
    </Reveal>
  );
}

function CodePane({
  label,
  code,
  tone,
}: {
  label: string;
  code: string;
  tone: "muted" | "primary";
}) {
  return (
    // min-w-0 so the grid track cannot inherit the code's max-content width and
    // push the page sideways on narrow screens.
    <div className="min-w-0 bg-surface">
      <div className="border-b border-border px-4 py-2.5">
        <span
          className={cn(
            "text-[11px] font-semibold uppercase tracking-wide",
            tone === "primary" ? "text-primary" : "text-fg-dim"
          )}
        >
          {label}
        </span>
      </div>
      <pre className="overflow-x-auto px-4 py-4 text-[12.5px] leading-6 text-fg-muted">
        <code className="font-mono-tabular">{code}</code>
      </pre>
    </div>
  );
}
