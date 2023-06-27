import {
  Box,
  AppBar,
  AppBarProps,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectTheme, toggleTheme } from "../../reducer/colorModeSlice";
import { selectUser } from "../../reducer/userSlice";
import { AppDispatch } from "../../store/store";
import { DarkModeButton } from "./DarkModeButton";
import { LightModeButton } from "./LightModeButton";
import { paths } from "../../constants/routePaths";

export const Header = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const theme = useSelector(selectTheme);
  const account = useSelector(selectUser);

  const handleNavigateHome = () => {
    navigate(paths.home);
  };

  const handleChangeMode = () => {
    dispatch(toggleTheme());
  };

  return (
    <AppBarWrapper
      elevation={0}
      sx={{
        zIndex: (theme: { zIndex: { drawer: number } }) =>
          theme.zIndex.drawer + 1,
      }}
    >
      <StyledToolbar>
        <Typography
          sx={{ flexGrow: 1 }}
          onClick={handleNavigateHome}
          variant="h5"
          component="div"
        >
          SpendShare
        </Typography>
        <AppBarNavWrapper>
          <StyledIconButton size="large" onClick={handleChangeMode}>
            {theme.palette.mode === "light" ? (
              <DarkModeButton />
            ) : (
              <LightModeButton />
            )}
          </StyledIconButton>

          {account.isLogin ? <Text>{account.user?.firstName}</Text> : ""}
        </AppBarNavWrapper>
      </StyledToolbar>
    </AppBarWrapper>
  );
};

const AppBarWrapper = styled(AppBar)<AppBarProps>`
  position: fixed;
  background-color: ${({ theme }) => theme.palette.info.main} !important;
`;

const StyledToolbar = styled(Toolbar)`
  padding: 0 70px !important;
  @media (max-width: 768px) {
    padding: 0 20px !important;
  }
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
