/**
 * @file Container for the favourite cat list.
 * @description This component handles logic for displaying
 * the user's favourite cats, using the `CatList` presentation component.
 * Data is preloaded at app level.
 */

import { useCats } from "@features/cats/hooks/useCats";
import CatList from "./CatList";
import { logStart, logState } from "@shared/utils/debugLogger";

/**
 * Orchestrates rendering of the favourite cat list.
 * @component
 * @returns {JSX.Element} The rendered React component.
 */
const FavouriteCatList = () => {
  logStart("FavouriteCatList render");
  const { favouriteCats, loading, deleteFavouriteCat } = useCats();

  logState("FavouriteCatList", { favourites: favouriteCats.length, "loading.favourites": loading.favourites });

  console.log(`[${new Date().toISOString()}] 📄 FavouriteCatList: Renderizando CatList con ${favouriteCats.length} favoritos`);

  return (
    <CatList
      title="Favourite Kittens"
      cats={favouriteCats}
      onAction={deleteFavouriteCat}
      actionType="delete"
      isActionDisabled={() => false}
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
