/**
 * @file React Error Boundary component.
 * @description Catches JavaScript errors in child components,
 * displays a fallback UI, and logs errors to console.
 */

import React from "react";
import PropTypes from "prop-types";
import { MdErrorOutline, MdRefresh } from "react-icons/md";

/**
 * @typedef {Object} ErrorBoundaryProps
 * @property {React.ReactNode} children - Child components to wrap.
 * @property {React.ReactNode} [fallback] - Custom fallback UI to display on error.
 * @property {boolean} [showDetails=false] - Whether to show error details.
 */

/**
 * @typedef {Object} ErrorBoundaryState
 * @property {boolean} hasError - Whether an error has occurred.
 * @property {Error|null} error - The error that was caught.
 */

/**
 * Error Boundary component that catches JavaScript errors in its child components.
 * @class
 * @extends React.Component<ErrorBoundaryProps, ErrorBoundaryState>
 */
class ErrorBoundary extends React.Component {
    /**
     * Creates an Error Boundary instance.
     * @param {ErrorBoundaryProps} props - Component props.
     */
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    /**
     * Updates state when an error is caught.
     * @param {Error} error - The error that was thrown.
     * @returns {ErrorBoundaryState} New state with error information.
     */
    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    /**
     * Logs the error to console.
     * @param {Error} error - The error that was thrown.
     * @param {Object} info - Component stack trace.
     */
    componentDidCatch(error, info) {
        console.error("ErrorBoundary caught an error:", error, info.componentStack);
    }

    /**
     * Resets the error state to allow retry.
     * @returns {void}
     */
    handleReset = () => {
        this.setState({ hasError: false, error: null });
    };

    /**
     * Renders the component.
     * @returns {JSX.Element} The rendered component.
     */
    render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback;
            }

            return (
                <div className="flex flex-col items-center justify-center min-h-[200px] p-6 mx-auto my-8 text-center border rounded-2xl bg-destructive/5 border-destructive/20 max-w-md">
                    <MdErrorOutline className="w-12 h-12 mb-4 text-destructive" />
                    <h2 className="mb-2 text-xl font-bold text-destructive">
                        Something went wrong
                    </h2>
                    <p className="mb-4 text-sm text-muted-foreground">
                        {this.state.error?.message || "An unexpected error occurred"}
                    </p>
                    {this.props.showDetails && this.state.error?.stack && (
                        <pre className="w-full p-3 text-xs text-left bg-muted rounded-lg overflow-x-auto">
                            {this.state.error.stack}
                        </pre>
                    )}
                    <button
                        onClick={this.handleReset}
                        className="flex items-center gap-2 px-4 py-2 mt-4 text-sm font-medium text-white transition-all bg-destructive rounded-lg hover:bg-destructive/90 active:scale-95"
                    >
                        <MdRefresh className="w-4 h-4" />
                        Try Again
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

ErrorBoundary.propTypes = {
    children: PropTypes.node.isRequired,
    fallback: PropTypes.node,
    showDetails: PropTypes.bool,
};

export default ErrorBoundary;
