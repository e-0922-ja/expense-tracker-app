import { IconButton } from "@mui/material";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectTheme, toggleTheme } from "../../reducer/colorModeSlice";
import { AppDispatch } from "../../store/store";
import { selectUser, toggleLogout } from "../../reducer/userSlice";
import { LightModeButton } from "./LightModeButton";
import { DarkModeButton } from "./DarkModeButton";

export const Header = () => {
  const theme = useSelector(selectTheme);
  const isLoggedIn = useSelector(selectUser);
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const handleNavigateHome = () => {
    navigate("/");
  };

  const handleLogInOut = () => {
    if (isLoggedIn.isLogin) {
      dispatch(toggleLogout());
      navigate("/");
    } else {
      navigate("/login");
    }
  };

  return (
    <Wrapper>
      <Text onClick={handleNavigateHome}>Expense Tracker</Text>
      <div>
        <StyledIconButton size="large" onClick={() => dispatch(toggleTheme())}>
          {theme.palette.mode === "light" ? (
            <DarkModeButton />
          ) : (
            <LightModeButton />
          )}
        </StyledIconButton>
      </div>
      <Text>
        <button onClick={handleLogInOut}>
          {isLoggedIn.isLogin ? "Log0ut" : "LogIn"}
        </button>
      </Text>
      <Text>{isLoggedIn.isLogin ? isLoggedIn.user?.firstName : "Person"}</Text>
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
