import { Route, Routes } from "react-router-dom";
import { Toolbar } from "@mui/material";
import { useSelector } from "react-redux";
import styled, { ThemeProvider } from "styled-components";

import { HomePage } from "./views/pages/HomePage";
import { Header } from "./views/components/Header";
import { selectTheme } from "./reducer/colorModeSlice";
import { LoginPage } from "./views/pages/LoginPage";
import { SelectFriendsPage } from "./views/pages/SelectFriendsPage";
import { HistoryPage } from "./views/pages/HistoryPage";
import { RegisterExpenseDetail } from "./views/pages/RegisterExpenseDetail";
import { HistoryDetailPage } from "./views/pages/HistoryDetailPage";
import { AccountPage } from "./views/pages/AccountPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import { SignupPage } from "./views/pages/SignupPage";
import { ResetPasswordPage } from "./views/pages/ResetPasswordPage";
import { FriendsHistoryDetailPage } from "./views/pages/FriendsHistoryDetailPage";
import { FriendsListPage } from "./views/pages/FriendsListPage";
import { paths } from "./constants/routePaths";

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
            path={paths.selectFriends}
            element={<ProtectedRoute element={<SelectFriendsPage />} />}
          />
          <Route
            path={paths.registerDetail}
            element={<ProtectedRoute element={<RegisterExpenseDetail />} />}
          />
          <Route
            path={paths.history}
            element={<ProtectedRoute element={<HistoryPage />} />}
          />
          <Route
            path={paths.historyById}
            element={<ProtectedRoute element={<FriendsHistoryDetailPage />} />}
          />
          <Route
            path={paths.historyDetail}
            element={<ProtectedRoute element={<HistoryDetailPage />} />}
          />
          <Route
            path={paths.friendList}
            element={<ProtectedRoute element={<FriendsListPage />} />}
          />
          <Route
            path={paths.account}
            element={<ProtectedRoute element={<AccountPage />} />}
          />
          <Route path={paths.passwordReset} element={<ResetPasswordPage />} />
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
