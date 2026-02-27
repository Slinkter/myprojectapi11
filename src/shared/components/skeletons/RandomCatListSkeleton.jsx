/**
 * @file Skeleton component for random cat list loading state.
 * @description Displays placeholder cards while random cats are loading.
 */

import SkeletonCard from "./SkeletonCard";

/**
 * Skeleton loader for the random cats list.
 * @component
 * @returns {JSX.Element} Skeleton grid with placeholder cards.
 */
const RandomCatListSkeleton = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
                <SkeletonCard key={`random-skeleton-${index}`} />
            ))}
        </div>
    );
};

export default RandomCatListSkeleton;
