import styled from "styled-components";
import { Button } from "@mui/material";

export const TransactionPage = () => {
  return (
    <div>
      <Wrapper>
        <NewTransContainer> create</NewTransContainer>
        <TransHistoryContainer>
          display transaction history
        </TransHistoryContainer>
      </Wrapper>
    </div>
  );
};

const Wrapper = styled.div`
  background: ${({ theme }) => theme.palette.primary.main};
  display: flex;
  width: 100%;
`;

const NewTransContainer = styled.div`
  background: ${({ theme }) => theme.palette.primary.main};
  width: 50%;
`;

const TransHistoryContainer = styled.div`
  background: ${({ theme }) => theme.palette.primary.main};
  width: 50%;
`;

