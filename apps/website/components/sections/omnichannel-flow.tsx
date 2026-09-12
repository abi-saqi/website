"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, Fingerprint, Gauge, Split } from "lucide-react";
import { CHANNELS, STAGES } from "@/lib/channels";
import { StatCounter } from "@/components/ui/stat-counter";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

/* ---------------------------------------------------------------------------
   Geometry

   One coordinate space for everything. The SVG uses this viewBox directly and
   the HTML overlays are positioned as percentages of it, so the curves land on
   the cards instead of near them.

   The previous version started each curve at the pill's *centre* (so the line
   emerged from under the label) and used a quadratic `Q…T` pair, which made
   all eight curves converge into a knot well short of the hub. Cubic segments
   with horizontal control handles fan out cleanly and arrive at the hub
   tangentially, which is what makes it read as a funnel rather than a tangle.
   --------------------------------------------------------------------------- */
const VB = { w: 1120, h: 720 };

/** Width of the channel column. Every pill is stretched to it, so the stub
    can start at a known x instead of floating short of a variable-width pill. */
const PILL_RIGHT = 252;
/** Where the horizontal stubs end and the curves begin. */
const RAIL = 292;

const HUB = { x: 560, y: 360, half: 108 };
const HUB_IN = HUB.x - HUB.half;
const HUB_OUT = HUB.x + HUB.half;

/** Left edge of the stage column. */
const STAGE_X = 818;

const CH_TOP = 44;
const CH_GAP = (VB.h - CH_TOP * 2) / (CHANNELS.length - 1);

const channels = CHANNELS.map((c, i) => ({ ...c, y: CH_TOP + i * CH_GAP }));
const stages = STAGES.map((s, i) => ({ ...s, y: 180 + i * 180 }));

/**
 * Symmetric S-curve between two x-positions. Both control handles sit on the
 * horizontal midpoint, which guarantees cp1.x <= cp2.x for any span — hard-
 * coded handle lengths inverted the control points once the columns were
 * resized, folding every curve back on itself into a vertical bunch.
 */
const sCurve = (x1: number, y1: number, x2: number, y2: number) => {
  const k = (x2 - x1) / 2;
  return `M${x1},${y1} C${x1 + k},${y1} ${x2 - k},${y2} ${x2},${y2}`;
};

/** Channel pill → hub. */
const inboundPath = (y: number) => sCurve(RAIL, y, HUB_IN, HUB.y);

/** Hub → outcome card. */
const outboundPath = (y: number) => sCurve(HUB_OUT, HUB.y, STAGE_X, y);

const pct = (v: number, total: number) => `${(v / total) * 100}%`;

/* ---------------------------------------------------------------------------
   The cycle

   Four phases, one channel at a time. The point is that the hub readout is
   driven by the same state as the travelling signal — so what the diagram
   animates and what it says are never out of step.
   --------------------------------------------------------------------------- */
const PHASES = [
  { key: "capture", icon: Split, label: "Captured", ms: 1300 },
  { key: "resolve", icon: Fingerprint, label: "Identity resolved", ms: 1100 },
  { key: "score", icon: Gauge, label: "Scored", ms: 1100 },
  { key: "route", icon: Check, label: "Routed", ms: 1500 },
] as const;

type PhaseKey = (typeof PHASES)[number]["key"];

/** Vertical connector for the compact layout — the stacked stand-in for a
    curve. Animates the same signal travelling down instead of across. */
