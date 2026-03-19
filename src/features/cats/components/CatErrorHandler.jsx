/**
 * @file Component to handle and display API errors for the Cats feature.
 * @description Displays an error message and a retry button when cat data fetching fails.
 */

import { MdErrorOutline } from "react-icons/md";
import { useCats } from "@features/cats/hooks/useCats";
import Button from "@shared/ui/Button";

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
      <Button
        onClick={handleRetry}
        ariaLabel="Retry loading cats"
        variant="destructive"
        size="sm"
        className="font-bold text-xs"
      >
        Retry
      </Button>
    </div>
  );
};

export default CatErrorHandler;
