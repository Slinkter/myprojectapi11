/**
 * @file Component to handle and display API errors for the Cats feature.
 * @description Displays an error message and a retry button when cat data fetching fails.
 */

import React from "react";
import { MdErrorOutline } from "react-icons/md";
import { useCats } from "@features/cats/hooks/useCats";

/**
 * Component to handle and display API errors.
 * @returns {JSX.Element|null} The error alert or null if no error.
 */
const CatErrorHandler = () => {
  const { error, loadRandomCats, loadFavouriteCats } = useCats();

  const handleRetry = () => {
    loadRandomCats();
    loadFavouriteCats();
  };

  if (!error) return null;

  return (
    <div
      className="my-4 p-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 flex items-center justify-between"
      role="alert"
    >
      <div className="flex items-center">
        <MdErrorOutline className="w-5 h-5 mr-2" />
        <span>
          <span className="font-medium">Error:</span> An error occurred: {error}
        </span>
      </div>
      <button
        onClick={handleRetry}
        className="ml-4 px-3 py-1.5 text-xs font-medium text-white bg-red-700 hover:bg-red-800 rounded-lg focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
      >
        Retry
      </button>
    </div>
  );
};

export default CatErrorHandler;
