import { Card, CardActionArea, Typography } from "@mui/material";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Expense } from "../../types";
import { useSelector } from "react-redux";
import { selectUser } from "../../reducer/userSlice";
import { paths } from "../../constants/routePaths";

interface FriendsCardProps {
  expense: Expense;
}

export const FriendsCard = ({ expense }: FriendsCardProps) => {
  const account = useSelector(selectUser);
  const navigate = useNavigate();
  const handleGoToFriendsHistory = () => {
    navigate(`${paths.historyGroup}1`, { state: { expense } });
  };
  const checkTransactionStyle = () => {
    if (
      expense.payer !== account.user?.id &&
      expense.members.find(
        (member) => member.id === account.user?.id && !member.paid
      )
    ) {
      return { borderLeft: "3px solid #a196ee" };
    } else if (expense.payer === account.user?.id && !expense.settled) {
      return { borderLeft: "3px solid #ee9696" };
    } else {
      return {};
    }
  };
  return (
    <TransactionCardWrapper elevation={0}>
      <CardActionArea onClick={handleGoToFriendsHistory}>
        <ContentWrapper style={checkTransactionStyle()}>
          <IconContainer>
            <IconCircle>
              <PeopleAltIcon />
            </IconCircle>
          </IconContainer>
          <NameWrapper>
            <Typography variant="body1">
              {expense.members.map(({ firstName }) => firstName).join(", ")}
            </Typography>
          </NameWrapper>
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

const NameWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 20px;
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
`;
