import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import MainRouter from "./pages/router/Router";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <MainRouter />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
);
