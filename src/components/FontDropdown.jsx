/**
 * @file Componente de menú desplegable para seleccionar la fuente de la aplicación.
 * @description Este componente utiliza el hook `useFont` para acceder a la fuente actual,
 * la función para cambiarla y la lista de fuentes disponibles. Renderiza un `Select`
 * de Material Tailwind con las opciones de fuente y está estilizado para soportar temas claro/oscuro.
 */

import { Select, Option } from "@material-tailwind/react";
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
            <Select
                value={font}
                onChange={(value) => changeFont(value)}
                label="Select Font"
                // Se aplican clases para asegurar la legibilidad en ambos temas (claro/oscuro).
                className="text-gray-900 dark:text-gray-200"
                // `labelProps` se usa para anular estilos por defecto de Material Tailwind que pueden interferir.
                labelProps={{
                    className: "before:content-none after:content-none",
                }}
            >
                {fonts.map((f) => (
                    <Option key={f.name} value={f.family}>
                        {f.name}
                    </Option>
                ))}
            </Select>
        </div>
    );
};

export default FontDropdown;
