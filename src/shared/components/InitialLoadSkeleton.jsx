import React from "react";
import SkeletonCard from "./skeletons/SkeletonCard";
import SectionHeader from "@shared/components/SectionHeader";

/**
 * Single skeleton shown during initial load.
 * @component
 * @returns {JSX.Element}
 */
const InitialLoadSkeleton = React.memo(() => (
    <div className="space-y-12">
        <section>
            <SectionHeader title="Random Kittens" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
                {Array.from({ length: 12 }).map((_, index) => (
                    <SkeletonCard key={`random-${index}`} />
                ))}
            </div>
        </section>
        <section>
            <SectionHeader title="Favourite Kittens" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {Array.from({ length: 12 }).map((_, index) => (
                    <SkeletonCard key={`fav-${index}`} />
                ))}
            </div>
        </section>
    </div>
));

InitialLoadSkeleton.displayName = "InitialLoadSkeleton";

export default InitialLoadSkeleton;
