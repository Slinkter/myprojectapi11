import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { fonts } from "./constants";

/**
 * @fileoverview Proveedor de Contexto para la gestión global de la fuente (tipografía) de la aplicación.
 * Permite a los componentes acceder y cambiar la fuente activa.
 */

// 1. Creación del Contexto: Exporta el objeto Contexto para que los componentes puedan consumirlo.
export const FontContext = createContext();

/**
 * @component
 * @description Componente Provider que envuelve la aplicación y suministra el estado de la fuente
 * y la lógica para cambiarla a todos sus componentes hijos.
 * @param {object} props - Propiedades del componente.
 * @param {React.ReactNode} props.children - Los elementos hijos a renderizar.
 * @returns {JSX.Element} El proveedor de contexto de la fuente.
 */
export const AppFontProvider = ({ children }) => {
    // 2. Estado Inicial: Inicializa el estado de la fuente.
    // Intenta cargar la fuente desde localStorage para persistencia. Si no existe, usa 'Inter' por defecto.
    const [font, setFont] = useState(() => {
        return localStorage.getItem("font") || "'Inter', sans-serif";
    });

    /**
     * 3. Efecto Secundario: Se ejecuta cada vez que 'font' cambia.
     * Sincroniza el estado de React con el DOM (aplicando la variable CSS) y con localStorage.
     */
    useEffect(() => {
        const root = window.document.documentElement;

        // Aplica la fuente seleccionada como una variable CSS a la raíz del documento.
        root.style.setProperty("--font-family", font);

        // Guarda la fuente seleccionada en localStorage para persistencia.
        localStorage.setItem("font", font);
    }, [font]); // Dependencia: el efecto se ejecuta al montar y cuando 'font' cambia.

    /**
     * @function changeFont
     * @description Función pública que permite a los componentes hijos actualizar el estado global de la fuente.
     * @param {string} newFontFamily - La cadena de la nueva familia de fuentes a aplicar.
     */
    const changeFont = (newFontFamily) => {
        setFont(newFontFamily);
    };

    // 4. Proveer el Valor: Exporta el estado actual, la función de cambio y la lista de fuentes disponibles.
    return (
        <FontContext.Provider value={{ font, changeFont, fonts }}>
            {children}
        </FontContext.Provider>
    );
};

// 5. Validación de Props: Asegura que el componente siempre reciba 'children' (buena práctica).
AppFontProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
