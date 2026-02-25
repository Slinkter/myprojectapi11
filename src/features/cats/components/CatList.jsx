/**
 * @file Presentational component to render a list of cat cards.
 * @description Displays a title and a grid of cats. It is agnostic to business logic
 * and renders UI based on received props.
 */

import PropTypes from "prop-types";
import SkeletonGrid from "@shared/components/skeletons/SkeletonGrid";
import CatCard from "./CatCard";

/**
 * @typedef {import('@features/cats/api/catApi').Cat} Cat
 */

/**
 * Displays a section with a title and a list of cats in a grid format.
 *
 * @component
 * @param {object} props
 * @param {string} props.title - Section title.
 * @param {Cat[]} props.cats - Array of cats to display.
 * @param {(cat: Cat) => void} props.onAction - Function to execute on card action.
 * @param {'save' | 'delete'} props.actionType - Action type for the card.
 * @param {(cat: Cat) => boolean} props.isActionDisabled - Function that determines if action is disabled.
 * @param {boolean} props.loading - If `true`, shows loading skeleton.
 * @param {React.ReactNode} [props.emptyStateMessage] - Message to display if list is empty.
 * @returns {JSX.Element}
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
        <div className="px-4 py-12 text-center border-2 border-dashed rounded-xl text-muted-foreground border-border/50 bg-muted/20">
          {emptyStateMessage}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {cats.map((cat, index) => (
            <CatCard
              key={cat.id}
              cat={cat}
              index={index}
              onAction={onAction}
              actionType={actionType}
              disabled={isActionDisabled(cat)}
            />
          ))}
        </div>
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
