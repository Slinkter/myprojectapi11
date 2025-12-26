# Guía de Estilos del Proyecto: Utility-First con Tailwind CSS

## 1. Filosofía de Estilos: Utility-First

Este proyecto utiliza una metodología **Utility-First** implementada a través de **Tailwind CSS**. Esta es una decisión de arquitectura deliberada y debe ser respetada en todo el desarrollo futuro.

**Principio Central:** En lugar de escribir clases de CSS semánticas y personalizadas (como en BEM), construimos la interfaz de usuario aplicando directamente un conjunto de clases de utilidad predefinidas y de un solo propósito en el marcado JSX.

-   **Ejemplo:**
    ```jsx
    // NO HACER (Enfoque tradicional/BEM)
    // <button className="btn btn--primary">Confirmar</button>

    // HACER (Utility-First)
    <button className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600">
      Confirmar
    </button>
    ```

**Beneficios de este enfoque:**
-   **Velocidad:** Se prototipa y construye interfaces a una velocidad mucho mayor.
-   **Sin Nomenclatura:** No se pierde tiempo ni energía mental inventando nombres de clases.
-   **Estilos Locales:** Las clases de utilidad tienen un alcance local al componente, eliminando el riesgo de introducir cambios de estilo no deseados en otras partes de la aplicación.
-   **CSS Optimizado:** El archivo CSS de producción es extremadamente pequeño, ya que solo incluye las utilidades que realmente se utilizan.

## 2. La Regla de Oro: No Escribir CSS Personalizado

La regla más importante de nuestra estrategia de estilos es: **Evita escribir CSS personalizado en `index.css` o cualquier otro archivo CSS.**

Casi cualquier diseño se puede lograr combinando las utilidades de Tailwind o extendiendo la configuración en `tailwind.config.js`. Antes de escribir una sola línea de CSS, consulta la documentación de Tailwind.

## 3. ¿Cómo Manejar la Reutilización de Estilos? Con Componentes de React

El problema más común con Utility-First es la repetición de largas cadenas de clases. La solución en este proyecto **NO** es crear clases CSS personalizadas, sino **abstraer la reutilización a nivel de componente**.

La lógica y los estilos se encapsulan juntos dentro de un componente de React.

### Ejemplo Práctico: Creando un Botón Reutilizable

-   **Mal (Repetitivo y difícil de mantener):**
    ```jsx
    // Botón 1
    <button className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg ...">
      Aceptar
    </button>

    // Botón 2 (copia y pega)
    <button className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg ...">
      Guardar
    </button>
    ```

-   **Bien (Abstraído en un componente):**

    1.  **Crea un componente `Button.jsx` en `/shared/components`:**
        ```jsx
        // src/shared/components/Button.jsx
        import clsx from 'clsx'; // O una utilidad similar para clases condicionales

        function Button({ children, primary, secondary, ...props }) {
          const classes = clsx(
            'px-4 py-2 font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2',
            {
              'bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-300': primary,
              'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400': secondary,
            }
          );

          return (
            <button className={classes} {...props}>
              {children}
            </button>
          );
        }

        export default Button;
        ```

    2.  **Usa el componente de forma semántica en tu aplicación:**
        ```jsx
        import Button from '@shared/components/Button';

        // Ahora el código es limpio, reutilizable y fácil de leer.
        <Button primary onClick={handleSubmit}>Guardar Cambios</Button>
        <Button secondary onClick={handleCancel}>Cancelar</Button>
        ```

## 4. Uso de `@apply` (Solo en Casos Excepcionales)

La directiva `@apply` de Tailwind permite componer utilidades dentro de un archivo CSS. Su uso en este proyecto está **fuertemente desaconsejado** y solo se permite en situaciones muy específicas donde no se tiene control sobre el marcado.

-   **Caso de Uso Aceptable:** Estilizar el HTML generado por un procesador de Markdown, donde no puedes añadir clases directamente a las etiquetas `h1`, `p`, `ul`, etc.
-   **Caso de Uso Prohibido:** **NUNCA** usar `@apply` para crear un sistema de clases similar a BEM. Hacer esto anula todos los beneficios de Tailwind.

    ```css
    /* ESTO ESTÁ PROHIBIDO EN EL PROYECTO */
    .card__title {
      @apply text-xl font-bold mb-2;
    }
    ```

## 5. Consistencia en el Orden de Clases (Opcional pero Recomendado)

Para mejorar la legibilidad de las largas cadenas de clases, se recomienda seguir un orden lógico y consistente. Una buena convención es agrupar las clases por su función:

1.  **Layout y Posicionamiento:** `position`, `top`, `left`, `z-index`, `display`, `flex`, `grid`, `box-sizing`
2.  **Tamaño y Espaciado:** `width`, `height`, `margin` (`m`, `mx`, `my`, ...), `padding` (`p`, `px`, `py`, ...)
3.  **Tipografía:** `font-family`, `font-size` (`text-`), `font-weight`, `color` (`text-`), `text-align`, `line-height`, `letter-spacing`
4.  **Fondos y Bordes:** `background-color` (`bg-`), `border-radius` (`rounded-`), `border-width`, `border-color`
5.  **Efectos y Filtros:** `box-shadow` (`shadow-`), `opacity`, `transform`, `filter`
6.  **Estados (Hover, Focus, etc.):** `hover:`, `focus:`, `dark:`

**Ejemplo Ordenado:**
```jsx
// Difícil de leer
<div class="text-xl p-4 bg-white sticky shadow-md font-bold rounded-lg w-full">...</div>

// Fácil de leer
<div class="sticky w-full p-4 font-bold text-xl bg-white rounded-lg shadow-md">...</div>
```
