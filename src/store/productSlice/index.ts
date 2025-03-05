import { createSlice } from "@reduxjs/toolkit";

interface IState {
  allProducts: IProduct[];
  cart: {
    product: IProduct;
    quantity: number;
  }[];
  favorites: IProduct[];
}

const initialState: IState = {
  allProducts: [],
  cart: [],
  favorites: [],
};

export const productSlice = createSlice({
  name: "productSlice",
  initialState,
  reducers: {
    setAllProducts: (state, { payload }) => {
      state.allProducts = payload;
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

    instantRemoveProductsFromCart: (state, { payload }) => {
      state.cart = state.cart.filter((item) => item.product.id !== payload.id);
    },

    setFavourites: (state, { payload }) => {
      state.favorites = payload;
    },

    addToFavourites: (state, { payload }) => {
      state.favorites.push(payload);
    },

    removeFromFavourites: (state, { payload }) => {
      state.favorites = state.favorites.filter(
        (item) => item.id !== payload.id
      );
    },
  },
});

export const {
  setAllProducts,
  setCartProducts,
  addProductToCart,
  removeProductFromCart,
  setFavourites,
  addToFavourites,
  removeFromFavourites,
  instantRemoveProductsFromCart
} = productSlice.actions;
export default productSlice.reducer;
