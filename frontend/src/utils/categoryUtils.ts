import { SvgIconProps } from "@mui/material/SvgIcon";
import { categories } from "../constants/categoryIcons";

export const getCategoryIcon = (
  name: string
): React.ComponentType<SvgIconProps> => {
  const category = categories.find((category) => category.name === name);
  return category?.icon || categories[0].icon;
};
