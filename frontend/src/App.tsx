import "./App.css";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "./views/pages/HomePage";
import { Header } from "./views/components/Header";
import { useSelector } from "react-redux";
import { ThemeProvider } from "styled-components";
import { selectTheme } from "./reducer/colorModeSlice";
import { SignUpPage } from "./views/pages/SignUpPage";
import { LoginPage } from "./views/pages/LoginPage";
import { FriendsListPage } from "./views/pages/FriendsListPage";
import { Toolbar } from "@mui/material";
import { HistoryPage } from "./views/pages/HistoryPage";
import { TransactionPage } from "./views/pages/TransactionPage";
import { FriendsHistoryPage } from "./views/pages/FriendsHistoryPage";
import { HistoryDetailPage } from "./views/pages/HistoryDetailPage";
import { AccountPage } from "./views/pages/AccountPage";

function App() {
  const theme = useSelector(selectTheme);

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Header />
        <Toolbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/friendslist" element={<FriendsListPage />} />
          <Route path="/transaction" element={<TransactionPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/history/:id" element={<HistoryDetailPage />} />
          <Route path="/history/friends/:id" element={<FriendsHistoryPage />} />
          <Route path="/account" element={<AccountPage />} />
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
