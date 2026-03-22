import React from "react";
import PropTypes from "prop-types";
import SkeletonCard from "./SkeletonCard";

const GRID_COLS = "grid-cols-1 md:grid-cols-2 lg:grid-cols-6";

/**
 * Skeleton grid component.
 * @component
 * @param {object} props - Component properties.
 * @param {number} [props.count=12] - Number of skeleton cards.
 * @returns {JSX.Element}
 */
const SkeletonGrid = React.memo(({ count = 12 }) => (
    <div className={`grid ${GRID_COLS} gap-6`}>
        {Array.from({ length: count }).map((_, index) => (
            <SkeletonCard key={index} />
        ))}
    </div>
));

SkeletonGrid.propTypes = {
    count: PropTypes.number,
};

SkeletonGrid.displayName = "SkeletonGrid";

export default SkeletonGrid;
