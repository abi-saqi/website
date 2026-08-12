"use client";

import { Reveal } from "@/components/ui/reveal";
import { StatCounter } from "@/components/ui/stat-counter";
import { CHANNELS, STAGES } from "@/lib/channels";

/* Diagram-space vertical positions, derived from the canonical lists so the
   layout stays evenly distributed if a channel or stage is added. */
const channels = CHANNELS.map((c, i) => ({ ...c, y: 46 + i * 94 }));
const stages = STAGES.map((s, i) => ({ ...s, y: 260 + i * 160 }));

const HUB = { x: 500, y: 375 };
const CHANNEL_X = 68;
const STAGE_X = 932;
const VB_W = 1000;
const VB_H = 760;

function bezierPath(x1: number, y1: number, x2: number, y2: number) {
  const cx = (x1 + x2) / 2;
  return `M${x1},${y1} Q${cx},${y1} ${cx},${(y1 + y2) / 2} T${x2},${y2}`;
}

export function OmnichannelFlow() {
  return (
    <div className="glass-strong relative mx-auto w-full max-w-5xl overflow-hidden rounded-2xl p-6 sm:p-10">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[6%] top-[8%] h-56 w-56 rounded-full bg-[#DD2A7B]/20 blur-[100px]" />
        <div className="absolute left-[10%] bottom-[10%] h-56 w-56 rounded-full bg-[#F59E0B]/20 blur-[100px]" />
        <div className="absolute right-[8%] top-[15%] h-56 w-56 rounded-full bg-[#0866FF]/20 blur-[100px]" />
        <div className="absolute right-[6%] bottom-[8%] h-56 w-56 rounded-full bg-primary/20 blur-[100px]" />
      </div>

      <div className="relative aspect-[1000/760] w-full">
        <svg viewBox={`0 0 ${VB_W} ${VB_H}`} className="absolute inset-0 h-full w-full" fill="none">
          {channels.map((c) => {
            const d = bezierPath(CHANNEL_X, c.y, HUB.x, HUB.y);
            return (
              <g key={c.label}>
                <path d={d} stroke={c.color} strokeWidth={1.5} strokeOpacity={0.3} />
                {[0, 1.1, 2.2].map((delay) => (
                  <circle key={delay} r={4} fill={c.color}>
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
                <path d={d} stroke={s.color} strokeWidth={1.5} strokeOpacity={0.35} />
                {[0.4, 1.5, 2.6].map((delay) => (
                  <circle key={delay} r={4} fill={s.color}>
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
            <span className={`flex h-7 w-7 items-center justify-center rounded-full ${c.chip}`}>
              <c.icon className="h-3.5 w-3.5" />
            </span>
            <span className="whitespace-nowrap text-xs font-medium text-fg">{c.label}</span>
          </div>
        ))}

        <div
          className="glass-strong absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-1 rounded-full text-center ring-2 ring-primary/20"
          style={{
            left: `${(HUB.x / VB_W) * 100}%`,
            top: `${(HUB.y / VB_H) * 100}%`,
            width: "15%",
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
              <span
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-r-sm text-white"
                style={{ backgroundColor: s.color }}
              >
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

      <Reveal delay={0.2} className="relative mt-8 flex justify-center">
        <div className="glass inline-flex rounded-full px-8 py-4">
          <StatCounter value={2.89} decimals={2} prefix="₹" suffix=" Cr" label="Pipeline influenced, this month" />
        </div>
      </Reveal>
    </div>
  );
}
