import { ToolbarItem } from "../types";
import HistoryIcon from "@mui/icons-material/History";
import PortraitIcon from "@mui/icons-material/Portrait";
import GroupIcon from "@mui/icons-material/Group";
import LogoutIcon from "@mui/icons-material/Logout";

export const toolbarItems: ToolbarItem[] = [
  {
    path: "/history",
    name: "History",
    icon: HistoryIcon,
  },
  {
    path: "/friends",
    name: "Friends List",
    icon: GroupIcon,
  },
  {
    path: "/account",
    name: "My Account",
    icon: PortraitIcon,
  },
  {
    path: "/",
    name: "Logout",
    icon: LogoutIcon,
  },
];
