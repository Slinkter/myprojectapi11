/**
 * @file Component to handle and display API errors for the Cats feature.
 * @description Displays an error message and a retry button when cat data fetching fails.
 */

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
      className="flex items-center justify-between p-4 my-4 text-sm font-medium border rounded-xl bg-destructive/10 text-destructive border-destructive/20"
      role="alert"
    >
      <div className="flex items-center">
        <MdErrorOutline className="w-5 h-5 mr-2" />
        <span>
          <span className="font-bold">Error:</span> {error}
        </span>
      </div>
      <button
        onClick={handleRetry}
        className="px-4 py-2 text-xs font-bold text-white transition-all bg-red-600 rounded-lg hover:bg-red-700 active:scale-95 shadow-md shadow-red-500/20"
      >
        Retry
      </button>
    </div>
  );
};

export default CatErrorHandler;
