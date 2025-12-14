/**
 * @file Componente de menú desplegable para seleccionar la fuente de la aplicación.
 * @description Este componente utiliza el hook `useFont` para acceder a la fuente actual,
 * la función para cambiarla y la lista de fuentes disponibles. Renderiza un `Select`
 * de Material Tailwind con las opciones de fuente y está estilizado para soportar temas claro/oscuro.
 */

import { useFont } from "../hooks/useFont";

/**
 * Componente que renderiza un menú desplegable para cambiar la fuente global de la aplicación.
 * Se integra con el `FontContext` a través del hook `useFont`.
 *
 * @component
 * @returns {JSX.Element} Un componente `Select` de Material Tailwind.
 */
const FontDropdown = () => {
    const { font, changeFont, fonts } = useFont();

    return (
        <div className="w-72">
            <select
                value={font}
                onChange={(e) => changeFont(e.target.value)}
                className="w-full p-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 
                         text-gray-900 dark:text-gray-200 text-sm rounded-lg 
                         focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block"
                aria-label="Select Font"
            >
                {fonts.map((f) => (
                    <option key={f.name} value={f.family}>
                        {f.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default FontDropdown;
