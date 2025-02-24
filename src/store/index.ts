import { configureStore } from "@reduxjs/toolkit";
import  projectSlice  from "./projectSlice";

export const store = configureStore({
  reducer: {
    projectSlice: projectSlice
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch