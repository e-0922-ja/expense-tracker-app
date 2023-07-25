import { Route, Routes } from "react-router-dom";
import { HomePage } from "./views/pages/HomePage";
import { Header } from "./views/components/Header";
import { useSelector } from "react-redux";
import styled, { ThemeProvider } from "styled-components";
import { selectTheme } from "./reducer/colorModeSlice";
import { LoginPage } from "./views/pages/LoginPage";
import { SelectFriendsPage } from "./views/pages/SelectFriendsPage";
import { Toolbar } from "@mui/material";
import { HistoryPage } from "./views/pages/HistoryPage";
import { RegisterExpenseDetail } from "./views/pages/RegisterExpenseDetail";
import { HistoryDetailPage } from "./views/pages/HistoryDetailPage";
import { AccountPage } from "./views/pages/AccountPage";
import { paths } from "./constants/routePaths";

import ProtectedRoute from "./routes/ProtectedRoute";
import { SignupPage } from "./views/pages/SignupPage";

import { ResetPasswordPage } from "./views/pages/ResetPasswordPage";
import { FriendsHistoryDetailPage } from "./views/pages/FriendsHistoryDetailPage";
import { FriendsListPage } from "./views/pages/FriendsListPage";

function App() {
  const theme = useSelector(selectTheme);

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Header />
        <StyledToolbar />
        <Routes>
          <Route path={paths.home} element={<HomePage />} />
          <Route path={paths.signup} element={<SignupPage />} />
          <Route path={paths.login} element={<LoginPage />} />
          <Route
            path="/expense/select-friends"
            element={<ProtectedRoute element={<SelectFriendsPage />} />}
          />
          path={paths.friendList}
          element={<ProtectedRoute element={<FriendsListPage />} />}
          <Route
            path="/expense/register-detail"
            element={<ProtectedRoute element={<RegisterExpenseDetail />} />}
          />
          <Route
            path={paths.history}
            element={<ProtectedRoute element={<HistoryPage />} />}
          />
          <Route
            path="/history/:id"
            element={<ProtectedRoute element={<FriendsHistoryDetailPage />} />}
          />
          <Route
            path="/history/detail"
            element={<ProtectedRoute element={<HistoryDetailPage />} />}
          />
          <Route
            path="/friends-list"
            element={<ProtectedRoute element={<FriendsListPage />} />}
          />
          <Route
            path={paths.account}
            element={<ProtectedRoute element={<AccountPage />} />}
          />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
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
