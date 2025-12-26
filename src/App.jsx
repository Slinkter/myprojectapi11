/**
 * @file Componente principal de la aplicación (App.jsx).
 * @description Este componente orquesta la obtención de datos de la API,
 * gestiona el estado principal y renderiza los componentes de la interfaz de usuario,
 * incluyendo las listas de gatos, los controles de tema y fuente.
 */

import React, { useEffect, Suspense } from "react";

import { useCats } from "@features/cats/hooks/useCats";
import CatListSkeleton from "@shared/components/skeletons/CatListSkeleton";
import ThemeToggleButton from "@features/theme/components/ThemeToggleButton";
import FontDropdown from "@features/font/components/FontDropdown";

// Carga diferida (Lazy Loading) del componente CatList para optimizar el rendimiento inicial.
const CatList = React.lazy(() => import("@features/cats/components/CatList"));

/**
 * Componente raíz de la aplicación.
 *
 * @component
 * @returns {JSX.Element} El layout principal de la aplicación.
 */
const App = () => {
    // Hook personalizado para acceder al estado y acciones de los gatos.
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

    // Efecto para cargar los datos iniciales (gatos aleatorios y favoritos) al montar el componente.
    useEffect(() => {
        loadRandomCats();
        loadFavouriteCats();
        // Establece el título de la página.
        window.document.title = "Cat Gallery - Dark Mode";
    }, [loadRandomCats, loadFavouriteCats]); // Las dependencias aseguran que las funciones (memoizadas) no causen re-ejecuciones innecesarias.

    /**
     * Verifica si un gato de la lista aleatoria ya se encuentra en la lista de favoritos.
     *
     * @param {object} cat - El objeto del gato aleatorio a verificar.
     * @returns {boolean} `true` si el gato ya es favorito, `false` en caso contrario.
     */
    const isCatInFavourites = (cat) => {
        return favouriteCats.some((favCat) => favCat.id === cat.id);
    };

    return (
        <div className="min-h-screen">
            {/* Encabezado fijo con el título y los controles de UI. */}
            <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-10">
                <div className="container mx-auto px-4 py-2 flex justify-between items-center">
                    <h1 className="text-2xl font-bold dark:text-white text-gray-900">
                        Cat Gallery
                    </h1>
                    <div className="flex items-center gap-4">
                        <FontDropdown />
                        <ThemeToggleButton />
                    </div>
                </div>
            </header>

            {/* Contenido principal de la aplicación. */}
            <main className="container mx-auto p-4">
                {/* Suspense se usa para mostrar un fallback (esqueleto) mientras el componente CatList se carga de forma diferida. */}
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
                        isActionDisabled={() => false} // El botón de eliminar nunca está deshabilitado.
                        loading={loading.favourites}
                    />
                </Suspense>

                {/* Muestra una alerta en caso de error en la API. */}
                {error && (
                    <div
                        className="my-4 p-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                        role="alert"
                    >
                        An error occurred: {error}
                    </div>
                )}
            </main>
        </div>
    );
};

export default App;
