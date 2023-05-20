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
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

export const DrawerContents = () => {
  const navigate = useNavigate();
  const handleNavigateHistory = () => {
    navigate("/");
  };

  const handleNavigateExpense = () => {
    navigate("/");
  };

  const handleNavigateAccount = () => {
    navigate("/");
  };

  const toolbarItems = [
    { text: "History", icon: <HistoryIcon />, func: handleNavigateHistory },
    { text: "New Expense", icon: <CreateIcon />, func: handleNavigateExpense },
    { text: "My Account", icon: <PortraitIcon />, func: handleNavigateAccount },
  ];

  return (
    <List style={{ paddingTop: "35px" }}>
      {toolbarItems.map((item, index) => (
        <ListItem key={index} disablePadding>
          <ListItemButton style={{ padding: "15px 50px" }} onClick={item.func}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

const DrawerContentsWrapper = styled.div`
  padding: 0 100px !important;
`;
