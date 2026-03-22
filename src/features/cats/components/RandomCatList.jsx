/**
 * @file Random Cat List component.
 * @description Displays the random cat gallery with save-to-favourites functionality.
 */

import { useMemo, useCallback } from "react";
import { useCats } from "@features/cats/hooks/useCats";
import CatList from "./CatList";
import { SECTION_TITLES } from "@config/uiText";

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

    const favouriteContext = useMemo(() => new Set(favouriteCats.map((cat) => cat.id)), [favouriteCats]);

    const isCatInFavourites = useCallback(
        (cat) => favouriteContext.has(cat.id),
        [favouriteContext],
    );

    return (
        <CatList
            title={SECTION_TITLES.RANDOM_CATS}
            cats={randomCats}
            onAction={saveFavouriteCat}
            actionType="save"
            isActionDisabled={isCatInFavourites}
            loading={loading.random}
        />
    );
};

export default RandomCatList;
