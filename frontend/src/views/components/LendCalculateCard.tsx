import { Card } from "@mui/material";
import styled from "styled-components";
import { calculateTotalAmount } from "../../utils/calculateUtils";
import { LentAmountReturns } from "../../types";

interface LendCalculateCardProps {
  lent: LentAmountReturns;
}

export const LendCalculateCard = ({ lent }: LendCalculateCardProps) => {
  const total = calculateTotalAmount(lent);

  return (
    <TransactionCardWrapper elevation={0} variant="outlined">
      <InsideWrapper>
        <Container>
          <div>
            <BorrowTitle>Lend</BorrowTitle>
            {lent.map((member, index) => (
              <CalculateContainer key={index}>
                <CalculateName>{`${member.firstName} ${member.lastName}`}</CalculateName>
                <CalculateAmount>
                  {member.totalAmount.toFixed(2).toLocaleString()}
                </CalculateAmount>
              </CalculateContainer>
            ))}
          </div>
          <CalculateContainer>
            <CalculateName>Total</CalculateName>
            <BorrowTotal>{total ? total : "-"}</BorrowTotal>
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
  color: #ee9696;
`;

const CalculateContainer = styled.div`
  width: 100%;
  display: flex;
`;

const CalculateName = styled.div`
  width: 70%;
  margin-bottom: 0.3rem;
`;

const CalculateAmount = styled.div`
  width: 30%;
`;

const BorrowTotal = styled.div`
  color: #ee9696;
`;
