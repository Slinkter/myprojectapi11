/**
 * @file Componente de menú desplegable para seleccionar la fuente de la aplicación.
 * @description Este componente utiliza el hook `useFont` para acceder a la fuente actual,
 * la función para cambiarla y la lista de fuentes disponibles. Renderiza un `Select`
 * de Material Tailwind con las opciones de fuente y está estilizado para soportar temas claro/oscuro.
 */

import { useFont } from "@features/font/hooks/useFont";
import { BsChevronDown } from "react-icons/bs";

/**
 * Componente que renderiza un menú desplegable para cambiar la fuente global de la aplicación.
 * Se integra con el `FontContext` a través del hook `useFont`.
 *
 * @component
 * @returns {JSX.Element} Un componente de selección de fuente personalizado.
 */
const FontDropdown = () => {
    const { font, changeFont, fonts } = useFont();

    return (
        <div className="relative w-48">
            <select
                value={font}
                onChange={(e) => changeFont(e.target.value)}
                className="w-full p-2.5 pr-8 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 
                           text-gray-900 dark:text-gray-200 text-sm rounded-full 
                           focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-500 focus:outline-none
                           appearance-none cursor-pointer"
                aria-label="Select Font"
            >
                {fonts.map((f) => (
                    <option key={f.name} value={f.family}>
                        {f.name}
                    </option>
                ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                <BsChevronDown className="w-4 h-4 text-gray-400" />
            </div>
        </div>
    );
};

export default FontDropdown;
