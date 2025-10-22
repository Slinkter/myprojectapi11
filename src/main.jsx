import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { ThemeProvider as MaterialThemeProvider } from "@material-tailwind/react";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import { AppThemeProvider } from "./context/ThemeContext";
import { AppFontProvider } from "./context/FontContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <Provider store={store}>
            <MaterialThemeProvider>
                <AppThemeProvider>
                    <AppFontProvider>
                        <App />
                    </AppFontProvider>
                </AppThemeProvider>
            </MaterialThemeProvider>
        </Provider>
    </React.StrictMode>
);
