import { createSlice } from "@reduxjs/toolkit";

interface IState {
  authModal: boolean;
}

const initialState: IState = {
  authModal: false,
}

export const projectSlice = createSlice({
  name: "projectSlice",
  initialState,
  reducers: {
    setAuthModal: (state, {payload}) => {
      state.authModal = payload
    }
  },
})

export const { setAuthModal } = projectSlice.actions

export default projectSlice.reducer