import App from "./App";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import { store } from "@/store";
import "./i18n";

import "./index.scss";

import "react-toastify/dist/ReactToastify.css";
import "swiper/swiper-bundle.css";

createRoot(document.getElementById("root")!).render(
  <>
    <Provider store={store}>
      <App />
    </Provider>
  </>
);
