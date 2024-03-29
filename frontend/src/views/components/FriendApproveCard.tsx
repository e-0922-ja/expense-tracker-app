import { Button, Card, Typography } from "@mui/material";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import styled from "styled-components";
import { client } from "../../services/supabase";
import { Friend } from "../../types";

export interface PropsFriendApproveCard {
  userId: string;
  friend: Friend;
  getUserFriendsById: () => void;
}

export const FriendApproveCard = ({
  userId,
  friend,
  getUserFriendsById,
}: PropsFriendApproveCard) => {
  const handleApprove = async () => {
    try {
      const { data, error }: { data: any; error: any } = await client
        .from("Friendships")
        .select("*")
        .eq("friendId", userId)
        .eq("userId", friend.id)
        .eq("statusId", 1);

      if (error) {
        console.log("Error: ", error);
      } else {
        if (data && data.length > 0) {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { data: updatedData, error: updateError } = await client
            .from("Friendships")
            .update({ statusId: 2, updatedAt: new Date().toISOString() })
            .match({ id: data[0].id });
          if (updateError) {
            console.error("Error updating statusId: ", updateError);
          }
          getUserFriendsById();
        } else {
          console.log("No data to update");
        }
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const handleReject = async () => {
    try {
      const { data, error }: { data: any; error: any } = await client
        .from("Friendships")
        .select("*")
        .eq("friendId", userId)
        .eq("userId", friend.id)
        .eq("statusId", 1);

      if (error) {
        console.log("Error: ", error);
      } else {
        if (data && data.length > 0) {
          const { data: deletedData, error: updateError } = await client
            .from("Friendships")
            .delete()
            .match({ id: data[0].id });
          if (updateError) {
            console.error("Error deleting statusId: ", updateError);
          }
          console.log("Deleted record:", deletedData);
          getUserFriendsById();
        } else {
          console.log("No data to Delete");
        }
      }
    } catch (error) {
      console.error("Error: ", error);
    }
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
              {friend.firstName ? (
                <>
                  <Typography variant="body1">{friend.firstName}</Typography>
                  <Typography variant="body1">{friend.lastName}</Typography>
                </>
              ) : (
                <Typography variant="body1">-</Typography>
              )}
            </NameContainer>
            <Typography variant="body1">{friend.email}</Typography>
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
  @media (max-width: 600px) {
    gap: 0;
  }
`;

const FriendAproveCardWrapper = styled(Card)`
  width: 75%;
  border-radius: 10px !important;
  background: ${({ theme }) => theme.palette.primary.light} !important;
  color: ${({ theme }) => theme.palette.info.light} !important;
  @media (max-width: 600px) {
    font-size: 0.8rem;
  }
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
  @media (max-width: 600px) {
    width: 30px;
    height: 30px;
    svg {
      font-size: 1rem;
    }
  }
`;

const InfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 85%;
  padding: 20px;
  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
  }
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
  @media (max-width: 600px) {
    flex-direction: column;
    gap: 10px;
  }
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
