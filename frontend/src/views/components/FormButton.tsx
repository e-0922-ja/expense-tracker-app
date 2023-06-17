import styled from "styled-components";
import { Button } from "@mui/material";

interface FormButtonProps {
  title: string;
}

export const FormButton = ({ title }: FormButtonProps) => {
  return (
    <MyButton variant="contained" disableRipple type="submit">
      {title}
    </MyButton>
  );
};

const MyButton = styled(Button)`
  background: ${({ theme }) => theme.palette.secondary.main} !important;
  border: 0;
  color: white;
  width: 100% !important;
  height: 40px !important;
  fontsize: 1rem !important;
  padding: 0 30px !important;
`;
