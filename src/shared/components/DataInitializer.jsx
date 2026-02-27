/**
 * @file Data initializer component.
 * @description Handles initial data loading for the application.
 * This separates data fetching logic from the main App component.
 */

import { usePreloadCats } from "@features/cats/hooks/usePreloadCats";

/**
 * Component responsible for preloading cat data on app initialization.
 * @component
 * @returns {null} This component renders nothing.
 */
const DataInitializer = () => {
  usePreloadCats();
  return null;
};

export default DataInitializer;
