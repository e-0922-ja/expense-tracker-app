import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store/store';
import { darkTheme, lightTheme } from '../constants/colorThemeConfig';

interface ColorModeState {
  value: string;
}

const initialState: ColorModeState = {
  value: 'light',
};

export const colorModeSlice = createSlice({
  name: 'appColorMode',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.value = state.value === 'light' ? 'dark' : 'light';
    },
  },
});

export const selectTheme = (state: RootState) => {
  return state.colorMode.value === 'light' ? lightTheme : darkTheme;
};

export const { toggleTheme } = colorModeSlice.actions;
export default colorModeSlice.reducer;
