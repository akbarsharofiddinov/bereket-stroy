import { createSlice } from "@reduxjs/toolkit";

interface IState {
  products: IProduct[];
  cart: {
    product: IProduct;
    quantity: number;
  }[];
}

const initialState: IState = {
  products: [],
  cart: [],
};

export const productSlice = createSlice({
  name: "productSlice",
  initialState,
  reducers: {
    setProducts: (state, { payload }) => {
      state.products = payload;
    },

    setCartProducts: (state, { payload }) => {
      state.cart = payload;
    },

    addProductToCart: (state, { payload }) => {
      const product = state.cart.find((item) => item.product.id === payload.id);
      if (product) {
        product.quantity += 1;
      } else {
        state.cart.push({ product: payload, quantity: 1 });
      }
    },

    removeProductFromCart: (state, { payload }) => {
      const product = state.cart.find((item) => item.product.id === payload.id);
      if (product) {
        if (product.quantity === 1) {
          state.cart = state.cart.filter(
            (item) => item.product.id !== payload.id
          );
        } else {
          product.quantity -= 1;
        }
      }
    },
  },
});

export const {
  setProducts,
  setCartProducts,
  addProductToCart,
  removeProductFromCart,
} = productSlice.actions;
export default productSlice.reducer;
