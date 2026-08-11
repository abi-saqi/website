import Link from "next/link";
import { Sparkles, Briefcase, Send, Code2 } from "lucide-react";

const columns = [
  {
    title: "Platform",
    links: [
      "Lead capture",
      "Qualification & scoring",
      "Campaigns & broadcast",
      "Real-time agent inbox",
      "Analytics & sentiment",
    ],
  },
  {
    title: "Channels",
    links: ["Website widget", "WhatsApp", "Instagram & Facebook", "Web chat", "API & webhooks"],
  },
  {
    title: "Company",
    links: ["About", "Security & trust", "Documentation", "Status", "Contact sales"],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-elevated">
      <div className="mx-auto max-w-6xl px-6 py-16 sm:px-8">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-6">
          <div className="col-span-2">
            <Link href="#top" className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-r-sm bg-primary text-white">
                <Sparkles className="h-4 w-4" />
              </span>
              <span className="text-[15px] font-semibold tracking-tight text-fg">
                saqi<span className="text-primary">.ai</span>
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-6 text-fg-muted">
              The omnichannel engagement platform that markets, captures, qualifies, and
              converts leads — in real time, on one customer profile.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {[Briefcase, Send, Code2].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-r-sm border border-border text-fg-muted transition-colors hover:border-primary hover:text-primary"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title} className="col-span-1 md:col-span-1">
              <h4 className="text-sm font-semibold text-fg">{col.title}</h4>
              <ul className="mt-4 flex flex-col gap-3">
                {col.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="text-sm text-fg-muted transition-colors hover:text-primary"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-xs text-fg-dim sm:flex-row">
          <p>© {new Date().getFullYear()} Saqi.ai. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-fg-muted">Privacy</a>
            <a href="#" className="hover:text-fg-muted">Terms</a>
            <a href="#trust" className="hover:text-fg-muted">DPDP · GDPR · SOC 2</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
