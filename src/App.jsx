import { Suspense } from "react";
import { Toaster } from "react-hot-toast";
import { LazyMotion } from "framer-motion";

import ErrorBoundary from "@shared/components/ErrorBoundary";
import DataInitializer from "@shared/components/DataInitializer";
import InitialLoadSkeleton from "@shared/components/InitialLoadSkeleton";
import RandomCatList from "@features/cats/components/RandomCatList";
import FavouriteCatList from "@features/cats/components/FavouriteCatList";
import ThemeToggleButton from "@features/theme/components/ThemeToggleButton";
import FontDropdown from "@features/font/components/FontDropdown";
import { CatErrorHandler } from "@features/cats";
import { useAppearance } from "@shared/hooks/useAppearance";
import { usePageTitle } from "@shared/hooks/usePageTitle";
import { motionFeatures } from "@config/motionConfig";
import { logStart } from "@shared/lib/debugLogger";

/**
 * Componente Raíz de la Aplicación.
 * @component
 * @returns {JSX.Element} El diseño principal.
 */
const App = () => {
    logStart("App render");
    usePageTitle("Project API 11 - Galería de Gatos");
    useAppearance();

    return (
        <LazyMotion features={motionFeatures}>
            <div className="min-h-dvh">
                <DataInitializer />
                <Navbar />
                <Main />
                <Alert />
            </div>
        </LazyMotion>
    );
};

export default App;

const Navbar = () => {
    return (
        <header className="sticky top-0 z-50 bg-background/80 border-b border-border backdrop-blur-md">
            <div className="container flex items-center justify-between px-4 py-3 mx-auto">
                <h1 className="text-2xl font-bold tracking-tight text-foreground">
                    Galería de Gatos
                </h1>
                <div className="flex items-center gap-4">
                    <FontDropdown />
                    <ThemeToggleButton />
                </div>
            </div>
        </header>
    );
};

const Main = () => {
    return (
        <main className="container mx-auto p-4">
            <ErrorBoundary>
                <Suspense fallback={<InitialLoadSkeleton />}>
                    <RandomCatList />
                    <FavouriteCatList />
                </Suspense>
            </ErrorBoundary>
            <CatErrorHandler />
        </main>
    );
};

const Alert = () => {
    return (
        <Toaster
            position="top-center"
            reverseOrder={false}
            toastOptions={{
                className:
                    "bg-card text-foreground border border-border shadow-lg",
                style: {
                    borderRadius: "12px",
                },
            }}
        />
    );
};
