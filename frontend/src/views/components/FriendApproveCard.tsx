import { Button, Card, Typography } from "@mui/material";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import styled from "styled-components";

import { Friend } from "../../types";

export const FriendApproveCard = ({ firstName, lastName, email }: Friend) => {
  const handleApprove = () => {
    // change the status 1 to 2 in friends table
  };
  const handleReject = () => {
    // remove row from friends table
  };
  return (
    <Wrapper>
      <FriendAproveCardWrapper elevation={0}>
        <ContentWrapper>
          <IconContainer>
            <IconCircle>
              <PeopleAltIcon />
            </IconCircle>
          </IconContainer>
          <InfoWrapper>
            <NameContainer>
              {firstName ? (
                <>
                  <Typography variant="body1">{firstName}</Typography>
                  <Typography variant="body1">{lastName}</Typography>
                </>
              ) : (
                <Typography variant="body1">-</Typography>
              )}
            </NameContainer>
            <Typography variant="body1">{email}</Typography>
          </InfoWrapper>
        </ContentWrapper>
      </FriendAproveCardWrapper>
      <ButtonsContainer>
        <ButtonWrapper>
          <MyButton onClick={handleApprove}>approve</MyButton>
        </ButtonWrapper>
        <ButtonWrapper>
          <MyButton onClick={handleReject}>reject</MyButton>
        </ButtonWrapper>
      </ButtonsContainer>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
  margin-bottom: 20px;
`;

const FriendAproveCardWrapper = styled(Card)`
  width: 70%;
  border-radius: 10px !important;
  background: ${({ theme }) => theme.palette.primary.light} !important;
  color: ${({ theme }) => theme.palette.info.light} !important;
`;

const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
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

const InfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 85%;
  padding: 20px;
`;

const NameContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const ButtonsContainer = styled.div`
  width: 30%;
  display: flex;
  gap: 20px;
  align-items: center;
`;

const ButtonWrapper = styled.div`
  width: 50%;
`;

const MyButton = styled(Button)`
  background: ${({ theme }) => theme.palette.secondary.main} !important;
  border: 0;
  color: white !important;
  width: 100% !important;
  height: 40px !important;
  font-size: 0.7rem !important;
  padding: 0 !important;
`;
