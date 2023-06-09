import { Card } from '@mui/material';
import styled from 'styled-components';
import { LentAmountReturns } from '../pages/HistoryPage';
import { calculateTotalAmount } from '../../utils/utils';

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
                  {member.totalAmount.toLocaleString()}
                </CalculateAmount>
              </CalculateContainer>
            ))}
          </div>
          <CalculateContainer>
            <CalculateName>Total</CalculateName>
            <BorrowTotal>{total ? total : '-'}</BorrowTotal>
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
  color: red;
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
  color: red;
`;
