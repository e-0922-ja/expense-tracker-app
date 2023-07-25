import { Card, CardActionArea, Typography } from "@mui/material";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Expense } from "../../types";
import { getCategoryIcon } from "../../utils/categoryUtils";
import { paths } from "../../constants/routePaths";

interface TransactionProps {
  userId: string;
  expense: Expense;
}

export const TransactionCard = ({ userId, expense }: TransactionProps) => {
  const navigate = useNavigate();

  const handleGoToDetail = () => {
    navigate(`${paths.history}/${expense.id}`, { state: { expense } });
  };
  const CategoryIcon = getCategoryIcon(expense.category);

  const checkTransactionStyle = () => {
    const hasPaid = expense.members.find(
      (member) => member.id === userId && !member.paid
    );
    if (expense.payer !== userId && hasPaid) {
      return { borderLeft: "3px solid #a196ee" };
    } else if (expense.payer === userId && !expense.settled) {
      return { borderLeft: "3px solid #ee9696" };
    } else {
      return {};
    }
  };

  return (
    <TransactionCardWrapper elevation={0}>
      <CardActionArea onClick={handleGoToDetail}>
        <ContentWrapper style={checkTransactionStyle()}>
          <IconContainer>
            <IconCircle>
              <CategoryIcon />
            </IconCircle>
          </IconContainer>
          <DiscriptionContainer>
            <Typography gutterBottom component="div" style={{ margin: "0" }}>
              {expense.description}
            </Typography>
            <Typography variant="body2">
              {expense.date.toLocaleString().substring(0, 10)}
            </Typography>
          </DiscriptionContainer>
          <AmountContainer>
            <AmountTypography gutterBottom>
              {expense.payment.toFixed(2).toLocaleString()}
            </AmountTypography>
          </AmountContainer>
        </ContentWrapper>
      </CardActionArea>
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

const ContentWrapper = styled.div`
  display: flex;
  width: 100%;
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 15%;
`;

const IconCircle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.palette.secondary.light};
  color: #fff;
  @media (max-width: 600px) {
    width: 30px;
    height: 30px;
    svg {
      font-size: 1rem;
    }
  }
`;

const DiscriptionContainer = styled.div`
  width: 55%;
  padding: 10px;
`;

const AmountContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30%;
`;

const AmountTypography = styled(Typography)`
  &.MuiTypography-root {
    margin-bottom: 0;
  }
`;
