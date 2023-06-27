import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store/store";

interface UserInfo {
  firstName: string;
}

const initialState: UserInfo = {
  firstName: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.firstName = action.payload;
    },
    logout: (state) => {
      state.firstName = "";
    },
    update: (state, action) => {
      state.firstName = action.payload;
    },
  },
});

export const selectUser = (state: RootState) => state.user;

export const { login, logout, update } = userSlice.actions;

export default userSlice.reducer;
