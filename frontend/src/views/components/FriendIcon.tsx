import styled from "styled-components";
import Chip from "@mui/material/Chip";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { removeSelectedFriend } from "../../reducer/selectedFriendsSlice";
import { Friend } from "../../types";

export default function FriendIcon() {
  const selectedFriendsState = useSelector(
    (state: RootState) => state.selectedFriends
  );
  const selectedFriends = selectedFriendsState.selectedFriends;
  const dispatch = useDispatch();

  const handleDelete = (nameToDelete: Friend) => () => {
    dispatch(removeSelectedFriend(nameToDelete.email));
  };

  return (
    <ChipsWrapper>
      {selectedFriends.map((item) => (
        <div key={item.id}>
          <Chip
            label={item.id ? `${item.firstName} ${item.lastName}` : item.email}
            onDelete={handleDelete(item)}
            sx={{
              height: "48px",
              fontSize: "1rem",
              borderRadius: "4px",
              padding: "0 10px",
              margin: "0 10px 10px 0",
            }}
          />
        </div>
      ))}
    </ChipsWrapper>
  );
}

const ChipsWrapper = styled.div`
  width: 85%;
  display: flex;
  flex-wrap: wrap;
`;
