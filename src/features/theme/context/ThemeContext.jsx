/**
 * @file Contexto y Proveedor para la gestión del tema (oscuro/claro).
 * @description Proporciona un estado de tema global, una función para cambiarlo,
 * y persiste la preferencia del usuario en localStorage. Se inicializa con el tema
 * guardado o con la preferencia del sistema del usuario.
 */

/* eslint-disable react-refresh/only-export-components */

import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

// Creación del Contexto para el tema.
export const ThemeContext = createContext();

/**
 * Componente Proveedor que envuelve la aplicación y suministra el estado del tema
 * y la lógica para cambiarlo a todos sus componentes hijos.
 *
 * @component
 * @param {object} props - Propiedades del componente.
 * @param {React.ReactNode} props.children - Los elementos hijos a renderizar.
 * @returns {JSX.Element} El proveedor de contexto del tema.
 */
export const AppThemeProvider = ({ children }) => {
    // Inicializa el estado del tema con una función para leer de localStorage o del sistema.
    const [theme, setTheme] = useState(() => {
        // 1. Intenta obtener el tema desde localStorage.
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme) {
            return savedTheme;
        }
        // 2. Si no hay tema guardado, usa la preferencia del sistema operativo.
        return window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light";
    });

    // Efecto que se ejecuta cada vez que el estado `theme` cambia.
    useEffect(() => {
        const root = window.document.documentElement; // Elemento <html>

        // Añade o remueve la clase 'dark' del elemento <html> para que Tailwind la utilice.
        if (theme === "dark") {
            root.classList.add("dark");
        } else {
            root.classList.remove("dark");
        }

        // Persiste la selección del tema en localStorage para futuras visitas.
        localStorage.setItem("theme", theme);
    }, [theme]); // Se ejecuta al montar y cada vez que `theme` cambia.

    /**
     * Función para alternar el tema entre 'light' y 'dark'.
     */
    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    };

    // Provee el estado del tema y la función para alternarlo a los componentes hijos.
    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

AppThemeProvider.propTypes = {
    children: PropTypes.node.isRequired,
};