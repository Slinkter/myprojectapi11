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
