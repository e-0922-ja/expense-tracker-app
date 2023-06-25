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
import { PassWordResetPage } from "./views/pages/PassWordResetPage";
import ProtectedRoute from "./constants/ProtectedRoute";
import { FriendsApprovePage } from "./views/pages/FriendsApprovePage";
import { FriendHistoryDetailPage } from "./views/pages/FriendHistoryDetailPage";
import { paths } from "./constants/routePaths";

function App() {
  const theme = useSelector(selectTheme);

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Header />
        <Toolbar />
        <Routes>
          <Route path={paths.home} element={<HomePage />} />
          <Route path={paths.signup} element={<SignUpPage />} />
          <Route path={paths.login} element={<LoginPage />} />
          <Route
            path={paths.friendList}
            element={<ProtectedRoute element={<FriendsListPage />} />}
          />
          <Route
            path={paths.payment}
            element={<ProtectedRoute element={<PaymentPage />} />}
          />
          <Route
            path={paths.history}
            element={<ProtectedRoute element={<HistoryPage />} />}
          />
          <Route
            path={paths.historyDetail}
            element={<ProtectedRoute element={<HistoryDetailPage />} />}
          />
          <Route
            path={paths.historyGroup}
            element={<ProtectedRoute element={<FriendHistoryDetailPage />} />}
          />
          <Route
            path={paths.account}
            element={<ProtectedRoute element={<AccountPage />} />}
          />
          <Route
            path={paths.friendApprove}
            element={<ProtectedRoute element={<FriendsApprovePage />} />}
          />
          <Route path={paths.passwordReset} element={<PassWordResetPage />} />
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
