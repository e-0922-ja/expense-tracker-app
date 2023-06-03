import { Card } from "@mui/material";
import React from "react";
import styled from "styled-components";

export const LendCalculateCard = () => {
  return (
    <TransactionCardWrapper elevation={0} variant="outlined">
      <InsideWrapper>
        <Container>
          <SubContainer>
            <BorrowTitle>Lend</BorrowTitle>
            <CalculateContainer>
              <CalculateName>Megan</CalculateName>
              <CalculateAmount>$200</CalculateAmount>
            </CalculateContainer>
            <CalculateContainer>
              <CalculateName>Bob</CalculateName>
              <CalculateAmount>$10</CalculateAmount>
            </CalculateContainer>
            <CalculateContainer>
              <CalculateName>Alex</CalculateName>
              <CalculateAmount>$50</CalculateAmount>
            </CalculateContainer>
          </SubContainer>
          <CalculateContainer>
            <CalculateName>Total</CalculateName>
            <BorrowTotal>$1000</BorrowTotal>
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

const SubContainer = styled.div``;

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
