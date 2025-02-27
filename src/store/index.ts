import { configureStore } from "@reduxjs/toolkit";
import projectSlice from "./projectSlice";
import categorySlice from "./categorySlice";
import productSlice from "./productSlice";

export const store = configureStore({
  reducer: {
    projectSlice: projectSlice,
    categorySlice: categorySlice,
    productSlice: productSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
