import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IState {
  allProducts: IProduct[];
  filteredProducts: IProduct[];
  cart: {
    product: IProduct;
    quantity: number;
    isSelected: boolean;
  }[];
  favorites: IProduct[];
  partners: IBrands[];
  searchedProducts: IProduct[];
  searchValue: string;
  isInSale: boolean;
  totalProducts: number;
}

const initialState: IState = {
  allProducts: [],
  filteredProducts: [],
  cart: [],
  favorites: [],
  partners: [],
  searchedProducts: [],
  searchValue: "",
  isInSale: false,
  totalProducts: 0
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

    addProductToCart: (state, { payload }: PayloadAction<IProduct>) => {
      const findProduct = state.cart.find(
        (item) => item.product.id === payload.id
      );
      if (findProduct) {
        findProduct.quantity += 1;
      } else {
        state.cart.push({ product: payload, isSelected: true, quantity: 1 });
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

    settleProductSelected: (state, { payload }) => {
      const product = state.cart.find((item) => item.product.id === payload.id);
      if (product) product.isSelected = !product.isSelected;
    },

    setPartners: (state, { payload }) => {
      state.partners = payload;
    },

    setSearchedProducts: (state, { payload }) => {
      state.searchedProducts = payload;
    },

    setSearchValue: (state, { payload }) => {
      state.searchValue = payload;
    },

    setIsInSalve: (state, { payload }) => {
      state.isInSale = payload;
    },

    setFilteredProducts: (state, { payload }) => {
      state.filteredProducts = payload;
    },

    setTotalProductsCount: (state, {payload}) => {
      state.totalProducts = payload
    }
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
  instantRemoveProductsFromCart,
  settleProductSelected,
  setPartners,
  setSearchedProducts,
  setSearchValue,
  setIsInSalve,
  setFilteredProducts,
  setTotalProductsCount
} = productSlice.actions;
export default productSlice.reducer;
