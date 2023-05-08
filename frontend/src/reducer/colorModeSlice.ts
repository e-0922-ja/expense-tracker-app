import { createSlice } from "@reduxjs/toolkit";
import { ColorTheme } from "../types/colorType";
import { darkTheme, lightTheme } from "../constants/colorThemeConfig";

interface ColorModeState {
  value: ColorTheme;
}

const initialState: ColorModeState = {
  value: lightTheme,
};

export const colorModeSlice = createSlice({
  name: "appColorMode",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.value =
        state.value.palette.mode === "light" ? darkTheme : lightTheme;
    },
  },
});

export const { toggleTheme } = colorModeSlice.actions;
export default colorModeSlice.reducer;
