import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    // White
    primary: {
      main: "#ffffff",
      light: "#f8f9f9",
    },
    // Blue
    secondary: {
      main: "#001DAB",
      light: "#0485A2",
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
      light: "#B1D4B6",
    },
  },
});
