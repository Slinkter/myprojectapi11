# Prompt Maestro: Implementación de Cambio de Fuente Dinámico en Proyectos React con Tailwind CSS

## Objetivo

Implementar una funcionalidad de cambio de fuente dinámico en un proyecto React que utiliza Tailwind CSS. Esto permitirá a los usuarios seleccionar una tipografía preferida de una lista predefinida, aplicando el cambio a toda la aplicación de manera fluida y persistente.

## Contexto del Proyecto

Este prompt está diseñado para proyectos React que ya tienen configurado:
-   **React:** Como librería principal para la UI.
-   **Tailwind CSS:** Para el estilado de la aplicación.
-   **Vite (opcional):** Como herramienta de construcción.
-   **@material-tailwind/react (opcional):** Para componentes UI (se usará su `Select` para el dropdown).

## Componentes Clave y Lógica de Implementación

La solución se basa en la combinación de un Contexto de React para la gestión del estado, variables CSS para la aplicación dinámica de estilos y la configuración de Tailwind CSS.

### Pasos Detallados para la Implementación

1.  **Definir Fuentes:**
    -   Selecciona 5-7 fuentes de Google Fonts que desees ofrecer. Anota sus nombres y sus `font-family` CSS (ej. `'Inter', sans-serif`).

2.  **Crear `FontContext.jsx`:**
    -   Crea un nuevo archivo `src/context/FontContext.jsx`.
    -   Este contexto gestionará el estado de la fuente seleccionada.
    -   Utiliza `useState` para almacenar la fuente actual (con persistencia en `localStorage`).
    -   Implementa un `useEffect` que, al cambiar la fuente, actualice una **variable CSS personalizada** (`--font-family`) en el `documentElement` (la etiqueta `<html>`).
    -   Exporta un `useFont` hook para consumir el contexto y una lista de objetos de fuente (nombre y `font-family` CSS).

    ```javascript
    // Ejemplo de FontContext.jsx
    import React, { createContext, useContext, useEffect, useState } from "react";

    const FontContext = createContext();
    export const useFont = () => useContext(FontContext);

    export const fonts = [
        { name: "Inter", family: "'Inter', sans-serif" },
        { name: "Lato", family: "'Lato', sans-serif" },
        // ... más fuentes
    ];

    export const AppFontProvider = ({ children }) => {
        const [font, setFont] = useState(() => localStorage.getItem("font") || fonts[0].family);
        useEffect(() => {
            document.documentElement.style.setProperty('--font-family', font);
            localStorage.setItem("font", font);
        }, [font]);
        const changeFont = (newFontFamily) => setFont(newFontFamily);
        return (<FontContext.Provider value={{ font, changeFont, fonts }}>{children}</FontContext.Provider>);
    };
    ```

3.  **Configurar `tailwind.config.js`:**
    -   Modifica `tailwind.config.js` para que la fuente `sans` por defecto de Tailwind utilice la variable CSS `--font-family`.
    -   Esto asegura que cualquier elemento con `font-sans` (o que lo herede) adopte la fuente dinámica.

    ```javascript
    // Ejemplo de tailwind.config.js
    module.exports = {
        // ...
        theme: {
            extend: {
                fontFamily: {
                    sans: ['var(--font-family)', 'sans-serif'],
                    // Puedes añadir otras familias si las necesitas para casos específicos
                },
            },
        },
        // ...
    };
    ```

4.  **Importar Fuentes en `index.html`:**
    -   Añade los enlaces `<link>` de Google Fonts en la sección `<head>` de `index.html` para todas las fuentes seleccionadas.

    ```html
    <!-- Ejemplo de index.html -->
    <head>
        <!-- ... -->
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&family=Lato:wght@400;700&display=swap" rel="stylesheet">
        <!-- ... más fuentes -->
    </head>
    ```

5.  **Crear `FontDropdown.jsx` (Componente UI):**
    -   Crea un nuevo archivo `src/components/FontDropdown.jsx`.
    -   Este componente renderizará un `Dropdown` (ej. `Select` de `@material-tailwind/react`).
    -   Utiliza el hook `useFont` para obtener la fuente actual (`font`), la función `changeFont` y la lista de `fonts`.
    -   Mapea la lista de `fonts` a las opciones del `Dropdown`, pasando `f.family` como valor al `onChange`.

    ```javascript
    // Ejemplo de FontDropdown.jsx
    import React from "react";
    import { Select, Option } from "@material-tailwind/react"; // O tu componente Dropdown preferido
    import { useFont } from "../context/FontContext";

    const FontDropdown = () => {
        const { font, changeFont, fonts } = useFont();
        return (
            <div className="w-72"> {/* Ajusta el ancho según sea necesario */}
                <Select value={font} onChange={(value) => changeFont(value)} label="Seleccionar Fuente">
                    {fonts.map((f) => (<Option key={f.name} value={f.family}>{f.name}</Option>))}
                </Select>
            </div>
        );
    };
    export default FontDropdown;
    ```

6.  **Integrar `AppFontProvider` en `main.jsx`:**
    -   Envuelve el componente `<App />` con `AppFontProvider` en `src/main.jsx` para que el contexto esté disponible globalmente.

    ```javascript
    // Ejemplo de main.jsx
    import { AppFontProvider } from "./context/FontContext";
    // ...
    ReactDOM.createRoot(document.getElementById("root")).render(
        <React.StrictMode>
            {/* ... otros proveedores */}
            <AppFontProvider>
                <App />
            </AppFontProvider>
        </React.StrictMode>
    );
    ```

7.  **Aplicar Fuente Base en `index.css`:**
    -   Asegúrate de que el `body` (o el contenedor principal de tu aplicación) tenga aplicada la clase `font-sans` para que herede la fuente dinámica.

    ```css
    /* Ejemplo de index.css */
    @layer base {
      body {
        @apply bg-gray-50 dark:bg-gray-900 font-sans; /* Asegúrate de incluir font-sans */
      }
    }
    ```

8.  **Integrar `FontDropdown` en `App.jsx` (o Navbar):**
    -   Importa `FontDropdown` en tu componente principal (`App.jsx` o tu componente de `Navbar`).
    -   Insértalo en la ubicación deseada (ej. en la barra de navegación).

## Desafíos Comunes y Soluciones

-   **Problemas de Especificidad:** Evita aplicar clases de fuente directamente a elementos que deban heredar la fuente global. La solución de variables CSS en `documentElement` y `font-sans` en `body` es la más robusta.
-   **Fuentes no Cargadas:** Asegúrate de que todos los enlaces de Google Fonts estén correctamente en `index.html` y que las fuentes se carguen antes de que la aplicación intente usarlas.
-   **Persistencia:** El uso de `localStorage` en `FontContext` es clave para recordar la preferencia del usuario.

## Personalización

-   **Fuentes:** Cambia la lista `fonts` en `FontContext.jsx` para incluir tus tipografías preferidas.
-   **Estilo del Dropdown:** Personaliza el `FontDropdown.jsx` con las clases de Tailwind o los props de tu librería de componentes para que coincida con el diseño de tu aplicación.
