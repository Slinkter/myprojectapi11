import React from "react";
import { m } from "framer-motion";
import { skeletonVariants } from "./skeletonVariants";

/**
 * Skeleton card with smooth pulse animation.
 * @component
 * @returns {JSX.Element}
 */
const SkeletonCard = React.memo(() => (
    <m.div
        className="relative aspect-square bg-muted rounded-2xl overflow-hidden shadow-sm"
        variants={skeletonVariants}
        initial="initial"
        animate="animate"
    >
        <div className="absolute top-3 left-3 w-16 h-5 bg-muted-foreground/20 rounded-md" />
        <div className="absolute bottom-3 right-3 w-11 h-11 bg-muted-foreground/20 rounded-full" />
    </m.div>
));

SkeletonCard.displayName = "SkeletonCard";

export default SkeletonCard;
