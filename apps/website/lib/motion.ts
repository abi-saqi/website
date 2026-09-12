/**
 * One motion language for the whole site.
 *
 * Animation was previously tuned per component — a 0.6s ease here, a 0.8s
 * cubic there, reveal distances of 16, 20 and 24px on adjacent sections. The
 * result reads as motion that was added rather than designed. These are the
 * only values anything should animate with.
 */

/** The single easing curve. A firm decelerate: quick to commit, slow to settle. */
export const EASE = [0.16, 1, 0.3, 1] as const;

/** Durations, in seconds. Anything longer than `slow` draws attention to itself. */
export const DUR = {
  fast: 0.35,
  base: 0.55,
  slow: 0.8,
} as const;

/** Travel distance for enter transitions, in px. Two steps, not five. */
export const RISE = {
  sm: 12,
  md: 22,
} as const;

/** Delay between siblings in a staggered group. */
export const STAGGER = 0.07;
