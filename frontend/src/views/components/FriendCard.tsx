import { Card, Typography } from "@mui/material";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import styled from "styled-components";
import { Friend } from "../../types";

export const FriendCard = ({ firstName, lastName, email }: Friend) => {
  return (
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
  );
};

const FriendAproveCardWrapper = styled(Card)`
  width: 75%;
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
