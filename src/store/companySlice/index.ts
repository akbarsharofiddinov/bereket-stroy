import { createSlice } from "@reduxjs/toolkit";

interface IState {
  branches: IBranch[];
}

const initialState: IState = {
  branches: [],
};

export const companySlice = createSlice({
  name: "companySlice",
  initialState,
  reducers: {
    setBranches: (state, { payload }) => {
      state.branches = payload;
    },
  },
});

export const { setBranches } = companySlice.actions;

export default companySlice.reducer;
