/**
 * @file Application Data Initializer.
 * @description Component that preloads essential data on app start.
 * Moved to @app/providers to avoid FSD architectural violations.
 */

import { useEffect } from "react";
import { usePreloadCats } from "@features/cats/hooks/usePreloadCats";

/**
 * Component that preloads essential data on app start.
 * @component
 * @returns {null} This component does not render any UI.
 */
const DataInitializer = () => {
  const { preloadData } = usePreloadCats();

  useEffect(() => {
    preloadData();
  }, [preloadData]);

  return null;
};

export default DataInitializer;
