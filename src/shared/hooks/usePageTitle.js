/**
 * @file Hook to manage the document page title.
 * @description Sets the browser document title on mount and restores
 * the previous title on unmount to prevent side effects.
 */

import { useEffect } from "react";

/**
 * @typedef {Object} UsePageTitleReturn
 * @property {void} This hook does not return any value.
 */

/**
 * Sets the document title dynamically.
 * 
 * @param {string} title - The new title to display in the browser tab.
 * @returns {UsePageTitleReturn} This hook does not return a value.
 * 
 * @example
 * usePageTitle("My Custom Title");
 */
export const usePageTitle = (title) => {
    useEffect(() => {
        const previousTitle = document.title;
        document.title = title;

        return () => {
            document.title = previousTitle;
        };
    }, [title]);
};
