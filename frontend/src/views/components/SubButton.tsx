import styled from "styled-components";
import { Button } from "@mui/material";


interface SubButtonProps {
  title: string;
  onClick: () => void;
}

export const SubButton = ({ title, onClick }: SubButtonProps) => {
  return (
    <MyButton variant="contained" disableRipple onClick={onClick} type="submit">
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
