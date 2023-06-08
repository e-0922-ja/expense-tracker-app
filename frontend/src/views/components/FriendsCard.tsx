import { Card, CardActionArea, Typography } from '@mui/material';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

interface FriendsCardProps {
  friendName: string;
}

export const FriendsCard = ({ friendName }: FriendsCardProps) => {
  const navigate = useNavigate();
  const handleGoToFriendsHistory = () => {
    navigate('/history/group/1');
  };
  return (
    <TransactionCardWrapper elevation={0}>
      <CardActionArea onClick={handleGoToFriendsHistory}>
        <ContentWrapper>
          <IconContainer>
            <IconCircle>
              <PeopleAltIcon />
            </IconCircle>
          </IconContainer>
          <NameWrapper>
            <Typography variant="body1">{friendName}</Typography>
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
  background-color: ${({ theme }) => theme.palette.primary.light};
`;
