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
import { login, selectUser } from "../../reducer/userSlice";
import { AppDispatch } from "../../store/store";
import { DarkModeButton } from "./DarkModeButton";
import { LightModeButton } from "./LightModeButton";
import styled from "styled-components";
import { useEffect } from "react";
import { UserService } from "../../services/users/service";
export const Header = () => {
  const dispatch: AppDispatch = useDispatch();
  const theme = useSelector(selectTheme);
  const account = useSelector(selectUser);

  const navigate = useNavigate();

  const handleNavigateHome = () => {
    account.firstName === "" ? navigate("/") : navigate("/history");
  };

  const handleChangeMode = () => {
    dispatch(toggleTheme());
  };

  useEffect(() => {
    const fetchFirstName = async () => {
      const userInfo = await UserService.getUserInfoFromSession();
      if (userInfo) dispatch(login(userInfo.user_metadata.firstName));
    };
    fetchFirstName();
  }, [dispatch]);

  return (
    <AppBarWrapper
      elevation={0}
      sx={{
        zIndex: (theme: { zIndex: { drawer: number } }) =>
          theme.zIndex.drawer + 1,
      }}
    >
      <StyledToolbar>
        <StyledTypography
          sx={{ flexGrow: 1 }}
          onClick={handleNavigateHome}
          variant="h5"
        >
          SpendShare
        </StyledTypography>
        <AppBarNavWrapper>
          <StyledIconButton size="large" onClick={handleChangeMode}>
            {theme.palette.mode === "light" ? (
              <DarkModeButton />
            ) : (
              <LightModeButton />
            )}
          </StyledIconButton>

          {account.firstName && <Text>{account.firstName}</Text>}
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
  @media (max-width: 600px) {
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

const StyledTypography = styled(Typography)`
  font-family: "Roboto Mono", monospace !important;
  cursor: pointer;
`;
