import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "@app/store";
import App from "./App.jsx";
import "./index.css";

// Renders the application into the 'root' DOM element.
ReactDOM.createRoot(document.getElementById("root")).render(
  // The Redux Provider wraps the entire application.
  <Provider store={store}>
    <App />
  </Provider>,
);
