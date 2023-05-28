import {
  Box,
  AppBar,
  AppBarProps,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectTheme, toggleTheme } from "../../reducer/colorModeSlice";
import { logout, selectUser } from "../../reducer/userSlice";
import { AppDispatch } from "../../store/store";
import { DarkModeButton } from "./DarkModeButton";
import { LightModeButton } from "./LightModeButton";
import styled from "styled-components";

export const Header = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const theme = useSelector(selectTheme);
  const account = useSelector(selectUser);

  const handleNavigateHome = () => {
    navigate("/");
  };

  const handleChangeMode = () => {
    dispatch(toggleTheme());
  };

  const handleLogInOut = () => {
    if (account.isLogin) {
      dispatch(logout());
      navigate("/");
    } else {
      navigate("/login");
    }
  };

  return (
    <AppBarWrapper
      elevation={0}
      sx={{
        zIndex: (theme: { zIndex: { drawer: number } }) =>
          theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar style={{ padding: "0 200px 0 66px" }}>
        <Typography
          sx={{ flexGrow: 1 }}
          onClick={handleNavigateHome}
          variant="h5"
          component="div"
        >
          Expense Tracker
        </Typography>
        <AppBarNavWrapper>
          <StyledIconButton size="large" onClick={handleChangeMode}>
            {theme.palette.mode === "light" ? (
              <DarkModeButton />
            ) : (
              <LightModeButton />
            )}
          </StyledIconButton>
          <Text>
            <button onClick={handleLogInOut}>
              {account.isLogin ? "Log0ut" : "LogIn"}
            </button>
          </Text>
          <Text>{account.isLogin ? account.user?.firstName : "Person"}</Text>
        </AppBarNavWrapper>
      </Toolbar>
    </AppBarWrapper>
  );
};

const AppBarWrapper = styled(AppBar)<AppBarProps>`
  position: fixed;
  background-color: ${({ theme }) => theme.palette.info.main} !important;
`;

const AppBarNavWrapper = styled(Box)`
  display: flex;
  align-items: center;
`;

const Text = styled.div`
  color: #fff;
  padding: 0 20px;
`;

const StyledIconButton = styled(IconButton)`
  .MuiSvgIcon-root {
    color: #f8f9f9;
  }
  .MuiTouchRipple-root {
    color: #f8f9f9;
  }
`;
