import { Card, CardActionArea, Typography } from "@mui/material";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import DirectionsTransitIcon from "@mui/icons-material/DirectionsTransit";
import HouseIcon from "@mui/icons-material/House";
import LightIcon from "@mui/icons-material/Light";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import Face3Icon from "@mui/icons-material/Face3";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import { CategoryIcon, Expense } from "../../types";

interface TransactionProps {
  expense: Expense;
}

const categoryIcons: CategoryIcon[] = [
  { id: 1, category: "None", icon: <HorizontalRuleIcon /> },
  { id: 2, category: "Food", icon: <RestaurantIcon /> },
  { id: 3, category: "Entertainment", icon: <MusicNoteIcon /> },
  { id: 4, category: "Transportation", icon: <DirectionsTransitIcon /> },
  { id: 5, category: "Cost of Living", icon: <HouseIcon /> },
  { id: 6, category: "Utility", icon: <LightIcon /> },
  { id: 7, category: "Health", icon: <MonitorHeartIcon /> },
  { id: 8, category: "Beauty", icon: <Face3Icon /> },
  { id: 9, category: "Cloth", icon: <ShoppingCartIcon /> },
  { id: 10, category: "Others", icon: <HelpOutlineIcon /> },
];

export const TransactionCard = ({ expense }: TransactionProps) => {
  const navigate = useNavigate();
  const handleGoToDetail = () => {
    navigate(`/history/${expense.id}`, { state: { expense } });
  };
  return (
    <TransactionCardWrapper elevation={0}>
      <CardActionArea onClick={handleGoToDetail}>
        <ContentWrapper>
          <IconContainer>
            <IconCircle>
              {
                categoryIcons.find((item) => item.id === expense.categoryId)
                  ?.icon
              }
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
