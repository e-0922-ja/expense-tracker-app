import { darkTheme, lightTheme } from "../constants/colorThemeConfig";
import { RootState } from "../store/store";

export const selectTheme = (state: RootState) => {
  return state.colorMode.value === "light" ? lightTheme : darkTheme;
};
