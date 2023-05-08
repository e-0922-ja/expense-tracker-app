export interface Order {
  main: string;
}

export interface Palette {
  mode: string;
  primary: Order;
  secondary: Order;
}

export interface ColorTheme {
  palette: Palette;
}
