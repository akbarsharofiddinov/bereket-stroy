import { createSlice } from "@reduxjs/toolkit";

interface IState {
  authModal: boolean;
  catalogModal: boolean;
  searchModal: boolean;
}

const initialState: IState = {
  authModal: false,
  catalogModal: false,
  searchModal: false,
};

export const projectSlice = createSlice({
  name: "projectSlice",
  initialState,
  reducers: {
    setAuthModal: (state, { payload }) => {
      state.authModal = payload;
    },

    setCatalogModal: (state, { payload }) => {
      state.catalogModal = payload;
    },

    setSearchModal: (state, { payload }) => {
      state.searchModal = payload;
    },
  },
});

export const { setAuthModal, setCatalogModal, setSearchModal } =
  projectSlice.actions;

export default projectSlice.reducer;
