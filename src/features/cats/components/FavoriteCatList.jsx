/**
 * @file Favourite Cat List component.
 * @description Displays the user's saved favourite cats with delete functionality.
 */

import { useCats } from "@features/cats/hooks/useCats";
import CatList from "./CatList";
import { EMPTY_STATE_MESSAGES, SECTION_TITLES } from "@config/uiText";

/**
 * Orchestrates rendering of the favourite cat list.
 * @component
 * @returns {JSX.Element} The rendered React component.
 */
const FavoriteCatList = () => {
    const { favouriteCats, loading, deleteFavouriteCat } = useCats();

    return (
        <CatList
            title={SECTION_TITLES.FAVOURITE_CATS}
            cats={favouriteCats}
            onAction={deleteFavouriteCat}
            actionType="delete"
            isActionDisabled={() => false}
            loading={loading.favourites}
            actionLoading={loading.deleting}
            emptyStateMessage={EMPTY_STATE_MESSAGES.FAVOURITES}
        />
    );
};

export default FavoriteCatList;
