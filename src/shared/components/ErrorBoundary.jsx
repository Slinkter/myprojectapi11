/**
 * @file React Error Boundary component.
 * @description Catches JavaScript errors in child components,
 * displays a fallback UI, and logs errors to console.
 */

import { Component } from "react";
import PropTypes from "prop-types";
import { MdErrorOutline, MdRefresh } from "react-icons/md";

/**
 * Error Boundary component that catches JavaScript errors in its child components.
 * @class
 * @extends Component
 */
class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, info) {
        console.error("ErrorBoundary caught an error:", error, info.componentStack);
    }

    handleReset = () => {
        this.setState({ hasError: false, error: null });
    };

    render() {
        if (this.state.hasError) {
            return this.props.fallback
                ? this.props.fallback
                : <DefaultErrorFallback
                    error={this.state.error}
                    showDetails={this.props.showDetails}
                    onRetry={this.handleReset}
                  />;
        }

        return this.props.children;
    }
}

/**
 * @param {{ error: Error|null, showDetails: boolean, onRetry: function(): void }} props
 */
const DefaultErrorFallback = ({ error, showDetails, onRetry }) => (
    <div className="flex flex-col items-center justify-center min-h-[200px] p-6 mx-auto my-8 text-center border rounded-2xl bg-destructive/5 border-destructive/20 max-w-md">
        <MdErrorOutline className="w-12 h-12 mb-4 text-destructive" />
        <h2 className="mb-2 text-xl font-bold text-destructive">
            Something went wrong
        </h2>
        <p className="mb-4 text-sm text-muted-foreground">
            {error?.message || "An unexpected error occurred"}
        </p>
        {showDetails && error?.stack && (
            <pre className="w-full p-3 text-xs text-left bg-muted rounded-lg overflow-x-auto">
                {error.stack}
            </pre>
        )}
        <button
            onClick={onRetry}
            className="flex items-center gap-2 px-4 py-2 mt-4 text-sm font-medium text-white transition-all bg-destructive rounded-lg hover:bg-destructive/90 active:scale-95"
        >
            <MdRefresh className="w-4 h-4" />
            Try Again
        </button>
    </div>
);

DefaultErrorFallback.propTypes = {
    error: PropTypes.shape({
        message: PropTypes.string,
        stack: PropTypes.string,
    }),
    showDetails: PropTypes.bool,
    onRetry: PropTypes.func.isRequired,
};

ErrorBoundary.propTypes = {
    children: PropTypes.node.isRequired,
    fallback: PropTypes.node,
    showDetails: PropTypes.bool,
};

export default ErrorBoundary;
