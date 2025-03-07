import { createSlice } from "@reduxjs/toolkit";

interface IState {
  authModal: boolean;
  catalogModal: boolean;
  searchModal: boolean;
  profileInfo: IProfile;
  token: "";
}

const initialState: IState = {
  authModal: false,
  catalogModal: false,
  searchModal: false,
  profileInfo: {
    birthday: "",
    company_name: "",
    first_name: "",
    id: 0,
    inn: "",
    is_legal: 0,
    is_verified: 0,
    last_name: "",
    phone: "",
  },
  token: "",
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

    setProfileInfo: (state, { payload }) => {
      state.profileInfo = payload;
    },

    setToken: (state, { payload }) => {
      state.token = payload;
    },
  },
});

export const {
  setAuthModal,
  setCatalogModal,
  setSearchModal,
  setProfileInfo,
  setToken,
} = projectSlice.actions;

export default projectSlice.reducer;
