import { createSlice } from "@reduxjs/toolkit";

interface IState {
  CartProducts: {
    product: IProduct;
    quantity: number;
  }[];
}

const initialState: IState = {
  CartProducts: [],
};

export const cartSlice = createSlice({
  name: "cartSlice",
  initialState,
  reducers: {
    setCartProducts: (state, { payload }) => {
      state.CartProducts = payload;
    },
  },
});

export const { setCartProducts } = cartSlice.actions;

export default cartSlice.reducer;
