/**
 * @file Container for the random cat list.
 * @description This component handles logic for fetching and displaying
 * random cats, using the `CatList` presentation component.
 */

import { useEffect, useMemo, useCallback } from "react";
import { useCats } from "@features/cats/hooks/useCats";
import CatList from "./CatList";

/**
 * @typedef {import('@features/cats/api/catApi').Cat} Cat
 */

/**
 * Orchestrates fetching and rendering of the random cat list.
 * @component
 * @returns {JSX.Element}
 */
const RandomCatList = () => {
  const {
    randomCats,
    favouriteCats,
    loading,
    loadRandomCats,
    saveFavouriteCat,
  } = useCats();

  // Loads random cats on component mount.
  useEffect(() => {
    // Only load if there are no cats and not currently loading.
    if (randomCats.length === 0 && !loading.random) {
      loadRandomCats();
    }
  }, [loadRandomCats, randomCats.length, loading.random]);

  // Optimization: Memoize favourite IDs in a Set for O(1) lookups.
  // This avoids iterating over the favourites array for every cat in the random list.
  const favouriteContext = useMemo(() => {
    return new Set(favouriteCats.map((cat) => cat.id));
  }, [favouriteCats]);

  /**
   * Checks if a cat from the random list is already in favourites.
   * @param {Cat} cat - The cat to check.
   * @returns {boolean} - `true` if the cat is a favourite.
   */
  const isCatInFavourites = useCallback(
    (cat) => {
      return favouriteContext.has(cat.id);
    },
    [favouriteContext]
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

export default RandomCatList;
