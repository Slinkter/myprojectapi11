/**
 * @file Main application layout component (App.jsx).
 * @description Orchestrates the general page structure but delegates data logic
 * to child feature components.
 */

import React, { Suspense } from "react";
import { Toaster } from "react-hot-toast";

import CatListSkeleton from "@shared/components/skeletons/CatListSkeleton";
import ThemeToggleButton from "@features/theme/components/ThemeToggleButton";
import FontDropdown from "@features/font/components/FontDropdown";
import CatErrorHandler from "@features/cats/components/CatErrorHandler";
import { useAppearance } from "@shared/hooks/useAppearance";

// Lazy load container components for performance optimization.
const RandomCatList = React.lazy(() =>
  import("@features/cats/components/RandomCatList")
);
const FavouriteCatList = React.lazy(() =>
  import("@features/cats/components/FavouriteCatList")
);

/**
 * Root Application Component.
 * @component
 * @returns {JSX.Element} The main layout.
 */
const App = () => {
  // Page title can be set here or in a more specific layout component.
  React.useEffect(() => {
    window.document.title = "Cat Gallery - Clean Architecture";
  }, []);

  // Hook to manage global appearance effects.
  useAppearance();

  return (
    <div className="min-h-screen">
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          className: "dark:bg-gray-800 dark:text-white",
          style: {
            borderRadius: "8px",
            background: "#333",
            color: "#fff",
          },
        }}
      />

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

      <main className="container mx-auto p-4">
        <Suspense fallback={<CatListSkeleton />}>
          <RandomCatList />
        </Suspense>

        <Suspense fallback={<CatListSkeleton />}>
          <FavouriteCatList />
        </Suspense>

        <CatErrorHandler />
      </main>
    </div>
  );
};

export default App;
