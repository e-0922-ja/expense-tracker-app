import "./App.css";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "./views/pages/HomePage";
import { Header } from "./views/components/Header";
import { Footer } from "./views/components/Footer";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";
import { ThemeProvider } from "styled-components";

function App() {
  const theme = useSelector((state: RootState) => state.colorMode.value);
  return (
    <div className="App">
      <Header />
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </ThemeProvider>
      <Footer />
    </div>
  );
}

export default App;
