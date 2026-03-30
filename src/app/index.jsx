/**
 * @file Application entry point.
 * @description Renders the React application into the DOM.
 * Initializes Redux Provider and mounts the root App component.
 */

import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "@app/store";
import App from "./App.jsx";
import "../index.css";

/**
 * Mounts the React application to the DOM.
 * @returns {void}
 */
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>,
);
