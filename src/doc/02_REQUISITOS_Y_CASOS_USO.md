# Requisitos y Casos de Uso (Versión 4.0)

## 1. Requerimientos Funcionales (RF)

| ID         | Requerimiento                      | Descripción                                                                                                                | Prioridad |
| :--------- | :--------------------------------- | :------------------------------------------------------------------------------------------------------------------------- | :-------- |
| **RF-01**  | Visualizar Gatos Aleatorios        | El sistema debe cargar y mostrar una cuadrícula de imágenes de gatos obtenidas de una API externa al iniciar.              | Alta      |
| **RF-02**  | Guardar Favorito                   | El usuario debe poder marcar un gato como "Favorito" haciendo clic en el icono de corazón.                                 | Alta      |
| **RF-03**  | Eliminar Favorito                  | El usuario debe poder eliminar un gato de la lista de favoritos.                                                           | Media     |
| **RF-04**  | Persistencia de Datos              | Los favoritos, el tema y la fuente deben persistir en el `LocalStorage` del navegador entre sesiones.                        | Alta      |
| **RF-05**  | Cambio de Tema                     | El usuario debe poder alternar entre "Modo Claro" y "Modo Oscuro" mediante un botón en la cabecera.                        | Alta      |
| **RF-06**  | Cambio de Tipografía               | El usuario debe poder seleccionar una fuente de una lista predefinida para cambiar la tipografía global de la aplicación.  | Media     |
| **RF-07**  | Feedback de Acciones               | El sistema debe mostrar una notificación emergente (toast) de éxito o error tras guardar o eliminar un favorito.         | Alta      |
| **RF-08**  | Reintentar Carga de Datos          | Si la carga inicial de datos falla, el sistema debe proporcionar una opción (ej. un botón) para reintentar la petición. | Media     |

## 2. Requerimientos No Funcionales (RNF)

| ID          | Categoría        | Descripción                                                                                                                         | Métrica                 |
| :---------- | :--------------- | :---------------------------------------------------------------------------------------------------------------------------------- | :---------------------- |
| **RNF-01**  | Rendimiento      | Las imágenes deben cargar progresivamente y la interfaz no debe bloquearse (Lazy Loading).                                          | TTI < 1.5s, LCP < 2.5s  |
| **RNF-02**  | UI/UX            | La interfaz debe ser responsiva, estéticamente agradable ("Premium") y consistente en todos sus componentes.                        | Diseño Cohesivo         |
| **RNF-03**  | Compatibilidad   | La aplicación debe funcionar en las últimas 2 versiones de Chrome, Firefox, Safari y Edge.                                          | Cross-browser           |
| **RNF-04**  | Mantenibilidad   | El código debe seguir una arquitectura por features, usar alias de ruta y cumplir con el estándar ESLint.                            | Clean Architecture      |
| **RNF-05**  | Usabilidad       | La aplicación debe guiar al usuario en estados vacíos (ej. favoritos) y proporcionar mecanismos de recuperación ante errores. | User-Friendly Interface |
| **RNF-06**  | Accesibilidad    | Los elementos interactivos deben ser accesibles (ej. `aria-label` para botones de icono, `<select>` nativo o accesible). | WCAG 2.1 AA             |

## 3. Diagrama de Flujo de Datos (DFD)

### Flujo Principal: Gestión de Favoritos con Feedback

```mermaid
graph TD
    subgraph "User Interface"
        User([Usuario]) -->|1. Click Like| CatCard[Componente CatCard]
    end

    subgraph "Application Logic (Hooks & State)"
        CatCard -->|2. onAction(cat)| App[Componente App.jsx]
        App -->|3. saveFavouriteCat(cat)| UseCats[Hook useCats]
        UseCats -->|4. dispatch(saveCat)| CatsSlice[Redux Thunk: saveCat]
    end

    subgraph "External Services"
        CatsSlice -->|5. POST| API[(The Cat API)]
    end

    subgraph "State & Feedback"
        API --6. Success Response--> CatsSlice
        CatsSlice --7. Actualización Optimista--> ReduxStore((Redux Store))
        UseCats --8. Promise Resolves--> UseCats
        UseCats -->|9. toast.success()| Toast[Toast Notification]
        ReduxStore --10. State Update--> App
    end

    App -->|11. Re-render| UI[Interfaz de Usuario]
    Toast --Aparece en--> UI
```

