import "./App.css";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "./views/pages/HomePage";
import { Header } from "./views/components/Header";
import { Footer } from "./views/components/Footer";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";
import { ThemeProvider } from "styled-components";
import { selectTheme } from "./reducer/colorModeSelectors";

function App() {
  const theme = useSelector(selectTheme);
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
        <Footer />
      </ThemeProvider>
    </div>
  );
}

export default App;
