import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import HistoryIcon from "@mui/icons-material/History";
import CreateIcon from "@mui/icons-material/Create";
import PortraitIcon from "@mui/icons-material/Portrait";
import { useNavigate } from "react-router-dom";
import { MainButton } from "./MainButton";
import styled from "styled-components";

export const DrawerContents = () => {
  const navigate = useNavigate();

  const handleNavigateHistory = () => {
    navigate("/history");
  };

  const handleNavigateTransaction = () => {
    navigate("/friendslist");
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
        <MainButton title={"create"} func={handleNavigateTransaction} />
      </ButtonContainer>
      <List style={{ paddingTop: "35px" }}>
        {toolbarItems.map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton
              style={{ padding: "10px 45px" }}
              onClick={item.func}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
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
