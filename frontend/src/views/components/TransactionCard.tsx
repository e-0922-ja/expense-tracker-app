import { Card, CardActionArea, Typography } from "@mui/material";
import styled from "styled-components";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import { useNavigate } from "react-router-dom";

interface Transaction {
  category: string;
  dispription: string;
  amount: number;
  date: string;
}

interface TransactionProps {
  item: Transaction;
}

export const TransactionCard = ({ item }: TransactionProps) => {
  const navigate = useNavigate();
  const handleGoToDetail = () => {
    navigate("/history/1");
  };
  return (
    <TransactionCardWrapper elevation={0}>
      <CardActionArea onClick={handleGoToDetail}>
        <ContentWrapper>
          <IconContainer>
            <IconCircle>
              <RestaurantIcon />
            </IconCircle>
          </IconContainer>
          <DiscriptionContainer>
            <Typography gutterBottom component="div" style={{ margin: "0" }}>
              {item.dispription}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {item.date}
            </Typography>
          </DiscriptionContainer>
          <AnountContainer>
            <Typography gutterBottom component="div">
              ${item.amount}
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
