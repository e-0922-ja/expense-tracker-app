import { createSlice } from "@reduxjs/toolkit";

interface ColorModeState {
  value: string;
}

const initialState: ColorModeState = {
  value: "light",
};

export const colorModeSlice = createSlice({
  name: "appColorMode",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.value = state.value === "light" ? "dark" : "light";
    },
  },
});

export const { toggleTheme } = colorModeSlice.actions;
export default colorModeSlice.reducer;
