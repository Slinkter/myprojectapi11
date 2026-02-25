/**
 * @file Container for the favourite cat list.
 * @description This component handles logic for fetching and displaying
 * the user's favourite cats, using the `CatList` presentation component.
 */

import { useEffect } from "react";
import { useCats } from "@features/cats/hooks/useCats";
import CatList from "./CatList";

/**
 * Orchestrates fetching and rendering of the favourite cat list.
 * @component
 * @returns {JSX.Element} The rendered React component.
 */
const FavouriteCatList = () => {
  const { favouriteCats, loading, loadFavouriteCats, deleteFavouriteCat } =
    useCats();

  // Loads favourite cats on component mount.
  useEffect(() => {
    if (favouriteCats.length === 0 && !loading.favourites) {
      loadFavouriteCats();
    }
  }, [loadFavouriteCats, favouriteCats.length, loading.favourites]);

  return (
    <CatList
      title="Favourite Kittens"
      cats={favouriteCats}
      onAction={deleteFavouriteCat}
      actionType="delete"
      isActionDisabled={() => false} // Delete button is never disabled.
      loading={loading.favourites}
      emptyStateMessage={
        <span>
          You have no favourite kittens yet. <br />
          Click the heart on a kitten to save it!
        </span>
      }
    />
  );
};

export default FavouriteCatList;
