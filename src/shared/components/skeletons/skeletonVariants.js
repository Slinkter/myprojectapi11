/**
 * @file Skeleton animation variants.
 * @description Framer Motion variants for skeleton loading animations.
 */

/**
 * Animation variants for skeleton loading cards.
 * Creates a smooth pulse effect using opacity transitions.
 *
 * @type {Object}
 * @property {Object} initial - Initial opacity state.
 * @property {Object} animate - Animation configuration with looping opacity.
 *
 * @example
 * ```jsx
 * <m.div variants={skeletonVariants} initial="initial" animate="animate" />
 * ```
 */
export const skeletonVariants = {
    initial: { opacity: 0.4 },
    animate: {
        opacity: [0.4, 0.7, 0.4],
        transition: {
            repeat: Infinity,
            duration: 1.5,
            ease: "easeInOut",
        },
    },
};
