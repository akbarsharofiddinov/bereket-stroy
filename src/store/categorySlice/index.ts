import { createSlice } from "@reduxjs/toolkit";

interface IState {
  allCategories: ICategory[];
  selectedCategory: ICategory | undefined;
  selectedSubCategory: ICategory | undefined;
  selectedSubSubCategory: ICategory | undefined;
}

const initialState: IState = {
  allCategories: [],
  selectedCategory: undefined,
  selectedSubCategory: undefined,
  selectedSubSubCategory: undefined,
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

    setSelectedSubSubCategory: (state, { payload }) => {
      state.selectedSubSubCategory = payload;
    },
  },
});

export const {
  setAllCategories,
  setSelectedCategory,
  setSelectedSubCategory,
  setSelectedSubSubCategory,
} = categorySlice.actions;

export default categorySlice.reducer;
