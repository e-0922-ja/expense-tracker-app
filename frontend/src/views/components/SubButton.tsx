import styled from "styled-components";
import { Button } from "@mui/material";
import React from "react";

interface ButtonProps {
  title: string;
  func: () => void;
}

export const SubButton: React.FC<ButtonProps> = ({ title, func }) => {
  return (
    <MyButton variant="contained" disableRipple onClick={func} type="submit">
      {title}
    </MyButton>
  );
};

const MyButton = styled(Button)`
  background: ${({ theme }) => theme.palette.secondary.main} !important;
  border: 0;
  border-radius: 24px !important;
  color: white;
  width: 100% !important;
  height: 40px !important;
  fontsize: 1rem !important;
  padding: 0 30px !important;
`;
