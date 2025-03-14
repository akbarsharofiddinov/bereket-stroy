import { createSlice } from "@reduxjs/toolkit";

interface IState {
  authModal: boolean;
  catalogModal: boolean;
  searchModal: boolean;
  profileInfo: IProfile;
  token: string;
  currentLanguage: string;
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
  currentLanguage: "ru",
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

    setCurrentLanguage: (state, { payload }) => {
      state.currentLanguage = payload;
    },
  },
});

export const {
  setAuthModal,
  setCatalogModal,
  setSearchModal,
  setProfileInfo,
  setToken,
  setCurrentLanguage,
} = projectSlice.actions;

export default projectSlice.reducer;
