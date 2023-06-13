import styled from "styled-components";
import { Button } from "@mui/material";

interface SecondaryButtonProps {
  title: string;
}

export const SecondaryButton = ({ title }: SecondaryButtonProps) => {
  return (
    <MyButton variant="contained" disableRipple>
      {title}
    </MyButton>
  );
};

const MyButton = styled(Button)`
  border: 0;
  border-radius: 4px !important;
  box-shadow: 0 3px 5px 2px rgba(255, 105, 135, 0.3);
  color: white;
  width: 80px !important;
  height: 48px !important;
  fontsize: 1rem !important;
  padding: 0 30px !important;
`;
