import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { IconButton } from "@mui/material";
import styled from "styled-components";

interface GobackButtonProps {
  onClick: () => void;
}

export const GobackButton = ({ onClick }: GobackButtonProps) => {
  return (
    <StyledIconButton onClick={onClick}>
      <ArrowBackIcon />
    </StyledIconButton>
  );
};

const StyledIconButton = styled(IconButton)`
  .MuiSvgIcon-root {
    color: ${({ theme }) => theme.palette.info.light};
  }
`;
