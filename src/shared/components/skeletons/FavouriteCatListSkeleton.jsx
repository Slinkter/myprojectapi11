/**
 * @file Skeleton component for favourite cat list loading state.
 * @description Displays placeholder cards while favourite cats are loading.
 */

import SkeletonCard from "./SkeletonCard";

/**
 * Skeleton loader for the favourite cats list.
 * @component
 * @returns {JSX.Element} Skeleton grid with placeholder cards.
 */
const FavouriteCatListSkeleton = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, index) => (
                <SkeletonCard key={`favourite-skeleton-${index}`} />
            ))}
        </div>
    );
};

export default FavouriteCatListSkeleton;
