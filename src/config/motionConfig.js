/**
 * @file Framer Motion configuration.
 * @description Optimized motion features for reduced bundle size.
 */

import { domAnimation } from "framer-motion";

/**
 * Lazy-loaded animation features for framer-motion.
 * Use this with LazyMotion to reduce bundle size by ~30kb.
 */
export const motionFeatures = domAnimation;
