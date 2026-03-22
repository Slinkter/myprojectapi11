import React from "react";
import { MdErrorOutline } from "react-icons/md";
import { useCats } from "@features/cats/hooks/useCats";

/**
 * Component to handle and display API errors.
 * @component
 * @returns {JSX.Element|null} The error alert or null if no error.
 */
const CatErrorHandler = React.memo(() => {
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
                aria-label="Retry loading cats"
                className="px-4 py-2 text-xs font-bold text-white transition-all bg-red-600 rounded-lg hover:bg-red-700 active:scale-95 shadow-md shadow-red-500/20"
            >
                Retry
            </button>
        </div>
    );
});

CatErrorHandler.displayName = "CatErrorHandler";

export default CatErrorHandler;
