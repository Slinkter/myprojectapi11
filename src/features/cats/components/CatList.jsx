/**
 * @file Presentational component to render a list of cat cards.
 * @description Displays a title and a grid of cats. It is agnostic to business logic
 * and renders UI based on received props.
 */

import PropTypes from "prop-types";
import { m, AnimatePresence, useReducedMotion } from "framer-motion";
import SkeletonGrid from "@shared/components/skeletons/SkeletonGrid";
import EmptyState from "@shared/components/EmptyState";
import CatCard from "./CatCard";

/**
 * @typedef {import('../adapters/catMapper').CatEntity} CatEntity
 */

/**
 * Animation variants for staggered list entrance.
 * @constant {Object}
 */
const listItemVariants = {
    hidden: (i) => ({
        opacity: 0,
        scale: 0.8,
        y: 20,
        transition: { delay: i * 0.05 },
    }),
    visible: (i) => ({
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
            delay: i * 0.05,
            duration: 0.3,
            stiffness: 300,
            damping: 25,
        },
    }),
    exit: {
        opacity: 0,
        scale: 0.5,
        transition: { duration: 0.2 },
    },
};

/**
 * Grid container animation variants.
 * @constant {Object}
 */
const gridVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.05 },
    },
};

/**
 * Displays a section with a title and a list of cats in a grid format.
 *
 * @component
 * @param {object} props - Component properties.
 * @param {string} [props.title] - Section title.
 * @param {CatEntity[]} props.cats - Array of normalized cats to display.
 * @param {(cat: CatEntity) => void} props.onAction - Function to execute on card action.
 * @param {'save' | 'delete'} props.actionType - Action type for the card.
 * @param {(cat: CatEntity) => boolean} props.isActionDisabled - Function that determines if action is disabled.
 * @param {boolean} props.loading - If `true`, shows loading skeleton.
 * @param {import('react').ReactNode} [props.emptyStateMessage] - Message to display if list is empty.
 * @returns {JSX.Element} The rendered React component.
 */
const CatList = (props) => {
    const shouldReduceMotion = useReducedMotion();

    const {
        title,
        cats,
        onAction,
        actionType,
        isActionDisabled,
        loading,
        emptyStateMessage,
    } = props;

    // Show skeleton immediately when no cats (avoids empty flash)
    const showSkeleton = cats.length === 0;
    const isEmpty = !loading && cats.length === 0;

    const containerVariants = shouldReduceMotion
        ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
        : gridVariants;

    const itemVariants = shouldReduceMotion
        ? {
              hidden: { opacity: 1, scale: 1 },
              visible: { opacity: 1, scale: 1 },
              exit: { opacity: 0 },
          }
        : listItemVariants;

    return (
        <section className="w-full mb-12">
            {title && (
                <m.h3
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="pb-2 mb-4 text-xl font-bold border-b text-foreground border-border"
                >
                    {title}
                </m.h3>
            )}
            {showSkeleton ? (
                <SkeletonGrid />
            ) : isEmpty && emptyStateMessage ? (
                <EmptyState message={emptyStateMessage} />
            ) : (
                <m.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <AnimatePresence mode="popLayout">
                        {cats.map((cat, index) => (
                            <m.div
                                key={cat.id}
                                layout
                                custom={index}
                                variants={itemVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                            >
                                <CatCard
                                    index={index}
                                    cat={cat}
                                    onAction={onAction}
                                    actionType={actionType}
                                    disabled={isActionDisabled(cat)}
                                />
                            </m.div>
                        ))}
                    </AnimatePresence>
                </m.div>
            )}
        </section>
    );
};

CatList.propTypes = {
    title: PropTypes.string,
    cats: PropTypes.array.isRequired,
    onAction: PropTypes.func.isRequired,
    actionType: PropTypes.oneOf(["save", "delete"]).isRequired,
    isActionDisabled: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    emptyStateMessage: PropTypes.node,
};

export default CatList;
