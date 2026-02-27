/**
 * @file Componente de esqueleto para una tarjeta de gato.
 * @description Muestra una animación de pulso para simular la carga de una tarjeta con un diseño y medidas exactas a CatCard.
 */

import { m } from "framer-motion";

/**
 * Animation variants for skeleton pulse.
 * @constant {Object}
 */
const skeletonVariants = {
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

/**
 * Skeleton card with smooth pulse animation.
 * @component
 * @returns {JSX.Element}
 */
const SkeletonCard = () => (
    <m.div
        className="relative aspect-square bg-muted rounded-2xl overflow-hidden shadow-sm"
        variants={skeletonVariants}
        initial="initial"
        animate="animate"
    >
        <div className="absolute top-3 left-3 w-16 h-5 bg-muted-foreground/20 rounded-md" />
        <div className="absolute bottom-3 right-3 w-11 h-11 bg-muted-foreground/20 rounded-full" />
    </m.div>
);

export default SkeletonCard;