## 4. Casos de Uso Detallados (Actualizados)

### CU-01: Personalizar Apariencia (Tema y Fuente)

**Actor:** Usuario Final.
**Precondición:** La aplicación está cargada.
**Flujo Principal:**

1.  El usuario visualiza la barra de navegación superior, notando que todos los botones (`Tema`, `Fuente`) tienen un estilo visual consistente.
2.  El usuario hace clic en el selector de fuentes (que ahora tiene un estilo personalizado y un icono de chevron) y elige "Roboto Mono".
3.  **Sistema:** Actualiza la variable CSS `--font-family` globalmente. La interfaz cambia de tipografía instantáneamente.
4.  El usuario hace clic en el icono de luna (`<BsMoonFill />`).
5.  **Sistema:** Añade la clase `.dark` al elemento raíz, y Tailwind aplica los estilos oscuros.
    **Postcondición:** La aplicación muestra la nueva configuración visual y la guarda en `LocalStorage`.

### CU-02: Gestionar Favoritos (con Feedback y Estado Vacío)

**Actor:** Usuario Final.
**Precondición:** La aplicación está cargada.
**Flujo Principal:**

1.  El usuario navega por la sección "Random Kittens".
2.  El usuario pasa el cursor sobre una tarjeta de gato y se muestra el overlay con el botón de corazón.
3.  El usuario hace clic en el botón.
4.  **Sistema:** Despacha la acción `saveCat`. La API confirma la operación.
5.  **Sistema:** Actualiza el estado de Redux de forma optimista. El gato aparece en la sección "Favourite Kittens".
6.  **Sistema:** Muestra una notificación "toast" de éxito: "Cat saved to favourites!".

**Flujo Alternativo (Estado Vacío):**
1.  Al iniciar la app por primera vez, la sección "Favourite Kittens" no está vacía.
2.  **Sistema:** Muestra un mensaje: "You have no favourite kittens yet. Click the heart on a kitten to save it!".

### CU-03: Recuperación de Error de API

**Actor:** Usuario Final.
**Precondición:** La conexión a la API falla al cargar la aplicación.
**Flujo Principal:**
1.  **Sistema:** En lugar de las listas de gatos, muestra un componente de alerta de error con el icono `MdErrorOutline`.
2.  El mensaje de error incluye un botón "Retry".
3.  El usuario hace clic en "Retry".
4.  **Sistema:** Vuelve a ejecutar las funciones `loadRandomCats` y `loadFavouriteCats`.
5.  **Sistema:** Si la petición tiene éxito, se renderizan las listas de gatos. Si falla de nuevo, se vuelve a mostrar el mensaje de error.

## 5. Matriz de Trazabilidad de Requisitos (RTM)

| ID Req | Caso de Uso | Componente/Módulo Clave                                | Estado       |
| :----- | :---------- | :----------------------------------------------------- | :----------- |
| RF-01  | CU-03       | `useCats`, `App.jsx`, `CatList`                        | Implementado |
| RF-02  | CU-02       | `CatCard`, `useCats`                                   | Implementado |
| RF-04  | CU-01, CU-02| `useCats`, `ThemeContext`, `FontContext`               | Implementado |
| RF-05  | CU-01       | `ThemeContext`, `ThemeToggleButton` (`react-icons`)    | Implementado |
| RF-06  | CU-01       | `FontContext`, `FontDropdown` (Estilizado)             | Implementado |
| RF-07  | CU-02       | `useCats` (`react-hot-toast`)                          | Implementado |
| RF-08  | CU-03       | `App.jsx`                                              | Implementado |
| RNF-05 | CU-02, CU-03| `CatList` (empty state), `App.jsx` (retry button)      | Implementado |