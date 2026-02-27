/**
 * @file Container for the random cat list.
 * @description This component handles logic for displaying
 * random cats, using the `CatList` presentation component.
 * Data is preloaded at app level via usePreloadCats.
 */

import { useMemo, useCallback } from "react";
import { useCats } from "@features/cats/hooks/useCats";
import CatList from "./CatList";

/**
 * @typedef {import('../adapters/catMapper').CatEntity} CatEntity
 */

/**
 * Orchestrates rendering of the random cat list.
 * @component
 * @returns {JSX.Element} The rendered React component.
 */
const RandomCatList = () => {
    const { randomCats, favouriteCats, loading, saveFavouriteCat } = useCats();

    // Optimization: Memoize favourite IDs in a Set for O(1) lookups.
    const favouriteContext = useMemo(() => {
        return new Set(favouriteCats.map((cat) => cat.id));
    }, [favouriteCats]);

    /**
     * Checks if a cat from the random list is already in favourites.
     * @param {CatEntity} cat - The cat to check.
     * @returns {boolean} - `true` if the cat is a favourite.
     */
    const isCatInFavourites = useCallback(
        (cat) => {
            return favouriteContext.has(cat.id);
        },
        [favouriteContext],
    );

    return (
        <CatList
            title="Random Kittens"
            cats={randomCats}
            onAction={saveFavouriteCat}
            actionType="save"
            isActionDisabled={isCatInFavourites}
            loading={loading.random}
        />
    );
};

RandomCatList.propTypes = {};

export default RandomCatList;
