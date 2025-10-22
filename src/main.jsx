import ReactDOM from "react-dom/client";
import { ThemeProvider as MaterialThemeProvider } from "@material-tailwind/react";
/*  */
import { Provider } from "react-redux";
import store from "./redux/store.js";
/*  */
import { AppThemeProvider } from "./context/ThemeContext";
import { AppFontProvider } from "./context/FontContext.jsx";
/*  */
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
    <MaterialThemeProvider>
        <Provider store={store}>
            <AppThemeProvider>
                <AppFontProvider>
                    <App />
                </AppFontProvider>
            </AppThemeProvider>
        </Provider>
    </MaterialThemeProvider>
);
