/**
 * @file Main content area rendering cat lists.
 */

import { Suspense } from "react";
import ErrorBoundary from "@shared/components/ErrorBoundary";
import InitialLoadSkeleton from "@shared/components/InitialLoadSkeleton";
import RandomCatList from "@features/cats/components/RandomCatList";
import FavoriteCatList from "@features/cats/components/FavoriteCatList";
import { CatErrorHandler } from "@features/cats";

/**
 * Main content area rendering cat lists within an ErrorBoundary and Suspense.
 * @component
 * @returns {JSX.Element} The main content section.
 */
const MainContent = () => (
  <main className="container mx-auto p-4">
    <ErrorBoundary>
      <Suspense fallback={<InitialLoadSkeleton />}>
        <RandomCatList />
        <FavoriteCatList />
      </Suspense>
    </ErrorBoundary>
    <CatErrorHandler />
  </main>
);

export default MainContent;
