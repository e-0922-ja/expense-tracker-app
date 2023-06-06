import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import HistoryIcon from "@mui/icons-material/History";
import PortraitIcon from "@mui/icons-material/Portrait";
import { useNavigate } from "react-router-dom";
import { MainButton } from "./MainButton";
import styled from "styled-components";

export const DrawerContents = () => {
  const navigate = useNavigate();

  const handleNavigateHistory = () => {
    navigate("/history");
  };

  const handleNavigateAccount = () => {
    navigate("/account");
  };

  const toolbarItems = [
    { text: "History", icon: <HistoryIcon />, func: handleNavigateHistory },
    { text: "My Account", icon: <PortraitIcon />, func: handleNavigateAccount },
  ];

  return (
    <>
      <ButtonContainer>
        <MainButton title={"create"} />
      </ButtonContainer>
      <StyledList>
        {toolbarItems.map((item, index) => (
          <ListItem key={index} disablePadding>
            <StyledListItemButton onClick={item.func}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </StyledListItemButton>
          </ListItem>
        ))}
      </StyledList>
    </>
  );
};

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
