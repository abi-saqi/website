"use client";

import {
  Globe,
  MessageCircle,
  Camera,
  Phone,
  Megaphone,
  Target,
  BrainCircuit,
  HandCoins,
  TrendingUp,
} from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { StatCounter } from "@/components/ui/stat-counter";

const channels = [
  { icon: Globe, label: "Website", y: 60 },
  { icon: MessageCircle, label: "WhatsApp", y: 148 },
  { icon: Camera, label: "Instagram", y: 236 },
  { icon: Phone, label: "Voice", y: 324 },
  { icon: Megaphone, label: "Google Ads", y: 412 },
  { icon: Target, label: "Meta Ads", y: 500 },
];

const stages = [
  { icon: BrainCircuit, label: "Qualify", desc: "Scored & routed", y: 150 },
  { icon: HandCoins, label: "Convert", desc: "Deal won", y: 280 },
  { icon: TrendingUp, label: "ROI", desc: "Revenue attributed", y: 410 },
];

const HUB = { x: 500, y: 280 };
const CHANNEL_X = 60;
const STAGE_X = 940;
const VB_W = 1000;
const VB_H = 560;

function bezierPath(x1: number, y1: number, x2: number, y2: number) {
  const cx = (x1 + x2) / 2;
  return `M${x1},${y1} Q${cx},${y1} ${cx},${(y1 + y2) / 2} T${x2},${y2}`;
}

export function OmnichannelFlow() {
  return (
    <div className="mx-auto w-full max-w-5xl">
      <div className="relative aspect-[1000/560] w-full">
        <svg viewBox={`0 0 ${VB_W} ${VB_H}`} className="absolute inset-0 h-full w-full" fill="none">
          <defs>
            <linearGradient id="flowStroke" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="var(--e400)" stopOpacity="0.5" />
              <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.9" />
            </linearGradient>
          </defs>

          {channels.map((c) => {
            const d = bezierPath(CHANNEL_X, c.y, HUB.x, HUB.y);
            return (
              <g key={c.label}>
                <path d={d} stroke="url(#flowStroke)" strokeWidth={1.5} strokeOpacity={0.35} />
                {[0, 1.1, 2.2].map((delay) => (
                  <circle key={delay} r={4} fill="var(--primary)">
                    <animateMotion dur="3.3s" begin={`${delay}s`} repeatCount="indefinite" path={d} />
                    <animate
                      attributeName="opacity"
                      values="0;1;1;0"
                      keyTimes="0;0.1;0.85;1"
                      dur="3.3s"
                      begin={`${delay}s`}
                      repeatCount="indefinite"
                    />
                  </circle>
                ))}
              </g>
            );
          })}

          {stages.map((s) => {
            const d = bezierPath(HUB.x, HUB.y, STAGE_X, s.y);
            return (
              <g key={s.label}>
                <path d={d} stroke="url(#flowStroke)" strokeWidth={1.5} strokeOpacity={0.35} />
                {[0.4, 1.5, 2.6].map((delay) => (
                  <circle key={delay} r={4} fill="var(--teal)">
                    <animateMotion dur="3.3s" begin={`${delay}s`} repeatCount="indefinite" path={d} />
                    <animate
                      attributeName="opacity"
                      values="0;1;1;0"
                      keyTimes="0;0.1;0.85;1"
                      dur="3.3s"
                      begin={`${delay}s`}
                      repeatCount="indefinite"
                    />
                  </circle>
                ))}
              </g>
            );
          })}
        </svg>

        {channels.map((c) => (
          <div
            key={c.label}
            className="glass absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full py-1.5 pl-1.5 pr-3.5"
            style={{ left: `${(CHANNEL_X / VB_W) * 100}%`, top: `${(c.y / VB_H) * 100}%` }}
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary-soft text-primary">
              <c.icon className="h-3.5 w-3.5" />
            </span>
            <span className="text-xs font-medium text-fg">{c.label}</span>
          </div>
        ))}

        <div
          className="glass-strong absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-1 rounded-full text-center"
          style={{
            left: `${(HUB.x / VB_W) * 100}%`,
            top: `${(HUB.y / VB_H) * 100}%`,
            width: "16%",
            aspectRatio: "1",
          }}
        >
          <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-primary/10 [animation-duration:2.5s]" />
          <span className="text-[10px] font-semibold uppercase tracking-wider text-primary">Unified</span>
          <span className="text-xs font-semibold text-fg">Profile</span>
        </div>

        {stages.map((s) => (
          <Reveal key={s.label} delay={0.1}>
            <div
              className="glass absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-3 rounded-r px-4 py-3"
              style={{ left: `${(STAGE_X / VB_W) * 100}%`, top: `${(s.y / VB_H) * 100}%` }}
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-r-sm bg-primary text-white">
                <s.icon className="h-4 w-4" />
              </span>
              <div className="whitespace-nowrap">
                <p className="text-sm font-semibold text-fg">{s.label}</p>
                <p className="text-[11px] text-fg-dim">{s.desc}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.2} className="mt-8 flex justify-center">
        <div className="glass inline-flex rounded-full px-8 py-4">
          <StatCounter value={2.89} decimals={2} prefix="₹" suffix=" Cr" label="Pipeline influenced, this month" />
        </div>
      </Reveal>
    </div>
  );
}
