import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { IconButton } from "@mui/material";

interface ButtonProps {
  func: () => void;
}

export const GobackButton: React.FC<ButtonProps> = ({ func }) => {
  return (
    <IconButton onClick={func}>
      <ArrowBackIcon />
    </IconButton>
  );
};
