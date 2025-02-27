import { createSlice } from "@reduxjs/toolkit";

interface IState {
  allCategories: ICategory[];
  selectedCategory: ICategory | undefined;
  selectedSubCategory: ICategory | undefined;
}

const initialState: IState = {
  allCategories: [],
  selectedCategory: undefined,
  selectedSubCategory: undefined,
};

export const categorySlice = createSlice({
  name: "categorySlice",
  initialState,
  reducers: {
    setAllCategories: (state, { payload }) => {
      state.allCategories = payload;
    },

    setSelectedCategory: (state, { payload }) => {
      state.selectedCategory = payload;
    },

    setSelectedSubCategory: (state, { payload }) => {
      state.selectedSubCategory = payload;
    },
  },
});

export const { setAllCategories, setSelectedCategory, setSelectedSubCategory } =
  categorySlice.actions;

export default categorySlice.reducer;
