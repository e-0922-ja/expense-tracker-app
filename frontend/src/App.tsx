import "./App.css";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "./view/pages/HomePage";
import { Header } from "./view/components/Header";
import { Footer } from "./view/components/Footer";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
