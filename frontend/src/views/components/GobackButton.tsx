import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { IconButton } from "@mui/material";

interface GobackButtonProps {
  onClick: () => void;
}

export const GobackButton = ({ onClick }: GobackButtonProps) => {
  return (
    <IconButton onClick={onClick}>
      <ArrowBackIcon />
    </IconButton>
  );
};
