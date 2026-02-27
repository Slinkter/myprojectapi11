/**
 * @file Presentational component to render a list of cat cards.
 * @description Displays a title and a grid of cats. It is agnostic to business logic
 * and renders UI based on received props.
 */

import PropTypes from "prop-types";
import { m, AnimatePresence } from "framer-motion";
import SkeletonGrid from "@shared/components/skeletons/SkeletonGrid";
import EmptyState from "@shared/components/EmptyState";
import CatCard from "./CatCard";

/**
 * @typedef {import('../adapters/catMapper').CatEntity} CatEntity
 */

/**
 * Displays a section with a title and a list of cats in a grid format.
 *
 * @component
 * @param {object} props - Component properties.
 * @param {string} props.title - Section title.
 * @param {CatEntity[]} props.cats - Array of normalized cats to display.
 * @param {(cat: CatEntity) => void} props.onAction - Function to execute on card action.
 * @param {'save' | 'delete'} props.actionType - Action type for the card.
 * @param {(cat: CatEntity) => boolean} props.isActionDisabled - Function that determines if action is disabled.
 * @param {boolean} props.loading - If `true`, shows loading skeleton.
 * @param {import('react').ReactNode} [props.emptyStateMessage] - Message to display if list is empty.
 * @returns {JSX.Element} The rendered React component.
 */
const CatList = (props) => {
  const {
    title,
    cats,
    onAction,
    actionType,
    isActionDisabled,
    loading,
    emptyStateMessage,
  } = props;

  const isEmpty = !loading && cats.length === 0;

  return (
    <section className="w-full mb-12">
      <h3 className="pb-2 mb-4 text-xl font-bold border-b text-foreground border-border">
        {title}
      </h3>
{loading && cats.length === 0 ? (
        <SkeletonGrid />
      ) : isEmpty && emptyStateMessage ? (
<EmptyState message={emptyStateMessage} />
      ) : (
        <m.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6  gap-6"
        >
          <AnimatePresence mode="popLayout">
            {cats.map((cat, index) => (
              <m.div
                key={cat.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{
                  opacity: 0,
                  scale: 0.5,
                  transition: { duration: 0.2, delay: 0 },
                }}
                transition={{
                  duration: 0.3,
                  delay: Math.min(index * 0.05, 0.5),
                }}
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
  title: PropTypes.string.isRequired,
  cats: PropTypes.array.isRequired,
  onAction: PropTypes.func.isRequired,
  actionType: PropTypes.oneOf(["save", "delete"]).isRequired,
  isActionDisabled: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  emptyStateMessage: PropTypes.node,
};

export default CatList;
