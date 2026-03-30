/**
 * @file Global toast notification container.
 * @description Configures and renders the Toaster component with theme-aware styles.
 */

import { Toaster } from "react-hot-toast";

/**
 * Global toast notification container.
 * @component
 * @returns {JSX.Element} The toast container.
 */
const ToastContainer = () => (
  <Toaster
    position="bottom-right"
    toastOptions={{
      className: "bg-background text-foreground border border-border rounded-xl shadow-lg",
      duration: 3000,
    }}
  />
);

export default ToastContainer;
