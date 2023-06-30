import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./assets/css/reset.css";
import "./assets/css/bootstrap-grid.css";
import "./assets/css/global.css";
import "./assets/css/components/components.css";
import "./assets/css/main.css";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./redux/store";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
