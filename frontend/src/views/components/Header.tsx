import { IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../reducer/colorModeSlice";
import { LightModeButton } from "./LightModeButton";
import { DarkModeButton } from "./DarkModeButton";
import { selectTheme } from "../../reducer/colorModeSelectors";

export const Header = () => {
  const dispatch = useDispatch();
  const theme = useSelector(selectTheme);
  return (
    <div>
      <div>Expense Tracker</div>
      <div>
        <IconButton onClick={() => dispatch(toggleTheme())}>
          {theme.palette.mode === "light" ? (
            <DarkModeButton />
          ) : (
            <LightModeButton />
          )}
        </IconButton>
      </div>
    </div>
  );
};
