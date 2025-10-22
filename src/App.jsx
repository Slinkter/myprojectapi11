/**
 * @file Componente principal de la aplicación.
 * @description Orquesta la obtención de datos y renderiza las listas de gatos, ahora con soporte para tema oscuro/claro.
 */

import React, { useEffect, Suspense } from "react";
import { Alert, Typography } from "@material-tailwind/react";
import { useCats } from "./hooks/useCats";
import CatListSkeleton from "./components/skeletons/CatListSkeleton";
import ThemeToggleButton from "./components/ThemeToggleButton";
import FontDropdown from "./components/FontDropdown";

const CatList = React.lazy(() => import("./components/CatList"));

const App = () => {
    const {
        randomCats,
        favouriteCats,
        loading,
        error,
        loadRandomCats,
        loadFavouriteCats,
        saveFavouriteCat,
        deleteFavouriteCat,
    } = useCats();

    useEffect(() => {
        loadRandomCats();
        loadFavouriteCats();
        window.document.title = "Cat Gallery - Dark Mode";
        // La clase del body ahora se maneja en el ThemeContext
        // document.body.classList.add("bg-gray-50");
    }, [loadRandomCats, loadFavouriteCats]);

    const isCatInFavourites = (randomCat) => {
        return favouriteCats.some((favCat) => favCat.id === randomCat.id);
    };

    return (
        <div className="min-h-screen">
            <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-10">
                <div className="container mx-auto px-4 py-2 flex justify-between items-center">
                    <Typography variant="h1" color="blue-gray" className="text-2xl font-bold dark:text-white">
                        Cat Gallery
                    </Typography>
                    <FontDropdown />
                    <ThemeToggleButton />
                </div>
            </header>

            <main className="container mx-auto p-4">
                {error && (
                    <Alert color="red" className="my-4">
                        An error occurred: {error}
                    </Alert>
                )}

                <Suspense fallback={<CatListSkeleton />}>
                    <CatList
                        title="Random Kittens"
                        cats={randomCats}
                        onAction={saveFavouriteCat}
                        actionType="save"
                        isActionDisabled={isCatInFavourites}
                        loading={loading.random}
                    />
                </Suspense>

                <Suspense fallback={<CatListSkeleton />}>
                    <CatList
                        title="Favourite Kittens"
                        cats={favouriteCats}
                        onAction={deleteFavouriteCat}
                        actionType="delete"
                        isActionDisabled={() => false}
                        loading={loading.favourites}
                    />
                </Suspense>
            </main>
        </div>
    );
};

export default App;

