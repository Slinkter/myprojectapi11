# Implementación Técnica

## 1. Arquitectura del Sistema

La aplicación sigue una arquitectura de **Single Page Application (SPA)** basada en componentes, utilizando el patrón de gestión de estado mediante **React Context + Hooks**.

### Stack Tecnológico

-   **Core:** React 18 (Migrado a React 19 en dependencias).
-   **Build Tool:** Vite 7.x.
-   **Estilos:** Tailwind CSS v4.1 (Alpha/Beta).
-   **Estado:** React Context (Tema/Fuente) + LocalStorage.
-   **Gestor de Paquetes:** pnpm v10.x.

## 2. Detalle de Implementación de Módulos

### 2.1 Módulo de Estilos (Tailwind v4)

A diferencia de la v3, la configuración se ha centralizado en CSS ("CSS-First").

-   **Archivo:** `src/index.css`
-   **Configuración:**
    ```css
    @import "tailwindcss";
    @custom-variant dark (&:where(.dark, .dark *));
    @theme {
        --font-sans: var(--font-family), ui-sans-serif, system-ui;
    }
    ```
    -   **`@custom-variant`:** Define manualmente la estrategia de clase para el modo oscuro, permitiendo que el toggle JS funcione.
    -   **`@theme`:** Sobrescribe la variable de fuente sans-serif para usar una variable CSS dinámica.

### 2.2 Gestión de Temas (`ThemeContext`)

-   **Estrategia:** Manipulación directa del DOM.
-   **Lógica:** Al cambiar el tema, se añade/elimina la clase `dark` en la etiqueta `<html>`.
-   **Persistencia:** Se guarda la preferencia en `localStorage['theme']`.

### 2.3 Gestión de Fuentes (`FontContext`)

-   **Estrategia:** Variables CSS Globales.
-   **Lógica:** El contexto actualiza la variable `--font-family` en el `documentElement.style`.
-   **Integración:** Tailwind consume esta variable gracias a la configuración en `index.css`.

### 2.4 Componentes UI Refactorizados

Se eliminó la dependencia de librerías de componentes pesadas. Se crearon componentes "dumb" (presentacionales) altamente reutilizables.

-   **`CatCard`:** Utiliza `group-hover` de Tailwind para efectos de overlay y `backdrop-blur` para estética moderna.
-   **`FontDropdown`:** Implementado con un `<select>` nativo pero estilizado exhaustivamente con clases de utilidad para que parezca un componente custom, garantizando accesibilidad nativa y cero JS extra para la lógica del dropdown.

## 3. Guía de Despliegue

### Requisitos Previos

-   Node.js v18+
-   pnpm

### Pasos para Ejecución Local

1.  Clonar el repositorio.
2.  Instalar dependencias:
    ```bash
    pnpm install
    ```
3.  Iniciar servidor de desarrollo (Vite):
    ```bash
    pnpm run dev
    ```
4.  La aplicación estará disponible en `http://localhost:5173`.

### Pasos para Build de Producción

1.  Ejecutar el comando de construcción:
    ```bash
    pnpm run build
    ```
2.  Los archivos estáticos se generarán en la carpeta `dist/`.
3.  Previsualizar el build:
    ```bash
    pnpm run preview
    ```
