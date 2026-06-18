/**
 * @file Componente desplegable para seleccionar la fuente de la aplicación.
 * @description Utiliza el hook `useFont` para acceder a la fuente actual, la función de actualización
 * y las fuentes disponibles. Renderiza un `Select` nativo estilizado para soportar temas claro/oscuro.
 */

import { useFont } from "@features/font/hooks/useFont";
import Select from "@shared/ui/Select";

/**
 * Componente que renderiza un desplegable para cambiar la familia de fuentes global de la aplicación.
 * Se integra con `FontContext` a través del hook `useFont`.
 *
 * @component
 * @returns {JSX.Element} Un selector de fuente personalizado.
 */
const FontDropdown = () => {
  const { font, changeFont, fonts } = useFont();

  // Transformar las fuentes al formato de opciones esperado por el componente Select
  const fontOptions = fonts.map((f) => ({
    value: f.family,
    label: f.name,
  }));

  return (
    <Select
      value={font}
      onChange={(e) => changeFont(e.target.value)}
      options={fontOptions}
      className="w-48"
      ariaLabel="Seleccionar Fuente"
    />
  );
};

export default FontDropdown;
