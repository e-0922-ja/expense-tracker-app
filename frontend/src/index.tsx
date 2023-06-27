import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    {process.env.REACT_APP_ENVIRONMENT === "production" ? (
      <HashRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </HashRouter>
    ) : (
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    )}
  </React.StrictMode>
);
