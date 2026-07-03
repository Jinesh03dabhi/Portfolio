/**
 * Centralized Motion System — "Split Second" Track & Field Athletics
 * 
 * Every transition in the codebase references one of these four named curves.
 * Inline arbitrary easing curves (like easeInOut) are banned.
 */

export const raceCurve = {
  drive: [0.65, 0, 0.35, 1] as const, // steep start, long tail — entrances (0-10m block start split)
  acceleration: [0.25, 0.46, 0.45, 0.94] as const, // steady build — scroll reveals
  maxVelocity: [0.4, 0, 0.2, 1] as const, // constant, confident — hover/press states (≤100ms IAAF reaction threshold)
  deceleration: [0.16, 1, 0.3, 1] as const, // sharp stop — exits, modal close
};

export const raceTiming = {
  reactionCeiling: 0.098, // 98ms (< 100ms false start threshold) for hover/press micro-interactions
  driveSplit: 1.6, // 1.6s for hero block-start drive entrance
  accelerationSplit: 0.6, // 600ms for section scroll reveals
  timingGateSweep: 0.45, // 450ms photo-finish timing beam reveal
};

export const timingGateVariants = {
  hidden: {
    clipPath: "inset(0 100% 0 0)",
    opacity: 0,
  },
  visible: {
    clipPath: "inset(0 0% 0 0)",
    opacity: 1,
    transition: {
      duration: raceTiming.timingGateSweep,
      ease: raceCurve.drive,
    },
  },
};

export const driveVariants = {
  hidden: { y: 40, opacity: 0 },
  visible: (customDelay = 0) => ({
    y: 0,
    opacity: 1,
    transition: {
      duration: raceTiming.driveSplit,
      ease: raceCurve.drive,
      delay: customDelay,
    },
  }),
};
