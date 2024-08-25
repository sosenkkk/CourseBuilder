import * as React from "react";
import * as ReactDOM from "react-dom/client";
import "./index.css";
import { NextUIProvider } from "@nextui-org/react";
import App from "./App";
import store from "./store/index";
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <NextUIProvider>
      <App />
    </NextUIProvider>
  </Provider>
);