function FlowArrow({ color }: { color: string }) {
  const reduced = useReducedMotion();
  return (
    <div className="relative mx-auto my-2 h-7 w-px" style={{ background: `${color}33` }}>
      {!reduced && (
        <motion.span
          className="absolute left-1/2 h-2.5 w-0.5 -translate-x-1/2 rounded-full"
          style={{ background: color }}
          initial={{ top: "-10%", opacity: 0 }}
          animate={{ top: "100%", opacity: [0, 1, 1, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
    </div>
  );
}

/** The hub readout. Shared by the wide diagram and the compact layout so the
    two can never drift apart. */
function HubCard({
  channel,
  reachedHub,
  className,
  style,
}: {
  channel: (typeof channels)[number];
  reachedHub: boolean;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      aria-hidden
      className={cn(
        "glass-strong relative flex flex-col justify-center rounded-r px-4 py-3.5",
        className,
      )}
      style={style}
    >
      <motion.span
        key={`ring-${channel.key}-${reachedHub}`}
        aria-hidden
        className="absolute inset-0 -z-10 rounded-r"
        initial={{ boxShadow: `0 0 0 0px ${channel.color}55` }}
        animate={{ boxShadow: `0 0 0 14px transparent` }}
        transition={{ duration: 1.1, ease: "easeOut" }}
      />

      <span className="text-[9px] font-semibold uppercase tracking-[0.16em] text-primary">
        Unified profile
      </span>

      <AnimatePresence mode="wait">
        <motion.span
          key={channel.key}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.25, ease: EASE }}
          className="mt-1.5 block"
        >
          <span className="block truncate text-[11px] font-semibold text-fg">
            {channel.sample.event}
          </span>
          <span className="mt-0.5 block text-[10px] leading-snug text-fg-muted">
            {channel.sample.intent}
          </span>
        </motion.span>
      </AnimatePresence>

      <span className="mt-2.5 flex items-center justify-between border-t border-border pt-2">
        <span className="text-[9px] font-medium uppercase tracking-wide text-fg-dim">Score</span>
        <span
          className="font-mono-tabular text-sm font-semibold"
          style={{ color: reachedHub ? channel.color : undefined }}
        >
          {reachedHub ? channel.sample.score : "—"}
        </span>
      </span>
    </div>
  );
}

export function OmnichannelFlow() {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const [phase, setPhase] = useState(0);
  const [paused, setPaused] = useState(false);

  // Reduced motion gets the resolved end state and no timer at all — the
  // CSS-level `prefers-reduced-motion` override cannot reach a JS interval,
  // and the SMIL animations this replaces ignored it outright.
  useEffect(() => {
    if (reduced || paused) return;
    const t = setTimeout(() => {
      // Both setters are called from the timeout, never from inside another
      // setter's updater: React can invoke an updater more than once, which
      // advanced `active` twice per cycle and made the loop skip every other
      // channel. The cleanup below means only one timer is ever live.
      if (phase < PHASES.length - 1) {
        setPhase(phase + 1);
      } else {
        setPhase(0);
        setActive((a) => (a + 1) % channels.length);
      }
    }, PHASES[phase]!.ms);
    return () => clearTimeout(t);
  }, [phase, reduced, paused]);

  const channel = channels[active]!;
  const phaseKey: PhaseKey = PHASES[phase]!.key;
  const reachedHub = reduced || phase >= 1;
  const routing = reduced || phaseKey === "route";
  const target = stages.find((s) => s.key === channel.sample.stage)!;

  /** Jump straight to a channel — pointer or keyboard. */
  function select(i: number) {
    setActive(i);
    setPhase(0);
  }

  return (
    <figure
      className="glass-strong relative mx-auto w-full max-w-5xl overflow-hidden rounded-2xl p-5 sm:p-8"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Ambient tint, derived from the channel list rather than hard-coded so
          it stays in step if the palette changes. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        {channels.slice(0, 4).map((c, i) => (
          <div
            key={c.key}
            className="absolute h-56 w-56 rounded-full blur-[110px] transition-opacity duration-700"
            style={{
              background: c.color,
              opacity: active === i ? 0.3 : 0.14,
              left: i % 2 === 0 ? "6%" : undefined,
              right: i % 2 === 1 ? "6%" : undefined,
              top: i < 2 ? "8%" : undefined,
              bottom: i >= 2 ? "8%" : undefined,
            }}
          />
        ))}
      </div>

      {/* The diagram is decorative to assistive tech; the table below carries
          the same information in a form a screen reader can actually walk.

          Below `lg` it is replaced entirely rather than scaled: the pills and
          cards are HTML positioned as percentages of the viewBox, so their type
          does not shrink with it — at phone width they collided and the hub
          wrapped to one word per line. The compact layout below runs off the
          same state, so the two can never tell different stories. */}
      <div className="relative hidden aspect-[1120/720] w-full lg:block">
        <svg
          aria-hidden
          viewBox={`0 0 ${VB.w} ${VB.h}`}
          className="absolute inset-0 h-full w-full"
          fill="none"
        >
          <defs>
            {/* A soft bloom on the live segment only — applying it to every
                path is what made the old version read as noise. */}
            <filter id="flow-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Resting topology. Always visible so the reader can see the whole
              shape of the system, not just the one path that is lit. */}
          <g>
            {channels.map((c) => (
              <g key={c.key}>
                <path
                  d={`M${PILL_RIGHT},${c.y} L${RAIL},${c.y}`}
                  stroke={c.color}
                  strokeWidth={1.25}
                  strokeOpacity={active === channels.indexOf(c) ? 0.8 : 0.22}
                />
                <path
                  d={inboundPath(c.y)}
                  stroke={c.color}
                  strokeWidth={1.25}
                  strokeOpacity={active === channels.indexOf(c) ? 0.45 : 0.16}
                />
              </g>
            ))}
            {stages.map((s) => (
              <path
                key={s.key}
                d={outboundPath(s.y)}
                stroke={s.color}
                strokeWidth={1.25}
                strokeOpacity={routing && s.key === target.key ? 0.5 : 0.16}
              />
            ))}
          </g>

          {/* Live inbound signal. `pathOffset` slides a short dash along the
              curve — a comet, without needing `offset-path` support. */}
          {!reduced && phaseKey === "capture" && (
            <motion.path
              key={`in-${channel.key}-${phase}`}
              d={inboundPath(channel.y)}
              stroke={channel.color}
              strokeWidth={3}
              strokeLinecap="round"
              filter="url(#flow-glow)"
              // pathLength/pathSpacing are motion values in framer 13, not
              // static attributes — held constant in both states so only
              // pathOffset animates, sliding a short dash along the curve.
              initial={{ pathLength: 0.16, pathSpacing: 0.84, pathOffset: -0.16, opacity: 0 }}
              animate={{
                pathLength: 0.16,
                pathSpacing: 0.84,
                pathOffset: 1,
                opacity: [0, 1, 1, 0],
              }}
              transition={{ duration: PHASES[0].ms / 1000, ease: "easeInOut" }}
            />
          )}

          {/* Live outbound signal, to the matched outcome only. */}
          {!reduced && routing && (
            <motion.path
              key={`out-${channel.key}`}
              d={outboundPath(target.y)}
              stroke={target.color}
              strokeWidth={3}
              strokeLinecap="round"
              filter="url(#flow-glow)"
              initial={{ pathLength: 0.16, pathSpacing: 0.84, pathOffset: -0.16, opacity: 0 }}
              animate={{
                pathLength: 0.16,
                pathSpacing: 0.84,
                pathOffset: 1,
                opacity: [0, 1, 1, 0],
              }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
            />
          )}
        </svg>

        {/* Channel rail. Buttons, not divs: this is the diagram's only control
            and it has to be reachable from the keyboard. */}
        <ul className="absolute inset-y-0 left-0" style={{ width: pct(PILL_RIGHT, VB.w) }}>
          {channels.map((c, i) => {
            const on = i === active;
            return (
              <li
                key={c.key}
                className="absolute inset-x-0 left-0 -translate-y-1/2"
                style={{ top: pct(c.y, VB.h) }}
              >
                <button
                  type="button"
                  onClick={() => select(i)}
                  onFocus={() => select(i)}
                  aria-pressed={on}
                  className={cn(
                    "glass flex w-full items-center gap-2 rounded-full py-1.5 pl-1.5 pr-3.5 transition-all duration-300",
                    // Active state marks itself with border + tint rather
                    // than a box-shadow: focusing a pill also activates it, so
                    // an inline box-shadow here would sit on top of the focus
                    // indicator on exactly the element that needs it.
                    "focus-ring",
                    on ? "scale-[1.04] shadow-lg" : "opacity-65 hover:opacity-100",
                  )}
                  style={on ? { borderColor: c.color, background: `${c.color}1f` } : undefined}
                >
                  <span
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${c.chip}`}
                  >
                    <c.icon className="h-3.5 w-3.5" />
                  </span>
                  <span className="whitespace-nowrap text-xs font-medium text-fg">{c.label}</span>
                </button>
              </li>
            );
          })}
        </ul>

        {/* The hub. Previously an empty circle captioned "Unified Profile" —
            the emptiest thing on screen sat at its optical centre. It now shows
            the record being assembled, which is the actual claim. */}
        <HubCard
          channel={channel}
          reachedHub={reachedHub}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{
            left: pct(HUB.x, VB.w),
            top: pct(HUB.y, VB.h),
            width: pct(HUB.half * 2.35, VB.w),
          }}
        />

        {/* Outcome cards. */}
        <ul
          aria-hidden
          className="absolute inset-y-0 right-0"
          style={{ width: pct(VB.w - STAGE_X, VB.w) }}
        >
          {stages.map((s) => {
            const on = routing && s.key === target.key;
            return (
              <li
                key={s.key}
                className="absolute left-0 -translate-y-1/2"
                style={{ top: pct(s.y, VB.h) }}
              >
                <div
                  className={cn(
                    "glass flex items-center gap-2.5 rounded-r px-3 py-2.5 transition-all duration-500",
                    on ? "scale-[1.04]" : "opacity-60",
                  )}
                  style={on ? { borderColor: s.color, background: `${s.color}1f` } : undefined}
                >
                  <span
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-r-sm text-white"
                    style={{ backgroundColor: s.color }}
                  >
                    <s.icon className="h-4 w-4" />
                  </span>
                  <span className="whitespace-nowrap">
                    <span className="block text-xs font-semibold text-fg">{s.label}</span>
                    <span className="block text-[10px] text-fg-dim">{s.desc}</span>
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Compact layout — below `lg`, and the same state machine throughout.
          Stacked top to bottom in the reading order the wide diagram implies:
          channels in, one profile, one outcome out. */}
      <div className="lg:hidden">
        <ul className="grid grid-cols-2 gap-1.5 sm:grid-cols-4">
          {channels.map((c, i) => {
            const on = i === active;
            return (
              <li key={c.key}>
                <button
                  type="button"
                  onClick={() => select(i)}
                  onFocus={() => select(i)}
                  aria-pressed={on}
                  className={cn(
                    "glass flex w-full items-center gap-2 rounded-r px-2.5 py-2 transition-all duration-300",
                    "focus-ring",
                    on ? "opacity-100" : "opacity-55",
                  )}
                  style={on ? { borderColor: c.color, background: `${c.color}1f` } : undefined}
                >
                  <span
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${c.chip}`}
                  >
                    <c.icon className="h-3 w-3" />
                  </span>
                  <span className="min-w-0 truncate text-[11px] font-medium text-fg">
                    {c.label}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        <FlowArrow color={channel.color} />

        <HubCard channel={channel} reachedHub={reachedHub} />

        <FlowArrow color={target.color} />

        <ul aria-hidden className="grid grid-cols-3 gap-1.5">
          {stages.map((s) => {
            const on = routing && s.key === target.key;
            return (
              <li key={s.key}>
                <div
                  className={cn(
                    "glass flex h-full flex-col items-center gap-1.5 rounded-r px-2 py-2.5 text-center transition-all duration-500",
                    on ? "opacity-100" : "opacity-55",
                  )}
                  style={on ? { borderColor: s.color, background: `${s.color}1f` } : undefined}
                >
                  <span
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-r-sm text-white"
                    style={{ backgroundColor: s.color }}
                  >
                    <s.icon className="h-3.5 w-3.5" />
                  </span>
                  <span>
                    <span className="block text-[11px] font-semibold leading-tight text-fg">
                      {s.label}
                    </span>
                    <span className="block text-[9px] leading-tight text-fg-dim">{s.desc}</span>
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Phase stepper — names what the reader is watching, so the motion is
          explanatory rather than ambient. */}
      <div
        aria-hidden
        className="relative mt-5 flex flex-wrap items-center justify-center gap-x-2 gap-y-2 sm:gap-x-3"
      >
        {PHASES.map((p, i) => {
          const done = reduced || i <= phase;
          return (
            <span key={p.key} className="flex items-center gap-2 sm:gap-3">
              {i > 0 && <span className="h-px w-4 bg-border-strong sm:w-6" />}
              <span
                className={cn(
                  "flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-medium transition-colors duration-300 sm:text-[11px]",
                  done ? "bg-primary-soft text-primary" : "text-fg-dim",
                )}
              >
                <p.icon className="h-3 w-3" />
                {p.label}
              </span>
            </span>
          );
        })}
      </div>

      <div className="relative mt-5 flex justify-center">
        <div className="glass inline-flex rounded-full px-7 py-3.5">
          <StatCounter
            value={2.89}
            decimals={2}
            prefix="₹"
            suffix=" Cr"
            label="Pipeline influenced, this month"
          />
        </div>
      </div>

      {/* The tabular alternative the design system requires for every chart.
          Visually hidden, fully readable by a screen reader. */}
      <figcaption className="sr-only">
        How each channel flows into one profile and on to an outcome.
      </figcaption>
      <table className="sr-only">
        <caption>Omnichannel capture, scoring, and routing by channel</caption>
        <thead>
          <tr>
            <th scope="col">Channel</th>
            <th scope="col">Example event</th>
            <th scope="col">Detected intent</th>
            <th scope="col">Lead score</th>
            <th scope="col">Routed to</th>
          </tr>
        </thead>
        <tbody>
          {channels.map((c) => (
            <tr key={c.key}>
              <th scope="row">{c.label}</th>
              <td>{c.sample.event}</td>
              <td>{c.sample.intent}</td>
              <td>{c.sample.score}</td>
              <td>{stages.find((s) => s.key === c.sample.stage)?.label}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </figure>
  );
}
