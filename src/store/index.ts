import { configureStore } from "@reduxjs/toolkit";
import projectSlice from "./projectSlice";
import categorySlice from "./categorySlice";
import productSlice from "./productSlice";
import companySlice from "./companySlice";
import orderSlice from "./orderSlice/";
import { bereketAPI } from "./API/RTKQuery";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    projectSlice: projectSlice,
    categorySlice: categorySlice,
    productSlice: productSlice,
    companySlice: companySlice,
    orderSlice: orderSlice,

    [bereketAPI.reducerPath]: bereketAPI.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(bereketAPI.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
