import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store/store";
import { UUID } from "crypto";

interface UserInfo {
  id: UUID;
  firstName: string;
  lastName: string;
  email: string;
}

interface UserState {
  user: UserInfo | null;
  isLogin: boolean;
}

const initialState: UserState = {
  user: null,
  isLogin: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = {
        id: action.payload.id,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        email: action.payload.email,
      };
      state.isLogin = true;
    },
    logout: (state) => {
      state.user = null;
      state.isLogin = false;
    },
  },
});

export const selectUser = (state: RootState) => state.user;

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
