import { Card } from "@mui/material";
import styled from "styled-components";

interface BorrowCalculateCardProps {
  name: string;
  amount: number;
  totalAmount: number;
}

export const BorrowCalculateCard = ({
  name,
  amount,
  totalAmount,
}: BorrowCalculateCardProps) => {
  return (
    <TransactionCardWrapper elevation={0} variant="outlined">
      <InsideWrapper>
        <Container>
          <div>
            <BorrowTitle>Borrow</BorrowTitle>
            <CalculateContainer>
              <CalculateName>{name}</CalculateName>
              <CalculateAmount>${amount}</CalculateAmount>
            </CalculateContainer>
          </div>
          <CalculateContainer>
            <CalculateName>Total</CalculateName>
            <BorrowTotal>${totalAmount}</BorrowTotal>
          </CalculateContainer>
        </Container>
      </InsideWrapper>
    </TransactionCardWrapper>
  );
};

const TransactionCardWrapper = styled(Card)`
  width: 100%;
  margin-bottom: 20px;
  border-radius: 10px !important;
  background: ${({ theme }) => theme.palette.primary.light} !important;
  color: ${({ theme }) => theme.palette.info.light} !important;
`;

const InsideWrapper = styled.div`
  margin: 2rem;
  justify-content: space-between;
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const BorrowTitle = styled.h3`
  margin: 0 0 1rem 0;
  color: blue;
`;

const CalculateContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const CalculateName = styled.div`
  width: 50%;
  margin-bottom: 0.3rem;
`;

const CalculateAmount = styled.div`
  width: 50%;
`;

const BorrowTotal = styled.div`
  color: blue;
`;
