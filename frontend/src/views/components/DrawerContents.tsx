import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import InboxIcon from "@mui/icons-material/Inbox";

export const DrawerContents = () => {
  const toolbarItems = [
    { text: "History", icon: <InboxIcon /> },
    { text: "New Expense", icon: <MailIcon /> },
    { text: "My Account", icon: <MailIcon /> },
  ];

  return (
    <div>
      <List>
        {toolbarItems.map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
};
