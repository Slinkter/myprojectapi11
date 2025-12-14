/**
 * @file Punto de entrada de la aplicación React.
 * @description Este archivo renderiza el componente raíz (`App`) en el DOM.
 * También envuelve la aplicación con todos los proveedores de contexto necesarios:
 * - `MaterialThemeProvider`: para los componentes de Material Tailwind.
 * - `Provider`: para el estado global de Redux.
 * - `AppThemeProvider`: para el tema (oscuro/claro).
 * - `AppFontProvider`: para la gestión de la fuente.
 */

import ReactDOM from "react-dom/client";

import { Provider } from "react-redux";
import store from "./redux/store.js";
import { AppThemeProvider } from "./context/ThemeContext";
import { AppFontProvider } from "./context/FontContext.jsx";
import App from "./App.jsx";
import "./index.css";

// Renderiza la aplicación en el elemento 'root' del DOM.
ReactDOM.createRoot(document.getElementById("root")).render(
    // Proveedor de tema para Material Tailwind.
    <Provider store={store}>
        {/* Proveedor de tema personalizado (oscuro/claro). */}
        <AppThemeProvider>
            {/* Proveedor de fuente personalizado. */}
            <AppFontProvider>
                {/* Componente principal de la aplicación. */}
                <App />
            </AppFontProvider>
        </AppThemeProvider>
    </Provider>
);
