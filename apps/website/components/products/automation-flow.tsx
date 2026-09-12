"use client";

import { motion } from "framer-motion";
import {
  Zap,
  GitBranch,
  UserCheck,
  MessageCircle,
  CheckSquare,
  type LucideIcon,
} from "lucide-react";

type Node = {
  kind: "trigger" | "condition" | "action";
  icon: LucideIcon;
  label: string;
  detail: string;
};

const nodes: Node[] = [
  { kind: "trigger", icon: Zap, label: "Trigger", detail: "Demo form submitted" },
  { kind: "condition", icon: GitBranch, label: "Condition", detail: "Lead score ≥ 70" },
  { kind: "action", icon: UserCheck, label: "Action", detail: "Assign to AE by territory" },
  { kind: "action", icon: MessageCircle, label: "Action", detail: "Send WhatsApp confirmation" },
  { kind: "action", icon: CheckSquare, label: "Action", detail: "Create follow-up task, 2h SLA" },
];

const kindStyle: Record<Node["kind"], { chip: string; rail: string }> = {
  trigger: { chip: "bg-[#F59E0B]/14 text-[#B45309]", rail: "bg-[#F59E0B]" },
  condition: { chip: "bg-[#3B82F6]/12 text-[#3B82F6]", rail: "bg-[#3B82F6]" },
  action: { chip: "bg-primary-soft text-primary", rail: "bg-primary" },
};

export function AutomationFlow() {
  return (
    <div className="glass-strong rounded-r p-5 sm:p-6">
      <div className="flex items-center justify-between border-b border-border pb-4">
        <div>
          <p className="text-sm font-semibold text-fg">Inbound demo request</p>
          <p className="text-xs text-fg-dim">Rule · live</p>
        </div>
        <span className="flex items-center gap-1.5 rounded-full bg-primary-soft px-2.5 py-1 text-[11px] font-medium text-primary">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          Running
        </span>
      </div>

      <ol className="relative mt-5 flex flex-col gap-3">
        {nodes.map((n, i) => (
          <motion.li
            key={n.detail}
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.45, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex items-center gap-3 pl-4"
          >
            {/* Rail segment linking this node to the previous one. */}
            {i > 0 && (
              <span
                aria-hidden
                className="absolute left-[7px] top-[-14px] h-[14px] w-px bg-border-strong"
              />
            )}
            <span
              aria-hidden
              className={`absolute left-0 h-3.5 w-3.5 rounded-full ring-4 ring-[var(--elevated)] ${kindStyle[n.kind].rail}`}
            />

            <div className="flex min-w-0 flex-1 items-center gap-3 rounded-r-sm border border-border bg-surface px-3 py-2.5">
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-r-sm ${kindStyle[n.kind].chip}`}
              >
                <n.icon className="h-4 w-4" />
              </span>
              <span className="min-w-0">
                <span className="block text-[10px] font-semibold uppercase tracking-wide text-fg-dim">
                  {n.label}
                </span>
                <span className="block truncate text-sm font-medium text-fg">{n.detail}</span>
              </span>
            </div>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}
