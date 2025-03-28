
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import { store } from "@/store";
import "./i18n";

import "./index.scss";

import "react-toastify/dist/ReactToastify.css";
import "swiper/swiper-bundle.css";
import { lazy, Suspense } from "react";

const App = lazy(() => import("./App"))

createRoot(document.getElementById("root")!).render(
  <>
    <Suspense>
      <Provider store={store}>
        <App />
      </Provider>
    </Suspense>
  </>
);
