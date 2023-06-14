import { Card, CardActionArea, Typography } from "@mui/material";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Expense } from "../../types";
import { getCategoryIcon } from "../../utils/categoryUtils";

interface TransactionProps {
  expense: Expense;
}

export const TransactionCard = ({ expense }: TransactionProps) => {
  const navigate = useNavigate();
  const handleGoToDetail = () => {
    navigate(`/history/${expense.id}`, { state: { expense } });
  };
  const CategoryIcon = getCategoryIcon(expense.category);
  return (
    <TransactionCardWrapper elevation={0}>
      <CardActionArea onClick={handleGoToDetail}>
        <ContentWrapper>
          <IconContainer>
            <IconCircle>
              <CategoryIcon />
            </IconCircle>
          </IconContainer>
          <DiscriptionContainer>
            <Typography gutterBottom component="div" style={{ margin: "0" }}>
              {expense.description}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {expense.date.toLocaleString().substring(0, 10)}
            </Typography>
          </DiscriptionContainer>
          <AnountContainer>
            <Typography gutterBottom component="div">
              {expense.payment.toFixed(2).toLocaleString()}
            </Typography>
          </AnountContainer>
        </ContentWrapper>
      </CardActionArea>
    </TransactionCardWrapper>
  );
};

const TransactionCardWrapper = styled(Card)`
  width: 100%;
  margin-bottom: 20px;
  border-radius: 10px !important;
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
  background-color: ${({ theme }) => theme.palette.primary.light};
`;

const DiscriptionContainer = styled.div`
  width: 65%;
  padding: 10px;
`;

const AnountContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20%;
`;
