import { IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../../store/store";
import { toggleTheme } from "../../reducer/colorModeSlice";
import { LightModeButton } from "./LightModeButton";
import { DarkModeButton } from "./DarkModeButton";

export const Header = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.colorMode.value);

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
