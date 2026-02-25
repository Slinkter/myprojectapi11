/**
 * @file usePageTitle hook.
 * @description Manages the document title.
 */

import { useEffect } from "react";

/**
 * Hook to set the document title.
 * @param {string} title - The title to set.
 */
export const usePageTitle = (title) => {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = title;
    return () => {
      document.title = prevTitle;
    };
  }, [title]);
};
