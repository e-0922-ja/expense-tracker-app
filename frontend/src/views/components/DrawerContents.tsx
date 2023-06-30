import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { MainButton } from "./MainButton";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { selectTheme } from "../../reducer/colorModeSlice";
import { logout } from "../../reducer/userSlice";
import { AppDispatch } from "../../store/store";
import { UserService } from "../../services/users/service";
import { toolbarItems } from "../../constants/toolbarItems";
import { ToolbarItem } from "../../types";

export const DrawerContents = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useSelector(selectTheme);

  const handleLogout = async (path: string) => {
    const { isError, message } = await UserService.signOut();
    if (isError) {
      console.error("Failed to logout: ", message);
    } else {
      dispatch(logout());
      navigate(path);
    }
  };

  const handleClick = (item: ToolbarItem) => {
    item.name === "Logout" ? handleLogout(item.path) : navigate(item.path);
  };

  return (
    <Wrapper>
      <ButtonContainer>
        <MainButton title={"create"} />
      </ButtonContainer>
      <StyledList>
        {toolbarItems.map((item, index) => (
          <ListItem key={index} disablePadding>
            <StyledListItemButton
              onClick={() => handleClick(item)}
              disableRipple
            >
              <ListItemIcon>
                <item.icon style={{ color: theme.palette.secondary.main }} />
              </ListItemIcon>
              <ListItemText primary={item.name} />
            </StyledListItemButton>
          </ListItem>
        ))}
      </StyledList>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 100%;
  color: ${({ theme }) => theme.palette.info.light};
  background: ${({ theme }) => theme.palette.primary.light};
`;

const ButtonContainer = styled.div`
  margin-top: 35px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledList = styled(List)`
  padding-top: 1rem !important;
`;

const StyledListItemButton = styled(ListItemButton)`
  padding: 0.5rem 3.5rem !important;
  &:hover {
    background-color: ${({ theme }) => theme.palette.primary.main} !important;
  }

  ${(props) =>
    props.selected &&
    `
    background-color: ${props.theme.palette.primary.main} !important;
  `}
`;
