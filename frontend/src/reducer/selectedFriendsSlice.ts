import { createSlice } from "@reduxjs/toolkit";
import { Friend } from "../types";

interface FriendState {
  selectedFriends: Friend[];
}

const initialState: FriendState = {
  selectedFriends: [],
};

export const selectedFriendsSlice = createSlice({
  name: "selectedFriends",
  initialState,
  reducers: {
    updatedFriends: (state, action) => {
      state.selectedFriends.push(action.payload);
    },
    removeSelectedFriend: (state, action) => {
      state.selectedFriends = state.selectedFriends.filter(
        (selectedFriends) => selectedFriends.email !== action.payload
      );
    },
  },
});

export const { updatedFriends, removeSelectedFriend } =
  selectedFriendsSlice.actions;
export default selectedFriendsSlice.reducer;
