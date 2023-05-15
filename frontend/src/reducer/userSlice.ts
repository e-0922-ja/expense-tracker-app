import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store/store";

interface UserInfo {
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
    toggleLogin: (state, action) => {
      state.user = {
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        email: action.payload.email,
      };
      state.isLogin = true;
    },
    toggleLogout: (state) => {
      state.user = null;
      state.isLogin = false;
    },
  },
});

export const selectUser = (state: RootState) => state.user;

export const { toggleLogin, toggleLogout } = userSlice.actions;

export default userSlice.reducer;
