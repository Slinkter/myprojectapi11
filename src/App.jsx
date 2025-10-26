/**
 * @file Componente principal de la aplicación (App.jsx).
 * @description Este componente orquesta la obtención de datos de la API,
 * gestiona el estado principal y renderiza los componentes de la interfaz de usuario,
 * incluyendo las listas de gatos, los controles de tema y fuente.
 */

import React, { useEffect, Suspense } from "react";
import { Alert, Typography } from "@material-tailwind/react";
import { useCats } from "./hooks/useCats";
import CatListSkeleton from "./components/skeletons/CatListSkeleton";
import ThemeToggleButton from "./components/ThemeToggleButton";
import FontDropdown from "./components/FontDropdown";

// Carga diferida (Lazy Loading) del componente CatList para optimizar el rendimiento inicial.
const CatList = React.lazy(() => import("./components/CatList"));

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
                    <Typography
                        variant="h1"
                        color="blue-gray"
                        className="text-2xl font-bold dark:text-white"
                    >
                        Cat Gallery
                    </Typography>
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
                    <Alert color="red" className="my-4">
                        An error occurred: {error}
                    </Alert>
                )}
            </main>
        </div>
    );
};

export default App;
