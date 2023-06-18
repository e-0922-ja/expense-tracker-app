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
import { PaymentPage } from "./views/pages/PaymentPage";
import { HistoryDetailPage } from "./views/pages/HistoryDetailPage";
import { AccountPage } from "./views/pages/AccountPage";
import { FriendHistoryDetailPage } from "./views/pages/FriendHistoryDetailPage";
import { PassWordResetPage } from "./views/pages/PassWordResetPage";
import ProtectedRoute from "./constants/ProtectedRoute";

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
          <Route
            path="/expenses/friendslist"
            element={<ProtectedRoute element={<FriendsListPage />} />}
          />
          <Route
            path="/expenses/payment"
            element={<ProtectedRoute element={<PaymentPage />} />}
          />
          <Route
            path="/history"
            element={<ProtectedRoute element={<HistoryPage />} />}
          />
          <Route
            path="/history/:id"
            element={<ProtectedRoute element={<HistoryDetailPage />} />}
          />
          <Route
            path="/history/group/:id"
            element={<ProtectedRoute element={<FriendHistoryDetailPage />} />}
          />
          <Route
            path="/account"
            element={<ProtectedRoute element={<AccountPage />} />}
          />
          <Route path="/passwordReset" element={<PassWordResetPage />} />
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
