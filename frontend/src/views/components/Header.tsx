import { IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectTheme, toggleTheme } from "../../reducer/colorModeSlice";
import { LightModeButton } from "./LightModeButton";
import { DarkModeButton } from "./DarkModeButton";

import styled from "styled-components";

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

export const Header = () => {
  const dispatch = useDispatch();
  const theme = useSelector(selectTheme);
  const navigate = useNavigate();

  const handleNavigateHome = () => {
    navigate("/");
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
    </Wrapper>
  );
};
