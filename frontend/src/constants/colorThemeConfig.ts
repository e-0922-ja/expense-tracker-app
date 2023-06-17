import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    // White

    primary: {
      main: "#fff",
      light: "#f8f9f9",
    },
    // Blue
    secondary: {
      main: "#0485A2",
    },
    info: {
      main: "#263335",
      light: "#3e3f4d",
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    // Black

    primary: {
      main: "#3e3f4d",
      light: "#4d5c69",
    },

    // Green
    secondary: {
      main: "#8AB525",
    },
    info: {
      main: "#263335",
      light: "#fff",
    },
  },
});
