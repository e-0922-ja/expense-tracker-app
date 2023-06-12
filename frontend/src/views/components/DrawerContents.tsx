import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import HistoryIcon from "@mui/icons-material/History";
import PortraitIcon from "@mui/icons-material/Portrait";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { MainButton } from "./MainButton";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { selectTheme } from "../../reducer/colorModeSlice";
import { logout, selectUser } from "../../reducer/userSlice";
import { AppDispatch } from "../../store/store";

export const DrawerContents = () => {
  const navigate = useNavigate();
  const theme = useSelector(selectTheme);
  const account = useSelector(selectUser);
  const dispatch: AppDispatch = useDispatch();

  const navigateHistory = () => {
    navigate("/history");
  };

  const navigateAccount = () => {
    navigate("/account");
  };

  const handleLogput = () => {
    if (account.isLogin) {
      dispatch(logout());
      navigate("/");
    }
  };

  const toolbarItems = [
    {
      onClick: navigateHistory,
      text: "History",
      icon: <HistoryIcon style={{ color: theme.palette.secondary.main }} />,
      id: 1,
    },
    {
      onClick: navigateAccount,
      text: "My Account",
      icon: <PortraitIcon style={{ color: theme.palette.secondary.main }} />,
      id: 2,
    },
    {
      onClick: handleLogput,
      text: "Logout",
      icon: <LogoutIcon style={{ color: theme.palette.secondary.main }} />,
      id: 3,
    },
  ];

  return (
    <Wrapper>
      <ButtonContainer>
        <MainButton title={"create"} />
      </ButtonContainer>
      <StyledList>
        {toolbarItems.map((item) => (
          <ListItem key={item.id} disablePadding>
            <StyledListItemButton onClick={item.onClick} disableRipple>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
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
`;
