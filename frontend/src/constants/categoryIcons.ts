import RestaurantIcon from "@mui/icons-material/Restaurant";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import DirectionsTransitIcon from "@mui/icons-material/DirectionsTransit";
import HouseIcon from "@mui/icons-material/House";
import LightIcon from "@mui/icons-material/Light";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import Face3Icon from "@mui/icons-material/Face3";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import { Category } from "../types";

export const categories: Category[] = [
  { name: "None", icon: HorizontalRuleIcon },
  { name: "Food", icon: RestaurantIcon },
  { name: "Entertainment", icon: MusicNoteIcon },
  { name: "Transportation", icon: DirectionsTransitIcon },
  { name: "Cost of Living", icon: HouseIcon },
  { name: "Utility", icon: LightIcon },
  { name: "Health", icon: MonitorHeartIcon },
  { name: "Beauty", icon: Face3Icon },
  { name: "Cloth", icon: ShoppingCartIcon },
  { name: "Others", icon: HelpOutlineIcon },
];
