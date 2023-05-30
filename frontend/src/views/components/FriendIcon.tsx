import styled from "styled-components";
import Chip from "@mui/material/Chip";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

export default function FriendIcon() {
  const selectedFriendsState = useSelector(
    (state: RootState) => state.selectedFriends
  );
  const selectedFriends = selectedFriendsState.selectedFriends;

  return (
    <ChipsWrapper>
      {selectedFriends.map((item) => {
        return (
          <div key={indexedDB.toString()}>
            <Chip
              label={
                item.id ? `${item.firstName} ${item.lastName}` : item.email
              }
              sx={{
                height: "48px",
                fontSize: "1rem",
                borderRadius: "4px",
                padding: "0 10px",
                margin: "0 10px 10px 0",
              }}
            />
          </div>
        );
      })}
    </ChipsWrapper>
  );
}

const ChipsWrapper = styled.div`
  width: 85%;
  display: flex;
  flex-wrap: wrap;
`;
