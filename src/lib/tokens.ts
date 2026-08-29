/**
 * ============================================================
 * PORTFOLIO DESIGN TOKENS — JavaScript/TypeScript Constants
 * ============================================================
 * Source of truth for values that must be shared between
 * CSS (via index.css @theme) and JS animation/layout code.
 *
 * USAGE:
 *   import { BREAKPOINTS, ZINDEX, MOTION } from '@/lib/tokens';
 * ============================================================
 */

// ------------------------------------------------------------------
// BREAKPOINTS
// These mirror the canonical CSS media-query ranges.
// Used in window.matchMedia() calls; do NOT define new numeric
// breakpoints outside this file.
// ------------------------------------------------------------------
export const BREAKPOINTS = {
  mobile:       768,   // < 768  → mobile
  tablet:       1024,  // 768–1023 → tablet
  desktop:      1440,  // 1024–1439 → desktop
  largeDesktop: 1440,  // ≥ 1440 → large desktop
} as const;

/**
 * Returns a matchMedia query string for a max-width mobile check.
 * Usage: window.matchMedia(mq.mobile)
 */
export const mq = {
  mobile:       `(max-width: ${BREAKPOINTS.mobile - 1}px)`,
  tablet:       `(min-width: ${BREAKPOINTS.mobile}px) and (max-width: ${BREAKPOINTS.tablet - 1}px)`,
  tabletUp:     `(min-width: ${BREAKPOINTS.mobile}px)`,
  desktop:      `(min-width: ${BREAKPOINTS.tablet}px) and (max-width: ${BREAKPOINTS.largeDesktop - 1}px)`,
  desktopUp:    `(min-width: ${BREAKPOINTS.tablet}px)`,
  largeDesktop: `(min-width: ${BREAKPOINTS.largeDesktop}px)`,
} as const;

// ------------------------------------------------------------------
// Z-INDEX HIERARCHY
// Semantic stacking context values. Never use arbitrary numbers
// outside this table.
// ------------------------------------------------------------------
export const ZINDEX = {
  background:     -10,   // AnimatedBackground fixed layer
  decoration:       0,   // Decorative artwork, Canvas layers
  content:         10,   // Normal section content
  floatingContent: 20,   // Sticky elements, floating panels
  navigation:      50,   // Navbar (fixed)
  overlay:        100,   // Mobile menu backdrop
  modal:          200,   // Modals, dialogs
  splashScreen:   500,   // IntroSequence (replaces z-[9999])
} as const;

// ------------------------------------------------------------------
// MOTION TOKENS
// Single source of truth for animation timing and easing.
//
// Categories:
//   micro     → hover, tap, focus state transitions
//   entrance  → elements appearing on scroll / page load
//   ambient   → looping, breathing, continuous effects
// ------------------------------------------------------------------
export const DURATION = {
  // Micro-interactions (hover effects, button taps, focus rings)
  micro:    150,  // ms
  fast:     220,  // ms
  // Entrance animations (whileInView, initial page load)
  default:  400,  // ms
  entrance: 600,  // ms
  slow:     900,  // ms
  // Ambient / looping (breathing glows, pulsing, canvas idle)
  ambient:  8000, // ms — use CSS animation-duration for these
} as const;

export const EASING = {
  // General transitions
  standard:  [0.4, 0, 0.2, 1]   as [number, number, number, number],
  // Reveals: fast start, smooth landing (used for whileInView)
  entrance:  [0.16, 1, 0.3, 1]  as [number, number, number, number],
  // Exits: smooth away
  exit:      [0.4, 0, 1, 1]     as [number, number, number, number],
} as const;

/** Framer Motion spring presets */
export const SPRING = {
  /** Soft spring — subtle hover lifts, scale pulses */
  soft: { type: 'spring' as const, stiffness: 200, damping: 28 },
  /** Responsive spring — cursor tracking, parallax glows */
  responsive: { type: 'spring' as const, stiffness: 50, damping: 20 },
  /** Snappy spring — button taps, quick nav transitions */
  snappy: { type: 'spring' as const, stiffness: 400, damping: 25 },
} as const;

/** Convenience object for Framer Motion transition props */
export const TRANSITION = {
  micro:    { duration: DURATION.micro / 1000,    ease: EASING.standard },
  fast:     { duration: DURATION.fast / 1000,     ease: EASING.standard },
  default:  { duration: DURATION.default / 1000,  ease: EASING.entrance },
  entrance: { duration: DURATION.entrance / 1000, ease: EASING.entrance },
  slow:     { duration: DURATION.slow / 1000,     ease: EASING.entrance },
} as const;

// ------------------------------------------------------------------
// CONTAINER MAX-WIDTHS
// Semantic container size identifiers.
// These map to CSS custom properties defined in index.css.
// ------------------------------------------------------------------
export const CONTAINER = {
  reading: 820,   // Long-form text, Contact card
  content: 1140,  // Standard section content, Experience timeline
  wide:    1500,  // Projects, full-bleed grids
} as const;
