import { createSlice } from "@reduxjs/toolkit";

interface IState {
  authModal: boolean;
  catalogModal: boolean;
  searchModal: boolean;
  profileInfo: {
    info: IProfile;
    token: string;
  };
}

const initialState: IState = {
  authModal: false,
  catalogModal: false,
  searchModal: false,
  profileInfo: {
    info: {
      id: 0,
      is_legar: 0,
      first_name: "",
      last_name: "",
      phone: "",
      birthday: null,
      company_name: null,
      inn: null,
      is_verified: false,
      deleted_at: null,
      created_at: "",
      updated_at: "",
    },
    token: "",
  },
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
  },
});

export const { setAuthModal, setCatalogModal, setSearchModal, setProfileInfo } =
  projectSlice.actions;

export default projectSlice.reducer;
