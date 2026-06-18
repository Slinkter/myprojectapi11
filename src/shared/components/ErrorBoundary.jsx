/**
 * @file Componente React Error Boundary.
 * @description Captura errores de JavaScript en componentes hijos,
 * muestra una UI de respaldo y registra los errores en la consola.
 */

import React from "react";
import PropTypes from "prop-types";
import { MdErrorOutline, MdRefresh } from "react-icons/md";

/**
 * @typedef {Object} ErrorBoundaryProps
 * @property {React.ReactNode} children - Componentes hijos a envolver.
 * @property {React.ReactNode} [fallback] - UI de respaldo personalizada a mostrar en caso de error.
 * @property {boolean} [showDetails=false] - Indica si se deben mostrar los detalles del error.
 */

/**
 * @typedef {Object} ErrorBoundaryState
 * @property {boolean} hasError - Indica si ha ocurrido un error.
 * @property {Error|null} error - El error que fue capturado.
 */

/**
 * Componente Error Boundary que captura errores de JavaScript en sus componentes hijos.
 * @class
 * @extends React.Component<ErrorBoundaryProps, ErrorBoundaryState>
 */
class ErrorBoundary extends React.Component {
    /**
     * Crea una instancia de Error Boundary.
     * @param {ErrorBoundaryProps} props - Propiedades del componente.
     */
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    /**
     * Actualiza el estado cuando se captura un error.
     * @param {Error} error - El error que fue lanzado.
     * @returns {ErrorBoundaryState} Nuevo estado con la información del error.
     */
    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    /**
     * Registra el error en la consola.
     * @param {Error} error - El error que fue lanzado.
     * @param {Object} info - Traza de la pila del componente.
     */
    componentDidCatch(error, info) {
        console.error("ErrorBoundary capturó un error:", error, info.componentStack);
    }

    /**
     * Restablece el estado de error para permitir el reintento.
     * @returns {void}
     */
    handleReset = () => {
        this.setState({ hasError: false, error: null });
    };

    /**
     * Renderiza el componente.
     * @returns {JSX.Element} El componente renderizado.
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
                        Algo salió mal
                    </h2>
                    <p className="mb-4 text-sm text-muted-foreground">
                        {this.state.error?.message || "Ocurrió un error inesperado"}
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
                        Reintentar
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
