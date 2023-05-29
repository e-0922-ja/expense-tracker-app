import styled from "styled-components";
import { Button } from "@mui/material";
import React from "react";

interface ButtonProps {
  title: string;
  func: () => void;
}

export const MainButton: React.FC<ButtonProps> = ({ title, func }) => {
  return (
    <MyButton variant="contained" disableRipple onClick={func}>
      {title}
    </MyButton>
  );
};

const MyButton = styled(Button)`
  background: linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%) !important;
  border: 0;
  border-radius: 24px !important;
  box-shadow: 0 3px 5px 2px rgba(255, 105, 135, 0.3);
  color: white;
  width: 120px !important;
  height: 40px !important;
  fontsize: 1rem !important;
  padding: 0 30px !important;
`;