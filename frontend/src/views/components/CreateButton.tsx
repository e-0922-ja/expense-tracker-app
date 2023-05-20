import styled from "styled-components";
import { Button } from "@mui/material";
import React from "react";

export const CreateButton = () => {
  return (
    <MyButton variant="contained" disableRipple>
      create
    </MyButton>
  );
};

const MyButton = styled(Button)`
  background: linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%) !important;
  border: 0;
  border-radius: 24px !important;
  box-shadow: 0 3px 5px 2px rgba(255, 105, 135, 0.3);
  color: white;
  height: 48px !important;
  fontsize: 1rem !important;
  padding: 0 30px !important;
`;
