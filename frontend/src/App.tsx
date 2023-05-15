import "./App.css";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "./views/pages/HomePage";
import { Header } from "./views/components/Header";
import { Footer } from "./views/components/Footer";
import { useSelector } from "react-redux";
import { ThemeProvider } from "styled-components";
import { selectTheme } from "./reducer/colorModeSlice";
import { SignUpPage } from "./views/pages/SignUpPage";
import { LoginPage } from "./views/pages/LoginPage";

function App() {
  const theme = useSelector(selectTheme);

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
        <Footer />
      </ThemeProvider>
    </div>
  );
}

export default App;
