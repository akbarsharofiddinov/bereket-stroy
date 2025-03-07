import { createSlice } from "@reduxjs/toolkit";

interface IState {
  receiver_lat: number;
  receiver_lon: number;
  products: {
    product: IProduct;
    quantity: number;
  }[];
}

const initialState: IState = {
  receiver_lat: 0,
  receiver_lon: 0,
  products: [],
};

export const orderSlice = createSlice({
  name: "orderSlice",
  initialState,
  reducers: {
    setProducts: (state, { payload }) => {
      state.products = payload;
    },

    setReceiverLat: (state, { payload }) => {
      state.receiver_lat = payload;
    },

    setReceiverLon: (state, { payload }) => {
      state.receiver_lon = payload;
    },
  },
});

export const { setProducts, setReceiverLat, setReceiverLon } = orderSlice.actions;

export default orderSlice.reducer;
