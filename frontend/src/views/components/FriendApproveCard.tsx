import { Button, Card, Typography } from "@mui/material";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import styled from "styled-components";
import { Friend } from "../../types";
import { useSelector } from "react-redux";
import { selectUser } from "../../reducer/userSlice";
import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL as string,
  process.env.REACT_APP_SUPABASE_ANON_KEY as string
);

export const FriendApproveCard = ({ firstName, lastName, email }: Friend) => {
  const { user } = useSelector(selectUser);
  // const { friendship, setfriendship } = useState();

  const userId = user?.id;

  const getRequestFriendsFromFriendShip = async () => {
    try {
      const { data, error }: { data: any; error: any } = await supabase
        .from("Friendships")
        .select("*")
        .eq("friendId", userId)
        .eq("statusId", 1);

      if (error) {
        console.log("Error: ", error);
      } else {
        console.log(data, "aprovecard");
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  };

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
          <AproveButton onClick={handleApprove}>approve</AproveButton>
        </ButtonWrapper>
        <ButtonWrapper>
          <RejectButton onClick={handleReject}>reject</RejectButton>
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
  width: 75%;
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
  width: 25%;
  display: flex;
  gap: 20px;
  align-items: center;
`;

const ButtonWrapper = styled.div`
  width: 50%;
`;

const AproveButton = styled(Button)`
  background: #ee9696 !important;
  border: 0;
  color: white !important;
  width: 100% !important;
  height: 40px !important;
  font-size: 0.7rem !important;
  padding: 0 !important;
`;

const RejectButton = styled(Button)`
  background: #a196ee !important;
  border: 0;
  color: white !important;
  width: 100% !important;
  height: 40px !important;
  font-size: 0.7rem !important;
  padding: 0 !important;
`;
