import { IconButton } from "@mui/material";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectTheme, toggleTheme } from "../../reducer/colorModeSlice";
import { AppDispatch } from "../../store/store";
import { selectUser, logout } from "../../reducer/userSlice";
import { LightModeButton } from "./LightModeButton";
import { DarkModeButton } from "./DarkModeButton";

export const Header = () => {
  const theme = useSelector(selectTheme);
  const account = useSelector(selectUser);
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

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
    <Wrapper>
      <Text onClick={handleNavigateHome}>Expense Tracker</Text>
      <div>
        <StyledIconButton size="large" onClick={handleChangeMode}>
          {theme.palette.mode === "light" ? (
            <DarkModeButton />
          ) : (
            <LightModeButton />
          )}
        </StyledIconButton>
      </div>
      <Text>
        <button onClick={handleLogInOut}>
          {account.isLogin ? "Log0ut" : "LogIn"}
        </button>
      </Text>
      <Text>{account.isLogin ? account.user?.firstName : "Person"}</Text>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background: #263335;
  display: flex;
  justify-content: space-between;
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
