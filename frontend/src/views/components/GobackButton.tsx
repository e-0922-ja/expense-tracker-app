import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { IconButton } from "@mui/material";

interface GobackButtonProps {
  func: () => void;
}

export const GobackButton = ({ func }: GobackButtonProps) => {
  return (
    <IconButton onClick={func}>
      <ArrowBackIcon />
    </IconButton>
  );
};
