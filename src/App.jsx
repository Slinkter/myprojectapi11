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
import { CatErrorHandler } from "@features/cats";
import { useAppearance } from "@shared/hooks/useAppearance";
import { usePageTitle } from "@shared/hooks/usePageTitle";

// Lazy load container components for performance optimization.
const RandomCatList = React.lazy(() =>
  import("@features/cats").then((m) => ({ default: m.RandomCatList })),
);
const FavouriteCatList = React.lazy(() =>
  import("@features/cats").then((m) => ({ default: m.FavouriteCatList })),
);

/**
 * Root Application Component.
 * @component
 * @returns {JSX.Element} The main layout.
 */
const App = () => {
  // Use isolated hook to manage title.
  usePageTitle("Cat Gallery - Clean Architecture");

  // Hook to manage global appearance effects.
  useAppearance();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          className: "bg-card text-foreground border border-border shadow-lg",
          style: {
            borderRadius: "12px",
          },
        }}
      />

      <header className="sticky top-0 z-50 bg-background/80 border-b border-border backdrop-blur-md">
        <div className="container flex items-center justify-between px-4 py-3 mx-auto">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
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
