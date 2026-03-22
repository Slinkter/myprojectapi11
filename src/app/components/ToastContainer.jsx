/**
 * @file Toast notification container.
 */

import { Toaster } from "react-hot-toast";

/**
 * Toast notification container configured with react-hot-toast.
 * @component
 * @returns {JSX.Element} The toast container element.
 */
const ToastContainer = () => (
  <Toaster
    position="top-center"
    reverseOrder={false}
    toastOptions={{
      className: "bg-card text-foreground border border-border shadow-lg",
      style: {
        borderRadius: "12px",
      },
    }}
  />
);

export default ToastContainer;
