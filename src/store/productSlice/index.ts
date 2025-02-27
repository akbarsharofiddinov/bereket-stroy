import { createSlice } from "@reduxjs/toolkit";

interface IState {
  products: IProduct[];
}

const initialState: IState = {
  products: [],
};

export const productSlice = createSlice({
  name: "productSlice",
  initialState,
  reducers: {
    setProducts: (state, { payload }) => {
      state.products = payload;
    },
  },
});

export const { setProducts } = productSlice.actions;
export default productSlice.reducer;
