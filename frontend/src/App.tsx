import { Route, Routes } from "react-router-dom";
import { HomePage } from "./views/pages/HomePage";
import { Header } from "./views/components/Header";
import { useSelector } from "react-redux";
import styled, { ThemeProvider } from "styled-components";
import { selectTheme } from "./reducer/colorModeSlice";
import { SignUpPage } from "./views/pages/SignUpPage";
import { LoginPage } from "./views/pages/LoginPage";
import { FriendsListPage } from "./views/pages/FriendsListPage";
import { Toolbar } from "@mui/material";
import { HistoryPage } from "./views/pages/HistoryPage";
import { PaymentPage } from "./views/pages/PaymentPage";
import { HistoryDetailPage } from "./views/pages/HistoryDetailPage";
import { AccountPage } from "./views/pages/AccountPage";
import { PassWordResetPage } from "./views/pages/PassWordResetPage";
import ProtectedRoute from "./constants/ProtectedRoute";
import { FriendsApprovePage } from "./views/pages/FriendsApprovePage";
import { FriendHistoryDetailPage } from "./views/pages/FriendHistoryDetailPage";

function App() {
  const theme = useSelector(selectTheme);

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Header />
        <StyledToolbar />
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
          <Route
            path="/friends"
            element={<ProtectedRoute element={<FriendsApprovePage />} />}
          />
          <Route path="/passwordReset" element={<PassWordResetPage />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;

const StyledToolbar = styled(Toolbar)`
  padding: 0 70px !important;
  @media (max-width: 600px) {
    padding: 0 20px !important;
  }
`;
